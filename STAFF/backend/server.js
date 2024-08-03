require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const AccessCode = require('./models/AccessCode');
const path = require('path');
const crypto = require('crypto');
const cron = require('node-cron');
const app = express();
const port = 3000;

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(bodyParser.json());

// Servir a pasta auth
app.use('/auth', express.static(path.join(__dirname, '../../auth')));

// Servir a pasta STAFF
app.use('/STAFF', express.static(path.join(__dirname, '../../STAFF')));

// Rota padrão para redirecionar para a página de login
app.get('/', (req, res) => {
    res.redirect('/auth/index.html');
});

function generateAccessCode() {
    return crypto.randomBytes(16).toString('hex');
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Usuário ou senha incorretos' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password, accessCode } = req.body;

    const validCode = await AccessCode.findOne({ code: accessCode, isActive: true });
    if (!validCode) {
        return res.json({ success: false, message: 'Código de acesso inválido ou inativo' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    validCode.isActive = false;
    validCode.userId = newUser._id;
    await validCode.save();

    res.json({ success: true, accessCode: validCode.code });
});

app.get('/access-codes', async (req, res) => {
    const accessCodes = await AccessCode.find({ isActive: true });
    res.json(accessCodes);
});

// Atualizar códigos de acesso a cada 24 horas
cron.schedule('0 0 * * *', async () => {
    const users = await User.find();
    for (const user of users) {
        const newAccessCode = generateAccessCode();
        await AccessCode.updateOne(
            { userId: user._id },
            { code: newAccessCode, createdAt: new Date(), isActive: true }
        );
        console.log(`Updated access code for user ${user.username}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

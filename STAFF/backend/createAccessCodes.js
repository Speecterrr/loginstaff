const mongoose = require('mongoose');
const AccessCode = require('./models/AccessCode');
const crypto = require('crypto');

mongoose.connect('mongodb+srv://ssk:futebol12@ssk.3rsyqid.mongodb.net/ssk?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

function generateAccessCode() {
    return crypto.randomBytes(16).toString('hex');
}

async function createAccessCodes() {
    const codes = [];
    for (let i = 0; i < 10; i++) {
        const code = new AccessCode({
            code: generateAccessCode(),
            createdAt: new Date(),
            isActive: true,
            userId: null  // Ensure userId is not required here
        });
        codes.push(code.save());
    }
    try {
        await Promise.all(codes);
        console.log('Access codes created successfully');
    } catch (err) {
        console.error('Error creating access codes:', err);
    } finally {
        mongoose.disconnect();
    }
}

createAccessCodes();

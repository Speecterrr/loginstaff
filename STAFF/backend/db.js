const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ssk:futebol12@ssk.3rsyqid.mongodb.net/ssk?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

module.exports = mongoose;

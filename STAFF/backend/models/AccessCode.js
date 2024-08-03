const mongoose = require('mongoose');

const accessCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }  // `default: null` instead of `required`
});

const AccessCode = mongoose.model('AccessCode', accessCodeSchema);

module.exports = AccessCode;

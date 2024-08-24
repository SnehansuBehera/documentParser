// models/Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    extractedText: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Document', DocumentSchema);

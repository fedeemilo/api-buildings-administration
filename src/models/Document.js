const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendlyId: {
            type: String,
            required: true,
            unique: true
        },
        type: {
            type: String,
            enum: ['RESUME', 'CLAIM', 'REQUEST', 'VOUCHER'],
            required: true
        },
        ducumentUrl: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Document', DocumentSchema)
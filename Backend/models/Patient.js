const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        nationalId: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        email: String,

        name: {
            type: String,
            required: true
        },

        age: Number,

        gender: String,

        address: String,

        complaint: {
            type: String,
            required: true
        },

        hasAllergy: String,

        allergyDetails: String,

        pastHistory: String,

        vitals: {
            bloodPressure: String,
            pulse: Number,
            temperature: Number
        },

        diagnosis: String,

        prescription: String,

        followup: String
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Patient", patientSchema);
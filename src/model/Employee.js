const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    age: { type: String, default: null },
    dependents: { type: String },
    house: { type: String },
    income:{type: String},
    marital_status:{type: String},
    risk_questions: {type: String},
    vehicle:{type: String},
});

module.exports = mongoose.model("Employee", employeeSchema);
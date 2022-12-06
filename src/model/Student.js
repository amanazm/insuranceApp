const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    student_name: { type: String, default: null },
    student_id: { type: String, unique: true },
    course_id: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
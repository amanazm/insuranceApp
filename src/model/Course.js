const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_name: { type: String, default: null },
    course_id: { type: String, unique:true },
    course_score: { type: String, default: null },    
});

module.exports = mongoose.model("Course", courseSchema);
const Student = require("../model/Student")
const Course = require("../model/Course")
const addStudent = async(req,res) =>{
    try {
        const {student_name,student_id,course_id }=req.body
        const result = await Student.create({
            student_name:student_name,
            student_id:student_id,
            course_id:course_id
        })

        res.status(201).json({result});
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
        
    }
}

const addCourse = async(req,res) =>{
    try {
        const{course_id, course_name,course_score}=req.body
        const result = await Course.create({
            course_id:course_id,
            course_name:course_name,
            course_score:course_score
        })

        res.status(201).json({result})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
    }
}

const listStudent = async(req,res) =>{
    try {
        const result = await Student.aggregate([
            { $lookup:
               {
                 from: 'courses',
                 localField: 'course_id',
                 foreignField: 'course_id',
                 as: 'course_details'
               }
             },
             { $unwind: "$course_details" } ,
             {
                $project: {
                    "_id":0,
                    "student_name": 1,
                    "course_name": "$course_details.course_name",
                    "course_score": "$course_details.course_score"
                }
              }
            
            ]);

        res.status(201).json({result})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Something went wrong"})
    }
}

module.exports = {
    addStudent,
    addCourse,
    listStudent
}
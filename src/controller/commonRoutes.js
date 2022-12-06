const express = require('express');

const router = express.Router();

const {
    addStudent,
    addCourse,
    listStudent
  } = require('./commonController');


router.post('/createStudent', addStudent);
router.post('/createCourse', addCourse);
router.get('/student', listStudent);

module.exports = router

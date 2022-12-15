const express = require('express');

const router = express.Router();

const {
    addEmployee,
    getInsurance
  } = require('./commonController');


router.post('/employee', addEmployee);
router.get('/insurance', getInsurance);

module.exports = router

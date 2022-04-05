var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('welcome to index route home page');
});
router.get('/students', function (req, res, next) {
  let students = ['bindu', 'Tulasi', 'Kalyan'];
  res.json(students);
});
router.get('/student', function (req, res, next) {
  let tulasiob = { name: 'mounisha', city: 'Hyderabad' };
  res.json(tulasiob);
});
module.exports = router;

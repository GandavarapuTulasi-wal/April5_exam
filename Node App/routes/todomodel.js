const express = require('express');
const router = express.Router();
const todoModel = require('../mysqlmodels/todo');
router.get('/', function (req, res) {
  todoModel.findAll().then(
    function (todos) {
      res.status(200).json(todos);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});
router.post('/create', function (req, res) {
  todoModel
    .create({
      status: parseInt(req.body.status),
      title: req.body.title,
      description: req.body.description,
    })
    .then(function (todo) {
      res.status(200).json(todo);
    });
});
module.exports = router;

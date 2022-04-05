const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var connector = require('../poolconnect');
const authenticationMiddleware = require('../middlewares/authentication');
exports.createTable = function (req, res) {
  connector.query(
    'CREATE TABLE user (id int AUTO_INCREMENT PRIMARY KEY,name varchar(30), password varchar(200),age int,dob date,email varchar(30))',
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
};
exports.RegisterUser = function (req, res) {
  const { id, name, password, age, dob, email } = req.body;
  const checksql = `SELECT * FROM user WHERE email ="${email}"`;
  connector.query(checksql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({
          status: 0,
          data: 'email already exists',
        });
      } else {
        const sql = 'INSERT INTO user VALUES(?,?,?,?,?,?)';
        connector.query(
          sql,
          [id, name, password, age, dob, email],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, data: results });
            }
          }
        );
      }
    }
  });
};

exports.loginUser = async function (req, res) {
  const { id, email, password } = req.body;
  const checksql = `SELECT * FROM user WHERE email ="${email}" and password="${password}"`;
  connector.query(checksql, [email, password], (err, results) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length === 0) {
        res.json({ status: 0, data: 'incorrect login details' });
      } else {
        const payLoad = {
          user: {
            email: email,
            password: password,
          },
        };
        jwt.sign(
          payLoad,
          'secret_string',
          {
            expiresIn: 1200,
          },
          (err, token) => {
            if (err) {
              throw (
                (error,
                res.json({
                  status: 0,
                  debug_data: 'Temorary error in backend',
                }))
              );
            }
            res.status(200).json({
              status: 1,
              token,
            });
          }
        );
      }
    }
  });
};
exports.getUsers = [
  authenticationMiddleware,
  function (req, res) {
    const sql = `SELECT * FROM user ;`;
    connector.query(sql, function (err, results, fields) {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    });
  },
];
exports.getUserById = [
  authenticationMiddleware,
  function (req, res) {
    let id = req.params.id;
    const sql = `SELECT * FROM user WHERE id="${id}"`;
    connector.query(sql, function (err, results, fields) {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    });
  },
];
exports.editUser = [
  function (req, res) {
    let id = req.params.id;
    let { name, email, password, age, dob } = req.body;
    try {
      let salt = bcrypt.genSaltSync(10);
      console.log(salt);
      encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(encryptedPassword);
    } catch (err) {
      console.log(err);
    }
    const sql = `UPDATE user SET name=?, email=?,password=?, dob=?,age=? where id="${id}"`;
    connector.query(
      sql,
      [name, email, password, dob, age],
      function (err, results, fields) {
        if (err) {
          res.json(err);
        } else {
          res.json(results);
        }
      }
    );
  },
];

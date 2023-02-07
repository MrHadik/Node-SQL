const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => { console.log(`Server listening on http://localhost:${port}`) });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-sql'
})

// Get all User
app.get('/api/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM users', (err, rows) => {
            if (err) throw err;
            res.send(rows)
            connection.release()
        })
    })
})


//Get User by ID
app.get('/api/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                res.status(404);
                res.send({ message: `User not found` })
            } else {
                res.send(rows)
                connection.release()
            }
        })
    })
})



// delete User By ID
// To Do : Same id delete
app.delete('/api/user/delete/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) throw err;
            if (rows.length === 0) {
                res.status(404);
                res.send({ message: `user not found` })
            } else {
                connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                    if (err) throw err;
                    // res.send(rows)
                    res.send({ message: `user deleted successfully` })
                    connection.release()
                })
            }
        })

    })
})


//Add User
// To Do : duplicate entries
app.post('/api/user/add', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const pera = req.body;

        connection.query('SELECT * FROM users WHERE email = ?', [pera.email], (err, rows) => {
            if (err) throw err;
            if (rows.length !== 0) {
                res.status(404);
                res.send({ message: `User Already in Database` })
            } else {
                connection.query('INSERT INTO users SET ?', pera, (err, rows) => {
                    if (err) throw err;
                    res.status(200).send({ message: 'User added successfully', User: pera })
                    connection.release()
                })

            }
        })
    })
})

// Update User
app.put('/api/user/update', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const pera = req.body;
        connection.query('UPDATE users SET ? WHERE users.email = ? ', [pera, pera.email], (err, rows) => {
            if (err) throw err;
            res.status(200).send({ message: 'User Update successfully', User: pera })
            connection.release()
        })
    })
})
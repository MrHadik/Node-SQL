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
    port: 3306,
    user: 'root',
    password: '',
    database: 'node-sql'
})

// Get all User
app.get('/api/users', (req, res) => {
    pool.getConnection((err, connection) => {
        try {
            connection.query('SELECT * FROM users', (err, rows) => {
                res.send(rows)
                connection.release()
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
})


//Get User by ID
app.get('/api/user/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        try {
            connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                if (rows.length === 0) {
                    res.status(404);
                    res.send({ message: `User not found` })
                } else {
                    res.send(rows)
                    connection.release()
                }
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
})



// delete User By ID
app.delete('/api/user/delete/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        try {
            connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                if (rows.length === 0) {
                    res.status(404);
                    res.send({ message: `user not found` })
                } else {
                    connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, rows) => {
                        // res.send(rows)
                        res.send({ message: `user deleted successfully` })
                        connection.release()
                    })
                }
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })

})


//Add User
app.post('/api/user/add', (req, res) => {
    pool.getConnection((err, connection) => {
        try {
            const pera = req.body;
            connection.query('SELECT * FROM users WHERE email = ?', [pera.email], (err, rows) => {
                if (rows.length !== 0) {
                    res.status(400);
                    res.send({ message: `User Already in Database` })
                } else {
                    connection.query('INSERT INTO users SET ?', pera, (err, rows) => {
                        res.status(200).send({ message: 'User added successfully', User: pera })
                        connection.release()
                    })

                }
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })

})

// Update User
app.put('/api/user/update', (req, res) => {
    pool.getConnection((err, connection) => {
        try {
            const pera = req.body;
            connection.query('SELECT * FROM users WHERE email = ?', [pera.email], (err, rows) => {
                if (rows.length === 0) {
                    res.status(400);
                    res.send({ message: `user not found` })
                } else {
                    connection.query('UPDATE users SET ? WHERE users.email = ? ', [pera, pera.email], (err, rows) => {
                        res.status(200).send({ message: 'User Update successfully', User: pera })
                        connection.release()
                    })
                }
            })


            
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
})
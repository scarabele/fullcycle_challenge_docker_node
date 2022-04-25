const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate = `CREATE TABLE IF NOT EXISTS people (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
)`
const sqlInserts = `INSERT INTO people(name) values ('Wesley'), ('Henrique'), ('João'), ('Maria')`
connection.query(sqlCreate)
connection.query(sqlInserts)
connection.end()


app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    const sqlInserts = `SELECT * FROM people`
    connection.query(sqlInserts, (err, results) => {
        if(err) throw err
        let html = '<h1>Full Cycle</h1>';
        html += '<ul>';
        results.forEach(result => {
            html += `<li>${result.name}</li>`
        })
        html += '</ul>'
        res.send(html)
    })
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
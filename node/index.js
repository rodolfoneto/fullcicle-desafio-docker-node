const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const dbConf = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(dbConf)

const sqlInitial = 'CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key (id))';

connection.query(sqlInitial)
connection.query('INSERT INTO people (name) VALUES (\'Rodolfo\');')


app.get('/', (req, res) => {
    getPeople.then((people) => {
        let html = '<h1>Full Cycle People</h1>' + populatePeople(people)
        res.send(html)
    }).catch(err => {
        console.log(err)
    })
})

const getPeople = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM people;', (error, results, fields) => {
        if(error) reject(error)
        resolve(results)
    })
});

function populatePeople(people) {
    var peopleHtml = '<table>';
    for(let i = 0; i < people.length; i++) {
        peopleHtml += '<tr><td>' + people[i].name + '</td></tr>';
    }
    peopleHtml += '</table>';
    return peopleHtml
}

app.get('/insert', (req, res) => {
    connection.query('INSERT INTO people (name) VALUES (\'Rodolfo\');')
    res.send(`<h1>Inserted</h1>`);
})

app.listen(port, () => {
    console.log('Listen in port ' + port)
})
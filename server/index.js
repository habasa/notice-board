const express = require('express')
const app = express()
const mysql = require('mysql')
const PORT = process.env.port || 8000;
const cors = require('cors')
// yarn dev nodemon

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reviewboard'
})

app.use(cors())
app.use(express.json())

app.get('/api/get', (req, res) => {
    const sqlData = "select * from reviewboard"
    db.query(sqlData, (err, data) => {
        res.send(data)
    })
})

app.post('/api/insert', (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const sqlTest = "insert into reviewboard (title, content) values (?, ?)";
    db.query(sqlTest, [title, content], (err, result) => {
        res.send('success')
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
})
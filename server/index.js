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
        // console.log("data", data);
        res.send(data)
    })
})

app.post('/api/insert', (req, res) => {
    // console.log("req.body", req.body);
    const title = req.body.title;
    const content = req.body.content;
    const id = req.body.id;
    const sqlTest = "insert into reviewboard (title, content, id) values (?, ?, ?)";
    db.query(sqlTest, [title, content, id], (err, result) => {
        res.send('success')
    })
})

app.delete('/api/delete', (req, res) => {
    // console.log("*************", req.body.id);
    const id = req.body.id;
    const delReview = `delete from reviewboard id where id =${id}`;
    db.query(delReview, [id], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send('success')
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
})
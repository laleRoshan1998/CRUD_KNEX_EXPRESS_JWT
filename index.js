const express = require('express');
const app = express();
const knex = require("./connection/dbconn.js")
const port = 4000
const {tokencreate,verifytoken}=require('./jwt')
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const data = await knex('user_data')
        res.send(data)
    } catch (error) {
        res.send(error.message)
    }
})



app.post('/insert', async (req, res) => {
    try {
        const data = await knex("user_data").insert(req.body)
        res.send(req.body)
        // console.log(data)
    } catch (err) {
        res.send(err.message)
    }
})

app.post('/login',(req,res)=>{
    knex('user_data').where({email:req.body.email,password:req.body.password}).then((result)=>{
const token=tokencreate(result[0])
res.cookie('cookie',token)
res.send('login successful')
    }).catch((err)=>{
        res.send(err)
    })
})


app.put('/update/:id', async (req, res) => {
    try {

        const data = await knex('user_data').where({ 'id': req.params.id }).update(req.body)
        res.send('update user data.......')
    } catch (err) {
        res.send(err.message)
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const data = await knex('user_data').where({ 'id': req.params.id }).delete(req.body)
        res.send('Delete user data.......!')
    } catch (err) {
        res.send(err.message)
    }
})

app.listen(port, () => {
    console.log("conection......")
})




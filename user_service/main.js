const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const app = express()
const port = 3001

//DB
const USERS = [
    {userId: 123, login: 'log123user'}, 
    {userId: 234, login: 'log234user'}, 
    {userId: 345, login: 'log345user'}
]


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const filtered_users = USERS.filter((user) => user.userId == userId);
    if(filtered_users.length == 0){
        await res.status(404).send()
    }

    let response = await axios.get('https://api.chucknorris.io/jokes/random')
    joke = response.data.value
    let { login } = filtered_users[0]
    
    await res.send({login, joke})
  })

app.post('/user', upload.array(), (req, res) => {
    const {userId, login} =  res.json(req.body);
    USERS.push({userId, login});

    res.status(201).send()
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

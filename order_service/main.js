const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const app = express()
const port = 3000

//DB
const ORDERS = [
    {userId: 123, orderId: 1, details: 'Need additional packing'}, 
    {userId: 234, orderId: 1, details: 'Need some cookies'}, 
    {userId: 345, orderId: 2, details: 'Need a bit patience'}
]


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/users/:userId/orders/:orderId', async (req, res) => {
    const { userId, orderId } = req.params;

    const filtered_orders = ORDERS.filter((order) => order.orderId == orderId);
    if(filtered_orders.length == 0){
        await res.status(404).send()
    }
    let { details } = filtered_orders[0]

    let loginResponse = await axios.get(`http://localhost:3001/users/${userId}`)
    login = loginResponse.data.login
    let jokeResponse = await axios.get('https://api.chucknorris.io/jokes/random')
    joke = jokeResponse.data.value
    
    await res.send({orderId, login, details, joke})
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')

const connectDB = require('./config/db')

const app = express()

const port = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)

app.get("/", (req, res) => {
    res.status(200).json("Server is started")
})

app.listen(port, () => {
    console.log(`Server is started running at ${port}`)
})



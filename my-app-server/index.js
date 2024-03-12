const express = require('express')
const app = express()
const router = require('./routes')

app.use(express.json());

var cors = require('cors')
app.use(cors())

var cookieParser = require("cookie-parser")
app.use(cookieParser())

router(app)

const port = 4000

app.listen(port, () => console.log(`server running at port ${port}`))
app.use(express.urlencoded({ extended: true })); // Middleware cho dữ liệu form
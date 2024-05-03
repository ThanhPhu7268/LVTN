const products = require('./product')
const cart = require('./cart')
const account = require('./account')
const filter = require('./filter')
const filterwm = require('./filterwm')
const filtercp = require('./filtercp')
const order = require('./order')
const analyst = require('./analyst')
const comment = require('./comment')

function route(app) {
    app.use('/api/account', account)
    app.use('/api/products', products)
    app.use('/api/cart', cart)
    app.use('/api/filter', filter)
    app.use('/api/filterwm', filterwm)
    app.use('/api/filtercp', filtercp)
    app.use('/api/order', order)
    app.use('/api/analyst', analyst)
    app.use('/api/comment', comment)
}

module.exports = route
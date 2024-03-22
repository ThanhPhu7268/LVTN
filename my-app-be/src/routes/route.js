const products = require('./product')
const cart = require('./cart')
const account = require('./account')
// const order = require('./order')

function route(app) {
    app.use('/api/account', account)
    app.use('/api/products', products)
    app.use('/api/cart', cart)
    // app.use('/api/order', order)
}

module.exports = route
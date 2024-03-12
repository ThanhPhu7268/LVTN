const blog = require('./blog')
const level = require('./level')
const study = require('./study')
const Account = require('./Account')
const comment = require('./comment')

function route(app) {
    app.use('/level', level)
    app.use('/blog', blog)
    app.use('/study', study)
    app.use("/account", Account)
    app.use('/comment', comment)
}

module.exports = route
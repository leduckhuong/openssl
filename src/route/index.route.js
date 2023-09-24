const index = require('../app/controller/index.controller');
const ca = require('./router/ca.router');

function route(app) {
    app.get('/', index.index);
    app.use('/ca',ca);
}

module.exports = route;
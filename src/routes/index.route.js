const index = require('../apps/controllers/index.controller');
const ca = require('./routers/ca.router');

function route(app) {
    app.get('/', index.index);
    app.use('/ca',ca);
}

module.exports = route;
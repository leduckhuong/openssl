

function route(app) {
    app.get('/', (req, res) => {
        res.render('index.ejs');
    })
}

module.exports = route;
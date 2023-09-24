

class CA{
    index(req, res) {
        res.render('index', {
            isCA: true
        })
    }
    ca(req, res, next) {
        res.json(req.body);
    }
}

module.exports = new CA()
const fs = require('fs');

class Index{
    index(req, res) {
        const caKey = req.cookies['ca-key'];
        if(!caKey) {
            res.render('index');
        } else {
            const keyData = fs.readFileSync('D:/studyings/CA/openssl/src/publics/certificates/'+caKey, 'utf-8');
            const certificateData = fs.readFileSync('D:/studyings/CA/openssl/src/publics/certificates/'+caKey+'.csr', 'utf-8');
            res.render('index', {
                caKey,
                keyData,
                certificateData
            });
        }
    }
}

module.exports = new Index();
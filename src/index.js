
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
const port = process.env.PORT || 3000;

const route = require('./routes/index.route');
const app = require('./app');

route(app);

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certificates','ca-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificates','ca-certificate.pem'))
}

https.createServer(options, app).listen(port, ()=> {
    console.log(`Listening on https://127.0.0.1:${port}`);
})
http.createServer(app).listen(port+20, ()=> {
    console.log(`Listening on http://127.0.0.1:${port+20}`);
})
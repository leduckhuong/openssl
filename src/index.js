const port = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config();

const route = require('./route/index.route');
const app = require('./app');

route(app);

app.listen(port, () => {
    console.log(`App listen on 172.0.0.1:${port}`);
})
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/callback', (req, res) => {
    let payload = req.body;

    if (payload.pdKey && payload.pdVal) {
        // how this is implemented depends on your backend logic
        const user = getUserByPdVal(payload.pdVal);

        if (user) {
            if (payload.proxy.isProxy) {
                user.displayCaptcha();
            }
        }
        // In this example, we don't care if users are using VPN's
    }

    res.header('Content-Type', 'application/json');
    return res.send({ 'msg': 'ok' });
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
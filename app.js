const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


// Serve static asset files
app.use('/assets/', express.static('public/assets/'));

// Middleware 
app.use(cookieParser());

// Dev lockdown
app.use((req, res, next) => {
    if (process.env.DEV_KEY == req.cookies?.dev_key) {
        next();
    } else if (process.env.DEV_KEY == req.query?.dev_key) {
        res.cookie('dev_key', process.env.DEV_KEY, { maxAge: 900000 });
        res.redirect('/');
    } else {
        res.status(403).sendFile(path.join(process.cwd() + '/public/other/soon.html'));
    }
})

app.get('/user/:page', (req, res) => {
    res.sendFile(path.join(process.cwd() + `/public/user/${req.params.page}.html`));
});

// serve static files for root from public folder
app.use(express.static('public'));

// Listen
app.listen(80, () => {
    console.log('Server is running on port 80');
});
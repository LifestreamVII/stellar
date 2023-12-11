const express = require('express');
const path = require("path");
const fs = require('fs');
const { json } = require('express');
require('dotenv').config();


// Express.js instance
const app = express();

// Listen PORT 9000
const PORT = 28073;

// localhost HOST
const HOST = "0.0.0.0";

app.use(function (req, res, next) {
    if (req.path === '/stellar') app.set('views', './views');
    else app.set("views", path.join(__dirname, "views"));
    next()
});

app.get('/stellar/', (req, res) => {
    res.render('index', { title: app.get('title'), message: 'Hello there!' });
})

app.get('/', (req, res) => {
    res.render('index', { title: app.get('title'), message: 'Hello there!' });
})


app.get('/watermelon', (req, res) => {
	res.redirect('https://flb.na-no.pro/');
})

app.get('/map', (req, res) => {
    let pro = false;
    if (!req.query.pro) return res.redirect("/");
    else pro = openMapWithJSON(req.query.pro);

    if (pro)
        res.render('map', { title: app.get('title'), json: pro });
    else
        res.redirect("/");
})

function openMapWithJSON(query){
    let file = './json/' + query + '.json';

    try {
    if (fs.existsSync(file)) {
        try {
            return JSON.parse(fs.readFileSync(file, 'utf8'));
        }
        catch (err) {
            console.error(`Error parsing file: ${file}`);
            return false;
        }
    } else throw 'User requested file that does not exist';
    } catch(err) {
        console.error(err);
        return false;
    }
}

// App Config.
    app.set('title', 'Stellar');
    app.get('title');
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");
    // Express Static Middleware - Resources (CSS/JS/Images/Fonts)
    app.use(express.static('./public'));

// App Listen
app.listen(PORT, HOST, () => console.log(`server listening at localhost:${PORT}`));

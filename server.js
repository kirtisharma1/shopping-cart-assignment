const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config');
const compiler = webpack(config);
const fs = require('fs');
const server = express();
const bodyParser = require("body-parser");

server.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.post('/addtocart', (req, res) => {
    try {
        fs.writeFileSync('server/addToCart/index.post.json', JSON.stringify(req.body));
    } catch(err) {
        console.error(err);
    }
    res.end('true');
});

server.get('/api/categories', (req, res) => {
    const categories = require("./server/categories/index.get.json");
    categories.sort((a, b) => {
        if(isFinite(Number(a.order)) && isFinite(Number(b.order))){
            return a.order - b.order;
        }
    });
    const filteredList = categories.filter(item => item.enabled);
    res.end(JSON.stringify(filteredList));
});

server.get('/api/products', (req, res) => {
    const products = require("./server/products/index.get.json");
    if (req.query.id == "all") {
        res.end(JSON.stringify(products));
    } else {
        const filteredProduct = products.filter((prod) => prod.category == req.query.id);
        res.end(JSON.stringify(filteredProduct));
    }
});

server.get('/api/getcart', (req, res) => {
    fs.readFile('server/addToCart/index.post.json', 'utf-8', (err, data) => {
      if (err) throw err
      const jsonData = JSON.parse(data);
      res.end(JSON.stringify(jsonData));
    })
});

server.get('/api/offers', (req, res) => {
    const offers = require("./server/banners/index.get.json");
    res.end(JSON.stringify(offers));
});

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

server.listen(8080, () => {
    console.log("server is listening");
});
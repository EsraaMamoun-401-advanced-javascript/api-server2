'use strict';

const express = require('express');

// To define our server as ("app") ...
const app = express();

//-------------------Requires-------------------//

let jsonData = require('../db.json');
const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const notFound = require('./middleware/404.js');
const errorServer = require('./middleware/500.js');


// Global Middleware
app.use(express.json());

// Usages
app.use(timestamp);
app.use(logger);

//-------------------Routing Lab's-------------------//


app.get('/', (req, res, next) => {
  let HTMLpage = '<div><h1>Home Page</h1>';
  if (req.query.name)
    HTMLpage += '<h3>Welcome ' + req.query.name + '!</h3></div>';
  else HTMLpage += '</div>';
  // return res to the client
  res.status(200);
  res.send(HTMLpage);
});

// let db = [];

app.post('/products', (req, res, next) => {
  let newRecord = req.body;
  newRecord.id = jsonData.products.length + 1;

  jsonData.products.push(newRecord);

  //   (jsonData.products).forEach(element => {
  //     db.push(element);
  //   });
  //   db.push(newRecord);

  //   console.log(db);

  res.status(201);
  res.send(newRecord);
//   next();
});


app.get('/products', (req, res, next) => {
  res.send(jsonData.products);
});

// app.get('/products/:id', (req, res, next) => {
//   let productss = jsonData.products;
//   let id = req.params.id;
//   jsonData.products = productss.filter((record) => record.id === parseInt(id));
//   console.log('jsonData.products)[0]', productss[0]);
//   res.json(productss[0]);
  
// });

app.put('/products/:id', (req, res, next) => {
  if (req.params.id > jsonData.products.length) {
    next();
    return;
  }
  console.log('SHOULD NOT BE HERE IF ID > 3');
  let modifiedRecord = req.body;
  modifiedRecord.id = req.params.id;
  jsonData.products[req.params.id - 1] = modifiedRecord;
  res.send(modifiedRecord);
},
notFound,
);

app.patch('/products/:id', (req, res, next) => {

  let foundRecord = jsonData.products[req.params.id - 1];
  let modifiedRecord = { ...foundRecord, ...req.body };

  jsonData.products[req.params.id - 1] = modifiedRecord;
  res.send(modifiedRecord);
});

// app.delete('/products/:id', (req, res, next) => {
//   let productss = jsonData.products;
//   jsonData.products = productss.filter((val) => {
//     if (val.id === parseInt(req.params.id)) return false;
//   });
//   res.send(jsonData.products);
// });

// ------------------------------------ //
// ============= Catogories =========== //
// ------------------------------------ //

app.post('/categories', (req, res, next) => {
  let newRecord = req.body;
  newRecord.id = jsonData.categories.length + 1;
  
  jsonData.categories.push(newRecord);
  
  //   (jsonData.categories).forEach(element => {
  //     db.push(element);
  //   });
  //   db.push(newRecord);
  
  //   console.log(db);
  
  res.status(201);
  res.send(newRecord);
  //   next();
});
  
  
app.get('/categories', (req, res, next) => {
  res.send(jsonData.categories);
});
  
// app.get('/categories/:id', (req, res, next) => {
//   let categoriess = jsonData.categories;
//   let id = req.params.id;
//   jsonData.categories = categoriess.filter((record) => record.id === parseInt(id));
//   console.log('jsonData.categories)[0]', categoriess[0]);
//   res.json(categoriess[0]);
    
// });
  
app.put('/categories/:id', (req, res, next) => {
  if (req.params.id > jsonData.categories.length) {
    next();
    return;
  }
  console.log('SHOULD NOT BE HERE IF ID > 3');
  let modifiedRecord = req.body;
  modifiedRecord.id = req.params.id;
  jsonData.categories[req.params.id - 1] = modifiedRecord;
  res.send(modifiedRecord);
},
notFound,
);
  
app.patch('/categories/:id', (req, res, next) => {
  
  let foundRecord = jsonData.categories[req.params.id - 1];
  let modifiedRecord = { ...foundRecord, ...req.body };
  
  jsonData.categories[req.params.id - 1] = modifiedRecord;
  res.send(modifiedRecord);
});
  
// app.delete('/categories/:id', (req, res, next) => {
//   let categoriess = jsonData.categories;
//   jsonData.categories = categoriess.filter((val) => {
//     if (val.id === parseInt(req.params.id)) return false;
//   });
//   res.send(jsonData.categories);
// });

app.use('*', notFound);
app.use(errorServer);

// ------------------------------------ //
// ===== Start Server (Listining) ===== //
// ------------------------------------ //

const startServer = (port) => {
  // Check if the server already running, also, if the port is valid
  // then call callback anon function when server successfully running...

  app.listen(port, () => {
    console.log(`My server is up and running on ${port}`);
  });
};

module.exports = {
  server: app,
  start: startServer,
};
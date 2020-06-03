// 'use strict';

// const express = require('express');

// // To define our server as ("app") ...
// const app = express();

// //-------------------Requires-------------------//

// let jsonData = require('../db.json');
// const timestamp = require('./middleware/timestamp.js');
// const logger = require('./middleware/logger.js');
// const notFound = require('./middleware/404.js');
// const errorServer = require('./middleware/500.js');


// // Global Middleware
// app.use(express.json());

// // Usages
// app.use(timestamp);
// app.use(logger);

// //-------------------Routing Lab's-------------------//


// app.get('/', (req, res, next) => {
//   let HTMLpage = '<div><h1>Home Page</h1>';
//   if (req.query.name)
//     HTMLpage += '<h3>Welcome ' + req.query.name + '!</h3></div>';
//   else HTMLpage += '</div>';
//   res.status(200);
//   res.send(HTMLpage);
// });

// // ------------------------------------ //
// // ============== Products ============ //
// // ------------------------------------ //

// app.post('/products', (req, res, next) => {
//   let newRecord = req.body;
//   newRecord.id = jsonData.products.length + 1;

//   jsonData.products.push(newRecord);

//   res.status(201);
//   res.send(newRecord);
// });


// app.get('/products', (req, res, next) => {
//   res.send(jsonData.products);
// });


// app.get('/products/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let productss = jsonData.products;
//   let productsId = productss.filter((record) => {
//     if (record.id == id) {
//       return record;
//     }
//   });
  
//   res.json(productsId);
// });


// app.put('/products/:id', (req, res, next) => {
//   if (req.params.id > jsonData.products.length) {
//     next();
//     return;
//   }
//   let modifiedRecord = req.body;
//   modifiedRecord.id = req.params.id;
//   jsonData.products[req.params.id - 1] = modifiedRecord;
//   res.send(modifiedRecord);
// },
// notFound,
// );

// app.patch('/products/:id', (req, res, next) => {

//   let foundRecord = jsonData.products[req.params.id - 1];
//   let modifiedRecord = { ...foundRecord, ...req.body };

//   jsonData.products[req.params.id - 1] = modifiedRecord;
//   res.send(modifiedRecord);
// });


// app.delete('/products/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let productss = jsonData.products;
//   jsonData.products = productss.filter((val) => {
//     if (val.id != id) {
//       return val;
//     }
//   });
//   res.json({});
// });

// // ------------------------------------ //
// // ============= Catogories =========== //
// // ------------------------------------ //

// app.post('/categories', (req, res, next) => {
//   let newRecord = req.body;
//   newRecord.id = jsonData.categories.length + 1;
  
//   jsonData.categories.push(newRecord);

//   res.status(201);
//   res.send(newRecord);
// });
  
  
// app.get('/categories', (req, res, next) => {
//   res.send(jsonData.categories);
// });
  
// app.get('/categories/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let categoriess = jsonData.categories;
//   let categoriesId = categoriess.filter((record) => {
//     if (record.id == id) {
//       return record;
//     }
//   });
  
//   res.json(categoriesId);
// });

  
// app.put('/categories/:id', (req, res, next) => {
//   if (req.params.id > jsonData.categories.length) {
//     next();
//     return;
//   }
//   let modifiedRecord = req.body;
//   modifiedRecord.id = req.params.id;
//   jsonData.categories[req.params.id - 1] = modifiedRecord;
//   res.send(modifiedRecord);
// },
// notFound,
// );
  
// app.patch('/categories/:id', (req, res, next) => {
  
//   let foundRecord = jsonData.categories[req.params.id - 1];
//   let modifiedRecord = { ...foundRecord, ...req.body };
  
//   jsonData.categories[req.params.id - 1] = modifiedRecord;
//   res.send(modifiedRecord);
// });
  
// app.delete('/categories/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let categoriess = jsonData.categories;
//   jsonData.categories = categoriess.filter((val) => {
//     if (val.id != id) {
//       return val;
//     }
//   });
//   res.json({});
// });

// //----------Not Found & Error-----------//

// app.use('*', notFound);
// app.use(errorServer);

// // ------------------------------------ //
// // ===== Start Server (Listining) ===== //
// // ------------------------------------ //

// const startServer = (port) => {
//   // Check if the server already running, also, if the port is valid
//   // then call callback anon function when server successfully running...

//   app.listen(port, () => {
//     console.log(`My server is up and running on ${port}`);
//   });
// };

// module.exports = {
//   server: app,
//   start: startServer,
// };


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const categorieRouter = require('../routes/categories.js');
const productRouter = require('../routes/product.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


const timestamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const notFound = require('../middleware/404.js');
const errorServer = require('../middleware/500.js');

app.use(timestamp);
app.use(logger);

app.use(categorieRouter);
app.use(productRouter);


//------------Not Found & Error------------//

app.use('*', notFound);
app.use(errorServer);

// -------Start Server (Listining)------- //

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
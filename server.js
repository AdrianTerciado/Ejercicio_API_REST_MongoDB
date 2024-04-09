const express = require('express')
const cowsay = require('cowsay')
const app = express()
const port = 3000

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

// Rutas
const providersApiRoutes = require("./routes/providers.routes");
const productsApiRoutes = require("./routes/products.routes");

app.use(express.json()); // Habilito recepción de JSON en servidor

// Rutas
//API
app.use('/api/providers', providersApiRoutes);
app.use('/api/products', productsApiRoutes);

//WEB
//app.use('/products',productsRoutes);

// Para rutas no existentes
app.use('*',error404);

app.listen(port, () => {
  console.log(
      cowsay.say({
          text: `Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`,
          e: "oO",
          T: "U "
      }))
})
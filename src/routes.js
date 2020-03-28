const express = require("express");
const routes = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#referenceObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Creating API with Rocketset.",
      version: "1.0.0",
      descritpion: "Documentação API Produtos",
      contact: {
        name: "Marcos Pedroso Motta",
        url: "https://www.linkedin.com/in/marcos-pedroso-motta-62662931/",
        email: "mrcsmotta1@gmail.com"
      },
      server: ["http://localhst:3001"]
    }
  },
  // ['./src/controllers/ProductController/*.js']
  apis: ["./src/controllers/ProductController.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const ProductController = require("./controllers/ProductController");

routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

module.exports = routes;

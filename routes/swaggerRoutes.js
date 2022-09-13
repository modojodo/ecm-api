const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
const express = require("express");
const router = express.Router();

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ECM API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

// Swagger Page
router.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

module.exports = router;

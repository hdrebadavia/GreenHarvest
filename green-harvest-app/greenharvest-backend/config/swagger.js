const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'GreenHarvest API',
        description: 'API documentation for GreenHarvest',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js']; // Add the main file where your routes are defined

swaggerAutogen(outputFile, endpointsFiles, doc);
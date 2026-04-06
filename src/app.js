const express = require('express');
const interfaceSwagger = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(express.json());

const swaggerDocumento = YAML.load('./openapi.yaml');

app.use('/api-docs', interfaceSwagger.serve, interfaceSwagger.setup(swaggerDocumento));

app.listen(3000, () => {
  console.log('http://localhost:3000/api-docs');
});
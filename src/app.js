const express = require('express');
const interfaceSwagger = require('swagger-ui-express');
const YAML = require('yamljs');

const usuarioRoutes = require('./routes/usuarioRoutes');
const certificadoRoutes = require('./routes/certificadoRoutes');
const authRoutes = require('./routes/authRoutes');
const erroMiddleware = require('./middlewares/erroMiddleware');


const app = express();
app.use(express.json());

const swaggerDocumento = YAML.load('./openapi.yaml');

app.use('/api-docs', interfaceSwagger.serve, interfaceSwagger.setup(swaggerDocumento));

app.use('/usuarios', usuarioRoutes);
app.use('/', certificadoRoutes);
app.use('/auth', authRoutes);
app.use(erroMiddleware);


app.listen(3000, () => {
  console.log('http://localhost:3000/api-docs');
});
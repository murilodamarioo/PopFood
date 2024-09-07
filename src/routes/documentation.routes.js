const { Router } = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json')

const swaggerRoutes = Router()

swaggerRoutes.use('/', swaggerUi.serve)

swaggerRoutes.get('/', swaggerUi.setup(swaggerDocument))

module.exports = swaggerRoutes
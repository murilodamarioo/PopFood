const { Router } = require('express')

const foodsRoutes = require('./foods.routes')

const routes = Router()

routes.use('/foods', foodsRoutes)

module.exports = routes
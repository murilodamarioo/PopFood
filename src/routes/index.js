const { Router } = require('express')

const swaggerRoutes = require('./documentation.routes')
const sessionsRoutes = require('./sessions.routes')
const usersRoutes = require('./users.routes')
const foodsRoutes = require('./foods.routes')

const routes = Router()

routes.use('/api-docs', swaggerRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/users', usersRoutes)
routes.use('/foods', foodsRoutes)

module.exports = routes
const { Router } = require('express')

const FoodsController = require('../controllers/FoodsController')

const foodsRoutes = Router()
const foodsController = new FoodsController()

foodsRoutes.post('/', foodsController.create)
foodsRoutes.delete('/:id', foodsController.delete)

module.exports = foodsRoutes
const { Router } = require('express')
const UsersController = require('../controllers/UsersController')

const usersRoutes = new Router()
const usersContoller = new UsersController()

usersRoutes.post('/', usersContoller.create)

module.exports = usersRoutes
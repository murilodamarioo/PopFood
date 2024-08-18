const routes = require('./routes')
const express = require('express')
const cors = require('cors')
const AppError = require('./utils/AppError')

const app = express()

// setting cors
app.use(cors())

// handle json data
app.use(express.json())

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
  accessToken: '7cbdaf7850b8462d97b1b7a16e6a2445',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const students = []
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
  rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res) => {
  let {name} = req.body;
  name = name.trim(); //removes whitespace
  
  students.push(name)
  
  rollbar.log('Student added sucessfully', {author: 'Sarah', type: 'manual entry'})  
  res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`))
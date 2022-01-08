const express = require('express')
const foldersRouter = require('./routes/folderRouter')
const itemsRouter = require('./routes/itemsRouter')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api/folders', foldersRouter)
app.use('/api/items', itemsRouter)

const PORT = 8080

const server = app.listen(PORT , () => {
    console.log(`Server ready and listening on port ${PORT}`)
})
const foldersCont = require('../files/foldersCont')
const itemsCont = require('../files/itemsCont')
const express = require("express")

const foldersRouter = express.Router()
let len = 0
const foldersTable = new foldersCont('folders')
const itemsTable = new itemsCont('items')

foldersRouter.get('/', async(req,res) => {
    try{
    const data = await foldersTable.getAll()
    res.json(data)
    }catch(err){
        console.log(err)
    }
})

foldersRouter.post('/', async(req,res) => {
    try{
        let body = {...req.body}
        await foldersTable.save(body)
        res.send('folder saved successfully')
    }catch(error){
        res.send(error)
    }
})

foldersRouter.delete('/:id', async(req,res) => {
    try{
        let {id} = req.params
        let data = await foldersTable.getAll()
        len = data.length
        if (isNaN(id) || id < 1){
            res.send('error:id out of range')
        }else{
            await foldersTable.deleteById(id)
            await itemsTable.deleteByFolId(id)
            res.send('folder and nested items deleted successfully')
        }
    }catch(err){
        console.log(err)
    }
})
module.exports = foldersRouter
const itemsCont = require('../files/itemsCont')
const express = require("express")

const itemsTable = new itemsCont('items')

const itemsRouter = express.Router()


itemsRouter.get('/:id', async(req,res) => {
    try{
        let {id} = req.params
        const data = await itemsTable.getByFolId(id)
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

itemsRouter.post('/', async(req,res) => {
    try{
        let body = {...req.body}
        await itemsTable.save(body)
        res.send('task saved successfully')
    }catch(err){
        console.log(err)
    }
})

itemsRouter.delete('/:id', async(req,res)=> {
    try{
        let {id} = req.params
        await itemsTable.deleteById(id)
        res.send('task deleted successfully')
    }catch(err){
        console.log(err)
    }
})

itemsRouter.put('/:id', async(req,res)=> {
    try{
        let {id} = req.params
        let obj = {...req.body}
        await itemsTable.updateById(id, obj)
    }catch(err){
        console.log(err)
    }
})
module.exports = itemsRouter
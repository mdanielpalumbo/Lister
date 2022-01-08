const {options} = require('../options/sqlite')
const knex = require('knex')(options)

module.exports = class itemsCont {
    constructor (tab) {
        this.table = tab
        knex.schema.hasTable(this.table).then(async exists => {
            if(!exists){
                console.log(`table ${this.table} created and ready`)
                return await knex.schema.createTable(this.table, table => {
                    table.increments('items_id').primary()
                    table.string('task')
                    table.string('folder_id')
                    table.string('checked').defaultTo('false')
                })  
            }else{
                console.log(`table ${this.table} ready`)
            }
        })
    }
    getAll = async(id) => {
        try{
            const data = await knex.from(this.table).select('*')
        }catch(err){
            console.log(err)
        }
    }
    getByFolId = async(id) => {
        try{
            const data = await knex.from(this.table).where({folder_id:id}).select('task','folder_id','items_id','checked')
            return data
        }catch(error){
            console.log(error)
        }
    }
    deleteById = async(id) => {
        await knex.from(this.table).where({items_id:id}).del()
    }
    deleteByFolId = async(id) => {
        await knex.from(this.table).where({folder_id:id}).del()
    }
    save = async(obj) => {
        try{
        await knex.from(this.table).insert(obj)
        console.log('task saved correctly')
        }catch(error){
            console.log(error)
        }
    }
    updateById = async (id, obj) => {
        try{
            await this.knex.from(this.table).where({items_id:id}).update(obj)
        }catch(error){
            console.log(error)
        }
    }
}

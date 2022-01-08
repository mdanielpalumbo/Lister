const {options} = require('../options/sqlite')
const knex = require('knex')(options)

module.exports = class foldersCont {
    constructor (tab) {
        this.table = tab
        knex.schema.hasTable(this.table).then(async exists => {
            if(!exists){
                console.log(`table ${this.table} created and ready`)
                return knex.schema.createTable(this.table, table => {
                    table.increments("folder_id").primary()
                    table.string("name")
                })  
            }else{
                console.log(`table ${this.table} ready`)
            }
        })
    }
    getAll = async() => {
        try{
            const data = await knex.select('*').from(this.table)
            return data
        }catch(error){
            console.log(error)
        }
    }
    deleteById = async(id) => {
        await knex.from('folders').where({folder_id:id}).del()
        console.log('folder deleted succesfully')
    }
    save = async(obj) => {
        try{
            await knex.from(`${this.table}`).insert(obj)
            console.log('folder saved successfully')
        }catch(error){
            console.log(error)
        }
    }
}

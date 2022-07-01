// const { default: knex } = require('knex')

const knex=require ('knex')({
    client:'mysql',
    connection:{
        host:"localhost",
        user:"root",
        database:"crud_jwt_knex",
        password:"Roshan@1",
        // database: "knex_crud"
    }
})

knex.schema.createTable('user_data',table=>{
    table.increments('id').primary(),
    table.string('name'),
    table.string('email').unique(),
    table.string('password')
})
.then(()=>{
    console.log("table created successfully")
}).catch(err=>{
    // console.log(err.message)
})

module.exports=knex
//require knex 
var knex = require('knex')({
    client: 'pg',
    connection: {
        host:'localhost',
        user:'development',
        password:'development',
        database:'test_db'
    }
})

const [, ,fname] = process.argv; 
console.log(fname); 
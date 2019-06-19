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

const [, ,fname] = process.argv; //arguments from terminal 

//read function
function namesFound(rows){
    console.log(`Found ${rows.length} person(s) by the name ${fname} `);
    for(i = 0; i < rows.length; i++){
        console.log(`-${i+1}: ${rows[i].first_name} ${rows[i].last_name}, born ${rows[i].birthdate}`)
    }
}

//query to read
knex('famous_people')
.select('id','first_name', 'last_name','birthdate')
.where('first_name', 'Paul')
.then(res => namesFound(res))
.finally(() => knex.destroy()); 
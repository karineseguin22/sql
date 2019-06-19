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

const [, ,action, fname, lname, bdate] = process.argv; //arguments from terminal 

//read function
function namesFound(rows){
    console.log(`Found ${rows.length} person(s) by the name ${fname} `);
    for(i = 0; i < rows.length; i++){
        console.log(`-${i+1}: ${rows[i].first_name} ${rows[i].last_name}, born ${rows[i].birthdate}`)
    }
}

//query to read
switch(action){
    case 'read':
    knex('famous_people')
.select('first_name', 'last_name','birthdate')
.where('first_name', fname)
.then(res => namesFound(res))
.finally(() => knex.destroy()); 
break;
case 'add': 
    knex('famous_people')
.insert({first_name: fname ,last_name: lname, birthdate:bdate})
.then(res => {
    console.log('Added one new entry')
    knex('famous_people')
    .then(namesFound)
})
.finally(() => knex.destroy()); 
}

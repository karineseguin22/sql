const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//obtain data from terminal 
const [, ,fname] = process.argv 


const userquery = {
    text: 'SELECT * FROM famous_people WHERE first_name = $1',
    values: [fname]
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(userquery, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    //create a loop to return results into a string
    console.log(`Found ${(result.rows).length} by the name ${fname} `);
    for (i = 0; i < (result.rows).length; i++){
        console.log(`-${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate}`)
    }
    //console.log((result.rows).length); //output: 1
    client.end();
  });
});
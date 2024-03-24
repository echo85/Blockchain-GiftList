const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline')

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  inquirer.question("What is your name ? ",async(name)  => {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      name: name
    });
  
    console.log({ gift });
    inquirer.close();
  });
  
  
  
}

main();
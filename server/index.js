const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '8966fcf0ddb1e885d08dab7e4cbb31edc656ee402d419086066abc0745443164';
// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  // TODO: prove that a name is in the list 
  const index = niceList.findIndex(n => n === body.name);
  const proof = merkleTree.getProof(index);
  const isInTheList = verifyProof(proof, body.name, MERKLE_ROOT)
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

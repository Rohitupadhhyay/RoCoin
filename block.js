const { genesis_data } = require("./genesis");
const cryptohash = require("./crypto-hash");
class Block {
  constructor({ timestamp, prevHash, hash, transaction }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = transaction;
  }
  static genesis() {
    return new this(genesis_data);
  }
  static mineBlock({ prevBlock, data }) {
    const timestamp = Date.now();
    const prevHash = prevBlock.hash;
    return new this({
      timestamp: timestamp,
      prevHash: prevHash,
      transaction: data,
      hash: cryptohash(timestamp, prevHash, data),
    });
  }
}

const block1 = new Block({
  prevHash: "0xabc",
  hash: "0xc12",
  transaction: "hello",
  timestamp: "02/10/2024",
});

module.exports = Block;

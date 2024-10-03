const hextobinary = require("hex-to-binary");
const { genesis_data } = require("./genesis");
const { MINE_RATE } = require("./genesis");
const cryptohash = require("./crypto-hash");
class Block {
  constructor({ timestamp, prevHash, hash, transaction, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = transaction;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(genesis_data);
  }
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;

    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalblock: prevBlock,
        timestamp,
      });
      hash = cryptohash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      hextobinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );
    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static adjustDifficulty(originalBlock, timestamp) {
    const { difficulty } = originalBlock;

    const difference = timestamp - originalBlock.timestamp;

    if (difficulty < 1) return 1;

    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

const block1 = new Block({
  prevHash: "0xabc",
  hash: "0xc12",
  data: "hello",
  timestamp: "02/10/2024",
});

module.exports = Block;

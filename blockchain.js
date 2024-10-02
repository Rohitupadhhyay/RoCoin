const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain <= this.chain.length) {
      console.error("The incoming chain is not longer");
      return;
    }
    if (!BlockChain.isValidate(chain)) {
      console.error("The incoming chain is not valid");
      return;
    }
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, data } = chain[i];
      const realLastHash = chain[i - 1].hash;
      if (prevHash !== realLastHash) return false;

      const validatedhash = cryptoHash(timestamp, prevHash, data);
      if (hash !== validatedhash) return false;
    }
    return true;
  }
}

const blockChain = new BlockChain();
blockChain.addBlock({ data: "block1" });
console.log(blockChain);
const result = BlockChain.isValidChain(blockChain.chain);
console.log(result);

module.exports = BlockChain;

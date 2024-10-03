const INITIAL_DIFFICULTY = 2;
const MINE_RATE = 1000;
const genesis_data = {
  timestamp: 1,
  prevHash: "0x000",
  hash: "0x123",
  transaction: "hello",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
};
module.exports = { genesis_data, MINE_RATE };

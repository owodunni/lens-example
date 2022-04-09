const Web3 = require("web3");
const {ethscan} = require("@owodunni/ethscan");
exports.Contract = (RPC_NODE, API_KEY) => {
  const api = ethscan.API(API_KEY)
  const web3 = new Web3(RPC_NODE);
  return {
    web3: web3,
    create: async (address) => {
      const abi = await api.getAbi(address);
      return new web3.eth.Contract(abi, address);
    },
  };
};

#!/usr/bin/env node
require("dotenv").config();
const {lens} = require("./lensContracts")
const {ethers, Wallet} = require("ethers");

function exitError(error) {
    console.error(error);
    process.exit(1);
}

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

console.log(rpcUrl);

async function main() {
    const provider = new ethers.providers.WebSocketProvider(rpcUrl)
    console.log(await provider.getBlockNumber())
    const signer = new Wallet(privateKey, provider);
    console.log(signer.address);

    const mockProfile = new ethers.Contract(lens.MockProfileCreationProxy.address, lens.MockProfileCreationProxy.abi, signer);

    const address = signer.address;
    const MOCK_URI = 'https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR';
    const MOCK_FOLLOW_NFT_URI =
        'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan'


        // For some reason followModuleInitData is undefined when it comes to encoding it in ethers.
        // Follow the contract creation code and we should be able to find out why that is.
    const txHash = await mockProfile.proxyCreateProfile({
        to: address,
        handle: "owodunni",
        imageURI: MOCK_URI,
        followModule: "0x0000000000000000000000000000000000000000",
        followModuleInitData: [],
        followNFTURI: MOCK_FOLLOW_NFT_URI,
    });
    console.log(txHash);
}

main().then(() => process.exit(0)).catch(exitError);

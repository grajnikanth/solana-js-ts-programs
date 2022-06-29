"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const mintNewToken = (mintWallet) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    const tokenAddress = yield (0, spl_token_1.createMint)(connection, mintWallet, // payer of transaction
    mintWallet.publicKey, // address which can mint tokens of this type
    null, 8);
    return tokenAddress;
});
const transferTokens = (tokenAddress, mintWallet, toAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    // Create a token account for mintWallet
    const tokenAccountMintWallet = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, mintWallet, tokenAddress, // Minting token address for which this account will be used
    mintWallet.publicKey // owner of account - the account will be associated with this public key
    );
    // Mint new 100 tokens for token account created above
    yield (0, spl_token_1.mintTo)(connection, mintWallet, // fee payer for this transaction
    tokenAddress, // Token for which the new tokens are being created
    tokenAccountMintWallet.address, // destination account
    mintWallet, // account which was set to be mintAuthority when createMint function was called
    100);
    let tokenAccount_1 = yield (0, spl_token_1.getAccount)(connection, tokenAccountMintWallet.address);
    console.log(`Token Account belonging to MintWallet is as follows`);
    console.log(`tokenAccount_1.address is  ${tokenAccount_1.address} `);
    console.log(`Token balance after transfer is ${tokenAccount_1.amount}`);
    console.log(`tokenAccount_1.mint = ${tokenAccount_1.mint}`);
    console.log(`tokenAccount_1.owner = ${tokenAccount_1.owner}`);
    // create a token account for toAddress to receive new minted tokens
    const tokenAccountReceiver = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, mintWallet, tokenAddress, // Minting token address for which this account will be used
    toAddress // owner of account - the account will be associated with this public key
    );
    yield (0, spl_token_1.transfer)(connection, mintWallet, tokenAccountMintWallet.address, tokenAccountReceiver.address, mintWallet, 10);
    tokenAccount_1 = yield (0, spl_token_1.getAccount)(connection, tokenAccountMintWallet.address);
    console.log(`tokenAccount_1.balance after transfer is ${tokenAccount_1.amount}`);
    let tokenAccount_2 = yield (0, spl_token_1.getAccount)(connection, tokenAccountReceiver.address);
    console.log(`Token Account belonging to Receiver information is as follows`);
    console.log(`tokenAccount_2.address is ${tokenAccount_2.address}`);
    console.log(`Token balance after transfer is ${tokenAccount_2.amount}`);
    console.log(`tokenAccount_2.mint = ${tokenAccount_2.mint}`);
    console.log(`tokenAccount_2.owner = ${tokenAccount_2.owner}`);
});
// main function of this code
(() => __awaiter(void 0, void 0, void 0, function* () {
    // id2 wallet keypair
    // public Key for this is F2qkX2sbRevyqJnewwHFbMsdM3NU25WSPfaSAK1M66bq
    const secret = Uint8Array.from([85, 89, 126, 84, 179, 86, 67, 158, 239, 60, 198, 13, 19, 48, 81, 216, 189, 165, 10, 82, 225, 220, 53, 159, 33, 81, 29, 129, 112, 42, 101, 177, 208, 124, 81, 230, 166, 183, 89, 200, 103, 160, 90, 64, 138, 100, 126, 144, 19, 193, 186, 53, 87, 125, 251, 117, 43, 97, 201, 154, 229, 178, 203, 160]);
    const mintWallet = web3_js_1.Keypair.fromSecretKey(secret);
    yield (0, airdrop_1.airdrop)(mintWallet.publicKey, 2);
    const tokenAddress = yield mintNewToken(mintWallet);
    console.log(`The newly minted token address is ${tokenAddress}`);
    yield transferTokens(tokenAddress, mintWallet, new web3_js_1.PublicKey("6rwUaidSXkZMza4s2yx2wp4gDiHBfKZ2c9LqJXHTw91d"));
}))();
//# sourceMappingURL=index.js.map
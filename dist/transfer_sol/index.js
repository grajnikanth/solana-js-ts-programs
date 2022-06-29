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
exports.transferSol = void 0;
const web3_js_1 = require("@solana/web3.js");
const airdrop_1 = require("../airdrop");
const show_balance_1 = require("../show_balance");
const transferSol = (fromKeypair, toAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = new web3_js_1.Connection("http://localhost:8899", "confirmed");
    const transaction = new web3_js_1.Transaction();
    const instruction = web3_js_1.SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toAddress,
        lamports: web3_js_1.LAMPORTS_PER_SOL * amount
    });
    transaction.add(instruction);
    yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [fromKeypair]);
    console.log("Transaction sent and confirmed");
});
exports.transferSol = transferSol;
// id2 wallet keypair
// public Key for this is F2qkX2sbRevyqJnewwHFbMsdM3NU25WSPfaSAK1M66bq
const secret = Uint8Array.from([85, 89, 126, 84, 179, 86, 67, 158, 239, 60, 198, 13, 19, 48, 81, 216, 189, 165, 10, 82, 225, 220, 53, 159, 33, 81, 29, 129, 112, 42, 101, 177, 208, 124, 81, 230, 166, 183, 89, 200, 103, 160, 90, 64, 138, 100, 126, 144, 19, 193, 186, 53, 87, 125, 251, 117, 43, 97, 201, 154, 229, 178, 203, 160]);
const fromKeypair = web3_js_1.Keypair.fromSecretKey(secret);
const toAddress = new web3_js_1.PublicKey("6rwUaidSXkZMza4s2yx2wp4gDiHBfKZ2c9LqJXHTw91d");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, airdrop_1.airdrop)(fromKeypair.publicKey, 5);
    yield (0, show_balance_1.showBalance)(fromKeypair.publicKey);
    yield (0, show_balance_1.showBalance)(toAddress);
    yield (0, exports.transferSol)(fromKeypair, toAddress, 3);
    yield (0, show_balance_1.showBalance)(fromKeypair.publicKey);
    yield (0, show_balance_1.showBalance)(toAddress);
}))();
//# sourceMappingURL=index.js.map
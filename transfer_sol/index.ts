import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

import { airdrop } from "../airdrop";
import { showBalance} from "../show_balance";

export const transferSol = async (fromKeypair: Keypair, toAddress: PublicKey, amount: number) => {

    const connection = new Connection("http://localhost:8899", "confirmed");
    const transaction = new Transaction();
    const instruction = SystemProgram.transfer(
        {
            fromPubkey: fromKeypair.publicKey,
            toPubkey: toAddress,
            lamports: LAMPORTS_PER_SOL*amount
        }
    );

    transaction.add(instruction);
    await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
    console.log("Transaction sent and confirmed");

}

// id2 wallet keypair
// public Key for this is F2qkX2sbRevyqJnewwHFbMsdM3NU25WSPfaSAK1M66bq
const secret = Uint8Array.from([85,89,126,84,179,86,67,158,239,60,198,13,19,48,81,216,189,165,10,82,225,220,53,159,33,81,29,129,112,42,101,177,208,124,81,230,166,183,89,200,103,160,90,64,138,100,126,144,19,193,186,53,87,125,251,117,43,97,201,154,229,178,203,160]);
const fromKeypair = Keypair.fromSecretKey(secret);

const toAddress = new PublicKey("6rwUaidSXkZMza4s2yx2wp4gDiHBfKZ2c9LqJXHTw91d");

(async() => {
    await airdrop(fromKeypair.publicKey, 5);
    await showBalance(fromKeypair.publicKey);
    await showBalance(toAddress);

    await transferSol(fromKeypair, toAddress, 3);

    await showBalance(fromKeypair.publicKey);
    await showBalance(toAddress);

})();





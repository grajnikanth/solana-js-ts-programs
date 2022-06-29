
import { createMint, getAccount, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';
import {Connection, Keypair, PublicKey} from '@solana/web3.js';


import { airdrop } from '../airdrop';

const mintNewToken = async (mintWallet: Keypair) => {

    const connection = new Connection("http://localhost:8899", "confirmed");
    const tokenAddress = await createMint(
        connection,
        mintWallet, // payer of transaction
        mintWallet.publicKey, // address which can mint tokens of this type
        null,
        8
    );
    return tokenAddress;
}


const transferTokens = async(tokenAddress: PublicKey, mintWallet: Keypair, toAddress: PublicKey) => {
    const connection = new Connection("http://localhost:8899", "confirmed");

    // Create a token account for mintWallet
    const tokenAccountMintWallet = await getOrCreateAssociatedTokenAccount(
        connection,
        mintWallet,
        tokenAddress, // Minting token address for which this account will be used
        mintWallet.publicKey // owner of account - the account will be associated with this public key
    );

    // Mint new 100 tokens for token account created above
    await mintTo(
        connection,
        mintWallet, // fee payer for this transaction
        tokenAddress, // Token for which the new tokens are being created
        tokenAccountMintWallet.address, // destination account
        mintWallet, // account which was set to be mintAuthority when createMint function was called
        100
    );

    let tokenAccount_1 = await getAccount(connection, tokenAccountMintWallet.address);
    console.log(`Token Account belonging to MintWallet is as follows`);
    console.log(`tokenAccount_1.address is  ${tokenAccount_1.address} `);
    console.log(`Token balance after transfer is ${tokenAccount_1.amount}`);
    console.log(`tokenAccount_1.mint = ${tokenAccount_1.mint}`);
    console.log(`tokenAccount_1.owner = ${tokenAccount_1.owner}`);

    // create a token account for toAddress to receive new minted tokens
    const tokenAccountReceiver = await getOrCreateAssociatedTokenAccount(
        connection,
        mintWallet,
        tokenAddress, // Minting token address for which this account will be used
        toAddress // owner of account - the account will be associated with this public key
    );

    await transfer(
        connection, 
        mintWallet, 
        tokenAccountMintWallet.address,
        tokenAccountReceiver.address,
        mintWallet,
        10
    );

    tokenAccount_1 = await getAccount(connection, tokenAccountMintWallet.address);
    console.log(`tokenAccount_1.balance after transfer is ${tokenAccount_1.amount}`);

    let tokenAccount_2 = await getAccount(connection, tokenAccountReceiver.address);
    console.log(`Token Account belonging to Receiver information is as follows`);
    console.log(`tokenAccount_2.address is ${tokenAccount_2.address}`);
    console.log(`Token balance after transfer is ${tokenAccount_2.amount}`);
    console.log(`tokenAccount_2.mint = ${tokenAccount_2.mint}`);
    console.log(`tokenAccount_2.owner = ${tokenAccount_2.owner}`);
}


// main function of this code
(async() => {

    // id2 wallet keypair
    // public Key for this is F2qkX2sbRevyqJnewwHFbMsdM3NU25WSPfaSAK1M66bq
    const secret = Uint8Array.from([85,89,126,84,179,86,67,158,239,60,198,13,19,48,81,216,189,165,10,82,225,220,53,159,33,81,29,129,112,42,101,177,208,124,81,230,166,183,89,200,103,160,90,64,138,100,126,144,19,193,186,53,87,125,251,117,43,97,201,154,229,178,203,160]);
    const mintWallet = Keypair.fromSecretKey(secret);

    await airdrop(mintWallet.publicKey, 2);
    const tokenAddress = await mintNewToken(mintWallet);
    console.log(`The newly minted token address is ${tokenAddress}`);
    await transferTokens(tokenAddress, mintWallet, new PublicKey("6rwUaidSXkZMza4s2yx2wp4gDiHBfKZ2c9LqJXHTw91d"));


})()
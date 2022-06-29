import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const showBalance = async (address: PublicKey) => {

    const connection = new Connection("http://localhost:8899", "confirmed");
    const accountInfo = await connection.getAccountInfo(address);

    console.log(`The balance of address ${address} is ${accountInfo.lamports/LAMPORTS_PER_SOL}`);

}

// showBalance(new PublicKey("6rwUaidSXkZMza4s2yx2wp4gDiHBfKZ2c9LqJXHTw91d"));
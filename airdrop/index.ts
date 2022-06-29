import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const airdrop = async(address: PublicKey, amount: number) => {

        const connection = new Connection("http://localhost:8899", "confirmed");
        const signature = await connection.requestAirdrop(address, amount*LAMPORTS_PER_SOL);

        await connection.confirmTransaction(signature);
}

// airdrop(new PublicKey("6rwUaidSXkZMza4s2yx2wp4gDiHBfKZ2c9LqJXHTw91d"), 4);
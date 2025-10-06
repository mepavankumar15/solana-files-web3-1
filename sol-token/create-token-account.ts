import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {Connection , PublicKey , clusterApiUrl} from "@solana/web3.js";

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`Loaded our keypair securely, using .env file ${user.publicKey.toBase58()}`);

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("2N5zgUQR2T6svk4ZPAKe6hgqn34j1Vzskw3KmjSf2VxK");

// Here we are making an associated token account for our own address, but we can
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient,
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink("address" , tokenAccount.address.toBase58(), "devnet");

console.log(`Created token Account : ${link}`);
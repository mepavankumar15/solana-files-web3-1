import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import {Connection , PublicKey , clusterApiUrl} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

const user  = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey("2N5zgUQR2T6svk4ZPAKe6hgqn34j1Vzskw3KmjSf2VxK");

const recipient = new PublicKey("YOUR_RECIPEINT_HERE");

const MINOR_UNITs_PER_MAJOR_UNITS = Math.pow(10,2);

console.log(`Attempting to send 1 token to ${recipient.toBase58()}...`);


const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    user.publicKey,
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
);

const signature = await transfer(
    connection,
    user,
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    user,
    1 * MINOR_UNITs_PER_MAJOR_UNITS,
);

const explorerLink = getExplorerLink("transaction" , signature ,"devnet");

console.log("transaction Confirmed" , explorerLink);
import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
    Connection,
    PublicKey, clusterApiUrl
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITs_PER_MAJOR_UNITS = Math.pow(10,2);

const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey("2N5zgUQR2T6svk4ZPAKe6hgqn34j1Vzskw3KmjSf2VxK");

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
    "Your_recipient_address"
);

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    10 * MINOR_UNITs_PER_MAJOR_UNITS,
);

const link = getExplorerLink("transaction" , transactionSignature ,"devnet");

console.log(`Successful! Mint Token Transaction: ${link}`);
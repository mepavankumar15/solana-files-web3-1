import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers";

import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

// used for creating the metadata for the token which is created
import {createCreateMetadataAccountV3Instruction} from "@metaplex-foundation/mpl-token-metadata";

const user = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log(`
    We've loaded the keypair , using .env file ${user.publicKey.toBase58()}
    `);

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

// substitute in your token mint account
const tokenMintAccount = new PublicKey("2N5zgUQR2T6svk4ZPAKe6hgqn34j1Vzskw3KmjSf2VxK");

const metadataData = {
    name: "Solana avyu Token",
    symbol: "AVYU",
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
};

const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer(),
],
TOKEN_METADATA_PROGRAM_ID
);

const metadataPDA = metadataPDAAndBump[0];

const transaction = new Transaction();

const createCreateMetadataAccountInstruction = 
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDA,
            mint : tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey,
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true,
            },
        },
    );
    transaction.add(createCreateMetadataAccountInstruction);

const transactionSignature = await sendAndConfirmTransaction(
        connection ,transaction ,[user],
    );

const transactionLink = getExplorerLink("transaction" , transactionSignature ,"devnet");

console.log(`the Transaction is confirmed . explorer link is ${transactionLink}`);

const tokenMintLink = getExplorerLink("address" , tokenMintAccount.toString(), "devnet");


console.log(`✅ Look at the token mint again: ${tokenMintLink}`);
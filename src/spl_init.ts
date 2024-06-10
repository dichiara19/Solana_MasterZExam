const { Connection, Keypair } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

(async () => {
  const secret = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json').toString()));
  const keypair = Keypair.fromSecretKey(secret);

  const token = await Token.createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    9, // Number of decimal places for the token
    TOKEN_PROGRAM_ID,
  );

  console.log(`Token Mint: ${token.publicKey.toBase58()}`);
})();
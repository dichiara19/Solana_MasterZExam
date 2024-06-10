const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

(async () => {
  const secret = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json').toString()));
  const keypair = Keypair.fromSecretKey(secret);

  const mintAddress = new PublicKey('YOUR_TOKEN_MINT_ADDRESS');
  const token = new Token(connection, mintAddress, TOKEN_PROGRAM_ID, keypair);

  const myTokenAccount = await token.getOrCreateAssociatedAccountInfo(keypair.publicKey);

  await token.mintTo(
    myTokenAccount.address,
    keypair.publicKey,
    [],
    1000000000, // Number of tokens to mint (in smallest unit, e.g., if decimals=9, this means 1 token)
  );

  console.log(`Minted tokens to: ${myTokenAccount.address.toBase58()}`);
})();
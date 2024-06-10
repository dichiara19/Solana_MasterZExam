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
  const recipientKeypair = Keypair.generate();
  const recipientTokenAccount = await token.getOrCreateAssociatedAccountInfo(recipientKeypair.publicKey);

  await token.transfer(
    myTokenAccount.address,
    recipientTokenAccount.address,
    keypair.publicKey,
    [],
    500000000, // Number of tokens to transfer (in smallest unit)
  );

  console.log(`Transferred tokens to: ${recipientTokenAccount.address.toBase58()}`);
  console.log(`Recipient public key: ${recipientKeypair.publicKey.toBase58()}`);
})();
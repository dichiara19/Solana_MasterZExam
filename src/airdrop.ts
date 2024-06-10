const { Connection, LAMPORTS_PER_SOL, Keypair } = require('@solana/web3.js');
const fs = require('fs');

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

(async () => {
  const secret = Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json').toString()));
  const keypair = Keypair.fromSecretKey(secret);

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
  );

  await connection.confirmTransaction(airdropSignature);
  console.log(`Airdrop completed. Balance: ${(await connection.getBalance(keypair.publicKey)) / LAMPORTS_PER_SOL} SOL`);
})();
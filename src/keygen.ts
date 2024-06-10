const { Keypair } = require('@solana/web3.js');
const fs = require('fs');

(async () => {
  const keypair = Keypair.generate();
  const secret = JSON.stringify(Array.from(keypair.secretKey));

  fs.writeFileSync('wallet.json', secret);
  console.log(`Wallet public key: ${keypair.publicKey.toBase58()}`);
})();
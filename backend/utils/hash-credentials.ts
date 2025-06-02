import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

// Read the serviceAccount.json file
const serviceAccountPath = path.join(__dirname, '../serviceAccount.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Create a hash of the entire contents
const hash = crypto.createHash('sha256').update(JSON.stringify(serviceAccount)).digest('hex');

// Create a base64 encoded version of the entire JSON
const base64Encoded = Buffer.from(JSON.stringify(serviceAccount)).toString('base64');

console.log('Hashed credentials:');
console.log('SHA256 Hash:', hash);
console.log('\nBase64 Encoded JSON:');
console.log(base64Encoded);

// Save the hashed version to a file (optional)
const outputPath = path.join(__dirname, '../hashed-credentials.json');
fs.writeFileSync(outputPath, JSON.stringify({
  hash,
  base64Encoded,
  timestamp: new Date().toISOString()
}, null, 2));

console.log('\nHashed credentials saved to:', outputPath); 
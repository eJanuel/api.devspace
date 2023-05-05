const fs = require('fs-extra');

const srcDir = 'src/templates';
const destDir = 'dist/src/templates';

fs.copy(srcDir, destDir)
  .then(() => console.log('Templates folder copied successfully!'))
  .catch(err => console.error('Error copying templates folder:', err));
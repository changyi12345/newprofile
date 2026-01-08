// Netlify Build Plugin to force npm instead of Yarn
module.exports = {
  onPreBuild: async ({ utils }) => {
    // Delete yarn.lock if it exists
    try {
      const fs = require('fs');
      if (fs.existsSync('yarn.lock')) {
        console.log('Deleting yarn.lock to force npm usage...');
        fs.unlinkSync('yarn.lock');
      }
    } catch (error) {
      console.log('No yarn.lock found or error deleting:', error.message);
    }

    // Verify Node version
    const nodeVersion = process.version;
    console.log(`Current Node version: ${nodeVersion}`);
    
    if (!nodeVersion.startsWith('v20')) {
      console.warn(`Warning: Node version is ${nodeVersion}, expected v20.x`);
    }
  }
};


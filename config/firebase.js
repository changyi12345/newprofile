const admin = require('firebase-admin');
require('dotenv').config();

// Use environment variables for credentials
// The private key might contain \n characters which need to be parsed correctly
const privateKey = process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
    : undefined;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "portfolio-d9b1a.firebasestorage.app"
    });
    console.log("Firebase Admin Initialized");
} else {
    console.warn("Firebase Admin credentials missing. File uploads will fail.");
    // Initialize with default application default credentials if available (e.g. on Google Cloud)
    // or just leave it uninitialized and let it crash on upload attempts
}

const bucket = admin.apps.length ? admin.storage().bucket() : null;

module.exports = { bucket };

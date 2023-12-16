const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
const serviceAccount = require('./checkyourself');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'checkyourself'
});

// Define the user ID and custom claims
const userId = '';
const customClaims = {
  role: {
    songUploader: true,
    profileUploader: true,
    imageUploader: true,
    videoUploader: true
  },
};

// Set custom user claims
admin.auth().setCustomUserClaims(userId, customClaims)
  .then(() => {
    console.log('Custom claims set for user', userId);
  })
  .catch((error) => {
    console.error('Error setting custom claims', error);
  });

import app from 'firebase/firebase-app';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

try {
  app.initializeApp(config);
} catch (err) {
  console.log('firebase was initialized');
}

export default app;

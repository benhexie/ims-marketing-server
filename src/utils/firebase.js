require("dotenv").config({ path: `${__dirname}/../../.env` })
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { randomBytes } = require("crypto");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ims-marketing.firebaseapp.com",
  projectId: "ims-marketing",
  storageBucket: "ims-marketing.appspot.com",
  messagingSenderId: "561174958262",
  appId: "1:561174958262:web:57c462b3047f9294509617",
  storageBucket: "gs://ims-marketing.appspot.com",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const storeImage = async (buffer, ext) => {
  const imagePath = `images/${randomBytes(16).toString("hex")}.${ext}`;
  const imagesRef = ref(storage, imagePath);

  try {
    const snapshot = await uploadBytes(imagesRef, buffer);
    return await getImage(snapshot.metadata.fullPath);
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const getImage = async (path) => {
  const imageRef = ref(storage, path);
  try {
    return await getDownloadURL(imageRef);
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

module.exports = { storeImage };

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult, UserCredential } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX6yDFKifYdVdEY7bs1wz4lyztTnVepnk",
  authDomain: "wantouch-project-175c8.firebaseapp.com",
  projectId: "wantouch-project-175c8",
  storageBucket: "wantouch-project-175c8.appspot.com",
  messagingSenderId: "560933273193",
  appId: "1:560933273193:web:caa71e96ec9da890012cf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

const handleGoogleLogin = async (successCallback: { (result: UserCredential): void }) => {
    try {
        const result = await signInWithPopup(auth, provider);
        successCallback(result)
    } catch (error) {
    }
}

async function uploadImage(file: File): Promise<string | null> {
  if (!file) {
    console.error("No file selected!");
    return null;
  }

  // ストレージ参照を作成
  const storageRef = ref(storage, `images/${file.name}`); // `images/` フォルダに保存

  try {
    // ファイルをアップロード
    await uploadBytes(storageRef, file);

    // アップロード後に URL を取得
    const downloadURL = await getDownloadURL(storageRef);
    console.log("File available at:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
}

export { handleGoogleLogin,uploadImage }
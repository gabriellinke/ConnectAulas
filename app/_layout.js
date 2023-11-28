import { Stack } from "expo-router";
import * as Colors from '../src/styles/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FirebaseAppProvider,
  AuthProvider,
  StorageProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const FirebaseProviders = ({ children }) => {
  const firebaseApp = useFirebaseApp();

  const authProvider = firebaseApp.container.getProvider("auth");
  let auth;

  if (authProvider.isInitialized()) {
    auth = authProvider.getImmediate();
  } else {
    auth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
  
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          {children}
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProviders>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.PURPLE
            },
            headerTintColor: Colors.TEXT_IN_PURPLE_BASE,
            headerShadowVisible: false,
            title: ''
          }}
        />
      </FirebaseProviders>
    </FirebaseAppProvider>
  );
};
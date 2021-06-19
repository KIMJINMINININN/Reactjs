import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyByKrylQNF_lSh9riixHHgKeaAYx7mvOqg",
    authDomain: "nwitter-eb497.firebaseapp.com",
    projectId: "nwitter-eb497",
    storageBucket: "nwitter-eb497.appspot.com",
    messagingSenderId: "10002558314",
    appId: "1:10002558314:web:fdcac1e7e42852b7fa8913"
  };

firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();

//env를 사용할때에 REACT_APP을 붙여주지 않으면 정상적으로 동작하지 않을거야.
//key를 .env로 포함하지 않는 이유는, key값을 포함한 나의 private 값들이 다른사람들에게 open 되지 않게 하기 위함(하지만 open 될수밖에 없다^^;;) -> github을 위함
//** create-react-app은 key값을 결국에는 open할수 밖에없다

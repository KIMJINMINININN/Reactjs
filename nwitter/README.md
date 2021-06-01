# twitter clone coding

## react 환경 설정

1. npx create-react-app nwiiter
2. 설치후 app.js에 app() 부분에 <div></div>만 남겼고 css, svg 같은것은 삭제
3. index.js에는

```
<script>
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './firebase.js'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
</script>
```

이러한형식으로 만들어준다 4. src에는 결국 App.js, firebase.js, index.js만 남김

## firebase 환경설정

1. web 형태의 firebase를 만들고 난후. (not hosting)
2. add firebase sdk부분이 나타나는데, web sdk api를 들어가보면, npm을 사용하여서 설치하는 방법이 나타난다.
   2.1 npm install --save firebase
   2.2 firebase.js에 import firebase from "firebase/app" 추가
3. firebaseConfig의 내용을 firebase.js에 넣고,
   export default firebase.initializeApp(firebaseConfig) 까지 추가
4. 키값은 github에 올라가지 않게 하기 위해 .env에 따로 적어주고, REACT_APP을 붙여주어서 이름을 만들어주어야한다.

## react 폴더 구성

src

- components
  App.js
  Router.js
- routes
  Auth.js
  EditProfile.js
  Home.js
  Profile.js

### router

router 설치
npm install react-router-dom

### 2.0 Using Firebase Auth

1. jsconfig.json을 사용함으로써 (.)을 하나하나 사용하지않고 들어갈수있다.
2. export const authService = firebase.auth();를 fbase에 넣어주어서 export해주면
   firebase의 auth를 할때마다 계속 호출해야하는것을 한번호출해서 export 시켜서 import하여서 사용할수있다.
3. authService.currentUser -> firebase의 메서드를 호출하여서 사용하는것. currentUser라는 메소드는 현재의 user를 불러오는 메소드이다.

### 2.3 Creating Account

두가지를 가지고 사용자를 만들수있었다.
authService.createUserWithEmailAndPassword
authService.signInWithEmailAndPassword

### 2.4

1. useEffect -> react의 Hook

2. authService.onAuthStateChanged -> firebase의 로그인에 대한 Listener를 등록 하여서
   변경될때 마다 동작하게 되는것

### 2.5

1. provider = new firebaseInstance.auth.GoogleAuthProvider();
   provider = new firebaseInstance.auth.GithubAuthProvider();
   위의 방법들로 인해서 구글과 Github에 인증 요청을 할수있게 되었음

2. await authService.signInWithPopup(provider)
   authService.signInWithPopup으로 인해서 인증을 요청할 팝업을 띄우게되고
   또한 구글과 깃헙과 연동시켜서 정상적으로 로그인을 할수있게 만들어줌

### 2.6

1. <Redirect from="*" to="/" />
   react-router-dom의 Redirect를 사용할수있다.

2. authService.signOut()
   로그아웃 하는 firebase의 방법

const path = require('path');
//경로 쉽게 조작하는 node

module.exports = {
    name: 'wordrealy-setting',
    mode: 'development', // 실서비스 : production
    devtotol: 'eval',
    //옵션(관련된 확장자 찾아서 넣어주기)
    resolve: {
        extensions: ['.js', '.jsx']
    },

    //*
    //입력
    entry:{
        app: ['./client'],
    },
    //출력
    output:{
        //현재 폴더 경로에 'dist'를 추가해준다.
        // __dirname: 현재폴더
        path: path.join(__dirname, 'dist',),
        fileName: 'app.js'
    }
};
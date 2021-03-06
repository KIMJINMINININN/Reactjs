const path = require('path');
const webpack  = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//경로 쉽게 조작하는 node

module.exports = {
    name: 'wordrealy-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval',
    //옵션(관련된 확장자 찾아서 넣어주기)
    resolve: {
        extensions: ['.js', '.jsx']
    },

    //*
    //입력
    entry:{
        app: ['./client'],
    },
    //entry에있는 파일에 module을 적용해서 아래의 설정들을 설정해서 output으로 출력하게 만든다.
    module: {
        //
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                //plugin들의 모임을 preset이라고 부른다
                //원하는 브라우저에 맞춰서 사용하는 방법
                
                // presets: ['@babel/preset-env', '@babel/preset-react'],
                presets: [['@babel/preset-env', {
                    targets:{
                        // browsers:['> 1% in KR'], //browserslist 
                        //https://github.com/browserslist/browserslist/blob/main/README.md 참고
                        //'last 2 chrome versions'
                        browserslist: [
                            "defaults",
                            "not IE 11",
                            "maintained node versions"
                          ]
                    },
                    debug: true,
                }], '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ]
            },
        }],
    },
    //확장 프로그램의 느낌
    plugins:[
        // new webpack.LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin()
    ],
    //출력
    output:{
        //현재 폴더 경로에 'dist'를 추가해준다.
        // __dirname: 현재폴더
        path: path.join(__dirname, 'dist',),
        filename: 'app.js',
        publicPath: '/dist/',
    },
    devServer: {
        //webpack Server에 가상경로  
        publicPath: '/dist/',
        //변경이 됬는지 안됬는지 인식할수 있는 Option( 기존 데이터 유지하면서 Reloading을 하는지 안하는지***)
        hot: true,
        //server의 포트 번호 설정 
        port: 3000
    }
};
## Next의 기능중 API KEY 숨겨주기

next.config.js에 설정을 해주어 redirect를 하게 만들면
API KEY를 나타내지않아도 숨길수있게된다.

## getServerSideProps


이함수를 사용하기전까지는 사전에 생성되는 함수에는 어느 loading같은것만 나타날뿐
다른 html이 나타나지 않았다.
이코드를 생성하고나니 html이 source로 나타나게 되었다.
이것은 api에서 데이터를 다 받아온뒤(React 코드가 실행이 끝난뒤) 화면을 나타내어 주는것이라고 볼수있다.

fecth, 데이터베이스 요청, API 불러오기, API key 사용하기등을 이곳에서 사용수있다.

백앤드에서 코드를 구현한다고 생각하면 되고,
export를 꼭 붙여주어야한다

```
export function getServerSideProps(){

}
```

## DynamicURL
Next.js는 pages안에다가 파일을 넣어주면 url이 된다.(Framework에서 지정해두었음)
Pages 폴더안에 원하는 URL의 파일 폴더를 만들어주면된다.

만약 moives/all라는 url을 지정해주려면
/movies 폴더안에 index.js 및 all.js를 만들어주면 둘다 파일을 url을 만들어줄수있다. 

DynamicURL을 사용하기위해서는 /movies/123 이런식의 URL이 필요하다면 
[id].js 이런구조의 그 폴더안에다가 만들어주면된다. 
DynamicURL - [필요URL].js 

navigate
Link로 
router.push를 사용

## Next.js의 url로 데이터 넘기기

```
router.push(
    {
        pathname : `/movies/${id}, //원하는 path
        query: {
            title: "potatos", //넘기기 원하는 데이터 query
        },
        `/movies/${id}` //url을 masking 시켜줄 옵션
    };
)
```


## catch all url

[...id].js이라고 하게되면 뒤에 어떤 url들이 다 들어오더라도 파라미터로 들어오게 해줄수있다.
'
## 404.js


const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source: "/old-blog/:path*", //이곳에 들어갔을때
        destination: "/next-sexy-blog/:path*", //이곳으로 redirect 해주게된다.
        permanent: false,
      }
    ]
  },
  async rewrites(){ //해당 source로 url이 들어오게되면 destination으로 보내준다.
   return [
     {
       source: "/api/movies",
       destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
     },
     {
       source: "/api/movies/:id",
       destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
     }
   ] 
  }
}

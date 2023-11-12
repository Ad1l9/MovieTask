

var filmid=window.location.search.slice(4);

var main=document.querySelector(".maincontent");

axios.get(`https://api.tvmaze.com/shows/${filmid}`).then(response=>{
    const film = response.data;
    main.innerHTML=`
        
    <div class="row justify-content-between">
    <h1 class="col-12">${response.data.name} <span style="color: grey;">(${film.premiered.slice(0,4)})</span></h1>
    <hr>
    <div class="filmimg col-lg-4 col-sm-8" style="background-image: url(${film.image.original});"></div>
    <div class="col-lg-8 col-sm-12">
      <h3 class="maincolor">Summary</h3>
      ${film.summary}
      <table class="infotable mt-4 mb-4">
        <thead>
          <tr>
            <th>Status</th>
            <th>Premiered</th>
            <th style="color: #e6b000;">IMDB</th>
            <th>Language</th>
            <th>Show Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${film.status}</td>
            <td>${film.premiered}</td>
            <td style="color: #e6b000;">${film.rating.average}</td>
            <td>${film.language}</td>
            <td>${film.type}</td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-5">
          <h4>Genres:</h4>
          <ul class="genrelist">

          </ul>
        </div>
        <div class="col-6">
          <h4>Oficial Site</h4>
          <a class="maincolor" href="${film.officialSite}">${film.officialSite}</a>
        </div>
      </div>
    </div>
</div>
    `;
    var genrelist=document.querySelectorAll(".genrelist")
    film.genres.forEach( genre => {
    genrelist[genrelist.length-1].innerHTML+=`<li class="maincolor">${genre}</li> `
    })

})




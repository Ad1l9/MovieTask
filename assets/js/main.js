

// Sign in/sign up sehifelerinde custom remember me checkbox-u
function Remember(check) {
    if(check.classList.contains("disable")==true){
        document.querySelector(".disable").style.display="none";
        document.querySelector(".able").style.display="block";
    }
    else{
        document.querySelector(".disable").style.display="block";
        document.querySelector(".able").style.display="none";
    }
}



var allfilms=document.querySelector(".films");



var currentPage=1;
const pageCapacity=24;

var pagination=document.querySelector(".pagination")


// Paginationu yaradir ve hansinin aktiv oldugunu gosterir
function getPagination(datalen){
      pagination.innerHTML="";
      pagination.innerHTML+=`<li class="page-item prev"><a href="#top" class="page-link" onclick=prevpage()>Previous</a></li>`
      for(let i=0;i<datalen/pageCapacity;i++){
        if(i==currentPage-1){
          pagination.innerHTML+=`<li class="page-item page-link active-page-link" onclick="chngpage(${i+1})">${i+1}</li>`
        }
        else pagination.innerHTML+=`<li class="page-item" onclick="changepage(${i+1})"><a href="#top" class="page-link">${i+1}</a></li>`
      }
      pagination.innerHTML+=`<li class="page-item next"><a href="#top" class="page-link" onclick=nextpage(${datalen})>Next</a></li>`
}


// Paginationda hansi reqeme clicklesek ora kecidi temin edir
function changepage(newcurrent) {
    currentPage=newcurrent;
    printfilm();
}


// next-e clickledikde bir sonraki sehofeye kecir
function nextpage(max){
  if(currentPage<max){
    currentPage++;
    printfilm();
  }
}

// previous-a clickledikde bir evvelki sehofeye kecir
function prevpage(){
  if(currentPage>1){
    currentPage--;
    printfilm();
  }
}


// Filmleri paginationa uygun ekranda gosterir
function printfilm(){
    allfilms.innerHTML="";
    fetch("https://api.tvmaze.com/shows").then(response=>response.json()).then(data=>{
        for(let i=(currentPage-1)*pageCapacity;i<((currentPage-1)*pageCapacity)+24;i++){
            var film=data[i];
            allfilms.innerHTML+=`
        <a class="col-lg-3 col-md-5 col-sm-9 m-2" href="../../pages/details.html?id=${film.id}">
          <div class="b" style="background-image: url(${film.image.original});">
            <div class="rating d-flex justify-content-end align-items-end">
              <span class="p-1 d-flex justify-content-between align-items-center w-100">
                <span style="font-size: 1rem;">
                  <ul class="genrelist">
                  </ul>
                </span>
                <div class="d-flex align-items-center">
                  <span style="font-size: 2rem;">${film.rating.average}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
              </span>
            </div>
          </div>
        </a>
    `;
    var genrelist=document.querySelectorAll(".genrelist")
    film.genres.forEach( genre => {
        genrelist[genrelist.length-1].innerHTML+=`<li>${genre}</li>`
    })
        }
        getPagination(data.length);
    })

}

printfilm();













// Axtaris
function search() {
   
    var resultcount=0;
    var searched=document.querySelector(".filmsearchinp");
    allfilms.innerHTML='';
    pagination.innerHTML='';
    fetch("https://api.tvmaze.com/shows").then(response=>response.json()).then(data=>{

    data.forEach(film => {
        if(film.name.toLowerCase().includes(searched.value.toLowerCase())){
            resultcount++;
            allfilms.innerHTML+=`
        <a class="col-lg-3 col-md-5 col-sm-9 m-2" href="../../pages/details.html?id=${film.id}">
          <div class="b" style="background-image: url(${film.image.original});">
            <div class="rating d-flex justify-content-end align-items-end">
              <span class="p-1 d-flex justify-content-between align-items-center w-100">
                <span style="font-size: 1rem;">
                  <ul class="genrelist">
                  </ul>
                </span>
                <div class="d-flex align-items-center">
                  <span style="font-size: 2rem;">${film.rating.average}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
              </span>
            </div>
          </div>
        </a>
    `;
        var genrelist=document.querySelectorAll(".genrelist")
        film.genres.forEach( genre => {
        genrelist[genrelist.length-1].innerHTML+=`<li>${genre}</li> `
        })
        }
    });
    searched.value="";
    if(resultcount==0){
        allfilms.innerHTML+=`<h1 class="text-center" style="color:#249C8D">No results found</h1>`;
    }
    });
}



function category(searchedCategory) {
  allfilms.innerHTML='';
  pagination.innerHTML='';
  fetch("https://api.tvmaze.com/shows").then(response=>response.json()).then(data=>{

  data.forEach(film => {
      if(film.type==searchedCategory){
          allfilms.innerHTML+=`
      <a class="col-lg-3 col-md-5 col-sm-9 m-2" href="../../pages/details.html?id=${film.id}">
        <div class="b" style="background-image: url(${film.image.original});">
          <div class="rating d-flex justify-content-end align-items-end">
            <span class="p-1 d-flex justify-content-between align-items-center w-100">
              <span style="font-size: 1rem;">
                <ul class="genrelist">
                </ul>
              </span>
              <div class="d-flex align-items-center">
                <span style="font-size: 2rem;">${film.rating.average}</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 576 512">
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
              </div>
            </span>
          </div>
        </div>
      </a>
    `;
      var genrelist=document.querySelectorAll(".genrelist")
      film.genres.forEach( genre => {
      genrelist[genrelist.length-1].innerHTML+=`<li>${genre}</li> `
      })
      }
    });
  })
}











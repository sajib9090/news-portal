let fetchData = [];

const categoryFinder = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch (url)
      .then(response => response.json())
      .then(data => categoryDisplay(data.data.news_category))
}

const categoryDisplay = (categories) => {
   const category = document.getElementById('category')
   categories.forEach((singleCategory)=>{
    // console.log(singleCategory)
    category.innerHTML += `
    <a onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}')" class="text-decoration-none text-black cursor-pointer">${singleCategory.category_name}</a>
    `;
   })
}

// fetch all news available in category

const fetchCategoryNews = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        fetchData = data.data;
        showAllNews(data.data, category_name)});
}

const showAllNews = (news, category_name) => {

    const newsCount = document.getElementById('news-count');
    newsCount.innerText = news.length;

    const newsCategory = document.getElementById('news-category');
    newsCategory.innerText = category_name;


    const singleNewsDisplay = document.getElementById('single-news-display');
    singleNewsDisplay.innerHTML = "";
    news.forEach((singleNews) => {
        
        const {thumbnail_url, title, details, author, total_view, _id} = singleNews;
        const createSingleNewsDiv = document.createElement('div');
        createSingleNewsDiv.classList.add('card', 'mb-3');
        createSingleNewsDiv.innerHTML = `
        <div class="row g-0">
                 <div class="col-md-3">
                      <img src="${thumbnail_url}" class="rounded-start" alt="...">
                 </div>
                 <div class="col-md-9 d-flex flex-column">
                   <div class="card-body">
                     <h5 class="card-title">${title}</h5>
                     <p class="card-text">${details.slice(0, 300)}...</p>
                 </div>
                 <div class="card-footer border-0 d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                        <img src="${author.img}" class="img-fluid rounded-circle mb-2" alt="..." height="40" width="40">
                        </div>
                        <div>
                        <p class="m-0 p-0">${author.name ? author.name : "Anonymous"}</p>
                        <p>${author.published_date}</p>
                        </div>
                    </div>
                    <div>
                        <p><i class="fa fa-eye"></i> ${total_view ? total_view : "00"}</p>
                    </div>
                    <div>
                        <i class="fa fa-star"></i>
                    </div>
                    <div>
                        <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="newsDetails('${_id}')"></i>
                    </div>
                 </div>
             </div>
        </div>
        `
        singleNewsDisplay.appendChild(createSingleNewsDiv)
    })
};




const newsDetails = (news_id) => {
   let url = `https://openapi.programming-hero.com/api/news/${news_id}`
     fetch(url)
       .then(response => response.json())
       .then(data => modal(data.data[0]))
}

const modal = (modalData) => {
    console.log(modalData)
    const {thumbnail_url, title, details, author, total_view, others_info} = modalData;
    document.getElementById('modal-body').innerHTML = `
    
      <div class="card mb-3">
      <div class="row g-0">
                 <div class="col-md-12 d-flex justify-content-center">
                      <img src="${thumbnail_url}" class="" alt="">
                 </div>
                 <div class="col-md-12 d-flex flex-column">
                   <div class="card-body">
                     <h5 class="card-title">${title}<span class="ms-3 badge text-bg-warning">${others_info.is_trending ? 'Trending' : ""}</span></h5>
                     <p class="card-text">${details}</p>
                 </div>
                 <div class="card-footer border-0 d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                        <img src="${author.img}" class="img-fluid rounded-circle mb-2" alt="..." height="40" width="40">
                        </div>
                        <div>
                        <p class="m-0 p-0">${author.name}</p>
                        <p>${author.published_date}</p>
                        </div>
                    </div>
                    <div>
                        <p><i class="fa fa-eye"></i> ${total_view}</p>
                    </div>
                    <div>
                        <i class="fa fa-star"></i>
                    </div>
                 </div>
             </div>
        </div>
      </div>
    `

};



const showTrending = () => {
//    console.log(fetchData)
   
   let trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);

   const newsCategory = document.getElementById('news-category').innerText;
   showAllNews(trendingNews, newsCategory)
}

const showTodaysPick = () => {
    console.log(fetchData)

    let todaysPick = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
    
    const newsCategory = document.getElementById('news-category').innerText;
    showAllNews(todaysPick, newsCategory)
}





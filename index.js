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
      .then(response => response.json())
      .then(data => showAllNews(data, category_name));
}

const showAllNews = (data, category_name) => {
    console.log(data, category_name)
    const newsCount = document.getElementById('news-count');
    newsCount.innerText = data.data.length;

    const newsCategory = document.getElementById('news-category');
    newsCategory.innerText = category_name;
}





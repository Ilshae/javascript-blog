'use strict';

function titleClickHandler(event){
    console.log(event);

  /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

  /* add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;
    clickedElement.classList.add('active');  
    console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log("articleSelector:", articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log("targetArticle:", targetArticle);

  /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

  /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html='';

    for(let article of articles){
    /* get the article id */
        const articleId = article.getAttribute("id");
        console.log("articleId:", articleId);
    /* find the title element */
    /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log("linkHTML:", linkHTML);

    /* insert link into titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
        html = html + linkHTML;
        console.log("html:", html);

    }
    titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log("links", links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
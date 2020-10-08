'use strict';

function titleClickHandler(event){
  console.log('titleClickHandler begins');
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
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('titleClickHandler ends');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  console.log('generateTitleLinks begins');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('optArticleSelector: ', optArticleSelector);
  console.log('customSelector: ', customSelector);

  let html='';

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
 
  }

  titleList.innerHTML = html;
  console.log('titleList', titleList);

  console.log('generateTitleLinks ends');

  addClickListenersToTitleLinks();
}

generateTitleLinks();

function addClickListenersToTitleLinks(){
  console.log('addClickListenersToTitleLinks begins');
  const links = document.querySelectorAll('.titles a');
  console.log('links', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  console.log('addClickListenersToTitleLinks ends');
}


function generateTags(){
  console.log('generateTags begins');

  /* find all articles */
  const articles = document.querySelectorAll('.post');
  console.log('articles', articles);

  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html='';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray)
    {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;
    
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
    
    /* END LOOP: for every article: */
  }

  console.log('generateTags ends');
}
  
generateTags();

function tagClickHandler(event){
  console.log('tagClickHandler begins');
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named 'clickedElement' and give it the value of 'this' */
  const clickedElement = this;

  /* make a new constant 'href' and read the attribute 'href' of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);

  /* make a new constant 'tag' and extract tag from the 'href' constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags:', activeTags);

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
    console.log('activeTag:', activeTag);
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with 'href' attribute equal to the 'href' constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagLinks:', tagLinks);

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');  
    console.log('tagLink:', tagLink);
    /* END LOOP: for each found tag link */
  }

  /* execute function 'generateTitleLinks' with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

  console.log('tagClickHandler ends');
}

function addClickListenersToTags(){
  console.log('addClickListenersToTags begins');

  /* find all links to tags */
  const links = document.querySelectorAll('.list-horizontal a');
  console.log('links:', links);

  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

  console.log('addClickListenersToTags ends');
}

addClickListenersToTags();

function generateAuthors(){
  console.log('generateAuthors begins');
  
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  console.log('articles', articles);
  
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
  
    /* make html variable with empty string */
    let html='';
  
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
  
    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', html);
      
    /* END LOOP: for every article: */
  }
  
  console.log('generateAuthors ends');
}

generateAuthors();

function addClickListenersToAuthors(){
  console.log('addClickListenersToAuthors begins');
  
  /* find all links to authors */
  const links = document.querySelectorAll('.post-author a');
  console.log('links:', links);
  
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
  
  console.log('addClickListenersToAuthors ends');
}

addClickListenersToAuthors();

function authorClickHandler(event){
  console.log('authorClickHandler begins');
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named 'clickedElement' and give it the value of 'this' */
  const clickedElement = this;
  
  /* make a new constant 'href' and read the attribute 'href' of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);
  
  /* make a new constant 'author' and extract author from the 'href' constant */
  const author = href.replace('#author-', '');
  
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('activeAuthors:', activeAuthors);
  
  /* START LOOP: for each active author link */
  for(let activeAuthor of activeAuthors){
    /* remove class active */
    activeAuthor.classList.remove('active');
    console.log('activeAuthor:', activeAuthor);
    /* END LOOP: for each active tag link */
  }
  
  /* find all author links with 'href' attribute equal to the 'href' constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks:', authorLinks);
  
  /* START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');  
    console.log('authorLink:', authorLink);
    /* END LOOP: for each found author link */
  }
  
  /* execute function 'generateTitleLinks' with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  
  console.log('authorClickHandler ends');
}


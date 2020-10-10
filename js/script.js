'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authorList-link').innerHTML)
};

const opts = {
  optArticleSelector: '.post',
  optTitleSelector: '.post-title',
  optTitleListSelector: '.titles',
  optArticleTagsSelector: '.post-tags .list',
  optArticleAuthorSelector: '.post-author',
  optCloudClassCount: '5',
  optCloudClassPrefix: 'tag-size-',
  optAuthorsListSelector: '.authors'
};

function titleClickHandler(event){
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');  

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opts.optArticleSelector + customSelector);

  let html='';

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(opts.optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    
    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  addClickListenersToTitleLinks();
}

generateTitleLinks();

function addClickListenersToTitleLinks(){
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags){
  const params = {max: '0', min: '999999'};

  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    //console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.optCloudClassCount - 1) + 1);

  return classNumber;
}

function generateTags(){
  /* create a new variable allTags with and empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll('.post');

  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.optArticleTagsSelector);

    /* make html variable with empty string */
    let html='';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray)
    {
      
      /* generate HTML of the link */
      const linkHTMLData = {id: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;
      
      /* check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  /* create object for all tags HTML code */
  const allTagsData = {tags: []};

  for(let tag in allTags){
    /* generate code of a link and add it to allTagsHTML */ 
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
  
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named 'clickedElement' and give it the value of 'this' */
  const clickedElement = this;

  /* make a new constant 'href' and read the attribute 'href' of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant 'tag' and extract tag from the 'href' constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  /* find all tag links with 'href' attribute equal to the 'href' constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(let tagLink of tagLinks){
    tagLink.classList.add('active');  
  }

  /* execute function 'generateTitleLinks' with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.list-horizontal a');

  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* create a new variable allAuthors with an empty object */
  let allAuthors = {};
  
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  
  for(let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(opts.optArticleAuthorSelector);
  
    /* make html variable with empty string */
    let html='';
  
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTMLData = {id: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);

    //const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
  
    /* add generated code to html variable */
    html = html + linkHTML;

    /* check if think link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.insertAdjacentHTML('beforeend', html);
  }

  /* find list of authors in right column */
  const authorsList = document.querySelector(opts.optAuthorsListSelector);

  /* create object for all links HTML code*/
  const allAuthorsData = {authors: []};

  for(let author in allAuthors){
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }

  /* add html from allAuthorsHTML to authorsList */
  authorsList.innerHTML = templates.authorListLink(allAuthorsData);
}


generateAuthors();

function addClickListenersToAuthors(){ 
  /* find all links to authors */
  const links = document.querySelectorAll('.post-author a, .authors a');

  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named 'clickedElement' and give it the value of 'this' */
  const clickedElement = this;
  console.log('clickedElement', clickedElement);
  /* make a new constant 'href' and read the attribute 'href' of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant 'author' and extract author from the 'href' constant */
  const author = href.replace('#author-', '');
  
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthor of activeAuthors){
    /* remove class active */
    activeAuthor.classList.remove('active');
  }
  
  /* find all author links with 'href' attribute equal to the 'href' constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');  
  }
  
  /* execute function 'generateTitleLinks' with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

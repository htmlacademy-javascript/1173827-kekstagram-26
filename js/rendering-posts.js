const picturesForPosts = document.querySelector('.pictures');
const templatePictures = document.querySelector('#picture').content.querySelector('a');

const renderingPosts = (setGeneratedPosts) =>{
  const fragmentSetPosts = document.createDocumentFragment();
  setGeneratedPosts.forEach((element)=>{
    const elementTemplate = templatePictures.cloneNode(true);
    elementTemplate.querySelector('img').src = element.url;
    elementTemplate.querySelector('.picture__comments').textContent = element.comments.length ;
    elementTemplate.querySelector('.picture__likes').textContent = element.likes;
    fragmentSetPosts.appendChild(elementTemplate);
  });
  picturesForPosts.appendChild(fragmentSetPosts);
};

export {renderingPosts};

const picturesForPosts = document.querySelector('.pictures');
const templatePictures = document.querySelector('#picture').content.querySelector('a');

const renderPosts = (setGeneratedPosts) => {
  const fragmentSetPosts = document.createDocumentFragment();
  setGeneratedPosts.forEach((element) => {
    const elementTemplate = templatePictures.cloneNode(true);
    elementTemplate.querySelector('img').src = element.url;
    elementTemplate.querySelector('.picture__comments').textContent = element.comments.length ;
    elementTemplate.querySelector('.picture__likes').textContent = element.likes;
    elementTemplate.dataset.userId = element.id;
    fragmentSetPosts.appendChild(elementTemplate);
  });
  picturesForPosts.appendChild(fragmentSetPosts);
};
const getIdFullscreenPhoto = (target) => {
  picturesForPosts.addEventListener('click',(evt) => {
    const selectedPicture = evt.target.closest('.picture');
    if(selectedPicture){
      target(selectedPicture.dataset.userId);
    }
  });
};
export {renderPosts, getIdFullscreenPhoto};

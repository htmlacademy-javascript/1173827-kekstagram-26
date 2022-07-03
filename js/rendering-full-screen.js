import {checkKeydownEsc} from './util.js';
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const pictures = document.querySelector('.pictures');

const createComments = (elements) => {
  let comments ='';
  elements.forEach((element) => {
    comments += `
    <li class="social__comment">
    <img
        class="social__picture"
        src="${element.avatar}"
        alt="${element.name}"
        width="35" height="35">
    <p class="social__text">${element.message}</p>
</li>
    `;

  });
  socialComments.innerHTML = comments;
};

const hideElements = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  cancelButton.removeEventListener('click', hideElements);
  window.removeEventListener('keydown',handleKeydown);
};
function handleKeydown(evt){
  if(checkKeydownEsc(evt)){
    hideElements();
  }
}

const getTargetPost = (target)=>{
  pictures.addEventListener('click',(evt)=>{
    const selectedPicture = evt.target.closest('.picture');
    if(selectedPicture){
      target(selectedPicture.dataset.userId);
    }
  });
};

const getInfoPosts = (post)=>{
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;
  createComments(post.comments);

  cancelButton.addEventListener('click', hideElements);
  window.addEventListener('keydown',handleKeydown);
};

export{getInfoPosts,getTargetPost};

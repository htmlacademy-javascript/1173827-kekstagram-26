import {checkKeydownEsc} from './util.js';
const NUMBER_OF_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const uploadComments = bigPicture.querySelector('.social__comments-loader');

const hideElements = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  cancelButton.removeEventListener('click', hideElements);
  document.removeEventListener('keydown',handleKeydown);
  uploadComments.classList.remove('hidden');
};

function handleKeydown(evt) {
  if(checkKeydownEsc(evt)) {
    hideElements();
  }
}

const hideExcessComments = (comments) => {
  for(let i = NUMBER_OF_COMMENTS_TO_SHOW; i < comments.length; i++) {
    comments[i].classList.add('hidden');
  }
};

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

const getCommentsCount = (value) => {
  socialCommentCount.childNodes[0].textContent = `${value} из `;
};

const getHidedComments = (comments) => {
  const numberOfSubmittedComments = comments.length;
  let numberOfCommentsDisplayed = NUMBER_OF_COMMENTS_TO_SHOW;
  getCommentsCount(NUMBER_OF_COMMENTS_TO_SHOW);

  if(numberOfSubmittedComments <= NUMBER_OF_COMMENTS_TO_SHOW) {
    getCommentsCount(numberOfSubmittedComments);
    uploadComments.classList.add('hidden');
    return;
  }

  return function() {
    const availableComments = numberOfSubmittedComments - numberOfCommentsDisplayed;
    const numberOfNextIteration = numberOfCommentsDisplayed + Math.min(numberOfCommentsDisplayed, availableComments);
    for (let i=numberOfCommentsDisplayed; i < numberOfNextIteration; i++) {
      comments[i].classList.remove('hidden');
    }

    if(availableComments <= NUMBER_OF_COMMENTS_TO_SHOW) {
      numberOfCommentsDisplayed += availableComments;
      getCommentsCount(numberOfCommentsDisplayed);
      uploadComments.classList.add('hidden');
      return;
    }
    numberOfCommentsDisplayed += NUMBER_OF_COMMENTS_TO_SHOW;
    getCommentsCount(numberOfCommentsDisplayed);
  };
};

const renderFullscreen = (post) => {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;
  createComments(post.comments);

  const comments = socialComments.querySelectorAll('li');
  hideExcessComments(comments);
  const showComments = getHidedComments(comments);
  uploadComments.onclick = showComments;

  cancelButton.addEventListener('click', hideElements);
  document.addEventListener('keydown', handleKeydown);
};

export{renderFullscreen};

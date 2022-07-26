import { checkKeydownEsc } from './util.js';
const SHOWN_COMMENTS_AMOUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const uploadComments = bigPicture.querySelector('.social__comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');

const closeFullScreenView = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  cancelButton.removeEventListener('click', closeFullScreenView);
  document.removeEventListener('keydown',onKeydown);
  uploadComments.onclick  = null;
  uploadComments.classList.remove('hidden');
};

function onKeydown(evt) {
  if(checkKeydownEsc(evt)) {
    closeFullScreenView();
  }
}

const createComments = (elements) => {
  const fragmentSetComment = document.createDocumentFragment();
  socialComments.innerHTML ='';

  elements.forEach((element) => {
    const elementCommentTemplate = commentTemplate.cloneNode(true);
    elementCommentTemplate.querySelector('img').src = element.avatar;
    elementCommentTemplate.querySelector('img').alt = element.name;
    elementCommentTemplate.querySelector('p').textContent = element.message;
    fragmentSetComment.appendChild(elementCommentTemplate);
  });
  socialComments.appendChild(fragmentSetComment);
};

const getCommentsCount = (value) => {
  socialCommentCount.childNodes[0].textContent = `${value} из `;
};

const hideExcessComments = (comments) => {
  for(let i = SHOWN_COMMENTS_AMOUNT; i < comments.length; i++) {
    comments[i].classList.add('hidden');
  }
};

const getHidedComments = (comments) => {
  const lengthArrayComments = comments.length;
  let commentCounter = SHOWN_COMMENTS_AMOUNT;

  if(lengthArrayComments <= SHOWN_COMMENTS_AMOUNT) {
    getCommentsCount(lengthArrayComments);
    uploadComments.classList.add('hidden');
    return;
  }
  getCommentsCount(SHOWN_COMMENTS_AMOUNT);

  return function() {
    const amountCommentsAvailable = lengthArrayComments - commentCounter;
    const countNextIteration = commentCounter + Math.min(SHOWN_COMMENTS_AMOUNT, amountCommentsAvailable);
    for (let i=commentCounter; i < countNextIteration; i++) {
      comments[i].classList.remove('hidden');
    }

    if(amountCommentsAvailable <= SHOWN_COMMENTS_AMOUNT) {
      commentCounter += amountCommentsAvailable;
      getCommentsCount(commentCounter);
      uploadComments.classList.add('hidden');
      return;
    }
    commentCounter += SHOWN_COMMENTS_AMOUNT;
    getCommentsCount(commentCounter);
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
  uploadComments.onclick = getHidedComments(comments);

  cancelButton.addEventListener('click', closeFullScreenView);
  document.addEventListener('keydown', onKeydown);
};

export{ renderFullscreen };

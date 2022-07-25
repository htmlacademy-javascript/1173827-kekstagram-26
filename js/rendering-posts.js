import { debounce } from './util.js';

const RANDOM_POSTS_AMOUNT = 10;
const FILTER_BUTTON_DEFAULT  = '#filter-default';
const FILTER_BUTTON_RANDOM = '#filter-random';
const FILTER_BUTTON_DISCUSSED = '#filter-discussed';
const FILTER_BUTTONS = 'img-filters__button';
const RERENDER_DELAY = 500;

const picturesForPosts = document.querySelector('.pictures');
const templatePictures = document.querySelector('#picture').content.querySelector('a');
const filterSection = document.querySelector('.img-filters');
const filterFormButtons = filterSection.querySelector('.img-filters__form');

const renderPosts = (setGeneratedPosts) => {
  const fragmentSetPosts = document.createDocumentFragment();
  picturesForPosts.querySelectorAll('.picture').forEach((item)=>item.remove());

  setGeneratedPosts.forEach((element) => {
    const elementTemplate = templatePictures.cloneNode(true);
    elementTemplate.querySelector('img').src = element.url;
    elementTemplate.querySelector('.picture__comments').textContent = element.comments.length;
    elementTemplate.querySelector('.picture__likes').textContent = element.likes;
    elementTemplate.dataset.userId = element.id;
    fragmentSetPosts.appendChild(elementTemplate);
  });
  picturesForPosts.appendChild(fragmentSetPosts);
  filterSection.classList.remove('img-filters--inactive');
};

const getIdFullscreenPhoto = (target) => {
  picturesForPosts.addEventListener('click',(evt) => {
    const selectedPicture = evt.target.closest('.picture');
    if(selectedPicture){
      target(selectedPicture.dataset.userId);
    }
  });
};

const editingClassButtons = (addition,idButton) => {
  if(!addition){
    filterFormButtons.querySelectorAll(`.${FILTER_BUTTONS}`).
      forEach((element)=> element.classList.remove(`${FILTER_BUTTONS}--active`));
    return;
  }
  filterFormButtons.querySelector(idButton).classList.add(`${FILTER_BUTTONS}--active`);
};

const getFilteredPosts = (posts) => {

  renderPosts(posts);

  filterFormButtons.addEventListener('click', debounce((evt) => {
    editingClassButtons(false);

    if (evt.target.closest(FILTER_BUTTON_DEFAULT)){
      editingClassButtons(true,FILTER_BUTTON_DEFAULT);
      renderPosts(posts);
    }
    if (evt.target.closest(FILTER_BUTTON_RANDOM)){
      editingClassButtons(true,FILTER_BUTTON_RANDOM);
      renderPosts(posts.slice().sort(()=>Math.random() - 0.5).slice(0,RANDOM_POSTS_AMOUNT));
    }
    if (evt.target.closest(FILTER_BUTTON_DISCUSSED)){
      editingClassButtons(true,FILTER_BUTTON_DISCUSSED);
      renderPosts(posts.slice().sort((a,b)=>b.comments.length - a.comments.length));
    }

  }, RERENDER_DELAY));
};

export { renderPosts, getIdFullscreenPhoto, getFilteredPosts };

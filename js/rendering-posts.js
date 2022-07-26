import { debounce } from './util.js';

const RANDOM_POSTS_AMOUNT = 10;
const RERENDER_DELAY = 500;
const ACTIVE_BUTTON = 'img-filters__button--active';
const ButtonIdFilter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const picturesForPosts = document.querySelector('.pictures');
const templatePictures = document.querySelector('#picture').content.querySelector('a');
const filterContainerButtons = document.querySelector('.img-filters');
const filterFormButtons = filterContainerButtons.querySelector('.img-filters__form');

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
};

const getIdFullscreenPhoto = (target) => {
  picturesForPosts.addEventListener('click',(evt) => {
    const selectedPicture = evt.target.closest('.picture');
    if(selectedPicture){
      target(selectedPicture.dataset.userId);
    }
  });
};

const showFilterMenu = () => {
  filterContainerButtons.classList.remove('img-filters--inactive');
};

const filterOnRandom = (posts) =>  posts.slice().sort(()=>Math.random() - 0.5).slice(0,RANDOM_POSTS_AMOUNT);

const filterOnDiscussed = (posts) => posts.slice().sort((a,b)=>b.comments.length - a.comments.length);

let currentFilter;

const applyFilter = (idButton, posts) => {
  if(idButton === currentFilter) {
    return;
  }
  currentFilter = idButton;

  if (idButton === ButtonIdFilter.DEFAULT){
    renderPosts(posts);
  }
  if (idButton === ButtonIdFilter.RANDOM){
    renderPosts(filterOnRandom(posts));
  }
  if (idButton === ButtonIdFilter.DISCUSSED){
    renderPosts(filterOnDiscussed(posts));
  }
};

const onFilterChange = debounce(applyFilter,RERENDER_DELAY);

const getFilteredPosts = (posts) => {
  renderPosts(posts);

  filterFormButtons.addEventListener('click', (evt) => {

    filterFormButtons.querySelector(`.${ACTIVE_BUTTON}`).classList.remove(ACTIVE_BUTTON);
    evt.target.classList.add(ACTIVE_BUTTON);
    onFilterChange(evt.target.id, posts);
  });

};

export { getIdFullscreenPhoto, getFilteredPosts, showFilterMenu, ButtonIdFilter };

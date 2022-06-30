const bigPicture = document.querySelector('.big-picture');
const socialComments = document.querySelector('.social__comments');
const cancelButton = document.querySelector('.big-picture__cancel');

const createComments = (elements)=>{
  socialComments.innerHTML='';

  elements.forEach((element)=>{
    const tagLi = document.createElement('li');
    tagLi.classList.add('social__comment');
    const tagImg = document.createElement('img');
    tagImg.classList.add('social__picture');
    tagImg.src = element.avatar;
    tagImg.alt = element.name;
    tagImg.width = 35;
    tagImg.height = 35;
    tagLi.appendChild(tagImg);
    const tagP = document.createElement('p');
    tagP.classList.add('social__text');
    tagP.textContent = element.message;
    tagLi.appendChild(tagP);
    socialComments.appendChild(tagLi);
  });
};

const getFullScreen = (arrayPosts)=>{
  const pictures = document.querySelectorAll('.picture');

  for (let i=0;i<pictures.length;i++){
    pictures[i].addEventListener('click', ()=>{
      bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictures[i].querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = pictures[i].querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = pictures[i].querySelector('.picture__comments').textContent;
      bigPicture.querySelector('.social__caption').textContent = arrayPosts[i].description;
      createComments(arrayPosts[i].comments);
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
    });
  }
};

cancelButton.addEventListener('click', ()=>{
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

document.addEventListener('keydown',(evt)=>{
  if(evt.key==='Escape'){
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});

export{getFullScreen};

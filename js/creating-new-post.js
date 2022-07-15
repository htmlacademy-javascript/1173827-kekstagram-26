import {checkKeydownEsc} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const imageEditingForm = document.querySelector('.img-upload__form');
const fileUpload = imageEditingForm.querySelector('#upload-file');
const imgUploadOverlay = imageEditingForm.querySelector('.img-upload__overlay');
const textHashtag = imageEditingForm.querySelector('.text__hashtags');
const textComment = imageEditingForm.querySelector('.text__description');
const closeButton = imageEditingForm.querySelector('.img-upload__cancel');

const pristine = new Pristine(imageEditingForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error',
});

const validateHashtag = (value) => {
  const reHashtag = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;
  return reHashtag.test(value);
};

const findDuplicatesHashtag = (value) => {
  if(!value) {
    return true;
  }
  const hashtags = value.replace(/ +/,' ').trim().toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(textHashtag,validateHashtag,'Некорректно введены данные');
pristine.addValidator(textHashtag,findDuplicatesHashtag,'Нельзя использовать одинаковые хеш-теги');
pristine.addValidator(textComment,validateComment,`Не больше ${MAX_COMMENT_LENGTH} символов`);


const hideFormCreatingPost = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageEditingForm.reset();
  pristine.reset();
  closeButton.removeEventListener('click',hideFormCreatingPost);
  document.removeEventListener('keydown',onKeydown);
};

function onKeydown(evt) {
  if(checkKeydownEsc(evt)) {
    if(evt.target.matches('input')&&evt.target.type === 'text'||evt.target.matches('textarea')) {
      return;
    }
    hideFormCreatingPost();
  }
}

const loadPictureHandler = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeButton.addEventListener('click', hideFormCreatingPost);
  document.addEventListener('keydown', onKeydown);
};

fileUpload.addEventListener('change',loadPictureHandler);

imageEditingForm.addEventListener('submit',(evt) => {
  const valid = pristine.validate();
  if(!valid) {
    evt.preventDefault();
  }
});

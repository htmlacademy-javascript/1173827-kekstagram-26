import {checkKeydownEsc} from './util.js';

const redactorForm = document.querySelector('.img-upload__form');
const fileUpload = redactorForm.querySelector('#upload-file');
const imgUploadOverlay = redactorForm.querySelector('.img-upload__overlay');
const textHachtag = redactorForm.querySelector('.text__hashtags');
const textComment = redactorForm.querySelector('.text__description');
const closeButton = redactorForm.querySelector('.img-upload__cancel');

const pristine = new Pristine(redactorForm,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error',
});

//Валидация комментария
const validateComment = (value) => value.length <=140;
pristine.addValidator(
  redactorForm.querySelector('.text__description'),
  validateComment,
  'не больше 140 символов'
);

// Валидация хеш-тега в момент ввода
const validateHachtag = (value)=>{
  const re = /(^#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?)((\b\s#[A-Za-zА-Яа-яЁё0-9]{1,20}\b\s?){1,4})?$/;
  return re.test(value);
};
pristine.addValidator(textHachtag,validateHachtag,'Некорректно введены данные');

//Работа с событиями

const onLoadPicture = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  fileUpload.removeEventListener('change',onLoadPicture);
};

fileUpload.addEventListener('change',onLoadPicture);

const hideRedactorForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  fileUpload.value='';
  closeButton.removeEventListener('click',hideRedactorForm);
  document.removeEventListener('keydown',handleKeydown);
};

function handleKeydown(evt){
  if(checkKeydownEsc(evt)){
    hideRedactorForm();
  }
}

const goOutOfFocus = (evt) => {
  if(checkKeydownEsc(evt)){
    evt.target.blur();
  }
};

//Проверка на дубли
const checkDouble = (value) => {
  const items = value.toLowerCase().split(' ');
  for(let i=0;i<items.length;i++){
    const index = items.indexOf(items[i],i+1);
    if(index > 0) {
      return false;
    }
  }
  return true;
};

redactorForm.addEventListener('submit',(evt)=>{
  pristine.addValidator(textHachtag,checkDouble,'Нельзя использовать одинаковые хеш-теги');
  const valid = pristine.validate();
  if(!valid){
    evt.preventDefault();
  }
});

textHachtag.addEventListener('keydown', goOutOfFocus);
textComment.addEventListener('keydown', goOutOfFocus);
closeButton.addEventListener('click', hideRedactorForm);
document.addEventListener('keydown', handleKeydown);

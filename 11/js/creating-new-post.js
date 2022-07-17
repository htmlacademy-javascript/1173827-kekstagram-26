import {checkKeydownEsc} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const imageEditingForm = document.querySelector('.img-upload__form');
const fileUpload = imageEditingForm.querySelector('#upload-file');
const imgUploadOverlay = imageEditingForm.querySelector('.img-upload__overlay');
const textHashtag = imageEditingForm.querySelector('.text__hashtags');
const textComment = imageEditingForm.querySelector('.text__description');
const closeButton = imageEditingForm.querySelector('.img-upload__cancel');
const imgUploadScale = imageEditingForm.querySelector('.img-upload__scale');
const imgPreview = imageEditingForm.querySelector('.img-upload__preview').querySelector('img');
const scaleControl = imgUploadScale.querySelector('.scale__control--value');
const effectsList = imageEditingForm.querySelector('.effects__list');
const effectLevelSlider = imageEditingForm.querySelector('.effect-level__slider');
const effectLevelValue = imageEditingForm.querySelector('.effect-level__value');

let effectName;
let measuringUnit;

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
  effectLevelSlider.noUiSlider.reset();
  imgPreview.classList.value = '';
  imgPreview.style.filter = '';
  effectName = '';
  measuringUnit = '';
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
  effectLevelSlider.classList.add('hidden');
};

fileUpload.addEventListener('change',loadPictureHandler);

imageEditingForm.addEventListener('submit',(evt) => {
  const valid = pristine.validate();
  if(!valid) {
    evt.preventDefault();
  }
});

imgUploadScale.addEventListener('click',(evt) => {
  const scaleSmaller = evt.target.closest('.scale__control--smaller');
  const scaleBigger = evt.target.closest('.scale__control--bigger');
  let scaleControlValue = +(scaleControl.value).replace('%','');
  if(scaleSmaller && scaleControlValue > 25){
    scaleControlValue -= 25;
    imgPreview.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControl.value = `${scaleControlValue}%`;
  }
  if(scaleBigger && scaleControlValue < 100){
    scaleControlValue += 25;
    imgPreview.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControl.value = `${scaleControlValue}%`;
  }
});

const getUpdateSlider = (min,max,start,step) => ({
  range: {
    min: min,
    max: max
  },
  start: start,
  step: step,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


const getParamFilter = (newClass,effect,unit) => {
  effectName = effect;
  measuringUnit = unit;
  if(!effect){
    effectLevelSlider.classList.add('hidden');
    imgPreview.classList.add(newClass);
    imgPreview.style.filter = '';
    return;
  }
  effectLevelSlider.classList.remove('hidden');
  imgPreview.classList.add(newClass);
  imgPreview.style.filter = `${effect}(${effectLevelValue.value}${unit})`;
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgPreview.style.filter = `${effectName}(${effectLevelValue.value}${measuringUnit})`;

});

effectsList.addEventListener('change',(evt) => {
  imgPreview.classList.value = '';
  switch (evt.target.value) {
    case 'none':
      getParamFilter('effects__preview--none');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,1,1,0.1));
      break;
    case 'chrome':
      getParamFilter('effects__preview--chrome','grayscale','');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,1,1,0.1));
      break;
    case 'sepia':
      getParamFilter('effects__preview--sepia','sepia','');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,1,1,0.1));
      break;
    case 'marvin':
      getParamFilter('effects__preview--marvin','invert','%');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,100,100,1));
      break;
    case 'phobos':
      getParamFilter('effects__preview--phobos','blur','px');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,3,3,0.1));
      break;
    case 'heat':
      getParamFilter('effects__preview--heat','brightness','');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(1,3,3,0.1));
      break;
  }
});

import {checkKeydownEsc} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;
const FILTER_TYPE = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};
const FILTER_CSS_VALUE = {
  [FILTER_TYPE.CHROME]: 'grayscale',
  [FILTER_TYPE.SEPIA]: 'sepia',
  [FILTER_TYPE.MARVIN]: 'invert',
  [FILTER_TYPE.PHOBOS]: 'blur',
  [FILTER_TYPE.HEAT]: 'brightness',
};

const imageEditingForm = document.querySelector('.img-upload__form');
const fileUpload = imageEditingForm.querySelector('#upload-file');
const imgUploadOverlay = imageEditingForm.querySelector('.img-upload__overlay');
const textHashtag = imageEditingForm.querySelector('.text__hashtags');
const textComment = imageEditingForm.querySelector('.text__description');
const closeButton = imageEditingForm.querySelector('.img-upload__cancel');
const imgUploadScale = imageEditingForm.querySelector('.img-upload__scale');
const imgPreview = imageEditingForm.querySelector('.img-upload__preview').querySelector('img');
const imgUploadEffectLevel = imageEditingForm.querySelector('.img-upload__effect-level');
const scaleControl = imgUploadScale.querySelector('.scale__control--value');
const effectsList = imageEditingForm.querySelector('.effects__list');
const effectLevelSlider = imageEditingForm.querySelector('.effect-level__slider');
const effectLevelValue = imageEditingForm.querySelector('.effect-level__value');

let effectName;

const pristine = new Pristine(imageEditingForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text-error',
});

const validateHashtag = (value) => {
  if(!value){
    return true;
  }
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
  if(scaleSmaller && scaleControlValue > MIN_SCALE_VALUE){
    scaleControlValue -= SCALE_STEP;
    imgPreview.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControl.value = `${scaleControlValue}%`;
  }
  if(scaleBigger && scaleControlValue < MAX_SCALE_VALUE){
    scaleControlValue += SCALE_STEP;
    imgPreview.style.transform = `scale(${(scaleControlValue)/100})`;
    scaleControl.value = `${scaleControlValue}%`;
  }
});

const getUpdateSlider = (min,max,start,step,unit='') => ({
  range: {
    min: min,
    max: max
  },
  start: start,
  step: step,
  connect: 'lower',
  format: {
    to: (value) =>  {if(Number.isInteger(value)) {
      return `${value.toFixed(0)}${unit}`;
    }
    return `${value.toFixed(1)}${unit}`;
    },
    from: (value) => parseFloat(value.replace(unit,'')),
  }
});

const setImageEffect = (newClass,effect) => {
  effectName = effect;
  if(!effect){
    imgUploadEffectLevel.classList.add('hidden');
    imgPreview.classList.add(newClass);
    imgPreview.removeAttribute('style');
    return;
  }
  imgUploadEffectLevel.classList.remove('hidden');
  imgPreview.classList.add(newClass);
  imgPreview.style.filter = `${effect}(${effectLevelValue.value})`;
};

noUiSlider.create(effectLevelSlider,getUpdateSlider(0,1,1,0.1));

effectLevelSlider.noUiSlider.on('update', () => {
  const level = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = level.replace(/%|px/,'');
  imgPreview.style.filter = `${effectName}(${level})`;

});

const applySelectedEffect = (evt) => {
  imgPreview.classList.value = null;
  switch (evt.target.value) {
    case FILTER_TYPE.NONE:
      setImageEffect('effects__preview--none');
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,1,1,0.1));
      break;
    case FILTER_TYPE.CHROME:
      setImageEffect('effects__preview--chrome',FILTER_CSS_VALUE.chrome);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,1,1,0.1));
      break;
    case FILTER_TYPE.SEPIA:
      setImageEffect('effects__preview--sepia',FILTER_CSS_VALUE.sepia);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,1,1,0.1));
      break;
    case FILTER_TYPE.MARVIN:
      setImageEffect('effects__preview--marvin',FILTER_CSS_VALUE.marvin);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,100,100,1,'%'));
      break;
    case FILTER_TYPE.PHOBOS:
      setImageEffect('effects__preview--phobos',FILTER_CSS_VALUE.phobos);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(0,3,3,0.1,'px'));
      break;
    case FILTER_TYPE.HEAT:
      setImageEffect('effects__preview--heat',FILTER_CSS_VALUE.heat);
      effectLevelSlider.noUiSlider.updateOptions(getUpdateSlider(1,3,3,0.1));
      break;
  }
};

const hideFormCreatingPost = () => {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageEditingForm.reset();
  pristine.reset();
  closeButton.removeEventListener('click',hideFormCreatingPost);
  document.removeEventListener('keydown',onKeydown);
  effectsList.removeEventListener('change',applySelectedEffect);
  effectLevelSlider.noUiSlider.reset();
  imgPreview.removeAttribute('style');
  imgPreview.classList.value = null;
  effectName = null;
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
  effectsList.addEventListener('change',applySelectedEffect);
  imgUploadEffectLevel.classList.add('hidden');
};

fileUpload.addEventListener('change',loadPictureHandler);

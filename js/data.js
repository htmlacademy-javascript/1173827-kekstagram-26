import {getRandomArrayElement,getRandomPositiveInteger,getNumberWithoutRepeats} from './util.js';

const NAMES = [
  'Андрей',
  'Елена',
  'Дмитрий',
  'Бадулай',
  'Афанасий',
  'Эдуард',
  'Митрофан',
];
const PHOTO_DESCRIPTIONS =[
  'Описание1',
  'Описание2',
  'Описание3',
  'Описание4',
  'Описание5',
  'Описание6',
  'Описание7',
  'Описание8',
  'Описание9',
];

const TEXT_FOR_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const genDescriptionId  = getNumberWithoutRepeats(1,25);
const genImageAddressId = getNumberWithoutRepeats(1,25);
const genCommentId = getNumberWithoutRepeats(1,999);

//Функция создания комментария
const createComment = ()=> ({
  id:genCommentId(),
  avatar:`img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
  message:getRandomArrayElement(TEXT_FOR_COMMENT),
  name:getRandomArrayElement(NAMES)
});

const numberOfComments = 2;
const setComments = () =>Array.from({length:numberOfComments},createComment);

// Функция создания объекта c информацией о фото
const createDescriptionPhoto = () => ({
  id:genDescriptionId(),
  url:`photos/${genImageAddressId()}.jpg`,
  description:getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes:getRandomPositiveInteger(15,200),
  comments:setComments(),
});

const numberOfObject = 25;
//Получение массива объектов c с описанием
const arrayDescriptionsForPhoto = () => Array.from({length:numberOfObject}, createDescriptionPhoto);
export{arrayDescriptionsForPhoto};

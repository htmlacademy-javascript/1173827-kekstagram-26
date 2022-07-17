import {getRandomArrayElement,getRandomPositiveInteger} from './util.js';

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

const PUBLICATIONS_AMOUNTS = 25;
//Функция создания комментария
const createComments = (elements) => {
  const arrValues = [];
  for (let i=1;i<=elements;i++){
    arrValues.push({
      id:i,
      avatar:`img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
      message:getRandomArrayElement(TEXT_FOR_COMMENT),
      name:getRandomArrayElement(NAMES)
    });
  }
  return arrValues;
};

// Функция создания объекта c информацией о фото
const createDescriptionsPublications = (elements) => {
  const arrValues =[];
  for (let i=1;i<=elements;i++){
    arrValues.push({
      id:i,
      url:`photos/${i}.jpg`,
      description:getRandomArrayElement(PHOTO_DESCRIPTIONS),
      likes:getRandomPositiveInteger(15,200),
      comments:createComments(getRandomPositiveInteger(1,15)),
    });
  }
  return arrValues;
};
export{createDescriptionsPublications, PUBLICATIONS_AMOUNTS};

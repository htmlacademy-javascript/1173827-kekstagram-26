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

const textForComment = `Всё отлично!
  В целом всё неплохо. Но не всё.
  Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
  Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
  Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
  Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`

const ARRAY_SENTENCES = textForComment.split('\n');

//Функция, возвращающая случайное целое число
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

/*
//Функция для проверки максимальной длины строки
const checkStringLength = (testString, maxLength) => testString.length <= maxLength;
//checkStringLength();
*/

//Получение рандомного элемента из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция для получения чисел без повторений
function getNumberWithoutRepeats(min,max){
  const arrayRandomValues = [];
  return function(){
    let randomNumber = getRandomPositiveInteger(min,max);
    while(arrayRandomValues.includes(randomNumber)){
      randomNumber = getRandomPositiveInteger(min,max);
    }
    arrayRandomValues.push(randomNumber);
    return randomNumber;
  };
}

const genDescriptionId  = getNumberWithoutRepeats(1,25);
const genImageAddressId = getNumberWithoutRepeats(1,25);
const genCommentId = getNumberWithoutRepeats(1,1000);

//Функция создания комментария
const createComment = ()=> {
  return {
    id:genCommentId(),
    avatar:`img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
    message:getRandomArrayElement(ARRAY_SENTENCES).trim(),
    name:getRandomArrayElement(NAMES)
  };
}

// Функция создания объекта c информацией о фото
const createObject = () => {
  return {
    id:genDescriptionId(),
    url:`photos/${genImageAddressId()}.jpg`,
    description:getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes:getRandomPositiveInteger(15,200),
    comments:createComment(),
  };
}

//Получение массива объектов
const arrayObject = Array.from({length:25}, createObject);

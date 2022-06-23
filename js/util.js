//Функция, возвращающая случайное целое число
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
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
export {getRandomArrayElement,getRandomPositiveInteger,getNumberWithoutRepeats};


//Функция, возвращающая случайное целое число
function getRandomNumber(firstNumber,lastNumber){
  firstNumber = Math.ceil(firstNumber);
  lastNumber = Math.floor(lastNumber);
  if( firstNumber<0 || lastNumber <0 || firstNumber >= lastNumber){
    return;
  }
  return Math.floor(Math.random()*(lastNumber-firstNumber+1)+firstNumber);
}
getRandomNumber();

//Функция для проверки максимальной длины строки
const compareStringLength = (testString,maxLength) => testString.length <= maxLength;
compareStringLength();

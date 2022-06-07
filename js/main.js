//Функция, возвращающая случайное целое число
function getRandomNumber(firstNumber,lastNumber){
  firstNumber = Math.ceil(firstNumber);
  lastNumber = Math.floor(lastNumber);
  if( firstNumber<0 || lastNumber <0 ){
    return;
  } else if(firstNumber === lastNumber){
    return firstNumber;
  } else if(firstNumber > lastNumber){
  return Math.floor(Math.random()*(firstNumber-lastNumber+1)+lastNumber);
  }
  return Math.floor(Math.random()*(lastNumber-firstNumber+1)+firstNumber);
}
getRandomNumber();

//Функция для проверки максимальной длины строки
const compareStringLength = (testString,maxLength) => testString.length <= maxLength;
compareStringLength();

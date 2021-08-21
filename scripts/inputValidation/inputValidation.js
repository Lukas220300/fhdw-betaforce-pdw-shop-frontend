const validateDefaultText = (input) => {
  return !(!input || input.trim() === '');

}

const validateEmail = (input) => {
  const index = input.search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  return index === 0;
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const validateDate = (input) => {
  const date = new Date(input)
  return isValidDate(date)
}

const validateNumber = (input) => {
  const parsedNumber = parseInt(input)
  return !isNaN(parsedNumber)
}

const validateSelect = (selectedValue, defaultValue, values) => {
  if(selectedValue === defaultValue) {
    return false
  }
  return values.includes(selectedValue)
}

const validatePassword = (input) => {
  if(!validateDefaultText(input)) {
    return false
  }
  if (input.length < 8) {
    return false
  }
  const index = input.search(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/g)
  if(index !== 0) {
    return false
  }

  return true
}

const validateCheckBox = (input, expected = true) => {
  return input === expected
}

export {
  validateDefaultText,
  validateEmail,
  validateDate,
  validateNumber,
  validatePassword,
  validateCheckBox,
  validateSelect,
}

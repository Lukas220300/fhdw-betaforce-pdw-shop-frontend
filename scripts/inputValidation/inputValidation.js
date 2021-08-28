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

const validateObjectSelect = (objects, selectedObjectId) => {
  if(selectedObjectId < 0) {
    return false
  }
  let objectFound = false
  objects.forEach((object) => {
    if (object.id === selectedObjectId) {
      objectFound = true
    }
  })
  return objectFound
}

export {
  validateDefaultText,
  validateEmail,
  validateDate,
  validateNumber,
  validatePassword,
  validateCheckBox,
  validateObjectSelect,
}

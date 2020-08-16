const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// get fieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check if required field has data
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check if passwords match
function checkPasswordMatch(pass1, pass2) {
  if (pass1.value === pass2.value) {
    showSuccess(pass2);
  } else {
    showError(pass2, 'Passwords do not match');
    showError(pass1, 'Re-enter passwords, mis-match');
  }
}

// Event listners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // old debug check: console.log(userName.value);

  checkRequired([userName, email, password, password2]);
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});

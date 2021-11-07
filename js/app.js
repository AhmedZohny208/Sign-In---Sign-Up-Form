const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

var welcomeEl = document.getElementById('welcome')

// Signup Form
const signupBtn = document.getElementById('signupBtn')

var usernameSignup = document.getElementById('username-SignUp')
var emailSignup = document.getElementById('email-SignUp')
var pwdSignup = document.getElementById('pwd-SignUp')
var confirmPwd = document.getElementById('confirmPwd-SignUp')

var usersDB

if (localStorage.getItem('usersInfo') == null) {
  usersDB = []
} else {
  usersDB = JSON.parse(localStorage.getItem('usersInfo'))
}

signupBtn.addEventListener('click', function() {
  var isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword()

  var isFormValid =
    isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid

  if (isFormValid) {
    var firstLoginUser = {
      username: usernameSignup.value,
      email: emailSignup.value,
      password: pwdSignup.value
    }
    localStorage.setItem('currentUser', JSON.stringify(firstLoginUser))
    usersDB.push(firstLoginUser)
    localStorage.setItem('usersInfo', JSON.stringify(usersDB))
    console.log(usersDB)
    signupBtn.setAttribute('href', 'Home.html')
  } 
})


// isRequired() function
function isRequired(value) {
  if (value === '') {
    return false
  } else {
    return true
  }
}

// isBetween() function
function isBetween(length, min, max) {
  if (length < min || length > max) {
    return false
  } else {
    return true
  }
}

// Check if the email is valid
function isEmailValid(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

// Check if a password is strong
function isPasswordSecure(password) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  return regex.test(password)
}

// check if the username is repeated
function isRepeatedUsername(username) {
  for(var i = 0; i < usersDB.length; i++) {
    if (usersDB[i].username === username) {
      return false
    }
  }
  return true
}

// check if the email is repeated
function isRepeatedEmail(email) {
  for(var i = 0; i < usersDB.length; i++) {
    if (usersDB[i].email === email) {
      return false
    }
  }
  return true
}

// Develop functions that show the error / success
function showError(input, message) {
  var inputField = input.parentElement
  var formControl = inputField.parentElement

  formControl.classList.remove('success')
  formControl.classList.add('error')

  const error = formControl.querySelector('small')
  error.textContent = message
}

function showSuccess(input) {
  var inputField = input.parentElement
  var formControl = inputField.parentElement

  formControl.classList.remove('error')
  formControl.classList.add('success')

  const error = formControl.querySelector('small')
  error.textContent = ''
}

// Develop input field validating functions
// Validate the username field
function checkUsername() {
  var valid = false
  var min = 3
  var max = 25
  var username = usernameSignup.value
  
  if (!isRequired(username)) {
    showError(usernameSignup, 'Username cannot be blank.')
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameSignup, `Username must be between ${min} and ${max} characters.`)
  } else if (!isRepeatedUsername(username)) {
    showError(usernameSignup, 'This username is already taken. Please choose another name.')
  } else {
    showSuccess(usernameSignup)
    valid = true
  }
  return valid
}

// Validate the email field
function checkEmail() {
  var valid = false
  var email = emailSignup.value

  if (!isRequired(email)) {
    showError(emailSignup, 'Email cannot be blank.')
  } else if (!isEmailValid(email)) {
    showError(emailSignup, 'Email is not valid')
  } else if (!isRepeatedEmail(email)) {
    showError(emailSignup, 'This email is already taken.')
  }
  else {
    showSuccess(emailSignup)
    valid = true
  }
  return valid
}

// Validate the password field
function checkPassword() {
  var valid = false 
  var password = pwdSignup.value
  if (!isRequired(password)) {
    showError(pwdSignup, 'Password cannot be blank.')
  } else if (!isPasswordSecure(password)) {
    showError(pwdSignup, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)')
  } else {
    showSuccess(pwdSignup)
    valid = true
  }
  return valid
}

// Validate the confirm password field
function checkConfirmPassword() {
  var valid = false
  var confirmPassword = confirmPwd.value
  var password = pwdSignup.value

  if (!isRequired(confirmPassword)) {
    showError(confirmPwd, 'Please enter the password again')
  } else if (password !== confirmPassword) {
    showError(confirmPwd, 'Confirm password does not match')
  } else {
    showSuccess(confirmPwd)
    valid = true
  }
  return valid
}

// Sign in Form
var submitBtn = document.getElementById('submitBtn')

var userSignin = document.getElementById('user-signin')
var userPassword = document.getElementById('password-signin')

var index

submitBtn.addEventListener('click', function(){
  // userSigninValue = userSignin.value
  // userPasswordValue = userPassword.value

  if (checkSigninUsername()) {
    var currentUser = {
      username: usersDB[index].username,
      email: usersDB[index].email,
      password: usersDB[index].password
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    submitBtn.setAttribute('href', 'Home.html')
  } else {
    showError(userSignin, '')
    showError(userPassword, 'Username or password is incorrect')
  }
  
})

function checkSigninUsername() {
  var username = userSignin.value
  var password = userPassword.value

  for(var i = 0; i < usersDB.length; i++) {
    if (usersDB[i].username === username || usersDB[i].email === username) {
      if (usersDB[i].password === password) {
        index = i
        return true
      }
    }
  }
  return false
}
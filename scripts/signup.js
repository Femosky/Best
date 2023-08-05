const firstNameInput = document.querySelector('.js-first-name');
const surnameInput = document.querySelector('.js-surname');
const emailAddressInput = document.querySelector('.js-email-address');
const passwordInput = document.querySelector('.js-password');
const confirmPasswordInput = document.querySelector('.js-confirm-password');
const signUpButton = document.querySelector('.js-signup-button');

const emailWarner = document.querySelector('.js-emailWarner');

const existingEmailAddress = "blah blah blah";

function handleInput(event) {
    const inputValue = event.target.value;
    return inputValue;
}

function checkEmail(event) {
    const inputValue = handleInput(event);
    let emailSuccess = null;
    
    if (inputValue === existingEmailAddress) {
        emailSuccess = true;
    } else {
        emailSuccess = false;
        emailWarner.innerHTML = 'Email address already belongs to an account';
    }

    return emailSuccess;
}

function checkSpecialCharacter(event) {
    const inputValue = handleInput(event);
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '`', '~', ',', '.', '<', '>', '/', '?', '[', ']', '{', '}', '|', ';', ':', '"', "'"];
    const containsSpecialCharacter = specialCharacters.some(character => inputValue.includes(character));
    
    return containsSpecialCharacter;
}

function checkCapitalLetter(event) {
    const inputValue = handleInput(event); 
    const regExp = /[A-Z]/;
    const capitalLetter = regExp.test(inputValue);

    return capitalLetter;
}

function checkNumber(event) {
    const inputValue = handleInput(event);

    let numberPresent = null;
    if ((typeof inputValue.value) !== 'number') {
        numberPresent = true;
    } else {
        numberPresent = false;
    }

    return numberPresent;
}

function checkPasswordCriteria(event) {
    const inputValue = handleInput(event);
    const containsSpecialCharacter = checkCapitalLetter(event);
    const capitalLetter = checkCapitalLetter(event);
    const numberPresent = checkNumber(event);
    const passwordWarner = document.querySelector('.js-password-warner');

    let passwordCriteria = null;

    if (containsSpecialCharacter && capitalLetter && numberPresent && inputValue.length >= 8) {
        passwordCriteria = true;
    } else {
        passwordCriteria = false;
        passwordWarner.innerHTML = 'Passwords must be up to 8 charcters and must contain at least a Capital letter, number, symbols';
    }

    return passwordCriteria;
}

function checkPasswordMatch(event) {
    const inputValue = handleInput(event);
    const passwordCriteria = checkPasswordCriteria(event);
    const passwordMatchWarner = document.querySelector('.js-password-match-warner');
    
    let passwordsMatch = null;
    
    if (passwordCriteria) {
        if (inputValue === passwordInput.value) {
            passwordsMatch = true;
        } else {
            passwordsMatch = false;
            passwordMatchWarner.innerHTML = 'Incorrect. Password not matching';
        }
    }
    
    return passwordsMatch;
}

function createUser(event) {
    const emailSuccess = checkEmail(event);
    const passwordsMatch = checkPasswordMatch(event);
    // const passwordCriteria = checkPasswordCriteria(event);
    
    let users = [];
    let userData = {};
    
    if (emailSuccess && passwordsMatch) {
        const firstName = firstNameInput.value;
        const surname = surnameInput.value;
        const emailAddress = emailAddressInput.value;
        const password = passwordInput.value;

        userData.firstName = firstName;
        userData.surname = surname;
        userData.emailAddress = emailAddress;
        userData.password = password;

        users.push(userData);
    }
}

const emailWarner = document.querySelector('.js-emailWarner');
const passwordWarner = document.querySelector('.js-password-warner');
const passwordMatchWarner = document.querySelector('.js-password-match-warner');

const debugOutput = document.querySelector('.debug-output');

const existingEmailAddress = "blah blah blah";

// function handleInput(event) {
//     const inputValue = event.target.value;
//     return inputValue;
// }

function checkEmail() {
    let emailSuccess = null;
    
    if (document.querySelector('.js-email-address').value === existingEmailAddress) {
        emailSuccess = true;
        emailWarner.innerHTML = '';
    } else {
        emailSuccess = false;
        emailWarner.innerHTML = 'Email address already belongs to an account';
    }

    return emailSuccess;
}

function checkSpecialCharacter() {
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '`', '~', ',', '.', '<', '>', '/', '?', '[', ']', '{', '}', '|', ';', ':', '"', "'"];
    const containsSpecialCharacter = specialCharacters.some(character => inputValue.includes(character));
    
    return containsSpecialCharacter;
}

function checkCapitalLetter() {
    const regExp = /[A-Z]/;
    const capitalLetter = regExp.test(inputValue);

    return capitalLetter;
}

function checkNumber() {
    const numberPresent = !isNaN(inputValue);

    return numberPresent;
}

function checkPasswordCriteria() {
    const containsSpecialCharacter = checkSpecialCharacter();
    const capitalLetter = checkCapitalLetter();
    const numberPresent = checkNumber();

    let passwordCriteria = null;

    if (containsSpecialCharacter && capitalLetter && numberPresent && inputValue.length >= 8) {
        passwordCriteria = true;
        passwordWarner.innerHTML = '';
    } else {
        passwordCriteria = false;
        passwordWarner.innerHTML = 'Passwords must be up to 8 characters and must contain at least a capital letter, number, symbols';
    }

    return passwordCriteria;
}

function checkPasswordMatch() {
    const passwordCriteria = checkPasswordCriteria();
    
    let passwordsMatch = null;
    
    if (passwordCriteria) {
        if (document.querySelector('.js-confirm-password').value === document.querySelector('.js-password').value) {
            passwordsMatch = true;
            passwordMatchWarner.innerHTML = '';
        } else {
            passwordsMatch = false;
            passwordMatchWarner.innerHTML = 'Incorrect. Passwords not matching';
        }

    } else {
        checkPasswordCriteria();
    }
    
    return passwordsMatch;
}

function createUser(event) {
    event.preventDefault();

    const emailSuccess = checkEmail();
    const passwordsMatch = checkPasswordMatch();
    
    let users = [];
    let userData = {};
    
    if (emailSuccess && passwordsMatch) {
        const firstName = document.querySelector('.js-first-name').value;
        const surname = document.querySelector('.js-surname').value;
        const emailAddress = document.querySelector('.js-email-address').value;
        const password = document.querySelector('.js-password').value;

        userData.firstName = firstName;
        userData.surname = surname;
        userData.emailAddress = emailAddress;
        userData.password = password;

        users.push(userData);
    }
    
    debugOutput.innerHTML = userData.firstName;
    return users;
}
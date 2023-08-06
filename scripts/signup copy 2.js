const emailWarner = document.querySelector('.js-emailWarner');
const passwordWarner = document.querySelector('.js-password-warner');
const passwordMatchWarner = document.querySelector('.js-password-match-warner');

const debugOutput = document.querySelector('.debug-output');

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
    const numberPresent = !isNaN(inputValue);

    return numberPresent;
}

function checkPasswordCriteria(event) {
    const inputValue = handleInput(event);
    const containsSpecialCharacter = checkSpecialCharacter(event);
    const capitalLetter = checkCapitalLetter(event);
    const numberPresent = checkNumber(event);

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

function checkPasswordMatch(event) {
    const inputValue = handleInput(event);
    const passwordCriteria = checkPasswordCriteria(event);
    
    let passwordsMatch = null;
    
    if (passwordCriteria) {
        if (inputValue === document.querySelector('.js-password').value) {
            passwordsMatch = true;
        } else {
            passwordsMatch = false;
            passwordMatchWarner.innerHTML = 'Incorrect. Passwords not matching';
        }
    }
    
    return passwordsMatch;
}

function createUser(event) {
    event.preventDefault();

    const emailSuccess = checkEmail(event);
    const passwordsMatch = checkPasswordMatch(event);
    
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
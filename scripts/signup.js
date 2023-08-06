const form = document.getElementById('form');

const firstName = document.getElementById('first-name');
const surname = document.getElementById('surname');

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const debugOutput = document.querySelector('.debug-output');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {   
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    // window.location.href = 'verify-email.html';
}

const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const surnameValue = surname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    let user = [];
    let userData = {}

    if (firstNameValue === '') {
        setError(firstName, 'First name is required');
    } else {
        userData.firstNameValue = firstNameValue;
        setSuccess(firstName);
    }

    if (surnameValue === '') {
        setError(surname, 'Surname is required');
    } else {
        userData.surnameValue = surnameValue;
        setSuccess(surname);
    }

    if (emailValue === '') {
        setError(email, 'Email address is required');
    } else if (!isEmailValid(emailValue)) {
        setError(email, 'Provide a valid email');
    } else {
        userData.emailValue = emailValue;
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
    } else {
        userData.passwordValue = passwordValue;
        setSuccess(password);
    }

    if (confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password');
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Passwords do not match');
    } else {
        setSuccess(confirmPassword);
    }

    user.push(userData);
    debugOutput.innerHTML = `
        <p>Stored user info: </p>
        <p>first name: ${userData.firstNameValue}</p>
        <p>surname: ${userData.surnameValue}</p>
        <p>email: ${userData.emailValue}</p>
        <p>password: ${userData.passwordValue}</p>
    `;
} ;
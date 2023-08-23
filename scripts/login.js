const form = document.getElementById('form');

const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const confirmPasswordElement = document.getElementById('confirm-password');

const debugOutput = document.querySelector('.debug-output');
const debugOutput1 = document.querySelector('.debug-output-1');
const debugOutput2 = document.querySelector('.debug-output-2');
const debugOutputError = document.querySelector('.debug-output-error');
const networkFailureMessage = document.querySelector(
    '.network-failure-message'
);
const incorrectDetailsElement = document.querySelector(
    '.error-incorrect-details'
);
const correctDetailsElement = document.querySelector('.error-correct-details');

let user = {};
let passwordCounter = false;

const validateEmail = () => {
    const email = emailElement.value.trim();

    if (email === '') {
        setError(emailElement, 'Email address is required');
    } else if (!isEmailValid(email)) {
        setError(emailElement, 'Provide a valid email');
    } else {
        setSuccessNoColour(emailElement);
    }
};

// onkeyup listeners to check validity of input from user
emailElement.addEventListener('keyup', validateEmail);

// submit userData to sign up
form.addEventListener('submit', (e) => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const setSuccessNoColour = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
};

const isEmailValid = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isPasswordValid = (element) => {};

// main function - to validate user sign up inputs

const validateInputs = () => {
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();

    let emailCriteria = false;
    let passwordCriteria = false;

    if (email === '') {
        setError(emailElement, 'Email address is required');
    } else if (!isEmailValid(email)) {
        setError(emailElement, 'Provide a valid email');
    } else {
        user.email = email;
        setSuccessNoColour(emailElement);
        emailCriteria = true;
    }

    user.password = password;

    if (emailCriteria) {
        fetch('https://socialmediaapp-ugrr.onrender.com/login', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json()) // Parse the response
            .then((data) => {
                // Handle the response from the server
                console.log('Response from server:', data);

                if (data.message === 'Invalid Username or password') {
                    setError(emailElement, '');
                    setError(passwordElement, '');
                    incorrectDetailsElement.innerHTML =
                        'Username or password incorrect!';
                } else if (data.message === 'Logged in successfully') {
                    console.log('Login successful!');

                    incorrectDetailsElement.innerHTML = '';
                    correctDetailsElement.innerHTML = 'Login Successful';

                    setSuccess(emailElement);
                    setSuccess(passwordElement);

                    setTimeout(function () {
                        window.location.href = 'profile.html';
                    }, 3000);
                    // debugOutput2.innerHTML = data.message;
                } else {
                    setError(emailElement, '');
                    setError(passwordElement, '');
                    incorrectDetailsElement.innerHTML =
                        'Username or password incorrect!';
                }
            })
            .catch((error) => {
                console.error('Error:', error.message);
                networkFailureMessage.innerHTML = 'Network Failure. Try again';
            });
    }
};

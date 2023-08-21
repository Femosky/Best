const form = document.getElementById('form');

const firstNameElement = document.getElementById('first-name');
const lastNameElement = document.getElementById('last-name');

const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const confirmPasswordElement = document.getElementById('confirm-password');

const debugOutput = document.querySelector('.debug-output');
const debugOutput1 = document.querySelector('.debug-output-1');
const debugOutput2 = document.querySelector('.debug-output-2');
const debugOutputError = document.querySelector('.debug-output-error');

let user = {};
let passwordCounter = false;

const validateFirstName = () => {
    const firstname = firstNameElement.value.trim();
    if (firstname === '') {
        setError(firstNameElement, 'First name is required');
    } else {
        setSuccess(firstNameElement);
    }
};

const validateLastName = () => {
    const lastname = lastNameElement.value.trim();
    if (lastname === '') {
        setError(lastNameElement, 'Last name is required');
    } else {
        setSuccess(lastNameElement);
    }
};

const validateEmail = () => {
    const email = emailElement.value.trim();
    if (email === '') {
        setError(emailElement, 'Email address is required');
    } else if (!isEmailValid(email)) {
        setError(emailElement, 'Provide a valid email');
    } else {
        setSuccess(emailElement);
    }
};

const validatePassword = () => {
    passwordCriteria = isPasswordValid(passwordElement);
    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    const password = passwordElement.value.trim();
    const confirmPassword = confirmPasswordElement.value.trim();

    if (confirmPassword === '') {
        setError(confirmPasswordElement, 'Please confirm your password');
    } else if (confirmPassword !== password) {
        setError(confirmPasswordElement, 'Passwords do not match');
    } else {
        setSuccess(confirmPasswordElement);
    }
};

firstNameElement.addEventListener('keyup', validateFirstName);
lastNameElement.addEventListener('keyup', validateLastName);
emailElement.addEventListener('keyup', validateEmail);
passwordElement.addEventListener('keyup', validatePassword);
confirmPasswordElement.addEventListener('keyup', validateConfirmPassword);

// submit userData to sign up
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

const isEmailValid = emailElement => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailElement).toLowerCase());
};

const isPasswordValid = element => {
    const password = element.value;

    if (password === '') {
        setError(passwordElement, 'Password is required');
        return false;
    } else if (password.length < 8) {
        setError(passwordElement, 'Password must be at least 8 characters');
        return false;
    } else if (!/[A-Z]/.test(password)) {
        setError(passwordElement, 'Password must contain at least a capital letter');
        return false;
    } else if (!/\d/.test(password)) {
        setError(passwordElement, 'Password must contain at least a number');
        return false;
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
        setError(passwordElement, 'Password must contain at least a special character');
        return false;
    } else {
        setSuccess(passwordElement);
        return true;
    }
};

// main function - to validate user sign up inputs

const validateInputs = () => {
    const firstname = firstNameElement.value.trim();
    const lastname = lastNameElement.value.trim();
    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();
    const confirmPassword = confirmPasswordElement.value.trim();

    let firstNameCriteria = false;
    let lastNameCriteria = false;
    let emailCriteria = false;
    let passwordCriteria = false;

    if (firstname === '') {
        setError(firstNameElement, 'First name is required');
    } else {
        user.firstname = firstname;
        setSuccess(firstNameElement);
        firstNameCriteria = true;
    }
    
    if (lastname === '') {
        setError(lastNameElement, 'Last name is required');
    } else {
        user.lastname = lastname;
        setSuccess(lastNameElement);
        lastNameCriteria = true;
    }
    
    if (email === '') {
        setError(emailElement, 'Email address is required');
    } else if (!isEmailValid(email)) {
        setError(emailElement, 'Provide a valid email');
    } else {
        user.email = email;
        setSuccess(emailElement);
        emailCriteria = true;
    }
    
    if (!isPasswordValid(passwordElement)) {
        setError(confirmPasswordElement, 'Please choose a correct password');
    } else {
        if (confirmPassword === '') {
            setError(confirmPasswordElement, 'Please confirm your password');
        } else if (confirmPassword !== password) {
            setError(confirmPasswordElement, 'Passwords do not match');
        } else {
            user.password = password;
            setSuccess(confirmPasswordElement);
            passwordCriteria = true;
        }
    }
    
    if (firstNameCriteria && lastNameCriteria && emailCriteria && passwordCriteria) {
        // window.location.href = 'verify-email.html';
        
        fetch('https://socialmediaapp-ugrr.onrender.com/register', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())  // Parse the response
        .then(data => {
            // Handle the response from the server
            console.log("Response from server:", data)
            debugOutput1.innerHTML = data.message
            // You can update your UI or perform any necessary actions here
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error)
            debugOutputError.innerHTML = error.message
        });
        
    }

    debugOutput.innerHTML = `
    <p>Stored user info: </p>
    <p>first name: ${user.firstname}</p>
    <p>last name: ${user.lastname}</p>
        <p>email: ${user.email}</p>
        <p>password: ${user.password}</p>
    `;
};

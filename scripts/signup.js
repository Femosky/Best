const form = document.getElementById('form');

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');

const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const debugOutput = document.querySelector('.debug-output');
const debugOutput1 = document.querySelector('.debug-output-1');
const debugOutput2 = document.querySelector('.debug-output-2');
const debugOutputError = document.querySelector('.debug-output-error');

let passwordCounter = false;

const validateFirstName = () => {
    const firstNameValue = firstName.value.trim();
    if (firstNameValue === '') {
        setError(firstName, 'First name is required');
    } else {
        setSuccess(firstName);
    }
};

const validateLastName = () => {
    const lastNameValue = lastName.value.trim();
    if (lastNameValue === '') {
        setError(lastName, 'Last name is required');
    } else {
        setSuccess(lastName);
    }
};

const validateEmail = () => {
    const emailValue = email.value.trim();
    if (emailValue === '') {
        setError(email, 'Email address is required');
    } else if (!isEmailValid(emailValue)) {
        setError(email, 'Provide a valid email');
    } else {
        setSuccess(email);
    }
};

const validatePassword = () => {
    isPasswordValid(password);
    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if (confirmPasswordValue === '') {
        setError(confirmPassword, 'Please confirm your password');
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Passwords do not match');
    } else {
        setSuccess(confirmPassword);
    }
};

firstName.addEventListener('keyup', validateFirstName);
lastName.addEventListener('keyup', validateLastName);
email.addEventListener('keyup', validateEmail);
password.addEventListener('keyup', validatePassword);
confirmPassword.addEventListener('keyup', validateConfirmPassword);

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

const isPasswordValid = element => {
    const passwordValue = element.value;

    if (passwordValue === '') {
        setError(password, 'Password is required');
        return false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
        return false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        setError(password, 'Password must contain at least a capital letter');
        return false;
    } else if (!/\d/.test(passwordValue)) {
        setError(password, 'Password must contain at least a number');
        return false;
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordValue)) {
        setError(password, 'Password must contain at least a special character');
        return false;
    } else {
        setSuccess(password);
        return true;
    }
};

// main function - to validate user sign up inputs

const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    let firstNameCriteria = false;
    let lastNameCriteria = false;
    let emailCriteria = false;
    let passwordCriteria = false;

    let userData = {};
    
    if (firstNameValue === '') {
        setError(firstName, 'First name is required');
    } else {
        userData.firstNameValue = firstNameValue;
        setSuccess(firstName);
        firstNameCriteria = true;
    }
    
    if (lastNameValue === '') {
        setError(lastName, 'Last name is required');
    } else {
        userData.lastNameValue = lastNameValue;
        setSuccess(lastName);
        lastNameCriteria = true;
    }
    
    if (emailValue === '') {
        setError(email, 'Email address is required');
    } else if (!isEmailValid(emailValue)) {
        setError(email, 'Provide a valid email');
    } else {
        userData.emailValue = emailValue;
        setSuccess(email);
        emailCriteria = true;
    }
    
    if (!isPasswordValid(password)) {
        setError(confirmPassword, 'Please choose a correct password');
    } else {
        if (confirmPasswordValue === '') {
            setError(confirmPassword, 'Please confirm your password');
        } else if (confirmPasswordValue !== passwordValue) {
            setError(confirmPassword, 'Passwords do not match');
        } else {
            setSuccess(confirmPassword);
            passwordCriteria = true;
        }
    }
    
    if (firstNameCriteria && lastNameCriteria && emailCriteria && passwordCriteria) {
        
        fetch('https://socialmediaapp-ugrr.onrender.com/register', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())  // Parse the response
        .then(data => {
            // Handle the response from the server
            console.log("Response from server:", data);
            debugOutput1.innerHTML = data;
            // You can update your UI or perform any necessary actions here
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
        });
        
    }

    debugOutput.innerHTML = `
    <p>Stored user info: </p>
    <p>first name: ${userData.firstNameValue}</p>
    <p>last name: ${userData.lastNameValue}</p>
        <p>email: ${userData.emailValue}</p>
        <p>password: ${userData.passwordValue}</p>
    `;
};


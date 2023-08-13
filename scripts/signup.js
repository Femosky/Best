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


// main function - to validate user sign up inputs

const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    let user = [];
    let userData = {};
    // const userData = new userData(form);
    
    if (firstNameValue === '') {
        setError(firstName, 'First name is required');
    } else {
        userData.firstNameValue = firstNameValue;
        setSuccess(firstName);
    }
    
    if (lastNameValue === '') {
        setError(lastName, 'Last name is required');
    } else {
        userData.lastNameValue = lastNameValue;
        setSuccess(lastName);
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

    // const data = Object.fromEntries(userData);

    // fetch('http://127.0.0.1:5000/register', {
    fetch('https://socialmediaapp-ugrr.onrender.com/api/docs/#/default/routes.register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        // .then(res => res.json())
        // .then(userData => debugOutput1.innerHTML = userData)
        // .catch(error => debugOutputError.innerHTML = error);
    
    // debugOutput.innerHTML = `
    // <p>Stored user info: </p>
    // <p>first name: ${userData.firstNameValue}</p>
    // <p>last name: ${userData.lastNameValue}</p>
    //     <p>email: ${userData.emailValue}</p>
    //     <p>password: ${userData.passwordValue}</p>
    // `;

    // // api part - from chatGPT lol
    
    // // Define the URL of your backend API
    // const apiUrl = "http://127.0.0.1:5000/register";
    
    // // Send a POST request
    // fetch(apiUrl, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     // Add other headers if needed
    //   },
    //   body: JSON.stringify(userData), // Convert the JSON object to a string
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle the response from the server
    //     console.log("Response from server:", data);
    //   })
    //   .catch(error => {
    //     // Handle errors
    //     console.error("Error:", error);
    //   });
};


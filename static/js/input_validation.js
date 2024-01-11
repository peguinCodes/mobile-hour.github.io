const submit_buttons = document.querySelectorAll('[type="submit"]'); 
const watched_inputs = document.querySelectorAll(".watched-input"); 
const feedback_bar = document.getElementById("feedback-bar")

function checkIsValidName(string) {
    return /^[A-Za-z\-]+$/.test(string); 
}

function checkIsValidPhone(string) {
    return /^\+?[0-9\- ]+$/.test(string); 
}

function checkIsValidEmail(string) {
    return /^\w+\@\w+\.\w+$/.test(string); 
}

function checkIsValidZipCode(string) {
    return /^[0-9\-]+$/.test(string); 
}

function checkIsValidComment(string) {
    return /^.{0,100}$/.test(string); 
}

function checkIsValidPostcode(string) {
    return /^[0-9]{4,4}$/.test(string); 
}

function checkIsValidAddress(string) {
    return /^[A-Za-z0-9 ]+$/.test(string); 
}

function checkIsValidNum(string) {
    return /^[0-9]+$/.test(string); 
}

var error_messages = []; 

for (let i = 0, len = watched_inputs.length; i < len; i++) {
    const input_elem = watched_inputs[i];
    error_messages.push(""); 

    input_elem.addEventListener("input", (event) => {
        const input_elem = event.target; 
        const is_empty = !(input_elem.value.length > 0); 

        switch (input_elem.id) {
            case "firstname": 
                is_bad_value = !(checkIsValidName(input_elem.value)); 
                break; 
            case "lastname": 
                is_bad_value = !(checkIsValidName(input_elem.value)); 
                break; 
            case "address": 
                is_bad_value = !(checkIsValidAddress(input_elem.value)); 
                break; 
            case "postcode": 
                is_bad_value = input_elem.value.length >= 4 && !(checkIsValidPostcode(input_elem.value)); 
                break; 
            case "state": 
                is_bad_value = !(checkIsValidName(input_elem.value)); 
                break; 
            case "city": 
                is_bad_value = !(checkIsValidName(input_elem.value)); 
                break; 
            case "phone": 
                is_bad_value = !(checkIsValidPhone(input_elem.value)); 
                break; 
            case "email": 
                is_bad_value = !(checkIsValidEmail(input_elem.value)); 
                break; 
            case "quantity": 
                is_bad_value = !(checkIsValidNum(input_elem.value)); 
                break; 
            case "comments": 
                is_bad_value = !(checkIsValidComment(input_elem.value)); 
                break; 
        }

        if (!is_empty) {
            input_elem.style.backgroundColor = "white"; 
        }

        if (is_bad_value) {
            input_elem.style.borderColor = "red"; 
            input_elem.style.outlineColor = "red"; 
            error_messages[i] = `[!] "${input_elem.value}" is not a valid value for "${input_elem.id}"!`; 
            feedback_bar.innerHTML = error_messages.filter(e => e.length > 0).join("<br>"); 
        } else {
            error_messages[i] = error_messages[i].includes("not a valid") ? "" : error_messages[i]; 
            input_elem.style.borderColor = "black"; 
            input_elem.style.outlineColor = "black"; 
            feedback_bar.innerHTML = error_messages.filter(e => e.length > 0).join("<br>"); 
        } 

        if (error_messages.filter(e => e.length > 0).length > 0) {
            feedback_bar.style.display = "block"; 
        } else {
            feedback_bar.style.display = "none"; 
        }
    }); 


    input_elem.addEventListener("focusout", (event) => {
        const is_empty = !(event.target.value.length > 0); 
        const input_elem = event.target; 

        if (is_empty) {
            input_elem.style.backgroundColor = "pink"; 
            error_messages[i] = `[!] "${input_elem.id}" cannot be empty!`; 
            feedback_bar.innerHTML = error_messages.filter(e => e.length > 0).join("<br>"); 
        } else {
            error_messages[i] = error_messages[i].includes("empty") ? "" : error_messages[i]; 
            input_elem.style.backgroundColor = "white"; 
            input_elem.style.outlineColor = "black"; 
            feedback_bar.innerHTML = error_messages.filter(e => e.length > 0).join("<br>"); 
        }

        if (error_messages.filter(e => e.length > 0).length > 0) {
            feedback_bar.style.display = "block"; 
        } else {
            feedback_bar.style.display = "none"; 
        }
    }); 
};  



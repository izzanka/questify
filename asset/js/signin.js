let myAlert = document.getElementById('myAlert')
let alertMessage = document.getElementById('alertMessage')

function validate() {
    let email = document.getElementById('txtEmail')
    let password = document.getElementById('txtPassword')

    if(email.value != 'admin') {
        myAlert.classList.remove('collapse')
        alertMessage.innerHTML = 'Email or password do not match'
    }

    if(password.value != 'admin123') {
        myAlert.classList.remove('collapse')
        alertMessage.innerHTML = 'Email or password do not match'
    }
}

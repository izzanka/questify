let myAlert = document.getElementById('myAlert')
let alertMessage = document.getElementById('alertMessage')
let txtEmail = document.getElementById('txtEmail')
let txtPassword = document.getElementById('txtPassword')
let btnSignIn = document.getElementById('btnSignIn')
let btnAlertClose = document.getElementById('btnAlertClose')

btnSignIn.addEventListener('click', function() {
    if(txtEmail.value == null || txtEmail.value.length == 0) {
        showAlert('Email must be filled')
        return
    }

    if(txtPassword.value == null || txtPassword.value.length == 0) {
        showAlert('Password must be filled')
        return
    }

    if(txtEmail.value != 'admin@gmail.com') {
        showAlert('Email or password do not match')
        return
    }

    if(txtPassword.value != 'admin123') {
        showAlert('Email or password do not match')
        return
    }
    
    window.location.href = 'home.html'
})

btnAlertClose.addEventListener('click', function() {
    myAlert.classList.add('collapse')
})

function showAlert(message) {
    myAlert.classList.remove('collapse')
    alertMessage.innerHTML = message
}

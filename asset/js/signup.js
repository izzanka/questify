let myAlert = document.getElementById('myAlert')
let alertMessage = document.getElementById('alertMessage')
let txtName = document.getElementById('txtName')
let txtEmail = document.getElementById('txtEmail')
let txtPassword = document.getElementById('txtPassword')
let txtConfirmPassword = document.getElementById('txtConfirmPassword')
let btnSignUp = document.getElementById('btnSignUp')
let btnAlertClose = document.getElementById('btnAlertClose')

btnSignUp.addEventListener('click', function() {
    if(txtName.value == null || txtName.value.length == 0) {
        showAlert('Name must be filled')
        return
    }

    if(txtEmail.value == null || txtEmail.value.length == 0) {
        showAlert('Email must be filled')
        return
    }

    if(txtPassword.value == null || txtPassword.value.length == 0) {
        showAlert('Password must be filled')
        return
    }

    if(txtConfirmPassword.value == null || txtConfirmPassword.value.length == 0) {
        showAlert('Confirm Password must be filled')
        return
    }

    if(txtConfirmPassword.value != txtPassword.value) {
        showAlert('Confirm Password must same as Password')
        return
    }
    
    alert('Account created successfully')
    window.location.href = 'signin.html'
})

btnAlertClose.addEventListener('click', function() {
    myAlert.classList.add('collapse')
})

function showAlert(message) {
    myAlert.classList.remove('collapse')
    alertMessage.innerHTML = message
}

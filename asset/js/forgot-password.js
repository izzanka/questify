let myAlert = document.getElementById('myAlert')
let alertMessage = document.getElementById('alertMessage')
let txtEmail = document.getElementById('txtEmail')
let btnReset = document.getElementById('btnReset')
let btnAlertClose = document.getElementById('btnAlertClose')

btnReset.addEventListener('click', function() {
    if(txtEmail.value == null || txtEmail.value.length == 0) {
        showAlert('Email must be filled')
        return
    }

    alert('Password reset email has been sent. Please check your email.')
    window.location.href = 'signin.html'
})

btnAlertClose.addEventListener('click', function() {
    myAlert.classList.add('collapse')
})

function showAlert(message) {
    myAlert.classList.remove('collapse')
    alertMessage.innerHTML = message
}

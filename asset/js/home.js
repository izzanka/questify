let question = document.getElementById('question')
let addQuestion = document.getElementById('addQuestion')
let cancelQuestion = document.getElementById('cancelQuestion')
let invalid = document.getElementById('invalid')

addQuestion.addEventListener('click', function() {
    if(question.value == '' || txtEmail.value.length == 0) {
        showAlert('Question must be filled')
        return
    }
})

cancelQuestion.addEventListener('click', function() {
    invalid.style.display = 'none'
})

function showAlert(message) {
    invalid.style.display = 'block'
    alertMessage.innerHTML = message
}

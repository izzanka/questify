let question = document.getElementById('question')
let addQuestion = document.getElementById('addQuestion')
let cancelQuestion = document.getElementById('cancelQuestion')
let closeQuestion = document.getElementById('closeQuestion')
let invalid_question = document.getElementById('invalid_question')
let invalid_msg_question = document.getElementById('invalid_msg_question')

addQuestion.addEventListener('click', function() {

    if(question.value == '' || question.value.length == 0) {
        showAlert('The question field is required')
        return
    }

    if(question.value.length > 60) {
        showAlert('The question must not be greater than 60 characters')
        return
    }

    if(question.value.length < 10) {
        showAlert('The question must not be smaller than 10 characters')
        return
    }

    window.location.href = 'question.html'
})

cancelQuestion.addEventListener('click', function() {
    invalid_question.style.display = 'none'
    question.value = '';
})

closeQuestion.addEventListener('click', function() {
    invalid_question.style.display = 'none'
    question.value = '';
})

function showAlert(message) {
    invalid_question.style.display = 'block'
    invalid_msg_question.innerHTML = message
}
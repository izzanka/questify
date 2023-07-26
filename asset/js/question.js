let question = document.getElementById('question')
let addQuestion = document.getElementById('addQuestion')
let cancelQuestion = document.getElementById('cancelQuestion')
let closeQuestion = document.getElementById('closeQuestion')


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




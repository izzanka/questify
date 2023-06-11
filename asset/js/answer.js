let answer = document.getElementById('answer')
let postAnswer = document.getElementById('postAnswer')
let cancelAnswer = document.getElementById('cancelAnswer')
let closeAnswer = document.getElementById('closeAnswer')
let invalid_answer = document.getElementById('invalid_answer')
let invalid_msg_answer = document.getElementById('invalid_msg_answer')

// postAnswer.addEventListener('click', function() {

//     if(answer.value == '' || answer.value.length == 0) {
//         showAlert('The answer field is required')
//         return
//     }

//     if(answer.value.length > 255) {
//         showAlert('The answer must not be greater than 255 characters')
//         return
//     }

//     if(answer.value.length < 10) {
//         showAlert('The answer must not be smaller than 10 characters')
//         return
//     }

//     window.location.href = 'question.html'
// })

// cancelAnswer.addEventListener('click', function() {
//     invalid_answer.style.display = 'none'
//     answer.value = '';
// })

// closeAnswer.addEventListener('click', function() {
//     invalid_answer.style.display = 'none'
//     answer.value = '';
// })

// function showAlert(message) {
//     invalid_answer.style.display = 'block'
//     invalid_msg_answer.innerHTML = message
// }

//get all questions


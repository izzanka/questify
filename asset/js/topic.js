let topic = document.getElementById('topic')
let btnTopic = document.getElementById('btnTopic')
let cancelTopic = document.getElementById('cancelTopic')
let closeTopic = document.getElementById('closeTopic')
let invalid_topic = document.getElementById('invalid_topic')
let invalid_msg_topic = document.getElementById('invalid_msg_topic')

btnTopic.addEventListener('click', function() {

    if(topic.value == '' || topic.value.length == 0) {
        showAlertTopic('The topic field is required')
        return
    }

    if(topic.value.length > 25) {
        showAlertTopic('The topic must not be greater than 25 characters')
        return
    }

    if(topic.value.length < 5) {
        showAlertTopic('The topic must not be smaller than 5 characters')
        return
    }

    window.location.href = 'profile.html'
})

cancelTopic.addEventListener('click', function() {
    invalid_topic.style.display = 'none'
    topic.value = '';
})

closeTopic.addEventListener('click', function() {
    invalid_topic.style.display = 'none'
    topic.value = '';
})

function showAlertTopic(message) {
    invalid_topic.style.display = 'block'
    invalid_msg_topic.innerHTML = message
}

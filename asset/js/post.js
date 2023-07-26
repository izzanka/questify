let post = document.getElementById('post')
let btnPost = document.getElementById('btnPost')
let cancelPost = document.getElementById('cancelPost')
let closePost = document.getElementById('closePost')
let invalid_post = document.getElementById('invalid_post')
let invalid_msg_post = document.getElementById('invalid_msg_post')

btnPost.addEventListener('click', function() {

    if(post.value == '' || post.value.length == 0) {
        showAlert('The post field is required')
        return
    }

    if(post.value.length > 60) {
        showAlert('The post must not be greater than 60 characters')
        return
    }

    if(post.value.length < 10) {
        showAlert('The post must not be smaller than 10 characters')
        return
    }

    window.location.href = 'home.html'
})

cancelPost.addEventListener('click', function() {
    invalid_post.style.display = 'none'
    post.value = '';
})

closePost.addEventListener('click', function() {
    invalid_post.style.display = 'none'
    post.value = '';
})

function showAlert(message) {
    invalid_post.style.display = 'block'
    invalid_msg_post.innerHTML = message
}


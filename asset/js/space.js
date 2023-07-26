let space_name = document.getElementById('space_name')
let space_description = document.getElementById('space_description')
let createSpace = document.getElementById('createSpace')
let cancelSpace = document.getElementById('cancelSpace')
let closeSpace = document.getElementById('closeSpace')
let invalid_space_name = document.getElementById('invalid_space_name')
let invalid_space_description = document.getElementById('invalid_space_description')
let invalid_msg_space_name = document.getElementById('invalid_msg_space_name')
let invalid_msg_space_description = document.getElementById('invalid_msg_space_description')

createSpace.addEventListener('click', function() {

    if(space_name.value == '' || space_name.value.length == 0) {
        showAlert('The name field is required')
        return
    }else{
        invalid_space_name.style.display = 'none'
    }

    if(space_name.value.length > 25) {
        showAlert('The name must not be greater than 25 characters')
        return
    }else{
        invalid_space_name.style.display = 'none'
    }

    if(space_name.value.length < 10) {
        showAlert('The name must not be smaller than 10 characters')
        return
    }else{
        invalid_space_name.style.display = 'none'
    }   

    if(space_description.value == '' || space_description.value.length == 0) {
        showAlertSpaceDesc('The description field is required')
        return
    }else{
        invalid_space_description.style.display = 'none'
    }   

    if(space_description.value.length > 60) {
        showAlertSpaceDesc('The description must not be greater than 60 characters')
        return
    }else{
        invalid_space_description.style.display = 'none'
    }   

    if(space_description.value.length < 10) {
        showAlertSpaceDesc('The description must not be smaller than 10 characters')
        return
    }else{
        invalid_space_description.style.display = 'none'
    }   
    
    window.location.href = 'space.html'
})

cancelSpace.addEventListener('click', function() {
    invalid_space_name.style.display = 'none'
    invalid_space_description.style.display = 'none'
    space_name.value = '';
    space_description.value = '';
})

closeSpace.addEventListener('click', function() {
    invalid_space_name.style.display = 'none'
    invalid_space_description.style.display = 'none'
    space_name.value = '';
    space_description.value = '';
})

function showAlert(message) {
    invalid_space_name.style.display = 'block'
    invalid_msg_space_name.innerHTML = message
}

function showAlertSpaceDesc(message) {
    invalid_space_description.style.display = 'block'
    invalid_msg_space_description.innerHTML = message
}

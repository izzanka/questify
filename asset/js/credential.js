let school = document.getElementById('school')
let locationCredential = document.getElementById('locationCredential')
let positionCredential = document.getElementById('positionCredential')

let btnCredential = document.getElementById('btnCredential')
let cancelCredential = document.getElementById('cancelCredential')
let closeCredential = document.getElementById('closeCredential')

let invalid_position = document.getElementById('invalid_position')
let invalid_school = document.getElementById('invalid_school')
let invalid_location = document.getElementById('invalid_location')

let invalid_msg_position = document.getElementById('invalid_msg_position')
let invalid_msg_school = document.getElementById('invalid_msg_school')
let invalid_msg_location = document.getElementById('invalid_msg_location')

btnCredential.addEventListener('click', function() {

    if(positionCredential.value == '' || positionCredential.value.length == 0) {
        showAlertPosition('The position field is required')
        return
    }else{
        invalid_position.style.display = 'none'
    }

    if(positionCredential.value.length > 25) {
        showAlertPosition('The position must not be greater than 25 characters')
        return
    }else{
        invalid_position.style.display = 'none'
    }

    if(positionCredential.value.length < 5) {
        showAlertPosition('The position must not be smaller than 10 characters')
        return
    }else{
        invalid_position.style.display = 'none'
    }   

    if(school.value == '' || school.value.length == 0) {
        showAlertSchool('The school field is required')
        return
    }else{
        invalid_school.style.display = 'none'
    }

    if(school.value.length > 25) {
        showAlertSchool('The school must not be greater than 25 characters')
        return
    }else{
        invalid_school.style.display = 'none'
    }

    if(school.value.length < 5) {
        showAlertSchool('The school must not be smaller than 10 characters')
        return
    }else{
        invalid_school.style.display = 'none'
    }   

    if(locationCredential.value == '' || locationCredential.value.length == 0) {
        showAlertLocation('The location field is required')
        return
    }else{
        invalid_location.style.display = 'none'
    }

    if(locationCredential.value.length > 25) {
        showAlertLocation('The location must not be greater than 25 characters')
        return
    }else{
        invalid_location.style.display = 'none'
    }

    if(locationCredential.value.length < 5) {
        showAlertLocation('The location must not be smaller than 10 characters')
        return
    }else{
        invalid_location.style.display = 'none'
    }   

    window.location.href = 'profile.html'
})

cancelCredential.addEventListener('click', function() {
    invalid_position.style.display = 'none'
    invalid_school.style.display = 'none'
    invalid_location.style.display = 'none'

    positionCredential.value = '';
    school.value = '';
    locationCredential.value = '';
})

closeCredential.addEventListener('click', function() {
    invalid_position.style.display = 'none'
    invalid_school.style.display = 'none'
    invalid_location.style.display = 'none'

    positionCredential.value = '';
    school.value = '';
    locationCredential.value = '';
})

function showAlertPosition(message) {
    invalid_position.style.display = 'block'
    invalid_msg_position.innerHTML = message
}

function showAlertSchool(message) {
    invalid_school.style.display = 'block'
    invalid_msg_school.innerHTML = message
}

function showAlertLocation(message) {
    invalid_location.style.display = 'block'
    invalid_msg_location.innerHTML = message
}


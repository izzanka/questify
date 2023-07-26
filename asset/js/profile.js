let profileName = document.getElementById('profileName')
let profileCredential = document.getElementById('profileCredential')
let description = document.getElementById('description')

let btnName = document.getElementById('btnName')
let btnProfileCredential = document.getElementById('btnProfileCredential')
let btnDescription = document.getElementById('btnDescription')

let cancelName = document.getElementById('cancelName')
let cancelProfileCredential = document.getElementById('cancelProfileCredential')
let cancelDescription = document.getElementById('cancelDescription')

let closeName = document.getElementById('closeName')
let closeProfileCredential = document.getElementById('closeProfileCredential')
let closeDescription = document.getElementById('closeDescription')

let invalid_name = document.getElementById('invalid_name')
let invalid_profile_credential = document.getElementById('invalid_profile_credential')
let invalid_description = document.getElementById('invalid_description')

let invalid_msg_name = document.getElementById('invalid_msg_name')
let invalid_msg_profile_credential = document.getElementById('invalid_msg_profile_credential')
let invalid_msg_description = document.getElementById('invalid_msg_description')

btnName.addEventListener('click', function() {

    if(profileName.value == '' || profileName.value.length == 0) {
        showAlertName('The name field is required')
        return
    }

    if(profileName.value.length > 25) {
        showAlertName('The name must not be greater than 25 characters')
        return
    }

    if(profileName.value.length < 5) {
        showAlertName('The name must not be smaller than 5 characters')
        return
    }

    window.location.href = 'profile.html'
})

btnProfileCredential.addEventListener('click', function() {

    if(profileCredential.value == '' || profileCredential.value.length == 0) {
        showAlertProfileCredential('The profile credential field is required')
        return
    }

    if(profileCredential.value.length > 60) {
        showAlertProfileCredential('The profile credential must not be greater than 60 characters')
        return
    }

    if(profileCredential.value.length < 5) {
        showAlertProfileCredential('The profile credential must not be smaller than 5 characters')
        return
    }

    window.location.href = 'profile.html'
})

btnDescription.addEventListener('click', function() {

    if(description.value == '' || description.value.length == 0) {
        showAlertDescription('The description field is required')
        return
    }

    if(description.value.length > 255) {
        showAlertDescription('The description must not be greater than 255 characters')
        return
    }

    if(description.value.length < 10) {
        showAlertDescription('The description must not be smaller than 10 characters')
        return
    }

    window.location.href = 'profile.html'
})

cancelName.addEventListener('click', function() {
    invalid_name.style.display = 'none'
    profileName.value = '';
})

cancelProfileCredential.addEventListener('click', function() {
    invalid_profile_credential.style.display = 'none'
    profileCredential.value = '';
})

cancelDescription.addEventListener('click', function() {
    invalid_description.style.display = 'none'
    description.value = '';
})

closeName.addEventListener('click', function() {
    invalid_name.style.display = 'none'
    profileName.value = '';
})

closeProfileCredential.addEventListener('click', function() {
    invalid_profile_credential.style.display = 'none'
    profileCredential.value = '';
})

closeDescription.addEventListener('click', function() {
    invalid_description.style.display = 'none'
    description.value = '';
})

function showAlertName(message) {
    invalid_name.style.display = 'block'
    invalid_msg_name.innerHTML = message
}

function showAlertProfileCredential(message) {
    invalid_profile_credential.style.display = 'block'
    invalid_msg_profile_credential.innerHTML = message
}

function showAlertDescription(message) {
    invalid_description.style.display = 'block'
    invalid_msg_description.innerHTML = message
}



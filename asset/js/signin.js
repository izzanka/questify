let myAlert = document.getElementById('myAlert')
let alertMessage = document.getElementById('alertMessage')
let txtEmail = document.getElementById('txtEmail')
let txtPassword = document.getElementById('txtPassword')
let btnSignIn = document.getElementById('btnSignIn')
let btnAlertClose = document.getElementById('btnAlertClose')

// btnSignIn.addEventListener('click', function() {
//     if(txtEmail.value == null || txtEmail.value.length == 0) {
//         showAlert('Email must be filled')
//         return
//     }

//     if(txtPassword.value == null || txtPassword.value.length == 0) {
//         showAlert('Password must be filled')
//         return
//     }

//     if(txtEmail.value != 'izzan@gmail.com') {
//         showAlert('Email or password do not match')
//         return
//     }

//     if(txtPassword.value != 'password') {
//         showAlert('Email or password do not match')
//         return
//     }
    
//     window.location.href = 'home.html'
// })

let user_id = sessionStorage.getItem('id')

btnAlertClose.addEventListener('click', function() {
    myAlert.classList.add('collapse')
})

function showAlert(message) {
    myAlert.classList.remove('collapse')
    alertMessage.innerHTML = message
}

const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    
    e.preventDefault()

    try{
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: txtEmail.value,
                password: txtPassword.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        if(res.status != 200){

            showAlert(data.message)
            
        }else{

            sessionStorage.setItem('id', data.data.id)
            sessionStorage.setItem('name', data.data.name)
            sessionStorage.setItem('profile_credential', data.data.profile_credential)

            location.href="home.html"
        }

    }catch(err)
    {
        alert('Something wrong. please try again later!')
        console.log(err.message)
    }
})

if(user_id != null){
    window.location.href = "home.html"
}

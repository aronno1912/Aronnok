//redirect to home page if user logged in
// window.onload = () => {
//     if(sessionStorage.user){
//         user = JSON.parse(sessionStorage.user)
//         if(compareToken(user.authToken, user.email)){
//             location.replace('/')
//         }
//     }
// }

// const loader = document.querySelector('.loader')

//select inputs
const submitBtn = document.querySelector('.submitButton')
// const name = document.querySelector('#name') || null
//#id
const email = document.querySelector('#email')
const password = document.querySelector('#password')
// const number = document.querySelector('#number') || null
// const tac = document.querySelector('#terms-and-cond') || null
// const notification = document.querySelector('#notification')|| null
console.log("nice");
submitBtn.addEventListener('click', (event) => {
    console.log("button dabaya");
    event.preventDefault(); // Prevent form submission
    // if(name != null){ //signup
    //     if(name.value.length < 3){
    //         showAlert('name must be 3 letters long')
    //     } else if(!email.value.length){
    //         showAlert('enter your email')
    //     } else if(password.value.length < 8){
    //         showAlert('password should be at least 8 letters long')
    //     } else if(!Number(number.value) || number.value.length < 10){
    //         showAlert('invalid number, please enter valid one')
    //     } else if(!tac.checked){
    //         showAlert('you must agree to our terms and conditions')
    //     } else{
    //         // submit the form
    //         loader.style.display = 'block';
    //         sendData('/signup', {
    //             name: name.value,
    //             email: email.value,
    //             password: password.value,
    //             number: number.value,
    //             tac: tac.checked,
    //             seller: false
    //         })
    //     }
    // } else{ //log in
        // if(!email.value.length || !password.value.length){
        //     console.log('Fill all the inputs');
        //     // showAlert('Fill all the inputs')
        // } else{
        //     loader.style.display = 'block';
        //     sendData('/api/signin', {
        //         email: email.value,
        //         password: password.value
        //     })
        // }
    // }

    // event.preventDefault(); // Prevent the default form submission behavior

    // Extract form data
    var emailValue = document.getElementById("email").value;
    var passwordValue = document.getElementById("password").value;

    // Prepare data to send to the server
    var formData = {
        email: emailValue,
        password: passwordValue
    };

    // Send a POST request to your Express.js backend
    fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log(data);
        // You can redirect to a new page or perform other actions based on the server response
    })
    .catch(error => {
        console.error('Error:', error);
    });
})


const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box')
    let alertMsg = document.querySelector('.alert-msg')
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')
    }, 3000)
}

//send data function
const sendData = (path, data) => {
    fetch(path, {
        method: 'POST',
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        // processData(data)
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
      });
}

// const processData = (data) => {
//     loader.style.display = null;
//     if(data.alert){
//         showAlert(data.alert)
//     } else if(data.name){
//         data.authToken = generateToken(data.email)
//         sessionStorage.user = JSON.stringify(data)
//         location.replace('/')
//     } else{
        
//     }
// }
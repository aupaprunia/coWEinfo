function login(){
    var email = document.getElementById("email").value;
    sessionStorage.setItem("email", email);
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email,
    "password": password,
    "role": role
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/signin", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.status == 1 && role == "admin"){
            window.location.href = "dashboard_admin.html"
            sessionStorage.setItem("city",result.city);
        }

        else if(result.status == 1 && role == "patient"){
            window.location.href = "dashboard_patient.html"
        }
        else{
            window.alert(result.message);
        }
    })
    .catch(error => console.log('error', error));
}
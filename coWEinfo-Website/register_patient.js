function func(){

    var name_patient = document.getElementById("name").value;
    var pincode = document.getElementById("pincode").value;
    var phn_num = document.getElementById("phn_num").value;
    var email = document.getElementById("email").value;
    var city = document.getElementById("city").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "name": name_patient,
  "email": email,
  "password": password,
  "phn_num": phn_num,
  "city": city,
  "pincode": pincode
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:5000/register_patient", requestOptions)
  .then(response => response.text())
  .then(result =>{
      window.alert("Registration Successful.");
      window.location.href = "index.html";
  })
  .catch(error => console.log('error', error));

}
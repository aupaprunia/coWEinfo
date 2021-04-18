// const btn = document.querySelector("button");

function func(){

    console.log("i am here");
    var hospital_name = document.getElementById("hospital_name").value;
    var admin_name = document.getElementById("admin_name").value;
    var pincode = document.getElementById("pincode").value;
    var phn_num = document.getElementById("phn_num").value;
    var email = document.getElementById("email").value;
    var city = document.getElementById("city").value;
    var total_beds = document.getElementById("total_beds").value;
    var covid_beds = document.getElementById("covid_beds").value;
    var non_covid_beds = document.getElementById("non_covid_beds").value;
    var passsword = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    var address = document.getElementById("address").value;

    var vaccination = document.getElementsByName("vaccine");
    var testing = document.getElementsByName("testing");

    if(vaccination[0].checked){
        vaccine_value = vaccination[0].value;
    }
    else{
        vaccine_value = vaccination[1].value;
    }

    if(testing[0].checked){
        testing_value = testing[0].value;
    }
    else{
        testing_value = testing[1].value;
    }

    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "hospital_name": hospital_name,
      "admin_name": admin_name,
      "city": city,
      "pincode": pincode,
      "phn_num": phn_num,
      "email": email,
      "password": passsword,
      "vaccination": vaccine_value,
      "total_beds": total_beds,
      "covid_beds": covid_beds,
      "non_covid_beds": non_covid_beds,
      "testing": testing_value,
      "address": address
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:5000/register_admin", requestOptions)
      .then(response => response.json())
      .then(result =>{ window.alert("Registration Successful. Your hospital will be added to the list once it is verified."); window.location.href = "index.html"})
      .catch(error => console.log('error', error));
}


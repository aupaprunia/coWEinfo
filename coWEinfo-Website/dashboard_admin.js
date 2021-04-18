var get_beds = "http://localhost:5000/getCurrentBeds/"
var admin_email = sessionStorage.getItem("email");
var admin_info_url = get_beds.concat(admin_email);
fetch(admin_info_url).then(response=>{
    return response.json();
}).then(result=>{
    document.getElementById("hospital-name").textContent = result.hospital_name;
    document.getElementById("admin-name").textContent = result.admin_name;
    document.getElementById("address").textContent = result.address;
    document.getElementById("email").textContent = result.email;
    document.getElementById("phn-num").textContent = result.phn_num;
    document.getElementById("covid-beds").defaultValue = result.covid_beds;
    document.getElementById("non-covid-beds").defaultValue = result.non_covid_beds;
});

var get_hospital_list = "http://localhost:5000/hospitalsByCity/";
var url = get_hospital_list.concat(sessionStorage.getItem("city"));


fetch(url).then(response=>{
    return response.json();
}).then(answer =>{
    console.log(answer);
    result = answer.results;
    len = result.length;
    var cards_div = document.getElementById("cards");
    for(var i = 0; i < len; i++){
        cards_div.innerHTML += '<div class = "card-single"><div><p id = "Activity"><span></span></p><span  class="self_hospital"><h2 id = "hospital_name">'+result[i][0]+'</h2><br><p id="address">'+result[i][7]+'</p><p id="email">'+result[i][2]+'</p><p id="phn-num">'+result[i][1]+'</p></span></div><div class="wrapper-beds"><div class="form-group"><p>Available Covid Beds:<span id="available-covid-beds"> '+result[i][4]+'</span></p><p>Available Non-Covid Beds:<span id="available-non-covid-beds"> '+result[i][5]+'</span></p><br><p>Covid Testing:<span id="available-non-covid-beds"> '+result[i][6]+'</span></p><p>Vaccination:<span id="available-non-covid-beds"> '+result[i][3]+'</span></p></div>';
    }
});


function update_func(){
    var covid_beds = document.getElementById("covid-beds").value;
    var non_covid_beds = document.getElementById("non-covid-beds").value;
    var email = sessionStorage.getItem("email");
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": email,
    "covid": covid_beds,
    "non_covid": non_covid_beds
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/update_beds", requestOptions)
    .then(response => response.json())
    .then(result => {
        window.alert(result.message);
        window.location.href = "dashboard_admin.html"
    })
    .catch(error => console.log('error', error));

}

function logout(){
    window.alert("Logout Successful.");
    sessionStorage.clear();
    window.location.href = "index.html";
}
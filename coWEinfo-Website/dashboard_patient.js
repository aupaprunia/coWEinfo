var hospital_list = "http://localhost:5000/hospitalsByCity/";

function onCitySelect(){
    var city_name = document.getElementById("city").value;
    if(city_name != "none"){
        
    var url = hospital_list.concat(city_name);
    fetch(url).then(response=>{
        return response.json();
    }).then(answer =>{
        console.log(answer);
        result = answer.results;
        len = result.length;
        var cards_div = document.getElementById("cards");
        cards_div.innerHTML = '';
        for(var i = 0; i < len; i++){
            cards_div.innerHTML += '<div class = "card-single"><div><p id = "Activity"><span></span></p><span  class="self_hospital"><h2 id = "hospital_name">'+result[i][0]+'</h2><br><p id="address">'+result[i][7]+'</p><p id="email">'+result[i][2]+'</p><p id="phn-num">'+result[i][1]+'</p></span></div><div class="wrapper-beds"><div class="form-group"><p>Available Covid Beds:<span id="available-covid-beds"> '+result[i][4]+'</span></p><p>Available Non-Covid Beds:<span id="available-non-covid-beds"> '+result[i][5]+'</span></p><br><p>Covid Testing:<span id="available-non-covid-beds"> '+result[i][6]+'</span></p><p>Vaccination:<span id="available-non-covid-beds"> '+result[i][3]+'</span></p></div>';
        }
    });
    }
    else{
        window.alert("Please choose a City.");
    }
}

function logout(){
    window.alert("Logout Successful.");
    sessionStorage.clear();
    window.location.href = "index.html";
    
}
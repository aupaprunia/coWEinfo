function func(){
fetch("https://covid-19-data.p.rapidapi.com/country?name=india", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7d728954c0msh74b48cc320163b7p1125bcjsn4a91c77040f7",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
.then(response => {
    return response.json();
})
.then(result=>{
	document.getElementById("total_confirmed").textContent = result[0].confirmed;
	document.getElementById("total_recovered").textContent = result[0].recovered;
	document.getElementById("total_deaths").textContent = result[0].deaths;
})
.catch(err => {
	console.error(err);
});
}
function logout(){
    window.alert("Logout Successful.");
    sessionStorage.clear();
    window.location.href = "index.html";
}

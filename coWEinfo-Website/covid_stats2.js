setTimeout(function(){fetch("https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name=India", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7d728954c0msh74b48cc320163b7p1125bcjsn4a91c77040f7",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
.then(response => {
	return response.json()
}).then(result=>{
    document.getElementById("today_confirmed").textContent = result[0].confirmed;
	document.getElementById("today_recovered").textContent = result[0].recovered;
	document.getElementById("today_deaths").textContent = result[0].deaths;
})
.catch(err => {
	console.error(err);
});
setInterval(func(), 1000);},1000)


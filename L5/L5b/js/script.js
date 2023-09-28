// Globala variabler
var resElem;	// Referens till elementet för resultat

// Initiering av globala variabler och händelsehanterare.
function init() {
	resElem = document.getElementById("result");
	let btnElems = document.getElementById("countryButtons").getElementsByTagName("button");
	for (let i = 0; i < btnElems.length; i++) {
		btnElems[i].addEventListener("click",selectCountry);
	}
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Avläs valt land ur knappen och anropa funktionen för AJAX-request
function selectCountry() {
	let country = this.value; // Land i vald knapp
	requestData(country);
} // End selectCountry

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestData(filename) { // filname är namnet (utan ändelse) på den fil som ska hämtas
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","data/" + filename + ".json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getData(request.responseText); // status 200 (OK) --> filen fanns
												// Obs! responseText, då det är JSON
			else resElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestDepartmentinfo

// Tolka XML-koden och skriv ut på önskad form
function getData(JSONtext) {
	let accommodation = JSON.parse(JSONtext).accommodation; // Listan (array) accommodation
	let HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < accommodation.length; i++) {
		// Referenser till olika egenskaper i aktuellt accomodation-objekt
		let type = accommodation[i].type;
		switch (type) { // Översätt från engelska till svenska
			case "apartment": type = "Lägenhet"; break;
			case "cottage": type = "Stuga"; break;
		}
		HTMLcode += "<h3>" + type + "</h3>" +
			"<p><b>Beskrivning:</b> " + accommodation[i].description + "</p>" +
			"<p><b>Plats:</b> " + accommodation[i].address.town + "</p>" +
			"<p><b>Pris:</b> " + accommodation[i].price.value + " " + accommodation[i].price.currency + "</p>" +
			"<hr>";
	}
	resElem.innerHTML = HTMLcode;
} // End getData

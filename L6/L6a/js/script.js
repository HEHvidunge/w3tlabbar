// Globala variabler
var myApiKey = "774cf291094a92f1d652fd0cfb083afe";	// Ersätt DIN-API-KEY med din egen API key
var mySecret = "9d599f43d755e06f";
var flickrImgElem;		// Referens till element där bilderna ska visas
var formElem;			// Referens till sökformuläret
var tags;				// Taggar som anges i sökformuläret
var pageNr;				// Aktuellt sidnummer
var pageNrElem;			// Referens till element för sidnummer
var largeImgElem;		// Objekt med referens till img och caption för förstorad bild
var imgLocationElem;	// Referens till element för bildens koordinater
var moreImgElem;		// Referens till element för fler bilder
var map;				// Objekt för kartan

// Initiering av globala variabler och händelsehanterare
function init() {
	flickrImgElem = document.getElementById("flickrImg");
	formElem = document.getElementById("searchForm");
	pageNrElem = document.getElementById("pageNr");
	largeImgElem = {
		img: document.querySelector("#largeImg img"),
		caption: document.querySelector("#largeImg figcaption")
	}
	imgLocationElem = document.getElementById("imgLocation");
	moreImgElem = document.getElementById("moreImg");
	formElem.searchBtn.addEventListener("click", serchImgs);
	document.getElementById("prevBtn").addEventListener("click", prevPage);
	document.getElementById("nextBtn").addEventListener("click", nextPage);
	pageNr = 1;
} // End init
window.addEventListener("load", init);

// -----------------------------------------------------------------------------------------

// Initiera en ny sökning
function serchImgs() {
	tags = formElem.tags.value;
	pageNr = 1;//Nr för första bild
	requestNewImgs();
} // End serchImgs

// Ajax-begäran av nya bilder
function requestNewImgs() {
	flickrImgElem.innerHTML = "<img src='img/progress.gif' style='border:none;'>";//Bildrad som visas
	pageNrElem.innerHTML = pageNr;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET", "https://api.flickr.com/services/rest/?api_key=" + myApiKey + "&method=flickr.photos.search&tags=" + tags + "&per_page=5&page=" + pageNr + "&has_geo=1&format=json&nojsoncallback=1", true);//OBS!! I API anropet taggas att bara filer med geokod ska hämtas
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) newImgs(request.responseText);
			else flickrImgElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestNewImgs

// Tolka svaret och visa upp bilderna. Välj 5 slumpmässigt ur de 500.
function newImgs(response) {
	response = JSON.parse(response);
	flickrImgElem.innerHTML = ""; //Tömmer raden av bilder
	for (let i = 0; i < response.photos.photo.length; i++) {
		let photo = response.photos.photo[i]; // Ett foto i svaret
		let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
			photo.id + "_" + photo.secret + "_s.jpg"; // Hämtningsadress till en bildfil
		let newElem = document.createElement("img"); // Nytt img-element
		newElem.setAttribute("src", imgUrl);//Lägger till source attribut till elementet
		newElem.setAttribute("data-photo", JSON.stringify(photo)); // Lägger till data-photo attribut 
		newElem.addEventListener("click", enlargeImg);//Händelsehanterare för stor bild läggs på
		flickrImgElem.appendChild(newElem);//Lägger till bildadress till raden av bilder
	} // End for
} // End newImgs

// Hämta föregående uppsättning bilder
function prevPage() {
	if (pageNr > 1) {
		pageNr--;
		requestNewImgs();
	}
} // End prevPage

// Hämta nästa uppsättning bilder
function nextPage() {
	pageNr++;
	requestNewImgs();
} // End nextPage

// Visa större bild av den som användaren klickat på
function enlargeImg() {
	let photo = JSON.parse(this.getAttribute("data-photo")); // Objekt med data om fotot
	let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
		photo.id + "_" + photo.secret + "_z.jpg"; // Adress till en bild
	largeImgElem.img.src = imgUrl;//Skriver ut stor bild
	largeImgElem.caption.innerHTML = photo.title; //Skriver ut bildtext till stor bild
	// Tillägg i lab 6:
	requestLocation(photo.id);

} // End enlargeImg

// ---------- Följande är tillägg för lab6 ----------

// Ajax-begäran av plats för bilden
function requestLocation(id) {
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET", "https://api.flickr.com/services/rest/?api_key=" + myApiKey + "&method=flickr.photos.geo.getLocation&photo_id=" + id + "&format=json&nojsoncallback=1", true);

	request.send(null); // Skicka begäran till servern

	request.onreadystatechange = function () {  //Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) showLocation(request.responseText);
			else flickrImgElem.innerHTML = "Den begärda resursen finns inte.";
	};//
	//} // End requestLocation

	// Visa koordinater
	function showLocation(response) {
		response = JSON.parse(response);
		//Packar upp bildens geodata till lokala variabler
		let geoData = response.photo;//Lokal variabel 
		let lat = geoData.location.latitude;//Latitud hämtas ur lokal variabel
		let long = geoData.location.longitude;//Longitud hämtas

		imgLocationElem.innerHTML = "<p> Latitude: " + lat + " Longitude: " + long + "</p>";
		initMap(lat, long);//Anropar kartfunktionen
		requestImgsByLocation(lat, long); //Skriver ut bildens geodata i kartan genom att anropa kartobjektet
	} // End showLocation

	// Ajax-begäran av nya bilder
	function requestImgsByLocation(lat, lon) {

		let request = new XMLHttpRequest(); // Object för Ajax-anropet
		request.open("GET", "https://api.flickr.com/services/rest/?api_key=" + myApiKey + "&method=flickr.photos.search&lat=" + lat + "&lon=" + lon + "&per_page=5&format=json&nojsoncallback=1", true);
		request.send(null); // Skicka begäran till servern
		request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
			if (request.readyState == 4)
				if (request.status == 200) {
					showMoreImgs(request.responseText);
					//console.log(request.responseText);
				}
				else flickrImgElem.innerHTML = "Den begärda resursen finns inte.";
		};
	};
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {

	response = JSON.parse(response);
	let htmlCode = "";
	console.log(response);
	for (let i = 0; i < response.photos.photo.length; i++) {
		let photo = response.photos.photo[i]; // Ett foto i svaret
		let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
			photo.id + "_" + photo.secret + "_s.jpg"; // Adress till en bild
		let newElem = document.createElement
		htmlCode += "<img src=" + imgUrl + ">";
	}
	moreImgElem.innerHTML = htmlCode;
}
// End showMoreImgs

// ---------- Karta från Google Maps ---------- Extramerit

// Skapa en karta och markeringar
//function initMap
function initMap(lat, lon) {
	let markerData = { position: { lat: parseFloat(lat), lng: parseFloat(lon) }, title: "" };//Skapar ny instans av kartan cntrerad med geodata ifrån bilden

	myMap = new google.maps.Map(
		document.getElementById('map'),
		{
			center: { lat: parseFloat(lat), lng: parseFloat(lon) },//centrerar kartan enligt bildens geodata
			zoom: 6,//zoom sätts till 6
			styles: [
				{ featureType: "poi", stylers: [{ visibility: "off" }] },  // No points of interest.
				{ featureType: "transit.station", stylers: [{ visibility: "off" }] }  // No bus stations, etc.
			]
		}
	);


	let marker = new google.maps.Marker(markerData); // Skapar objekt för markering med hämtade geodata
	marker.setMap(myMap); //Gör markeringen
}
// End initMap

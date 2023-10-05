// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
	{ position: { lat: 57.640839374021134, lng: 18.290860573394177 }, title: "Almedalen" },
	{ position: { lat: 57.642105323851695, lng: 18.298318252188185 }, title: "Domkyrkan" },
	{ position: { lat: 57.637865489295216, lng: 18.300458723301077 }, title: "Östercentrum" },
	{ position: { lat: 57.64364191048471, lng: 18.293956253886456 }, title: "Botaniska trädgården" },
	{ position: { lat: 57.63403169012476, lng: 18.280900537962392 }, title: "Färjeterminalen" }
];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	initMap();
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
	let btnElems = document.querySelectorAll("main #addrBtns button");//Skapa lista av knapparna


	for (i = 0; i < btnElems.length; i++) {

		let newTextElem = document.createTextNode(markerData[i].title);//Skapa ny textnod med info från markerData-listan

		btnElems[i].setAttribute("data-ix", i);
		btnElems[i].replaceChild(newTextElem, btnElems[i].childNodes[0]);//Texten i knapparna byts ut
		btnElems[i].addEventListener("click", showAddrMarker);//Händelsehanterare läggs på knapparna

	}

} // End init
window.addEventListener("load", init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
		document.getElementById('map'),
		{
			center: { lat: 57.63774133420228, lng: 18.295841634976746 },
			zoom: 14,
			styles: [
				{ featureType: "poi", stylers: [{ visibility: "off" }] },  // No points of interest.
				{ featureType: "transit.station", stylers: [{ visibility: "off" }] }  // No bus stations, etc.
			]
		}
	);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
	userMarker = null;
	google.maps.event.addListener(myMap, "click", newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	let lat = e.latLng.lat();
	let lng = e.latLng.lng();
	
	let htmlCode="Latitud: "+lat+" Longitud: "+lng;
	console.log(htmlCode);
	mapLocationElem.innerHTML=htmlCode;
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	let selected = this;//Spara referens till tryckt knapp
	hideMarkers();//Befintliga markeringar raderas

	let ix = selected.getAttributeNode("data-ix").value; //Hämta attributvärde via referens till knapp

	myMarkers[ix].setMap(myMap);//Vald plats markeras
}


// End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat, lon) {

} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {

} // End showMoreImgs

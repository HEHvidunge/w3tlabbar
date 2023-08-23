// Globala variabler
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas
// Inga andra globala variabler får införas i programmet!

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	document.getElementById("subjectMenu1").addEventListener("change", selectSubject);
	document.getElementById("subjectMenu2").addEventListener("change", selectCourses);
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad

// ----- Meny 1 -----

// Avläs menyn för val av ämne
function selectSubject() {
	let subject = this.value; //läs in valt ämne

	requestSubjectData(subject);
} // End selectSubject





// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	let course = this.value; //läs in vald kurs

	requestData(course);

} // End selectCourses


//requestdata 
function requestSubjectData(name) { // filname är namnet (utan ändelse) på den fil som ska hämtas
	let filename = "subject";
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET", "data/" + filename + ".xml", true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar

			if (request.status == 200) getSubjectData(request.responseXML,name); // status 200 
			else subjectInfoElem.innerHTML = "Den begärda resursen finns inte.";


	}
}



function getSubjectData(XMLcode,compareName) {
	let subjectElems = XMLcode.getElementsByTagName("subject"); // Lista (array) 
	let HTMLcode = ""; // Textsträng med ny HTML-kod som skapas
	for (let i = 0; i < subjectElems.length; i++) {

		let nameElem = subjectElems[i].getElementsByTagName("name")[0];
		let infoElem = subjectElems[i].getElementsByTagName("info")[0];
		if (nameElem == compareName) {
			HTMLcode += "<h3>" + "Ämne" + "</h3>";
			HTMLcode += "<p><b>Namn:</b> " + nameElem.firstChild.data + "</p>";
			HTMLcode += "<p><b>Info:</b> " + infoElem.firstChild.data + "</p>";
			HTMLcode += "<hr>";

			subjectInfoElem.innerHTML = HTMLcode;
		}
else subjectInfoElem.innerHTML = ;
		
	}
}
// End getData
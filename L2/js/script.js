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
	//console.log("Subject", subject);
	requestSubjectData(subject);
} // End selectSubject



// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	let course = this.value; //läs in vald kurs
	let file="";

	switch (course) {
		case "Mediateknik": file = "courselist1";
			break;
		case "Musikvetenskap": file = "courselist2";
			break;
		case "Svenska språket": file = "courselist3";
			break;
		default: file = "courselist1";
			break;
	}

	

	requestCourseData(file);

} // End selectCourses


//requestSubjectdata 
function requestSubjectData(name) { // filname är namnet på taggen för de data som ska hämtas
	let filename = "subjects"; //Data finns i filen "subjects"
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET", "xml/" + filename + ".xml", true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar

			if (request.status == 200) getSubjectData(request.responseXML, name); // status 200 
			else subjectInfoElem.innerHTML = "Den begärda resursen finns inte.";
		//console.log("Request", request.responseXML)
		//console.log("Name", name)

	}

}

//requestCourseData
function requestCourseData(filename) { // filname är namnet på taggen för de data som ska hämtas

	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET", "xml/" + filename+ ".xml", true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar

			if (request.status == 200) getSubjectData(request.responseXML); // status 200 
			else courseListElem.innerHTML = "Den begärda resursen finns inte.";
		//console.log("Request", request.responseXML)
		//console.log("Name", name)

	}

}

//getSubjectData
function getSubjectData(XMLcode, compareName) {//compareName är lokal variabel för att välja ut rätt ämne
	let subjectElems = XMLcode.getElementsByTagName("subject"); // Array skapas av data under taggen "subject"
	let HTMLcode = ""; // Textsträng med ny HTML-kod som skapas
	for (let i = 0; i < subjectElems.length; i++) {
		//console.log(subjectElems.length);
		let nameElem = subjectElems[i].getElementsByTagName("name")[0];//Array skapas för data under nametaggen
		let infoElem = subjectElems[i].getElementsByTagName("info")[0];//Artray skapas för data under infotaggen
		//console.log("function getSubjectData",nameElem,infoElem);
		//console.log(compareName,nameElem.firstChild.data);
		//console.log(infoElem.firstChild.data);
		//
		//Om aktuellt ämnesnamn i loopen stämmer med önskat ämne skrivs resultatet ut
		//
		if (nameElem.firstChild.data == compareName) {
			HTMLcode += "<h3>" + "Ämne" + "</h3>";
			HTMLcode += "<p><b>Namn:</b> " + nameElem.firstChild.data + "</p>";
			HTMLcode += "<p><b>Info:</b> " + infoElem.firstChild.data + "</p>";
			HTMLcode += "<hr>";
			subjectInfoElem.innerHTML = HTMLcode;

			//console.log("HTMLcode", HTMLcode);
			//console.log(nameElem.firstChild.data,infoElem.firstChild.data);
			//console.log(nameElem, infoElem);
			break; //Loopen bryts när efterfrågat ämne hittats
		}
		else subjectInfoElem.innerHTML = "Den begärda resursen finns inte.";//Om loopen gåtts igenom utan att ämnet hittats skrivs meddelande ut

	}
}
// End getSubjectData

//getCourseData
function getCourseData(XMLcode) {
	let subjectElems = XMLcode.getElementsByTagName("subject"); // Array skapas av data under taggen "subject"
	let HTMLcode = ""; // Textsträng med ny HTML-kod som skapas
	for (let i = 0; i < subjectElems.length; i++) {
		//console.log(subjectElems.length);
		let codeElem = subjectElems[i].getElementsByTagName("code")[0];
		let titleElem = subjectElems[i].getElementsByTagName("title")[0];
		let creditsElem = subjectElems[i].getElementsByTagName("credits")[0];
		let descriptionElem = subjectElems[i].getElementsByTagName("description")[0];
		let nameElem = subjectElems[i].getElementsByTagName("name")[0];
		let emailElem = subjectElems[i].getElementsByTagName("email")[0];
		let moreinfoElem = subjectElems[i].getElementsByTagName("moreinfo")[0];

		//console.log("function getSubjectData",nameElem,infoElem);
		//console.log(compareName,nameElem.firstChild.data);
		//console.log(infoElem.firstChild.data);
		//
		HTMLcode += "<h3>" + "Ämne" + "</h3>";
		HTMLcode += "<p><b>Kurskod:</b> " + codeElem.firstChild.data + "</p>";
		HTMLcode += "<p><b>Kurs:</b> " + titleElem.firstChild.data + "</p>";
		HTMLcode += "<p><b>HP:</b> " + creditsElem.firstChild.data + "</p>";
		HTMLcode += "<p><b>Beskrivning:</b> " + descriptionElem.firstChild.data + "</p>";
		HTMLcode += "<p><b>Namn:</b> " + nameElem.firstChild.data + "</p>";
		HTMLcode += "<p><b>E-post:</b> " + emailElem.firstChild.data + "</p>";
		HTMLcode += "<p><b>Mer information:</b> " + moreinfoElem.firstChild.data + "</p>";


		HTMLcode += "<hr>";
		courseList.innerHTML = HTMLcode;

		//console.log("HTMLcode", HTMLcode);
		//console.log(nameElem.firstChild.data,infoElem.firstChild.data);
		//console.log(nameElem, infoElem);


	}
}
// End getCourseData

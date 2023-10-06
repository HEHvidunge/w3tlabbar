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
	let subjectName = this.value; //läs in valt ämne
	let file = "";
	//Det valda ämnet översätts till motsvarande namn på datafil
	switch (subjectName) {
		case "Mediateknik": file = "courselist1";
			break;
		case "Musikvetenskap": file = "courselist2";
			break;
		case "Svenska språket": file = "courselist3";
			break;
		default: file = "courselist1";
			break;
	}
	requestCourseData(file);//Filnamn och vält ämne förs vidare till nästa funktion

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
			


	}

}

//requestCourseData
function requestCourseData(filename) { // filname är namnet på taggen för de data som ska hämtas subject är valt ämne

	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET", "xml/" + filename + ".xml", true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			//Nästa funktion anropas. Idata och valt ämnesområde skickas vidare
			if (request.status == 200) getCourseData(request.responseXML); // status 200 
			else console.log(request.status);
			//else courseListElem.innerHTML = "Den begärda resursen finns inte.";
	}

}
////I getSubjectData skriver du ut en textsträng då ämnet inte finns. Om änet inte finns i XML-filen, ska du istället skriva ut innehållet som finns i elementet not_awailable.
//getSubjectData
function getSubjectData(XMLcode, compareName) {//compareName är lokal variabel för att välja ut rätt ämne
	let subjectElems = XMLcode.getElementsByTagName("subject"); // Array skapas av data under taggen "subject"
	let noInfoElem=XMLcode.getElementsByTagName("not_awailable")[0];
	console.log(noInfoElem.innerHTML);
	let HTMLcode = ""; // Textsträng med ny HTML-kod som skapas
	for (let i = 0; i < subjectElems.length; i++) {
		let nameElem = subjectElems[i].getElementsByTagName("name")[0];//Array skapas för data under nametaggen
		let infoElem = subjectElems[i].getElementsByTagName("info")[0];//Array skapas för data under infotaggen
		
		//
		//Om aktuellt ämnesnamn i loopen stämmer med önskat ämne skrivs resultatet ut
		//
		if (nameElem.firstChild.data == compareName) {
			HTMLcode += "<h3>" + "Ämne" + "</h3>";
			HTMLcode += "<p><b>Namn:</b> " + nameElem.firstChild.data + "</p>";
			HTMLcode += "<p><b>Info:</b> " + infoElem.firstChild.data + "</p>";
			
			subjectInfoElem.innerHTML = HTMLcode;

			break; //Loopen bryts när efterfrågat ämne hittats
		}
		
		else subjectInfoElem.innerHTML = noInfoElem.innerHTML;
		
		//Om loopen gåtts igenom utan att ämnet hittats skrivs meddelande ut

	}
}
// End getSubjectData

//getCourseData

function getCourseData(XMLcode,) //Indata och valt ämne tas emot
{
	let subject=XMLcode.getElementsByTagName("subject")[0].firstChild.data
	let courseElems = XMLcode.getElementsByTagName("course"); //
	let HTMLcode = "<h3>" + subject + "</h3>";// Textsträng med ny HTML-kod som skapas. Inleds med rubrik.
	

	for (let i = 0; i < courseElems.length; i++) {
		let code = courseElems[i].getElementsByTagName("code")[0].firstChild.data;//Kurskod
		let title = courseElems[i].getElementsByTagName("title")[0].firstChild.data;//Kursnamn
		let creditsElem = courseElems[i].getElementsByTagName("credits")[0].firstChild.data;//Kurspoäng
		//Hantering av "missing data" i datafil
		//Villkorssatser accepterar tydlingen tilldelning. Denna sker därför innan
		let nameElem = "";
		if (courseElems[i].getElementsByTagName("name").length > 0) { nameElem = courseElems[i].getElementsByTagName("name")[0].firstChild.data };//Kontaktuppgift namn

		let moreinfoElem = courseElems[i].getElementsByTagName("moreinfo")[0].getAttribute("url");//Länk till mer info
		//Utskriftsrad skapas med länk till mer info
		HTMLcode +="<p>"+ code + ", <a href=" + moreinfoElem + "> " + title + "</a>, " + creditsElem;
		//Om uppgift om kontaktperson finns adderas denna information till utskriftsraden
		if (courseElems[i].getElementsByTagName("name").length > 0) { HTMLcode += ", Kontaktperson: " + nameElem }
		HTMLcode += "</p>";
		courseList.innerHTML = HTMLcode;

	}

	//



}
// End getCourseData

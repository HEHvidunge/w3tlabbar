// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click",listLinks);
	
	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click",addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");
	
	document.getElementById("teacherBtn").addEventListener("click",addTeachers); // Används i extramerit
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {

	//querySelector(main section > div:first-of-type {} pekar på första divelementet)
	// a-elementet copieras med clonNode()
	//kopieras som nya childs till linkLIstElem
	//kolla att attribut GIF följer med


	linkListElem.innerHTML="Hallå";
} // End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
// main section > div:last-of-type {} pekar på div-elementet
	//append.Child till courseElems
	//lägg på evenListener på nya element
} // End addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault","Rune Körnefors","Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault","http://lnu.se/personal/rune.kornefors","https://lnu.se/personal/jorgeluis.zapico/"];
	
//querySelectorAll("main section:nth-of-type(3) div:first-of-type li") pekar på listan med kurser
//Lärare läggs till med appendChild till li-elementet

} // End addTeachers
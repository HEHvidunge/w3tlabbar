// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click", listLinks);

	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click", addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");

	document.getElementById("teacherBtn").addEventListener("click", addTeachers); // Används i extramerit
} // End init
window.addEventListener("load", init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {

	//if (linkListElem.innerHTML.length != 0) return;//bryter om länkar redan har kopierats, dvs om linkListElem har något innehåll
	if (linkListElem.hasChildNodes()) return;//bryter om länkar redan har kopierats, dvs om linkListElem har något innehåll
	let newLinks = document.querySelectorAll("main section:first-of-type div:first-of-type a")//skapar array av a-element i texten
	for (let i = 0; i < newLinks.length; i++) {
		let newElem = document.createElement("p");//skapar nytt p-element
		let newNode = newLinks[i].cloneNode(true); //kopierar a-alement från arrayen
		newNode.setAttribute("target", "_blank");//kopplar attributet target=blank till a-elementet
		newElem.appendChild(newNode);//kopplar ihop nytt p-element med a-elementet
		linkListElem.appendChild(newElem);//skriver ut länkar
	}
	console.log(newLinks);

	//kolla att attribut GIF följer med



	//linkListElem.innerHTML="Hallå";
}
// End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
	let clonedElem = this.cloneNode(true);//Värde hämtas från klickat element
	//Test av om texten redan kopierats över
	let num = document.getElementById("courseList").childElementCount;//Kontroll av om kopiering gjorts av något element
	if (num > 0) {//Om kopiering skett jämförs nytt element med befintliga
		let testString = courseList.innerText;//Befintlig lista sparas i variabel
		if (testString.includes(clonedElem.innerText)) return;//Om texten redan finns avbryts funktionen
	}
	let newText = document.createTextNode(clonedElem.innerText);//Texten från det klickade elementet hämtas
	let newElem = document.createElement("p");//Nytt p-element skapas
	newElem.appendChild(newText);//Text-element läggs till p-elementet
	newElem.style.cursor = "pointer";//Stilen görs om till pointer
	newElem.addEventListener("click", removeCourse);//Händelsehanterare läggs på med anrop av funktion
	courseListElem.insertBefore(newElem, courseListElem.children[0]);//kopierad kurs läggs överst
}
// End addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	console.log("REMOVE");
	this.parentNode.removeChild(this);
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault", "Rune Körnefors", "Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault", "http://lnu.se/personal/rune.kornefors", "https://lnu.se/personal/jorgeluis.zapico/"];

	//querySelectorAll("main section:nth-of-type(3) div:first-of-type li") pekar på listan med kurser
	//Lärare läggs till med appendChild till li-elementet

} // End addTeachers

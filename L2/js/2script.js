// Globala variabler
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas
// Inga andra globala variabler får införas i programmet!

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	document.getElementById("subjectMenu1").addEventListener("change",selectSubject);
	document.getElementById("subjectMenu2").addEventListener("change",selectCourses);
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad

// ----- Meny 1 -----

// Avläs menyn för val av ämne
function selectSubject() {
	
} // End selectSubject





// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	
} // End selectCourses





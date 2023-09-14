//getTeacherData
function getTeacherData(XMLcode) //Indata och valt ämne tas emot
{
	let teacherElems = XMLcode.getElementsByTagName("teachers"); //
	//let HTMLcode = "<h3>" + subject + "</h3>";// Textsträng med ny HTML-kod som skapas. Inleds med rubrik.

	for (let i = 0; i < teacherElems.length; i++) {
		let codeElem = teacherElems[i].getElementsByTagName("code")[0].firstChild.data;//Kurskod
		let nameElem = teacherElems[i].getElementsByTagName("teacher")[0].firstChild.data;//Lärarnamn
		let linkElem = teacherElems[i].getElementsByTagName("link")[0].firstChild.data;//Länk

        console.log(codeElem);
		//Hantering av "missing data" i datafil
		//Villkorssatser accepterar tydlingen tilldelning. Denna sker därför innan
		//let nameElem = "";
		//if (teacherElems[i].getElementsByTagName("name").length > 0) { nameElem = teacherElems[i].getElementsByTagName("name")[0].firstChild.data };//Kontaktuppgift namn

		//let moreinfoElem = teacherElems[i].getElementsByTagName("moreinfo")[0].getAttribute("url");//Länk till mer info
		//Utskriftsrad skapas med länk till mer info
		//HTMLcode +="<p>"+ codeElem + ", <a hrf=" + moreinfoElem + "> " + titleElem + "</a>, " + creditsElem;
		//Om uppgift om kontaktperson finns adderas denna information till utskriftsraden
		//if (teacherElems[i].getElementsByTagName("name").length > 0) { HTMLcode += ", Kontaktperson: " + nameElem }
		//HTMLcode += "</p>";
		//teacherList.innerHTML = HTMLcode;

	}
}
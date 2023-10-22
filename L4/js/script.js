// ----- Constructorfunktion för objektet ImageViewer-----
class ImageViewer {
	constructor(id) {
		this.titleElem = document.querySelector("#" + id + " h3"),//Skapar referens för rubrik

			this.imgElem = document.querySelector("#" + id + " img"),//Skapar referns för bild
			this.captionElem = document.querySelector("#" + id + " p"),//Skapar referns för bildtext
			this.category = ""; //Inleder mot tom kategori
		//Bildreferenser och bildtexter lagras här
		this.list = {
			imgUrl: ["img/blank.png"],//Inledande värde
			imgCaption: [""]//Inledande värde
		};
		this.imgIx = 0,
			this.timer = null

	};
	//------Metoder kopplade till objektet ImageViewer------
	// Ajax-anrop för att läsa in begärd fil
	requestImages(file) {
		//console.log(file);
		let request = new XMLHttpRequest(); // Object för Ajax-anropet
		request.open("GET", file, true);
		request.send(null); // Skicka begäran till servern
		request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
			if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
				if (request.status == 200) imgViewer.getImages(request.responseXML); // status 200 (OK) --> filen fanns
				else window.alert("Den begärda resursen fanns inte.");
		}
	};
	// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
	getImages(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
		//Inläsning av all bild och bildtextdata som ska bli nya instanser av objektets egenskaper
		let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
		let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element

		//Inläsning av data som är gemensam för alla instanser av objektet
		imgViewer.category = XMLcode.getElementsByTagName("category")[0].firstChild.data;//Hämtar kategorinamnet
		this.titleElem.innerHTML = imgViewer.category;//Referens för visning av kategorinamnet
console.log(this.titleElem.innerHTML);

		//imgViewer.list.imgUrl = [];//Tömmer bildlistan
		//imgViewer.list.imgCaption = [];//Tömmer bildtextlistan
		for (let i = 0; i < urlElems.length; i++) {
			let obj = new ImageViewer(urlElems[i].firstChild.data, captionElems[i].firstChild.data);
		};
		imgViewer.push(obj);
		//imgViewer.list.imgUrl[i] = (urlElems[i].firstChild.data);
		//imgViewer.list.imgCaption[i] = (captionElems[i].firstChild.data);
		console.log(this);
	}
	this.imgIx = 0,//Nollställer bildindex


this.showImage; // Anropar funktion för att visa första bilden
	} // Slut

// Visa bilden med index imgIx
showImage() {

	this.imgElem.src = this.list.imgUrl[this.imgIx];//Visar bilden

	this.captionElem.innerHTML = (this.imgIx + 1) + ". " + this.list.imgCaption[this.imgIx]; //Visar bildtexten
}; // Slut visa bilden

// Visa föregående bild
prevImage() {
	if (this.imgIx > 0) this.imgIx--; //Om bildindexet är större än noll backa till föregående
	else this.imgIx = this.list.imgUrl.length - 1; // Annars gå runt till sista bilden
	this.showImage();
}; // Slut visa föregående bild

// Visa nästa bild
nextImage() {
	if (this.imgIx < this.list.imgUrl.length - 1) this.imgIx++; //Om aktuell bild inte är den sista stega frammåt
	else this.imgIx = 0; // Annars gå runt till första bilden
	this.showImage();
}; // Slut visa nästa bild

	// ----- Extramerit -----
	/* Ta bort kommentaren kring koden, för att testa funktionaliteten för extrameriten
	// Starta/stoppa automatisk bildvisning
	function autoImage(e,interval) {
		if (timer == null) { // Start
			timer = setInterval(nextImage,interval);
			if (e) e.currentTarget.style.backgroundColor = "green";
		}
		else { // Stopp
			clearInterval(timer);
			timer = null;
			if (e) e.currentTarget.style.backgroundColor = "white";
		}
	} // End autoImage
	*/
}
// ----- Slut Constructorfunktion -----

//-------Initiering och skapande av händelsehanterare
function init() {
	imgViewer = new ImageViewer("imgViewer");//Initierar objektet

	//Skapar händelsehanterar för menyn
	document.querySelector("#categoryMenu").addEventListener("change",
		function () {
			imgViewer.requestImages("xml/images" + this.selectedIndex + ".xml");
			this.selectedIndex = 0;//Nollställning av index

		}
	);
	//Skapar "piltangenter"
	document.querySelector("#prevBtn").addEventListener("click", function () { imgViewer.prevImage(); }); //Bakåtpil
	document.querySelector("#nextBtn").addEventListener("click", function () { imgViewer.nextImage() });//Frammåtpil

	//---Slut på initiering av händelsehanterare


	// ----- Extramerit -----
	/* document.querySelector("#autoBtn").addEventListener("click",
			function(e) {
				autoImage(e,3000);
			}
		);
	*/

	// ----- Guldstjärna -----
	//		Här ska du lägga kod, om du gör guldstjärneuppgiften

} // End init

window.addEventListener("load", init);

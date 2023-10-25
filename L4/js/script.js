// ----- Constructorfunktion för objektet ImageViewer-----
class ImageViewer {
	constructor(id) {
		this.titleElem = document.querySelector("#" + id + " h3");//Skapar referens för rubrik
		this.imgElem = document.querySelector("#" + id + " img");//Skapar referns för bild
		this.captionElem = document.querySelector("#" + id + " p"); //Skapar referns för bildtext
		this.category = ""; //Inleder mot tom kategori
		//Bildreferenser och bildtexter lagras här
		this.list = {
			img: ["img/blank.png"],//Inledande värde
			caption: [""]//Inledande värde
		};
		this.imgIx = 0;
		this.timer = null;

		//console.log(this.list);
	}

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
		this.category = XMLcode.getElementsByTagName("category")[0].firstChild.data;//Hämtar kategorinamnet
		this.titleElem.innerHTML = this.category;//Referens för visning av kategorinamnet

		this.list = [];//Arrayen för bildobjekten nollställs
		//Data från XML-filerna läggs in i objektets array för bildobjekten
		for (let i = 0; i < urlElems.length; i++) {
			this.list.push({ img: urlElems[i].firstChild.data, caption: captionElems[i].firstChild.data }
			);
		};

		this.imgIx = 0;//Nollställer för aktuell bild
		this.showImage(); // Anropar funktion för att visa första bilden
	}

	// Visa bilden med index imgIx
	showImage() {
		let ix = this.imgIx;
		this.imgElem.src = this.list[ix].img;//Visar bilden

		this.captionElem.innerHTML = (ix + 1) + ". " + this.list[ix].caption; //Visar bildtexten
		
	}; // Slut visa bilden

	// Visa föregående bild
	prevImage() {

		let ix = this.imgIx;
		if (this.imgIx > 0) this.imgIx--; //Om bildindexet är större än noll backa till föregående
		else this.imgIx = this.list.length - 1; // Annars gå runt till sista bilden

		
		this.showImage();

	}; // Slut visa föregående bild

	// Visa nästa bild
	nextImage() {
		//let temp = e.currentTarget;
		//let ix = this.imgIx;
		if (this.imgIx < this.list.length - 1) this.imgIx++; //Om aktuell bild inte är den sista stega frammåt
		else this.imgIx = 0; // Annars gå runt till första bilden
		//this.imgIx = ix;
	
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

	// ----- Slut Constructorfunktion -----
}
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
	//Skapar händelehanterare för "piltangenterna"
	document.querySelector("#prevBtn").addEventListener("click", function () { imgViewer.prevImage(); }); //Bakåtpil
	document.querySelector("#nextBtn").addEventListener("click", function () { imgViewer.nextImage(); });//Frammåtpil

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

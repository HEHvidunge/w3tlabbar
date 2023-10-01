// ----- Constructorfunktion -----
class ImageViewer {
	constructor(id) {
		this.titleElem = document.querySelector("#" + id + " h3"),
			//console.log(this.titleElem);
			console.log(id);
		this.imgElem = document.querySelector("#" + id + " img"),
			this.captionElem = document.querySelector("#" + id + " p"),
			this.category = "";
		//this.category= document.querySelector("#" + id + " h3")
		this.list = {
			imgUrl: ["img/blank.png"],
			imgCaption: [""]
		},
			this.imgIx = 0,
			this.timer = null

	};
	//------Metoder kopplade till objektet ImageViewer------
	// Gör ett Ajax-anrop för att läsa in begärd fil
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
		let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
		let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
		//let titleElem = XMLcode.getElementsByTagName("imagelist");
		console.log(XMLcode.getElementsByTagName("category")[0].firstChild.data);

		imgViewer.titleElem = XMLcode.getElementsByTagName("category")[0].firstChild.data;
		console.log(imgViewer.titleElem);
		imgViewer.list.imgUrl = [];
		imgViewer.list.imgCaption = [];
		for (let i = 0; i < urlElems.length; i++) {
			imgViewer.list.imgUrl[i] = (urlElems[i].firstChild.data);
			imgViewer.list.imgCaption[i] = (captionElems[i].firstChild.data);

		}
		this.imgIx = 0;
		//console.log(imgViewer.titleElem);
		this.showImage(); // Visa första bilden
	}; // Slut

	// Visa bilden med index imgIx
	showImage() {

		this.imgElem.src = this.list.imgUrl[this.imgIx];

		this.captionElem.innerHTML = (this.imgIx + 1) + ". " + this.list.imgCaption[this.imgIx];
	}; // Slut visa bilden

	// Visa föregående bild
	prevImage() {
		if (this.imgIx > 0) this.imgIx--;
		else this.imgIx = this.list.imgUrl.length - 1; // Gå runt till sista bilden
		this.showImage();
	}; // Slut visa föregående bild

	// Visa nästa bild
	nextImage() {
		if (this.imgIx < this.list.imgUrl.length - 1) this.imgIx++;
		else this.imgIx = 0; // Gå runt till första bilden
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

//-------Initiering av händelsehanterare
function init() {
	imgViewer = new ImageViewer("imgViewer");
	document.querySelector("#categoryMenu").addEventListener("change",
		function () {
			imgViewer.requestImages("xml/images" + this.selectedIndex + ".xml");
			this.selectedIndex = 0;

		}
	);
	document.querySelector("#prevBtn").addEventListener("click", function () { imgViewer.prevImage(); });
	document.querySelector("#nextBtn").addEventListener("click", function () { imgViewer.nextImage() });
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

// ----- Constructorfunktion för objektet ImageViewer -----
class ImageViewer {
	constructor(id) {
		this.titleElem = document.querySelector("#" + id + " h3"),//Referens till elementet för rubriken
			this.imgElem = document.querySelector("#" + id + " img"),//Referens till elementet för bilden
			this.captionElem = document.querySelector("#" + id + " p"),//Referens till elementet för bildtexten
			this.category = "";
		this.list = {
			imgUrl: ["img/blank.png"],//Ingen bild vid start
			imgCaption: [""]//Ingen bildtext vid start
		},
			this.imgIx = 0,//Index för aktuell bild nollställs
			this.timer = null//Används ej

	};
	//------Metoder kopplade till objektet ImageViewer------
	// Gör ett Ajax-anrop för att läsa in begärd fil
	requestImages(file) {

		let request = new XMLHttpRequest(); // Object för Ajax-anropet
		request.open("GET", file, true);
		request.send(null); // Skicka begäran till servern
		request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
			if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
				if (request.status == 200) imgViewer.getImages(request.responseText); // status 200 (OK) --> filen fanns
				else window.alert("Den begärda resursen fanns inte.");//Felmeddelande om filen inte finns
		}
	};
	// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
	getImages(JSONText) {

		let data = JSON.parse(JSONText).image;//Hämtar data från JSON-filen
		let temp = JSON.parse(JSONText);//lokal variabel för att konvertera JSON-texten
		imgViewer.category = temp.category;//Hämtar kategorinamnet	
		

		this.titleElem.innerHTML = imgViewer.category;//Visar kategorinamnet


		imgViewer.list.imgUrl = [];//Nollställning av listor
		imgViewer.list.imgCaption = [];
		// Loopa igenom alla bilder och lägg in dem i listorna
		for (let i = 0; i < data.length; i++) {
			imgViewer.list.imgUrl[i] = data[i].url;//Lägger in bilderna i listan
			imgViewer.list.imgCaption[i] = data[i].caption;//Lägger in bildtexterna i listan


		}
		this.imgIx = 0; //Nollställer bildindex
		this.showImage(); // Visa första bilden
	}; // Slut

	// Visa bilden med index imgIx
	showImage() {
		//Visar bild
		this.imgElem.src = this.list.imgUrl[this.imgIx];
		//Visar bildtext
		this.captionElem.innerHTML = (this.imgIx + 1) + ". " + this.list.imgCaption[this.imgIx];
	}; // Slut visa bilden

	// Visa föregående bild
	prevImage() {
		//Om bilden inte är den sista i listan backa en bild
		if (this.imgIx > 0) this.imgIx--;
		// Annars gå runt till sista bilden
		else this.imgIx = this.list.imgUrl.length - 1;
		this.showImage();
	}; // Slut visa föregående bild

	// Visa nästa bild
	nextImage() {
		//Om det finns bilder kvar i listan gå frammåt en bild
		if (this.imgIx < this.list.imgUrl.length - 1) this.imgIx++;
		// Annars gå runt till första bilden
		else this.imgIx = 0; 
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

//-------Initiering och skapande av av händelsehanterare
function init() {
	imgViewer = new ImageViewer("imgViewer");//Initiering av class
	//Åberopar menyn och sparar valt alternativ
	document.querySelector("#categoryMenu").addEventListener("change",
		function () {
			imgViewer.requestImages("json/images" + this.selectedIndex + ".json");
			this.selectedIndex = 0;
		}
	);
	document.querySelector("#prevBtn").addEventListener("click", function () { imgViewer.prevImage(); });//Händelsehanterare för "föregående"-knapp
	document.querySelector("#nextBtn").addEventListener("click", function () { imgViewer.nextImage() });//Händelsehanterare för "nästa"-knapp
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

//-------Constructor------
class BookList {

    constructor() {
        this.result = document.getElementById("result");
       
    }
    //----Metoder-----
    requestData(file) {
        alert("requestData");
        let request = new XMLHttpRequest(); // Object för Ajax-anropet
        request.open("GET", file, true);
        request.send(null); // Skicka begäran till servern
        request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
            if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
                if (request.status == 200) bookList.getData(request.responseText); // status 200 (OK) --> filen fanns
                else window.alert("Den begärda resursen fanns inte.");//Felmeddelande om filen inte finns
        }
    };
    // Metod för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
    getData(JSONText) {
        alert("getData");
        let data = JSON.parse(JSONText).books;//Hämtar data från JSON-filen
        let temp = JSON.parse(JSONText);
        bookList.month = temp.month;//Hämtar kategorinamnet	
        console.log(bookList.month);
        console.log(data.length);
        console.log(bookList.length);
        let HTMLcode = "<h3> " + bookList.month + "</h3>";

        for (let i = 0; i < data.length; i++) {
            HTMLcode += "<p> <strong>" + "Författare: "+ data[i].author + "</strong> </p>";
            HTMLcode += "<p <strong>" + "Titel: " + data[i].title + "</strong> </p>";
            HTMLcode += "<p>" + "År: " + data[i].year + "</p>";
            HTMLcode += "<p>" + "Förläggare: " + data[i].publisher + "</p>";
            HTMLcode += "<p>" + "Startat läsa: " + data[i].reading.start + "</p>";
            HTMLcode += "<p>" + "Slutat läsa: " + data[i].reading.finish + "</p>";
            HTMLcode += "<p>" + "Bedömning: " + parseFloat(data[i].rating) + "</p>";
            HTMLcode += "<img src="+data[i].coverurl+" alt='bookcover' > <hr> <br>";


            alert(HTMLcode);
            
        }
        bookList.result.innerHTML = HTMLcode;

    }; // Slut
}


//---Initiering------
function init() {
    bookList = new BookList();
    btn = document.getElementById("showBooks");
    btn.addEventListener("click", bookList.requestData("json/august.json"));

}
window.addEventListener("load", init);

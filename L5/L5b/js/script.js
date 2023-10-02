//-------Constructorfunktion------
class BookList {

    constructor() {
        this.result = document.getElementById("result");//Referens till utskriftsfältet

    }

    //----Metod för att hämta data från JSON-fil-----
    requestData(file) {
        let request = new XMLHttpRequest(); // Object för Ajax-anropet
        request.open("GET", file, true);
        request.send(null); // Skicka begäran till servern
        request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
            if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
                if (request.status == 200) bookList.getData(request.responseText); // status 200 (OK) --> filen fanns
                else window.alert("Den begärda resursen fanns inte.");//Felmeddelande om filen inte finns
        }
    };
    // Metod för att tolka JSON-koden och skriva ut resultatet
    getData(JSONText) {
        //alert("getData");
        let data = JSON.parse(JSONText).books;//Hämtar data från JSON-filen
        let temp = JSON.parse(JSONText);
        bookList.month = temp.month;//Hämtar ut månad från JSON-filen
        //console.log(bookList.month);
        // console.log(data.length);
        //console.log(bookList.length);
        let HTMLcode = "<h3> " + bookList.month + "</h3>";//Rubrik med månad
        //Information samlas ihop och formatteras för utskrift
        for (let i = 0; i < data.length; i++) {
            HTMLcode += "<img src=" + data[i].coverurl + " alt='bookcover' > "; //Länk till bokomslag
            HTMLcode += "<p> <strong>" + "Titel: " + data[i].title + "</strong> </p>";//Boktitel
            HTMLcode += "<p> <strong>" + "Författare: " + data[i].author + "</strong> </p>";//Författarnamn
           
            HTMLcode += "<p>" + "År: " + data[i].year + "</p>";//Utgivningsår
            HTMLcode += "<p>" + "Förläggare: " + data[i].publisher + "</p>";//Förläggare
            HTMLcode += "<p>" + "Startat läsa: " + data[i].reading.start + "</p>";//Tidpunkt för start av läsning
            HTMLcode += "<p>" + "Slutat läsa: " + data[i].reading.finish + "</p>";//Tidpunkt för slut av läsning
            HTMLcode += "<p>" + "Bedömning: " + parseFloat(data[i].rating) + "</p> <hr> <br>";//Bedömning av boken



            // alert(HTMLcode);

        }
        bookList.result.innerHTML = HTMLcode;//Texten skickas för utskrift

    }; // Slut på metoderna
}//Slut på objektet


//---Initiering------
function init() {
    bookList = new BookList();//Initierar instans av objektet
    document.getElementById("showBooks").addEventListener("click", bookList.requestData("json/august.json"));//Initierar knapp

}
window.addEventListener("load", init);

//-------Constructor------
Class BookList {
    constructor(author,title,year,publisher,start,finish,rateing,coverurl){
        this.author=author,
        this.title=title,
        this.year=year,
        this.publisher=publisher,
        this.start=start,
        this.finish=finish,
        this.rateing=rateing,
        this.coverurl=coverurl

    };

}
showList (){

};

requestData(file){

};
getData(code){

};

//---Initiering------
function init(){

   btn= document.getElementById("writeBtn");
    btn.addEventListener("click",writeBook);
    result=document.getElementById("result");


}
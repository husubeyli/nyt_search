const APIKey = "ukKxjOAEXfSFMX9wCvHvztHeaM3oxZ1V";

$("#search").on("click", function() {
  let searchVal = $("#search_input").val().trim();
  let startDate = $("#start-date").val();
  let endDate = $("#end-date").val();
  let queryUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    APIKey +
    "&q=" +
    searchVal +
    "&begin_date=" +
    startDate +
    "0101&end_date=" +
    endDate +
    "0101";
  if (startDate === "" || endDate === "") {
    return false;
  }
  let fromStorageData = JSON.parse(getStorage("news"));
  
  if(isStorage(fromStorageData)){
    renderDOM(fromStorageData);
  }else{
      $.ajax({
        url: queryUrl,
        method: "GET",
        dataType: "json"
      }).then(NYTData => {
        let datas = NYTData.response;
        setStorage("news", datas.docs);
        renderDOM(datas);
      });
  }
});

function isStorage(fromStorageData){
    let sts = false;
    let searchVal = $("#search_input").val();
    fromStorageData.map(item => {  
        if(item.abstract.includes(searchVal)){      
            sts = true;
        }
    });
    return sts;
}

function setStorage(key, value) { //axtardigimiz title hisse ile daxil etdiyimiz soz uygun gelmediyi ucun islemir duzgun documentasiyaya baxib yeniden yazmaq lazimdi serti
  let newData = JSON.stringify(value);
  localStorage.setItem(key, newData);
}

function getStorage(key) { //Gelen datani yoxlayiram localstorage de yoxdusa olani gosterirem ve return edirem
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  return localStorage.getItem(key);
}

function renderDOM(fromSearchData) {
  $("#news").empty();
  let datas = fromSearchData;
  if(datas.docs == undefined){
    datas = {docs: fromSearchData};
  }
  let selectVal = $("#select").val();
  for (let i = 0; i < parseInt(selectVal); i++) {
    let div = document.createElement("div");
    div.className = "card-body";
    var h5 = document.createElement("h4");
    h5.className = "card-title";
    let span = document.createElement("span");
    span.className = "btn btn-secondary btn-sm";
    span.append(document.createTextNode(`${i + 1}`));
    let strong = document.createElement("strong");
    let link = document.createElement("a");
    link.setAttribute("href", datas.docs[i].web_url);
    link.setAttribute("target", "blank");

    let parapgrapgh = document.createElement("p");
    parapgrapgh.className = "card-text";
    parapgrapgh.append(document.createTextNode(datas.docs[i].pub_date));

    link.append(document.createTextNode(datas.docs[i].headline.main));
    let hr = document.createElement("hr");
    strong.append(link);
    h5.append(span);
    h5.append(strong);
    div.append(h5);

    div.append(parapgrapgh);

    div.append(hr);

    $("#news").append(div);
  }
}

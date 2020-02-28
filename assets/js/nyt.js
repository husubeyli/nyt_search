
let APIKey = "ukKxjOAEXfSFMX9wCvHvztHeaM3oxZ1V"


$('#search').on('click', function(){
    let selectVal = $('#select').val()
    let searchVal = $('#search_input').val()
    let startDate = $('#start-date').val();
    let endDate = $("#end-date").val();
    let queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+APIKey+"&q="+searchVal + "&begin_date="+startDate+"0101&end_date=" + endDate +"0101"
    if(startDate === '' || endDate === ''){
        return false;
    }

    $.ajax({
        url: queryUrl,
        method: "GET",
        dataType: 'json'
    }).then(NYTData =>{
        let data = NYTData.response

        // setStorage('news', data)
        // let dey = setStorage('news')
        
        for(let i =0; i < parseInt(selectVal); i++){
            console.log(data.docs[i]);
            let div = document.createElement('div');
            div.className ='card-body'
            var h5 = document.createElement('h4');
            h5.className = 'card-title';
            let span = document.createElement('span');
            span.className = 'btn btn-secondary btn-sm';
            span.append(document.createTextNode(`${i + 1}`))
            let strong = document.createElement('strong')
            let link = document.createElement('a');
            link.setAttribute('href', data.docs[i].web_url)
            link.setAttribute('target', 'blank')

            let parapgrapgh = document.createElement('p')
            parapgrapgh.className = 'card-text'
            parapgrapgh.append(document.createTextNode(data.docs[i].pub_date))

            link.append(document.createTextNode(data.docs[i].headline.main))
            let hr = document.createElement('hr')
            strong.append(link)
            h5.append(span)
            h5.append(strong)
            div.append(h5)  

            div.append(parapgrapgh)

            div.append(hr)

            $('#news').append(div)

        }
    })
})

function setStorage(key, value){ //gelen datani string edib push edirem localstorage
    let data = JSON.parse(getStorage(key));
    data.push(value);
    let newData = JSON.stringify(data)
    localStorage.setItem(key, newData)
}

function getStorage(key){ //Gelen datani yoxlayiram localstorage de yoxdusa olani gosterirem ve return edirem 
    if(localStorage.getItem(key) === null){
        localStorage.setItem(key, JSON.stringify([]));
    }
    return localStorage.getItem(key);
}

function clearPage(){
    $('#news').html('')
}

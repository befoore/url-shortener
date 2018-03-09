
let shortenBtn = document.getElementById('shortenBtn');

shortenBtn.addEventListener('click', function(){
    let longUrl = document.getElementById('longUrl').value;
    let shortUrl = document.getElementById('shortUrl').value;
    if(longUrl && shortUrl){
        let jsonURLs = {
            "short_url": shortUrl,
            "long_url": longUrl
        };
        //console.log(fetch('short', shortUrl));
        fetch('short', shortUrl).then(res => {
            if(res) alert('The given short url is already in use.');
            else newURI(jsonURLs); 
        }).catch(e => console.log(e));
         
    } else alert('Please fill both inputs.');
});




// REQUESTS

// Fetch all data from DB
let fetchAll = function(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/fetch/fetchall');
    xhr.onload = function(){
        if(xhr.status === 200){
            // Request success
            return JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
};


// Fetch a record from DB
// urlSize: String
// urlSize = short | long
let fetch = function(urlSize, uri){
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/fetch/'+urlSize+'/'+uri);
        xhr.onload = function(){
            if(xhr.status === 200 && xhr.responseText){
                // Request success
                //console.log(JSON.parse(xhr.responseText));
                resolve(JSON.parse(xhr.responseText));
            } else {
                resolve();
            }
        };
        xhr.send();
    })
    
};

// Insert new link
// data: JSON
let newURI = function(data){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/shorten');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.status === 200){
            // Request success
        }
    }
    xhr.send(JSON.stringify(data));
}
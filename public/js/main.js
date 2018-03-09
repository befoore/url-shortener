let shortenBtn = document.getElementById('shortenBtn');

// Listens to click event on the Shorten button.
shortenBtn.addEventListener('click', function(){
    let longUrl = document.getElementById('longUrl').value;
    let shortUrl = document.getElementById('shortUrl').value;

    // Checks if inputs are NOT empty
    if(longUrl && shortUrl){
        longUrl = attachProtocol(longUrl);
        // New JSON from url strings
        let jsonURLs = {
            "short_url": shortUrl,
            "long_url": longUrl
        };

        fetch('short', shortUrl).then(function(res) {
            if(res) alertMsg('error','The given short url is already in use.');
            else{
                newURL(jsonURLs);
                displayResultURL(location.protocol+"//"+location.host+'/'+shortUrl);
            } 
        }).catch(function(e){console.log(e)});
         
    } else alertMsg('error','Please fill both inputs.');
});

// Checks if entered string has http:// or https:// at the beginning and attaches if does not
// url: String
// return: String
let attachProtocol = function(url){
    if(url.slice(0,7) == "http://" || url.slice(0,8) == "https://") return url;
    else return 'http://'+url;
}

// Sets the given url to #result element
// return: void 
let displayResultURL = function(url){
    let resultEl = document.getElementById('result');
    let resultElAnchor = resultEl.getElementsByTagName('a')[0];

    if(!resultEl.classList.contains('show'))resultEl.classList.add('show');
    resultElAnchor.setAttribute('href', url);
    resultElAnchor.innerHTML = url;
}



// ALERT

let alertEl = document.getElementById('alert');
let delayRemove;

// type: String
// text: String
// type = success | error
// return: void
let alertMsg = function(type, text){
    clearTimeout(delayRemove);

    // Displays alert element
    let showAlert = function(){
        if(!alertEl.classList.contains('show')) alertEl.classList.add('show');
        if(!alertEl.classList.contains(type)) alertEl.classList.add(type);
        alertEl.innerHTML = text;
    }

    // Hides alert element
    let hideAlert = function(){
        if(alertEl.classList.contains('show')) alertEl.classList.remove('show');
        setTimeout(function(){
            if(alertEl.classList.contains(type)) alertEl.classList.remove(type);
            alertEl.innerHTML = null;
        }, 300);
        
    }
    
    showAlert();
    delayRemove = setTimeout(hideAlert, 2000);

}


// REQUESTS

// Fetch all data from DB
// return: JSON
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
// return: Promise 
let fetch = function(urlSize, uri){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/fetch/'+urlSize+'/'+uri);
        xhr.onload = function(){
            if(xhr.status === 200 && xhr.responseText){
                // Request success
                //console.log(JSON.parse(xhr.responseText));
                resolve(JSON.parse(xhr.responseText));
            } else {
                // No record found
                resolve();
            }
        };
        xhr.send();
    })
    
};

// Insert new URL pair
// data: JSON
// return: void
let newURL = function(data){
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
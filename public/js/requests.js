// Fetch data
// uri: String
// uri = fetchAll | id | shortURI | longURI
let fetch = function(uri){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/fetch/'.uri);
    xhr.onload = function(){
        if(xhr.status === 200){
            // Request success
            return JSON.parse(xhr.responseText);
        }else{
            // Request fail

        }
    };
    xhr.send();
};

// Insert new link
// data: JSON
let newURI = function(data){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/send');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        if(xhr.status === 200){
            // Request success
        }else{
            // Request fail
        }
    }
    xhr.send(JSON.stringify(data));
}
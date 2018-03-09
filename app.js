const express = require("express");
const app = express();
const sqlite = require('sqlite3').verbose(); 
const bodyParser = require('body-parser');
const path = require('path');

let db = new sqlite.Database('./db/links.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'views/index.html'));
});



// API

app.get('/api/fetch/fetchall', (req, res)=>{
    
    db.serialize( ()=>{
        db.all(`SELECT * FROM links`, (err, rows) => {
            let result = [];
            if (err) console.error(err.message);
            console.log(rows);
            rows.forEach(row => {
                result.push({
                    id:row.id,
                    url: row.short_url,
                    long_url: row.long_url
                });
            });
            res.send(result);
      });  
    });
});

app.get('/api/fetch/short/:record', (req, res)=>{
    db.serialize( ()=>{
        db.get(`SELECT * FROM links WHERE short_url = ?`,[req.params.record], (err, row) => {
            if(err) console.error(err.message);
                
            row 
            ? res.send({
                id:row.id,
                url: row.short_url,
                long_url: row.long_url
            })
            : res.send();
      });  
    });
});

app.get('/api/fetch/long/:record', (req, res)=>{
    db.serialize( ()=>{
        db.get(`SELECT * FROM links WHERE long_url = ?`,[req.params.record], (err, row) => {
            if(err) console.error(err.message);
                
            row 
            ? res.send({
                id:row.id,
                url: row.short_url,
                long_url: row.long_url
            })
            : res.send();
      });  
    });
});

app.post('/api/shorten', (req, res)=>{
    db.serialize( ()=>{
        db.run(`INSERT INTO links(short_url, long_url) VALUES(?,?)`,[req.body.short_url, req.body.long_url], (err) => {
            if(err) console.error(err.message);
            res.send();
      });  
    });
});

app.get('/:shortUrl', (req, res)=>{
    db.serialize( ()=>{
        db.get(`SELECT * FROM links WHERE short_url = ?`,[req.params.shortUrl], (err, row) => {
            if(err) console.error(err.message);
                
            row 
            ? res.redirect(row.long_url)
            : res.redirect('/');
      });  
    });
});

var server = app.listen(3000, null);



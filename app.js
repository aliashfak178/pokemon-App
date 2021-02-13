const express = require('express');
const requests = require('requests');
const app= express();
const PORT= process.env.PORT || 3000;

// Load Static Files
app.use(express.static("./views"))
// Middle Ware
app.use(express.urlencoded({extended:true}))

// Set Ejs
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    const count=898;
    let randNum = Math.floor(Math.random() * count) + 1;
    let pokemon_Name;
    let pokemon_Type;
        let URL = `https://pokeapi.co/api/v2/pokemon/${randNum}`;
         requests(URL)
        .on('data',async(chank)=>{
             const ObjData = JSON.parse(chank);
            // console.log(ObjData.name);
            //  console.log(ObjData.types[0].type.name);
             pokemon_Name = ObjData.name;
             pokemon_Type = ObjData.types[0].type.name;
             res.render('home',{Title:'Pokemon App',Name: pokemon_Name,Type: pokemon_Type,ImgNumber:randNum});
        })

});



app.listen(PORT,()=>{
    console.log(`Server Are running at Port: ${PORT}`)
});
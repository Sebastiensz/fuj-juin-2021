const fs=require("fs"); //filesystem qui est deja installé avec node
const path=require("path");


const dir=".";

const myFile=path.resolve(dir,"toto.txt");
try {
    const files =fs.readdirSync(dir);
    
    const file=files[0];
    
    
    fs.writeFileSync(myFile,"titi");
    
    const content = fs.readFileSync(myFile,{encoding:"utf-8"});
    
    
    fs.unlinkSync(myFile);
} catch (err) {
    console.log('err: ', err);
    
}

// on ecrit 4 appels bloquants à la suite donc pas bon
const fs=require("fs").promises; //filesystem qui est deja installé avec node
const path=require("path");


const dir=".";

const myFile=path.resolve(dir,"toto.txt");

const main=async()=>{
try {
    const files =await fs.readdir(dir);
    console.log('files: ', files);
    fs.writeFile(myFile,"titi"); 
    const content = await fs.readFile(myFile,{encoding:"utf-8"});
    await fs.unlink(myFile);
} catch (err) {
    console.log('err: ', err);
    
};
};
main()
// on ecrit 4 appels bloquants à la suite donc pas bon
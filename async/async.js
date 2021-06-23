const fs=require("fs"); //filesystem qui est deja installé avec node
const path=require("path");


const dir=".";

const myFile=path.resolve(dir,"toto.txt");
fs.readdir(dir,(err,result)=>{

    if(err){
        console.log('err: ', err);
    }

    //const file=files[0];
    fs.writeFile(myFile,"titi",(err)=>{
        if(err){
            console.log('err: ', err);
        }
         fs.readFile(myFile,{encoding:"utf-8"},(err,content)=>{
            if(err){
                console.log('err: ', err);
            }
            fs.unlink(myFile,(err)=>{
                if(err){
                    console.log('err: ', err);
                }
            });
        });
    });

});


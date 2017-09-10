const fs=require('fs');
const clc=require('cli-color');

module.exports=function (file,data,name) {
    try {
        fs.writeFileSync(file,data,{encoding:"utf8"});
        console.log(clc.bold.greenBright(name+' created :-)'));
        console.log();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
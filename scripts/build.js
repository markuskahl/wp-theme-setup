
const package=require('./../package.json');
const write=require('./write');

/********************* version.json ************************* */
var VersionJson=`{
    "version": "${package.version}",
    "buidtime":"${new Date().getTime()}",
    "author":"${package.author}",
    "license":"${package.license}",
    "description":"${package.description}"
}`;

write(__dirname+"/../release/"+package.name+"/version.json",VersionJson,"version.json");

/********************* style.css ************************* */
var StyleCSS=`/*
* Theme Name: ${package.name}
* Theme URI: ${package.theme_uri}
* Author: ${package.author}
* Author URI: ${package.author_uri}
* Description: ${package.description}
* Version: ${package.version}
* License: ${package.license}
* License URI: ${package.license_uri}
* Text Domain: ${package.textdomain}
*/`;

write(__dirname+"/../release/"+package.name+"/style.css",StyleCSS,"style.css");
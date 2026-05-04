let current_photos = [];
let index = 0;
let slide = 0;

"use strict";


function loadPhotos() {

    // Get all important text
    const folder = document.getElementById("folder").value;
    const common = document.getElementById("name").value;
    const start = parseInt(document.getElementById("startNumber").value);
    const end = parseInt(document.getElementById("endNumber").value);
    let error = document.getElementById("Status");
    // check if start and end are valid
    if (start >= end){
        
        error.innerHTML = "<p> Error: Invalid Range </p>";
    } else {
        current_photos = [];

    // add all images
    for(let i = start; i <= end; i++){
        current_photos.push(folder + common + i + ".jpg");
    }
    
    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");
    
    // created incase images are not valid files
    curr.onload = () => {
    };
    curr.onerror = () => {
        alert("not a valid image");
        curr.src ="InitialImage.jpg";
        photo.value = "";
        current_photos = [];
    };

    // display first image
    curr.src = current_photos[0];
    index = 0;
    if (current_photos[0] === undefined) {
        photo.value = "";
    } else {
        photo.value = current_photos[0];
        error.innerHTML = "<p>Photo Viewer System</p>";
    }
    
}
}


function nextPhoto(){

    // checking if there is any images
    if (current_photos.length == 0){
        let error = document.getElementById("Status");
        error.innerHTML = "<p> Error: you must load data first </p>";
    } else {

    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");

    // go to next image in array, or 0 if at the end
    if (index == current_photos.length - 1){
       index = 0;
       curr.src = current_photos[0]; 
       photo.value = current_photos[0];
    } else {
        index++;
        curr.src = current_photos[index];
        photo.value = current_photos[index];
    }
    }
}

function prevPhoto(){

    // checking if there is any images
    if (current_photos.length == 0){
        let error = document.getElementById("Status");
        error.innerHTML = "<p> Error: you must load data first </p>";
    } else {

    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");

    // go back to previous image, go to the end of array if at 0
    if (index == 0){
       index = current_photos.length - 1;
       curr.src = current_photos[current_photos.length - 1]; 
       photo.value = current_photos[current_photos.length - 1];
    } else {
        index--;
        curr.src = current_photos[index];
        photo.value = current_photos[index];
    }
    }
}


const first = () => {
    if (current_photos.length == 0){
        let error = document.getElementById("Status");
        error.innerHTML = "<p> Error: you must load data first </p>";
    } else {
    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");
    index = 0;
    curr.src = current_photos[0];
    photo.value = current_photos[index];
    }
};

const last = () => {
    if (current_photos.length == 0){
        let error = document.getElementById("Status");
        error.innerHTML = "<p> Error: you must load data first </p>";
    } else {
    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");
    index = current_photos.length - 1;
    curr.src = current_photos[index];
    photo.value = current_photos[index];
    }
};


async function loadJSON(){
    let file = document.getElementById("url").value;
    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");

    const response = await fetch(file);
    console.log(`***** Response *****`);
    console.log(response);
        
    console.log(`***** JSON *****`);
    const json = await response.json();
    console.log(json);

    current_photos = [];

    // get image links inside the json file
    for (let i = 0; i < json.images.length; i++) {
        current_photos.push(json.images[i].imageURL);
    }

    curr.onload = () => {
    };
    curr.onerror = () => {
        alert("not a valid image");
        curr.src ="InitialImage.jpg";
        photo.value = "";
        current_photos = [];
    };

    // same loading method
    curr.src = current_photos[0];
    index = 0;
    if (current_photos[0] === undefined) {
        photo.value = "";
    } else {

        // using querySelector here
        let error = document.querySelector("#Status");
        error.innerHTML ="<p>Photo Viewer System</p>";
        photo.value = current_photos[0];
        
    }
}

let idGlobal;
const intervalInMilliseconds = 1000;


function randomSlideShow(){
    // choses image in array randomly
    let rand = Math.floor(Math.random() * current_photos.length);
    let curr = document.getElementById("currImage");
    let photo = document.getElementById("currentPhoto");

    curr.src = current_photos[rand]; 
    photo.value = current_photos[rand];
    index = rand;

}

function startSlides(){
    if (current_photos.length == 0){
        let error = document.getElementById("Status");
        error.innerHTML = "<p> Error: you must load data first </p>";
    } else {
        clearInterval(idGlobal);
        idGlobal = setInterval("nextPhoto()", intervalInMilliseconds);
    }
}

function slidesRandom(){
    if (current_photos.length == 0){
        let error = document.getElementById("Status");
        error.innerHTML = "<p> Error: you must load data first </p>";
    } else {
        clearInterval(idGlobal);
        idGlobal = setInterval("randomSlideShow()", intervalInMilliseconds);
    }
}

function stop(){
    clearInterval(idGlobal);
}

function reset() {
    // clearing all the text boxes
    document.getElementById("folder").value = "";
    document.getElementById("name").value = "";
    document.getElementById("startNumber").value = "";
    document.getElementById("endNumber").value = "";
    document.getElementById("url").value = "";
    document.getElementById("currentPhoto").value = "";

    // make image back to the default
    document.getElementById("currImage").src = "InitialImage.jpg";

    // reset status message
    document.getElementById("Status").innerHTML = "<p>Photo Viewer System</p>";

    // stop slideshow
    clearInterval(idGlobal);

    // get rid of data
    current_photos = [];
    index = 0;
}

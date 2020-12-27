const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const photoCredit = document.querySelector('#photo-credit');

let photosArray = [];
let ready = false;
let imageLoaded = 0;
let totalImages = 0;
// for dev tool testing
console.log('testing');
// Unsplash API 
const count = 5
const apiKey = `BJJuoPorwuuGN8b-XwORjtV6mltxLej89blLhT9rqf4`
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageloaded(){
    imageLoaded++;
    if (imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }

}
// Helper Function to Set Attributes on DOM Elemensts
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
// create elements for links and photos and add to DOM
function displayPhotos(photosArray){
    // run function for each objevt in photosArray
    imageLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(element => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: element.links.html,
            target: '_blank'
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: element.urls.regular,
            alt: element.alt_description,
            title: element.alt_description
        });
        img.addEventListener('load', imageloaded());
        item.appendChild(img);
        const credit = document.createElement('p');
        credit.textContent  = `Photo by ${element.user.name} on Unsplash`;
        item.appendChild(credit);
        imageContainer.appendChild(item);
        // imageContainer.appendChild(photoCredit);
    });
}
async function getPhotos(){

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos(photosArray)

    } catch (error) {
        // catch error
    }
}

// check to see if scrolling near bottom of page, load More Photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    ready = false;
    getPhotos();
    // console.log('load more')
});
getPhotos();


function getBreedImages() {
    fetch(`https://dog.ceo/api/breed/${breed.value}/images/random`)
    .then(response => response.json()) //takes the info sent by server
    .then(responseJson => displayImage(responseJson))
    //.catch(error => alert("Arf? Something went wrong!")) //displays an error message if for some reason the app is unable to retretrieve from the server.
}

function randomizerClick() {
    $('form').submit(event => {
        event.preventDefault()
        getBreedImages()
    })
}

function displayImage(responseJson) {
    $('.results-img').html(`<img src="${responseJson.message}" />`)
    //$('.results h2').html()
}

$(function() {
randomizerClick()
});

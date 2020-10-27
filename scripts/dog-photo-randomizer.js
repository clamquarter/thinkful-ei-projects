
function getDogImages() {
    fetch(`https://dog.ceo/api/breeds/image/random/${number.value}`)
    .then(response => response.json()) //takes the info sent by server
    .then(responseJson => displayImages(responseJson))
    .catch(error => alert("Arf? Something went wrong!")) //displays an error message if for some reason the app is unable to retretrieve from the server.
}



function displayImages(responseJson) {
    //should update the DOM with the random images requested by the user.
    let photos = ''
    for (let i=0; i<responseJson.message.length; i++) {
        photos += `<img src="${responseJson.message[i]}" />`
    }
    $('.results-img').html(photos)
    $('.results h2').html(`Wow, such fluff! ${number.value * 4} paws.`)
    //$('.results'.removeClass('hidden'))
}

function randomizerClick() {
    $('form').submit(event => {
        event.preventDefault()
        getDogImages()
    })
}



$(function() {
    console.log('Seems the app has loaded!')
    randomizerClick()
})

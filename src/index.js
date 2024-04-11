/// / QUERY SELECTORS ////
    //Ramen menu | Ramen images also go here //
        const ramenMenu = document.querySelector('#ramen-menu');

    //Ramen update form //
        const updateRamenMenu = document.querySelector('#edit-ramen');

        const updatedRating = document.querySelector('#new-rating');
        const updatedComment = document.querySelector('#new-comment');
        const deleteBtn = document.querySelector('#delete');
    
    //Ramen details //
        const ramenImg = document.querySelector('.detail-image');
        const ramenName = document.querySelector('.name');
        const restaurant = document.querySelector('.restaurant');
        const ramenRatingDisplay = document.querySelector('#rating-display');
        const ramenComment = document.querySelector('#comment-display');
        
    
    //Ramen Input Form //
        const newRamenName = document.getElementById('new-name');
        const newRestaurant = document.getElementById('new-restaurant');
        const newRamenImg = document.getElementById('new-image');
        const newRamenRating = document.getElementById('n-rating');
        const newRamenComment = document.getElementById('n-comment');
        const newRamenForm = document.getElementById('new-ramen');

    //Global variable //
    let selectedRamenId = null;
/// / FUNCTIONS ////

document.addEventListener('DOMContentLoaded', () => {
    fetchRamen();
})

function displayRamen(ramen){
    const imgElement = document.createElement('img');
    imgElement.src = ramen.image;
    imgElement.id = ramen.id;
    
    ramenMenu.appendChild(imgElement);
}

function fetchRamen(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramenData => {
        ramenData.forEach(ramen => {
            displayRamen(ramen);
        })
    })
}

function ramenDetails(ramen){
    ramenImg.src = ramen.image;
    ramenName.textContent = ramen.name;
    restaurant.textContent = ramen.restaurant;
    ramenRatingDisplay.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;
    

    updatedComment.textContent = ramen.comment;
    updatedRating.textContent = ramen.rating;
    
}

function resetRamenFormAndDetails(){
    ramenMenu.innerHTML = ``
    ramenImg.src = './assets/image-placeholder.jpg'
    ramenName.innerText = 'Insert name here'
    restaurant.innerText = 'Insert resaurant here'
    ramenRatingDisplay.innerText = ''
    ramenComment.innerText = 'Insert comment here'
}

/// / EVENT LISTENERS ////
ramenMenu.addEventListener('click', (e) => {
    if(e.target.tagName === "IMG"){
        const ramenId = e.target.id;
        selectedRamenId = ramenId;
        fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then(res => res.json())
        .then(data => {
            ramenDetails(data);
        })
    }
})

newRamenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nRamenName = newRamenName.value;
    const nRestaurant = newRestaurant.value;
    const nImage = newRamenImg.value;
    const nRating = newRamenRating.value;
    const nComment = newRamenComment.value;

    const newRamen = {
        name: nRamenName,
        restaurant: nRestaurant,
        image: nImage,
        rating: nRating,
        comment: nComment
    }
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
    .then(res => res.json())
    .then(data => {
        displayRamen(data);
        newRamenForm.reset();
    })
})

updateRamenMenu.addEventListener('submit', (e) => {
    e.preventDefault()
    const ramenId = selectedRamenId;
    const newRating = updatedRating.value;
    const newComment = updatedComment.value;

    const updatedRamen = {
        rating: newRating,
        comment: newComment
    }
    fetch(`http://localhost:3000/ramens/${ramenId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedRamen)
    })
    .then(res => res.json())
    .then(data => {
        ramenDetails(data);
    })
})

/*
create delete button
delete button will remove the selected ramen from server, ramen menu div, and ramen details

delete button needs:
    addeventlistener for click event
    when clicked it will remove the selected ramen from ramen menu div
    and ramen details will be reset
    call delete ramen function
delete ramen function contains:
    fetch ramen data and id from server
    delete method
    headers 
*/

deleteBtn.addEventListener('click', () => {
    const ramenId = selectedRamenId;
    fetch(`http://localhost:3000/ramens/${ramenId}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
    })
    resetRamenFormAndDetails();
    fetchRamen();
    


})

const gallery  = $('#gallery');
const urlApi = 'https://randomuser.me/api/?nat=us&inc=picture,name,email,location,dob,phone&results=12';
const body = $('body');
addSearch();
const inputValue = $('#search-input');
/**** Default way  ****/
// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200){
//         let result = JSON.parse(this.responseText)
//         // console.log(result.results)
//         results = result.results;
//         for (let i = 0 ; i < results.length; i++){
//             data = results[i];
//             cardAdd(data);
//         }
        // eventListener(data);
//     }
// };
// request.open('GET', url, true);
// request.send();
/*** End Default */

/**** Promises *****/
// getData(urlApi)
//     .then(data => {
//         console.log(data)
//         data = data.results;
//         console.log(data)
//         for(let i = 0; i < data.length; i++){
//             // data[i].counter = i;
//             Ndata = data[i];
//             addCards(Ndata);
//             // console.log(data[i]);
//         }
//         console.log(data)
//         eventListener(data);
//     })
//     .catch( err => console.log(err))
// function getData(url) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', url);
//         xhr.onload = () => {
//             if (xhr.status === 200){
//                 let data = JSON.parse(xhr.responseText);
//                 resolve(data);
//             }else{
//                 reject( Error(xhr.statusText) );
//             }
//         };
//         xhr.onerror = () => reject( Error('A network Error Accurred') );
//         xhr.send();
//     });
// }
/*** End Promises ****/

/**** Fetch ****/
// 
fetch(urlApi)
    .then(response => response.json()) // change data to json format
    .then(
        data => {
            data = data.results;
            for(let i = 0; i < data.length; i++){ // fetch data and show it to the user 
            Ndata = data[i];
            addCards(Ndata);
        }
        eventListener(data);  
    }
    )
/**** End Fetch ****/
// This
function addCards(data){
    // this fucntio is used to add a new card user to the page .....
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div> 
    `;
    gallery.append(html)
}
function eventListener(user) {
    // this function to show modal belong to card clicked 
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', () => {
                // console.log(cards[i])
                addModal(user,i);
                nextPrev(user,i);
                
        })
    }
}
function nextPrev(user,i){
    // this function to aviod error at beginnig and the end of users when you toggle back and forth between users
    const modal = $('div.modal-btn-container > button');
    modal.on('click', (e)=>{
        if (e.target.type === 'button'){
            if(e.target.id === 'modal-prev'){
                $('.modal-container').remove();
                if(i === 0) { 
                    i = user.length;
                }
                addModal(user,i-1);
                console.log(i-1);
            }else if (e.target.id === 'modal-next'){
                $('.modal-container').remove();
                if (i >= user.length -1) {
                    i = 0;
                }
                addModal(user,i+1);
                console.log(i+1);
            }
        }
    })
}
function addModal(allData,i){
    // this to add modal using json data and html markup when the user click on a card .....
    data = allData[i];
    let address = data.location;
    let name = data.name;
    const html = `
        <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${address.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${address.street.number} ${address.street.name}, ${address.city}, ${address.state} ${address.postcode}</p>
                <p class="modal-text">Birthday: ${data.dob.date.slice(0, 10)}</p>
            </div>
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    body.append(html);
    closeModal();
    nextPrev(allData,i);
    console.log(data)
}
function closeModal(){
    // this function is used to close the modal when the X button is clicked 
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener('click', () => {
        $('.modal-container').remove();
    })
}
function addSearch(){
    // add search form the page :)
    const searchCont = $('div.search-container')
    const html = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;
    searchCont.append(html);
}
function filterData(){
    // this functio is used to filter data on the page when the user start typing on the search input 
    let searchList = [];
    const usersList = $('.card');
    const name = $('.card-name');
    const error = $('<p class="error">Please Try Again</p>').css('color', 'red');
    for(let i =0; i < usersList.length; i++){
        usersList[i].style.display = 'none';
    }
    for(let i = 0; i < name.length; i++ ) {
        if (name[i].textContent.includes(inputValue.val())) {
            searchList.push(usersList[i]); // to check if there is any data is founded and pushit to the searchList array 
            usersList[i].style.display = 'block';
        }
    }
    if (searchList.length === 0 ){ // show error message when no data is found
        // console.log('Nothing');
        if(!$('.error').length){
            $('.header-text-container').append(error);
        }
    }else {
        if($('.error').length){
            $('.error').remove();
        }
    }
    // console.log('hhhhhhhh');

}
inputValue.on('keyup', filterData);
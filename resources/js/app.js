const axios = require('axios');

let allSelects = document.querySelectorAll('.select'),
    btnTop = document.querySelector('#btn');

for (i = 0; i < allSelects.length; ++i) {
    addListener(allSelects[i], 'change', requestAPI)
}


function requestAPI() {
    selectUnchanged = false;
    for (i = 0; i < allSelects.length; ++i) {
        if ((allSelects[i].selectedIndex == 0)) {
            selectUnchanged = true
            break
        }
        else {
            selectUnchanged = false
        }
    }
    if (!selectUnchanged) {
        loading()
        const sun = document.querySelector('#sunlight').value,
            water = document.querySelector('#water').value,
            pets = false;

        axios.get(`https://6nrr6n9l50.execute-api.us-east-1.amazonaws.com/default/front-plantTest-service?sun=${sun}&water=${water}&pets=${pets}`)
            .then(function (response) {
                data = response.data
                fillList(data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
function loading() {
    document.querySelector('#scroll').scrollIntoView();
    document.querySelector('#no-results').classList.add('-hide')
    document.querySelector('#data-results').classList.remove('-hide')
    document.querySelector('#data-results').classList.add('animate')
}
function fillList(data) {
    let appendElement = document.querySelector('#list')
    appendElement.innerHTML = "";
    data.forEach((element, index) => {
        list = `<li class="card-item">
                    <img class="thumb" src="${element.url}">
                    <h4 class="name">${element.name}</h4>
                    <p class="price">$${element.price}</p>
                    <div class="list-info">
                        <img src="/assets/images/pet-${element.toxicity}.svg">
                        <img src="/assets/images/sun-${element.sun}.svg">
                        <img src="/assets/images/water-${element.water}.svg">
                    </div>
                </li>`
        appendElement.insertAdjacentHTML('beforeend', list);
        document.querySelector("#list-results").classList.remove('-hide')
        document.querySelector('.loading').classList.add('-hide')

    });
}
function addListener(element, type, func, funcParams) {
    element.addEventListener(type, function () {
        func(funcParams)
    })
}

function scrollTo(x, y) {
    window.scroll(x, y);
}

addListener(btnTop, "click", scrollTo.bind(this, 0, 0))



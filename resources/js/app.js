const axios = require('axios');

let allSelects = document.querySelectorAll('select');

for (i = 0; i < allSelects.length; ++i) {
    allSelects[i].addEventListener('change', () => {
        requestAPI()
    });
}

function requestAPI() {
    selectUnchanged = false;
    for (i = 0; i < allSelects.length; ++i) {
        if ((allSelects[i].selectedIndex == 0)) {
            selectUnchanged = true
        }
        else {
            selectUnchanged = false
        }
    }
    if (!selectUnchanged) {
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

function fillList() {
    let appendElement = document.getElementById('list')
    appendElement.innerHTML = "";
    data.forEach((element, index) => {
        list = `<li>
                    <h1>${element.name}</h1>
                    <img src="${element.url}">
                    <p>Sun: ${element.sun}</p>
                    <p>Water: ${element.water}</p>
                    <p>Toxicity: ${element.toxicity}</p>
                </li>`
        appendElement.insertAdjacentHTML('beforeend', list);
    });
}
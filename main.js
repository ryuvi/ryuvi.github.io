function set_extension(number) {
    return number > 9 ? number : `0${number}`
}

setInterval(() => {
    let data = document.getElementById('date')
    let date = new Date();
    let wkday = ''
    let year = set_extension(date.getFullYear())
    let month = set_extension(date.getMonth() + 1)
    let day = set_extension(date.getDate())
    let hours = set_extension(date.getHours())
    let minutes = set_extension(date.getMinutes())
    let seconds = set_extension(date.getSeconds())

    switch (date.getDay()) {
        case 0:
            wkday = "Sunday";
            break;
        case 1:
            wkday = "Monday";
            break;
        case 2:
            wkday = "Tuesday";
            break;
        case 3:
            wkday = "Wednesday";
            break;
        case 4:
            wkday = "Thursday";
            break;
        case 5:
            wkday = "Friday";
            break;
        case 6:
            wkday = "Saturday";
            break;
    }

    let result = `<span>${wkday}</span> ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

    data.innerHTML = result;
}, 1000);

fetch('./data/links.json')
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById('table')
        let arr_cat = []

        for (let i = 0; i < data.length; i++) {
            if (!arr_cat.includes(data[i].category))
                arr_cat.push(data[i].category)
        }


        for (let i = 0; i < arr_cat.length; i++) {
            let ul = document.createElement('ul');
            ul.setAttribute('id', arr_cat[i])
            let li = document.createElement('li');
            li.innerHTML = `<h1 class="list-title">${arr_cat[i]}</h1>`
            ul.appendChild(li)
            table.appendChild(ul)
            if (i != arr_cat.length - 1) {
                let hr = document.createElement('hr')
                table.appendChild(hr)
            }
        }

        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.setAttribute('href', `https://${data[i].url}`)
            a.innerText = data[i].name

            li.appendChild(a)

            document.getElementById(data[i].category).appendChild(li)
        }
    })

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

fetch('./data/thoughs.json')
    .then(response => response.json())
    .then(data => {
        let randNumber = getRandomInteger(0, data.length)
        let p = document.getElementById('though')
        console.log(data[randNumber])

        p.innerHTML = `"${data[randNumber].though}" - <span>${data[randNumber].credit}</span>`
    })

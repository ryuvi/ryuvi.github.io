function set_extension(number) {
    return number > 9 ? number : `0${number}`
}

setInterval(() => {
    let data = document.getElementById('date')
    let date = new Date();
    let wkday = ''
    let year = set_extension(date.getFullYear())
    let month = set_extension(date.getMonth()+1)
    let day = set_extension(date.getDate())
    let hours = set_extension(date.getHours())
    let minutes = set_extension(date.getMinutes())
    let seconds = set_extension(date.getSeconds())

    switch(date.getDay()) {
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

    let result = `{${wkday}} {${day}/${month}/${year}} {${hours}:${minutes}:${seconds}}`

    data.innerText = result;
}, 1000);

fetch('links.json')
    .then(response => response.json())
    .then(data => {
        let social = document.getElementById('social')
        let tech = document.getElementById('tech')
        let other = document.getElementById('others')
        
        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.setAttribute('href', data[i].url)
            a.innerText = data[i].name

            li.appendChild(a)
            console.log(a)

            switch(data[i].category) {
                case 'social':
                    social.appendChild(li)
                    break;
                case 'tech':
                    tech.appendChild(li)
                    break;
                case 'others':
                    other.appendChild(li)
                    break;
            }
        }
    })
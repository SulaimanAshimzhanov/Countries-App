const baseURL = `https://restcountries.com/v3.1`

const regianData = [
    {
        id: 1,
        caption: "All",
        route: "all"
    },
    {
        id: 2,
        caption: "Africa",
        route: "africa"
    },
    {
        id: 3,
        caption: "Europe",
        route: "europe"
    },
    {
        id: 4,
        caption: "Americas",
        route: "americas"
    },
    {
        id: 5,
        caption: "Asia",
        route: "asia"
    },
    {
        id: 6,
        caption: "Oceania",
        route: "oceania"
    }
]

const navContainer = document.querySelector(".nav_container");

const cardContainer = document.querySelector(".row");

const regionnText = document.querySelector(".region");

const signOut = document.querySelector(".signOut");

const category = {
    getAll: "all",
    region: "region",
    name: "name"
}


function RegianItems(base) {
    const template = base.map(item => `
        <li onclick="getRoute('${item.route}', '${item.caption}')">
            ${item.caption}
        </li>
    `).join(" ");

    navContainer.innerHTML = template;
}


window.addEventListener("load", () => {
    RegianItems(regianData)

    getData(category.getAll, (response) => cardTemplate(response));

    regionnText.innerHTML = "All";
})


function getData(route, cb) {
    fetch(`${baseURL}/${route}`)
        .then(response => response.json())
        .then(response => cb(response))
}


function cardTemplate(base) {
    const template = base.map(item => `
        <div class="card">
            <h2>${item.name.common}</h2>

            <img src="${item.flags.svg}" alt="">

           <button onclick="getMore('${item.name.common}')">More</button>
        </div>
    `).join(" ");

    cardContainer.innerHTML = template;
}


function getRoute(route, caption) {
    regionnText.innerHTML = caption;
    route === "all"
        ? getData(category.getAll, response => cardTemplate(response))
        : getData(`${category.region}/${route}`, response => cardTemplate(response));
}


function getMore(name) {
    getData(`${category.name}/${name}`, response => cardMore(response));
}


function cardMore(base) {
    console.log(base);
    const template = base.map(item => `
        <div class="withCountries">
            <div class="CountiesContent">
                <button class="btn" onclick="cardTemplate('${item}')">Back</button>
                <h2>name: ${item.name.common}</h2>
                <h2>fifa: ${item.fifa}</h2>
                <h2>car: ${item.car.side}</h2>
                <h2>cca2: ${item.cca2}</h2>
                <h2>cca3: ${item.cca3}</h2>
                <h2>cioc: ${item.cioc}</h2>
                <h2>continents: ${item.continents}</h2>
                <h2>population: ${item.population}</h2>
                <h2>region: ${item.region}</h2>
                <h2>subregion: ${item.subregion}</h2>
                <h2>startOfWeek: ${item.startOfWeek}</h2>
                <h2>status: ${item.status}</h2>
            </div>
            <div class="CountriesImage">
                <img src="${item.flags.svg}" alt="">
                <img src="${item.coatOfArms.svg}">
            </div>
        </div>
    `).join(" ");

    cardContainer.innerHTML = template
}


signOut.addEventListener("click", (btn) => {
    btn.preventDefault();

    localStorage.setItem("access_token", "false");

    localStorage.setItem("currentUser", null);

    window.open("../auth.html", "_self");
})
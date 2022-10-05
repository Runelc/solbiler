let storage = window.sessionStorage;

let biler;
async function loadBiler() {
    const response = await fetch('biler.json');
    biler = await response.json();
    bilInfo();
}

loadBiler();

let bil_billede = document.getElementById("bil_billede");
let brand = document.getElementById("brand");
let kategori = document.getElementById("kategori");
let antalPersoner = document.getElementById("antal_personer");
let antalKufferter = document.getElementById("antal_kufferter");
let afhentning = document.getElementById("afhentning");
let aflevering = document.getElementById("aflevering");
let antalLejeDage = document.getElementById("antal_leje_dage");
let prisForsikring = document.getElementById("pris_forsikring");
let lejePrisPrDag = document.getElementById("leje_pris_pr_dag");
let klassetillæg = document.getElementById("klassetillæg");
let ekstraUdstyr = document.getElementById("ekstra_udstyr");
let DKK = document.getElementById("DKK");

let total;
const checkbokse = document.querySelectorAll(".iliste")

function bilInfo() {
    const id = storage.getItem("ordernum");
    const afhent = storage.getItem("afhent");
    const aflever = storage.getItem("aflever");
    const lejedage = storage.getItem("lejedage");
    bil_billede.src = biler[id].billede;
    brand.innerHTML += " " + biler[id].bilmaerke;
    kategori.innerHTML += " " + biler[id].kategori;
    antal_personer.innerHTML += " " + biler[id].personer;
    antalKufferter.innerHTML += " " + biler[id].kufferter;
    afhentning.innerHTML += " " + afhent;
    aflevering.innerHTML += " " + aflever;
    antalLejeDage.innerHTML += " " + lejedage;
    prisForsikring.innerHTML += " " + biler[id].lejepris + ",-";
    klassetillæg.innerHTML += " " + biler[id].tillaeg + ",-";

    total = Math.round((biler[id].lejepris + (lejedage * 100) + (lejedage * biler[id].tillaeg)) * (1 + 0.25));

    DKK.innerHTML += " " + total + ",-";
}

// Array til tilføjelse af valgte ekstra udstyr 
let udstyrliste = [];

const udstyr = document.getElementById("udstyr-liste");

// Tilføjelse af pris fra ekstra udstyr, samt tilføjelse af emner til array 
for (const checkboks of checkbokse) {
    checkboks.addEventListener("change", function () {
        if (this.checked) {
            // hvis der vælges en vare skal prisen ligges til
            total += parseInt(this.value)
            DKK.innerHTML = "<span>" + "DKK:" + "</span>" + " " + total + ",-";
            // push for at få navnet op i vores array så man kan se valgte ekstra udstyr
            udstyrliste.push(checkboks.name);
            udstyr.innerHTML = '';
            udstyrliste.forEach(item => {
                udstyr.insertAdjacentHTML("beforeend", `<p class="bestilling-info">${item}</p>`)
            })
        } else {
            // Hvis der ikke er valgt nogen checkbokse skal prisen trækkes fra. 
            //parseInt for at lave strings om til tal hentet fra vores form i udstyr.html
            total -= parseInt(this.value)
            DKK.innerHTML = "<span>" + "DKK:" + "</span>" + " " + total + ",-";
            // filter til at fjerne valgte emner fra vores array 
            udstyrliste = udstyrliste.filter(item => item !== checkboks.name);
            udstyr.innerHTML = '';
            udstyrliste.forEach(item => {
                udstyr.insertAdjacentHTML("beforeend", `<p class="bestilling-info">${item}</p>`)
            })

        }

    })
}

document.getElementById("videre_knap").addEventListener("click", () => {
    storage.setItem("total", total)
    storage.setItem("udstyrsListe", JSON.stringify(udstyrliste))
})
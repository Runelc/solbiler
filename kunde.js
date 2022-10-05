const storage = window.sessionStorage;

const total = storage.getItem("total");
let totalindhold = document.getElementById("totalindhold");
totalindhold.innerHTML += " " + total + " " + "DKK";

// Afhentings dato 
const afhentDag = storage.getItem("afhent");
let afhent_dag = document.getElementById("afhent_dag");
afhent_dag.innerHTML += " " + afhentDag;

// Afleverings dato 
const afleveringsDag = storage.getItem("aflever");
let aflevering_dag = document.getElementById("aflevering_dag");
aflevering_dag.innerHTML += " " + afleveringsDag;

// Antal dage
const antalDag = storage.getItem("lejedage");
let antal_dage = document.getElementById("antal_dage");
antal_dage.innerHTML += " " + antalDag;

// udstyrs liste
const udstyrsListe = JSON.parse(storage.getItem("udstyrsListe"));
let udstyr_liste = document.getElementById("udstyr_liste");
udstyrsListe.forEach(item => {
    udstyr_liste.insertAdjacentHTML("beforeend", `<li>${item}</li>`)
})


// Hentning af oplysning på kunder 
const FORMULAR = document.getElementById("formular");
FORMULAR.addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("fornavn", document.getElementById("fornavn").value);
    sessionStorage.setItem("efternavn", document.getElementById("efternavn").value);
    sessionStorage.setItem("vejnavn", document.getElementById("vejnavn").value);
    sessionStorage.setItem("vejnr", document.getElementById("vejnr").value);
    sessionStorage.setItem("postnr", document.getElementById("postnr").value);
    window.location.href = "kvittering.html";
})


fetch("https://api.dataforsyningen.dk/postnumre")
    .then(function (data) {
        return data.json();
    })
    .then(function (post) {
        const PBLISTE = document.getElementById("pbliste");
        for (const oplysninger of post) {
            PBLISTE.insertAdjacentHTML("beforeend", "<option>" + oplysninger.nr + " " + oplysninger.navn + "</option>");
        }

    })
    .catch(function (error) {
        const PB = document.getElementById("postnr");
        PB.innerHTML = "Postnr og by ikke tilgængelige";
    })
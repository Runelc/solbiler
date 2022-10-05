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
udstyrsListe.forEach(item =>{udstyr_liste.insertAdjacentHTML("beforeend", `<li>${item}</li>`)} )

const STAMOPLYSNINGER = document.getElementById("stamopl");

STAMOPLYSNINGER.insertAdjacentHTML("afterbegin", `
    <h3>Fornavn: ${sessionStorage.getItem("fornavn")}</h3>
    <h3>Efternavn: ${sessionStorage.getItem("efternavn")}</h3>
    <h3>Adresse: ${sessionStorage.getItem("vejnavn")}&nbsp;${sessionStorage.getItem("vejnr")}</h3>
    <h3>Postnr. og by: ${sessionStorage.getItem("postnr")}</h3>
`);

const UDSKRIVKNAP = document.getElementById("udskrivKnap");
UDSKRIVKNAP.addEventListener("click", function() {
    window.print();
})
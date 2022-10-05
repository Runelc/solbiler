let storage = window.sessionStorage;

// Styling af datoer, så man ikke kan gå tilbage eller vælge modsatte datoer 
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

if (month <= 9) {
    month = "0" + month;
}

if (day <= 9) {
    day = "0" + day;
}

afhent.value = `${year}-${month}-${day}`;
aflever.value = `${year}-${month}-${day}`;
afhent.min = afhent.value;
aflever.min = afhent.value;

afhent.addEventListener("change", function () {
    if (afhent.value < afhent.min) {
        afhent.value = afhent.min;
    }
    aflever.min, aflever.value = afhent.value;

});
aflever.addEventListener("change", function () {
    if (aflever.value < afhent.value) {
        aflever.value = afhent.value;
    }

});

const formular = document.getElementById("formular");
formular.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
})


let biler;

async function loadBiler() {
    const response = await fetch('biler.json');
    biler = await response.json();
    search();
}

loadBiler();

const output = document.getElementById("biler");
const skabelon = document.getElementById("skabelon");

const personer = document.getElementById("personer");
const kufferter = document.getElementById("kufferter");

function search() {

    let antalLejeDage = beregnAntalLejedage(afhent.value, aflever.value);
    console.log(antalLejeDage);
    output.innerHTML = "";

    for (const bil of biler) {
        if (bil.personer >= personer.value && bil.kufferter >= kufferter.value) {
            const klon = skabelon.content.cloneNode(true);
            const bilMM = klon.querySelector(".bilMM");
            const billed = klon.querySelector(".billede_af_biler");
            const kategori = klon.querySelector(".kategori");
            const antalpersoner = klon.querySelector(".antalpersoner");
            const antalkufferter = klon.querySelector(".antalkufferter");
            const lejeudgift = klon.querySelector(".lejeudgift");

            const bookKnap = klon.querySelector(".book_nu_knap");
            bookKnap.onclick = function () {
                bookNu(bil.id);
            };

            billed.src = bil.billede;
            billed.alt = bil.billedetekst;
            bilMM.textContent += bil.bilmaerke;
            kategori.textContent += bil.kategori;
            antalkufferter.textContent += bil.kufferter;
            antalpersoner.textContent += bil.personer;
            lejeudgift.textContent += beregnLejeudgift(antalLejeDage, bil.tillaeg) + ",-";

            output.appendChild(klon);
        }
    }

    function bookNu(id) {
        let lejedage = beregnAntalLejedage(afhent.value, aflever.value);
        storage.setItem("ordernum", id);
        storage.setItem("lejedage", lejedage);
        storage.setItem("afhent", afhent.value);
        storage.setItem("aflever", aflever.value);
        window.location.href = "udstyr.html";

    }

    function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
        const AFHENTNING = new Date(afhentningsdato);
        const AFLEVERING = new Date(afleveringsdato);
        const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
        const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
        return FORSKELIDAGE;
    }


    function beregnLejeudgift(antaldage, biltillaeg) {
        const MOMS = 0.25;
        const GRUNDBELOEB = 495;
        const PRISPRDAG = 100;
        const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
        return Math.round(LEJEUDGIFT);
    }

};
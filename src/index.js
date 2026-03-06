import './css/main.css';
import { gsap } from "gsap";
import logo from './assets/Three-Colours-logo-minimized.png';
import { TITLES, BGcolors, FONTcolors, LIGHTcolors, DARKcolors, SYNOPSIS, CASTimg, CASTnames, CHARACTERS, LETTERBOXD, RATINGS } from './constants';

import landerBlue from './assets/blue/blue-1.jpg';
import landerWhite from './assets/white/white-1.jpg';
import landerRed from './assets/red/red-5.jpg';

import landerBlueMOBILE from './assets/blue/blue-mobile.jpg';
import landerWhiteMOBILE from './assets/white/white-mobile.jpg';
import landerRedMOBILE from './assets/red/red-mobile.jpg';

const isMobile = window.innerWidth <= 480;

window.onload = () => {
    document.getElementById("lander").scrollIntoView({ behavior: "smooth" });
}

document.getElementById('blue').src = isMobile ? landerBlueMOBILE : landerBlue;
document.getElementById('white').src = isMobile ? landerWhiteMOBILE : landerWhite;
document.getElementById('red').src = isMobile ? landerRedMOBILE : landerRed;

const body = document.querySelector('body');
const allLogos = document.querySelectorAll('.logo');
const track = document.getElementById("slider-track");
const slides = document.querySelectorAll(".slider-img");
const selectBtn = document.getElementById("select");
const lander = document.getElementById("lander");
const listItems = document.querySelectorAll('li');
let isAtTop = true;

allLogos.forEach(logoImg => logoImg.src = logo);

let index = 0;
let prevIndex = 0;

function showSlide(i) {
    track.style.transform = `translateX(-${i * 100}vw)`;
}

showSlide(index);

setInterval(() => {
    if (index >= 0) {
        index++;

        if (index >= slides.length) {
            index = 0; 
        }

        showSlide(index);
        body.style.setProperty('--bg', BGcolors[index]);
        body.style.setProperty('--color', FONTcolors[index]);
    }
}, 3000);

const observer = new IntersectionObserver(
    ([entry]) => {
        isAtTop = entry.isIntersecting;

        if (isAtTop) {
            selectBtn.textContent = "Select Movie";
        } else {
            selectBtn.textContent = "Back to Top";
        }
    },
    { threshold: 0.6 }
);

observer.observe(lander);

selectBtn.addEventListener("click", () => {
    if (isAtTop) {
        prevIndex = index;

        document.getElementById("details").scrollIntoView({ behavior: "smooth" });
        body.style.setProperty('--bg', BGcolors[prevIndex]);
        body.style.setProperty('--color', FONTcolors[prevIndex]);
        body.style.setProperty('--color-light', LIGHTcolors[prevIndex]);
        body.style.setProperty('--color-dark', DARKcolors[prevIndex]);
        document.querySelector("#movie-title h1").textContent = TITLES[prevIndex];
        document.querySelector("#plot p").textContent = SYNOPSIS[prevIndex];

        selectBtn.blur();
        document.getElementById("rating").focus();

        document.getElementById('cast-1').src = CASTimg[prevIndex][0];
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`actor-${i}`).textContent = CASTnames[prevIndex][i - 1];
            document.getElementById(`character-${i}`).textContent = CHARACTERS[prevIndex][i - 1];
        }

        listItems.forEach(li => li.className = "");
        listItems[0].className = "selected";

        listItems.forEach(li => {
            li.addEventListener("click", () => {
                const id = parseInt(li.id.split('-')[1]);
                document.getElementById(`cast-1`).src = CASTimg[prevIndex][id - 1];
                listItems.forEach(li => li.className = "");
                li.className = "selected";
            });
        })

        document.getElementById('letterboxd').src = LETTERBOXD[prevIndex];
        document.getElementById('stars').innerText = RATINGS[prevIndex];
        document.getElementById('rating').href = `https://letterboxd.com/farouqii/film/three-colours-${TITLES[prevIndex].toLowerCase()}/`;

        index = -1;
    } else {
        lander.scrollIntoView({ behavior: "smooth" });
        index = prevIndex;
    }
});

document.addEventListener("keydown", (e) => {
    if (!isAtTop) return;

    if (e.key === "ArrowRight") {
        index = (index + 1) % slides.length;
        updateSlide();
    }

    if (e.key === "ArrowLeft") {
        index = (index - 1 + slides.length) % slides.length;
        updateSlide();
    }
});

let castIndex = 0;

document.addEventListener("keydown", (e) => {

    if (isAtTop) {

        if (e.key === "ArrowRight") {
            index = (index + 1) % slides.length;
            updateSlide();
        }

        if (e.key === "ArrowLeft") {
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
        }

    } else {

        if (e.key === "ArrowRight") {
            castIndex = (castIndex + 1) % 3;
            selectCast(castIndex);
        }

        if (e.key === "ArrowLeft") {
            castIndex = (castIndex - 1 + 3) % 3;
            selectCast(castIndex);
        }

    }
});

function updateSlide() {
    showSlide(index);
    document.body.style.setProperty('--bg', BGcolors[index]);
    document.body.style.setProperty('--color', FONTcolors[index]);
}

function selectCast(i) {
    document.getElementById("cast-1").src = CASTimg[prevIndex][i];

    listItems.forEach(li => li.className = "");
    listItems[i].className = "selected";
}

// --- Temporary Image Sources ---
// for (let i = 1; i <= 3; i++) document.getElementById(`cast-${i}`).src = cast[i];

document.getElementById('actor-1').textContent = "Juliette Binoche";
document.getElementById('actor-2').textContent = "Benoît Régent";
document.getElementById('actor-3').textContent = "Florence Pernel";

document.getElementById('character-1').textContent = "Julie";
document.getElementById('character-2').textContent = "Olivier";
document.getElementById('character-3').textContent = "Sandrine";

document.getElementById('cast-1').style.display = "block";
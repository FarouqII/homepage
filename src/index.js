import './css/main.css';
import { gsap } from "gsap";
import logo from './assets/Three-Colours-logo-minimized.png';
import { TITLES, BGcolors, FONTcolors, LIGHTcolors, DARKcolors, SYNOPSIS, CASTimg, CASTnames, CHARACTERS } from './constants';

import landerBlue from './assets/blue/blue-1.jpg';
import landerWhite from './assets/white/white-1.jpg';
import landerRed from './assets/red/red-5.jpg';
window.onload = () => {
    document.getElementById("lander").scrollIntoView({ behavior: "smooth" });
}

document.getElementById('blue').src = landerBlue;
document.getElementById('white').src = landerWhite;
document.getElementById('red').src = landerRed;

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
}, 5000);

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

        document.getElementById('cast-1').src = CASTimg[prevIndex][0];
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`actor-${i}`).textContent = CASTnames[prevIndex][i - 1];
            document.getElementById(`character-${i}`).textContent = CHARACTERS[prevIndex][i - 1];
        }

        listItems.forEach(li => {
            li.addEventListener("click", () => {
                const id = parseInt(li.id.split('-')[1]);
                document.getElementById(`cast-1`).src = CASTimg[prevIndex][id - 1];
                listItems.forEach(li => li.className = "");
                li.className = "selected";
            });
        })

        index = -1;
    } else {
        lander.scrollIntoView({ behavior: "smooth" });
        index = prevIndex;
    }
});

// --- Temporary Image Sources ---
// for (let i = 1; i <= 3; i++) document.getElementById(`cast-${i}`).src = cast[i];

document.getElementById('actor-1').textContent = "Juliette Binoche";
document.getElementById('actor-2').textContent = "Benoît Régent";
document.getElementById('actor-3').textContent = "Florence Pernel";

document.getElementById('character-1').textContent = "Julie";
document.getElementById('character-2').textContent = "Olivier";
document.getElementById('character-3').textContent = "Sandrine";

document.getElementById('cast-1').style.display = "block";
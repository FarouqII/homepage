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

gsap.set(".slider-img", { opacity: 0, scale: 1.05 });
gsap.set("#slider-track h1", { opacity: 0, y: 40 });
gsap.set(".logo", { opacity: 0, scale: 0.95 });

gsap.set("#movie-title h1", { opacity: 0, y: 40 });
gsap.set("#plot", { opacity: 0 });
gsap.set(".cast-img", { opacity: 0, scale: 0.95 });
gsap.set("#cast li", { opacity: 0, y: 20 });
gsap.set("#rating", { opacity: 0, y: 20 });

window.onload = () => {
    document.getElementById("lander").scrollIntoView({ behavior: "smooth" });

    const heroTL = gsap.timeline();

    heroTL
        .to(".slider-img", {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
        })
        .to("#slider-track h1", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        }, "-=0.6")
        .to(".logo", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");
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
}, 4000);

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

selectBtn.addEventListener("click", e => {
    e.preventDefault();
    if (isAtTop) {
        prevIndex = index;

        document.getElementById("details").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            animateDetails();
        }, 400);
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

        listItems.forEach(li => li.className = "");
        listItems[0].className = "selected";

        listItems.forEach(li => {
            li.addEventListener("click", e => {
                e.preventDefault();
                const id = parseInt(li.id.split('-')[1]);
                animateCastChange(CASTimg[prevIndex][id - 1]);
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

function animateDetails() {
    const detailsTL = gsap.timeline();

    detailsTL
        .to("#movie-title h1", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .to("#plot", {
            opacity: 1,
            duration: 0.8
        }, "-=0.4")
        .to(".cast-img", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .to("#cast li", {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4")
        .to("#rating", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
}

function animateCastChange(newSrc) {
    const castImg = document.getElementById("cast-1");

    gsap.timeline()
        .to(castImg, {
            opacity: 0,
            y: 10,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                castImg.src = newSrc;
            }
        })
        .to(castImg, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out"
        });
}

document.getElementById('cast-1').style.display = "block";
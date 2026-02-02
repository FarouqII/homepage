import './css/main.css';
import { gsap } from "gsap";
import logo from './assets/Three-Colours-logo-minimized.png';

import landerBlue from './assets/blue/blue-1.jpg';
import landerWhite from './assets/white/white-1.jpg';
import landerRed from './assets/red/red-5.jpg';

window.onload = () => {
    document.getElementById("lander").scrollIntoView({ behavior: "smooth" });
}

document.getElementById('logo').src = logo;
document.getElementById('blue').src = landerBlue;
document.getElementById('white').src = landerWhite;
document.getElementById('red').src = landerRed;

const track = document.getElementById("slider-track");
const slides = document.querySelectorAll(".slider-img");
const selectBtn = document.getElementById("select");
const lander = document.getElementById("lander");
const BGcolors = ["#1e2f4c", "#cdcac8", "#5e3120"];
const FONTcolors = ["#395c97", "#686665", "#914a31" ];
let isAtTop = true;

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
        document.querySelector('body').style.setProperty('--bg', BGcolors[index]);
        document.querySelector('body').style.setProperty('--color', FONTcolors[index]);
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
        document.getElementById("details").scrollIntoView({ behavior: "smooth" });
        prevIndex = index;
        index = -1;
    } else {
        lander.scrollIntoView({ behavior: "smooth" });
        index = prevIndex;
    }
});
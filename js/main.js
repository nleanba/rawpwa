window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./sw.js');
    }
}

const body = document.body;
const nav = document.getElementsByTagName("nav");
const footer = document.getElementsByTagName("footer");
const sites = [{
        'url': './',
        'name': 'Home'
    },
    {
        'url': './ccc',
        'name': 'Collatz Conjecture Calculator'
    },
    {
        'url': './score',
        'name': 'Scoreboard'
    }
];

console.group("Navigation")
if (nav.length === 0) {
    const gnav = document.createElement("nav");
    sites.forEach(s => {
        const ga = document.createElement("a");
        ga.href = s.url;
        ga.classList = ga.href === window.location.href ? "button current" : ga.href === document.referrer ? "button referrer" : "button";
        ga.textContent = s.name || s.url;
        console.groupCollapsed(ga.href);
        console.log(ga.href === window.location.href ? "current" : ga.href);
        console.log(ga);
        console.groupEnd();
        gnav.appendChild(ga);
    });
    console.log(gnav);
    body.prepend(gnav);
}
console.groupEnd();

console.group("Footer")
if (footer.length === 0) {
    const gfooter = document.createElement("footer");
    gfooter.innerHTML = 'Started in Nov 2018. <a href="https://github.com/nleanba/rawpwa">Github repository</a>';
    console.log(gfooter);
    body.append(gfooter);
}
console.groupEnd();

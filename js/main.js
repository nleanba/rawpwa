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
/*const sidebars = document.querySelectorAll(".sidebar");
if (sidebars) {
    sidebars.forEach(side => {
        side.addEventListener("click", (e) => {
            if (side.classList.contains("sidebar--collapsed")) {
                side.classList.remove("sidebar--collapsed");
            } else {
                side.classList.add("sidebar--collapsed")
            }
        })
        side.childNodes.forEach(child => {
            child.addEventListener("click", e => e.stopPropagation())
        });
    });
}*/
const sites = [{
        'url': './',
        'name': 'Home'
    },
    {
        'url': './ccc',
        'name': 'Collatz Conjecture Calculator'
    }
    /*,
        {
            'url': './files',
            'name': 'Files'
        }*/
    ,
    {
        'url': './score',
        'name': 'Scoreboard'
    }
];

console.groupCollapsed("Render Navigation")
if (nav.length === 0) {
    const gnav = document.createElement("nav");
    gnav.classList.add("navigation");
    sites.forEach(s => {
        const ga = document.createElement("a");
        ga.href = s.url;
        ga.classList = ga.href === window.location.href ? "navigation-element navigation-button current" : ga.href === document.referrer ? "navigation-element navigation-button referrer" : "navigation-element navigation-button";
        ga.textContent = s.name || s.url;
        console.groupCollapsed(ga.href);
        console.log(ga.href === window.location.href ? "current" : ga.href);
        console.log(ga);
        console.groupEnd();
        gnav.appendChild(ga);
    });
    gnav.firstChild.classList.add("navigation-header")
    gnav.lastChild.classList.add("navigation-footer")
    console.log(gnav);
    body.prepend(gnav);
}
console.groupEnd();

console.groupCollapsed("Render Footer")
if (footer.length === 0) {
    const gfooter = document.createElement("footer");
    gfooter.classList.add("footer");
    const gfdiv = document.createElement("div");
    gfdiv.classList = "footer-header footer-element footer-footer";
    gfdiv.innerHTML = 'Started in Nov 2018. <a class="a" href="https://github.com/nleanba/rawpwa">Github repository</a>';
    gfooter.append(gfdiv);
    console.log(gfooter);
    body.append(gfooter);
}
console.groupEnd();
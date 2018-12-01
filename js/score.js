const boardE = document.getElementById("board");
const inputNE = document.getElementById("input-name");
const errorE = document.createElement("div");
errorE.classList = "sidebar-element error";
const pEA = document.getElementsByClassName("--pe");
const store = localStorage;
let score = store.getItem("score") ?
    JSON.parse(store.getItem("score")) : {};
for (let i = 0; i < pEA.length; i++) {
    update(pEA[i], false);
}

const update = (element, add = true) => {
    const id = element.id;
    const oldIE = document.getElementById("input-" + id);
    if (oldIE) {
        if (add) {
            const regex = /[^0-9.]+/g;
            const plus =
                Number.isNaN(Math.floor(oldIE.textContent.replace(regex, ""))) ?
                0 :
                Math.floor(oldIE.textContent.replace(regex, ""));
            score[id].push(plus);
            store.setItem("score", JSON.stringify(score));
        }
        //console.log(JSON.parse(store.getItem("score")));
        oldIE.remove();
    }
    const newIE = document.createElement("div");
    newIE.id = "input-" + id;
    newIE.classList = "box-element box-input box-footer";
    newIE.setAttribute("placeholder", "0");
    newIE.addEventListener("keydown", e => {
        if (e.key === "Enter"){
            up();
            e.preventDefault();
        }
});
    newIE.contentEditable = true;
    if (element.getElementsByTagName("ul")[0]) {
        element.getElementsByTagName("ul")[0].remove();
    }
    const newUL = document.createElement("ul");
    newUL.classList = "invisible";
    //newUL.contentEditable = true; //let's bother with this another day
    let sum = 0;
    score[id].forEach(e => {
        sum = sum + e;
        const newLE = document.createElement("li");
        newLE.textContent = (e === null) ? "" : (e === 0) ? sum : sum + " [ +" + e + " ]";
        newUL.append(newLE)
    });
    element.append(newUL);
    console.log(newIE);
    element.append(newIE);
};

const up = () => {
    for (let i = 0; i < pEA.length; i++) {
        update(pEA[i]);
    }
};

const clearBoard = (selector = "*") => {
    console.groupCollapsed("clearing");
    console.log(store.getItem("score"));
    console.groupEnd();
    score = {};
    store.setItem("score", JSON.stringify(score));
    boardE.querySelectorAll(selector).forEach(n => n.remove());
};

const add = (name) => {
    if (document.getElementById(name)) {
        errorE.textContent = name + " already exists"
        inputNE.parentElement.append(errorE);
    } else {
        const newPE = document.createElement("div");
        newPE.id = name;
        newPE.classList.add("--pe");
        newPE.classList.add("box");
        const newTE = document.createElement("h3");
        newTE.textContent = name;
        newTE.classList = "header-3 box-header";
        newPE.append(newTE);
        if (!score[name]) {
            let l = {
                "i": undefined,
                "l": 0
            }
            Object.entries(score).forEach(entry => {
                l.i = entry[1].length > l.l ? entry[0] : l.i;
                l.l = entry[1].length > l.l ? entry[1].length : l.l;
            })
            Object.assign(score, {
                [name]: []
            });
            for (let i = 0; i < l.l; i++) {
                score[name].push(null);
            }
        }
        boardE.append(newPE);
        update(newPE, false);
    }
};
Object.entries(score).forEach(e => add(e[0]));
const btnAdd = () => {
    if (inputNE.textContent) {
        inputNE.classList.remove("error");
        errorE.remove();
        add(inputNE.textContent);
        inputNE.textContent = "";
    } else {
        errorE.textContent = "Please enter a name"
        inputNE.classList.add("error");
        inputNE.parentElement.append(errorE);
    }
}
inputNE.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        btnAdd();
        e.preventDefault();
    }
});
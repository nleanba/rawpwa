const boardE = document.getElementById("board");
const inputNE = document.getElementById("input-name");
const errorE = document.createElement("div");
errorE.classList = "error";
const pEA = document.getElementsByClassName("--pe")
const score = {
    "test": []
};
const update = (element, add = true) => {
    const id = element.id;
    const oldIE = document.getElementById("input-" + id);
    if (add) {
        const regex = /[^0-9.]+/g;
        const plus =
            Number.isNaN(Math.floor(oldIE.textContent.replace(regex, ""))) ?
            0 :
            Math.floor(oldIE.textContent.replace(regex, ""));
        score[id].push(plus);
    }
    oldIE.remove();
    const newIE = document.createElement("div");
    newIE.id = "input-" + id;
    newIE.textContent = "0";
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
        newLE.textContent = e === null ? "" : sum + " [ +" + e + " ]";
        newUL.append(newLE)
    });
    element.append(newUL);
    element.append(newIE);
};
const add = (name) => {
    if (document.getElementById(name)) {
        errorE.textContent = name + " already exists"
        inputNE.parentElement.append(errorE);
    } else {
        const newPE = document.createElement("div");
        newPE.id = name;
        newPE.classList.add("--pe");
        const newTE = document.createElement("h3");
        newTE.textContent = name;
        const newIE = document.createElement("div");
        newIE.id = "input-" + name;
        newIE.textContent = "0";
        newIE.contentEditable = true;
        newPE.append(newTE);
        newPE.append(newIE);
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
const btnAdd = () => {
    if (inputNE.value) {
        inputNE.classList.remove("error");
        errorE.remove();
        add(inputNE.value);
    } else {
        errorE.textContent = "Please enter a name"
        inputNE.classList.add("error");
        inputNE.parentElement.append(errorE);
    }
}
const up = () => {
    for (let i = 0; i < pEA.length; i++) {
        update(pEA[i]);
    }
};
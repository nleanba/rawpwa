const rE = document.getElementById("steps");
const nE = document.getElementById("number");
const iE = document.getElementById("input");
const hE = document.getElementById("history");
const s = localStorage;
let h = {};

const uhE = () => {
  s.setItem("h", JSON.stringify(h));
  hE.innerHTML = "History: " +
    JSON.stringify(Object.entries(h))
    .replace(/",/g, ': ')
    .replace(/"/g, '')
    .replace(/\]+|\[+/g, ' ')
    .trim();
  hE.classList.remove("hide");
};

if (s.getItem("h")) {
  h = JSON.parse(s.getItem("h"));
  uhE();
}

iE.addEventListener("keydown", k => {
  if (k.key === "Enter") {
    c();
  }
});

rE.innerHTML = "Steps: " + a(123).join(" → ");
nE.innerHTML = "Number of Steps: " + a(123).length;

function c() {
  let i = Math.floor(iE.value);
  if (i) {
    let l = a(i).length;
    if (!h[i]) {
      Object.assign(h, {
        [i]: l
      });
      uhE();
    }
    iE.classList.remove("error");
    rE.classList.remove("error");
    nE.classList.remove("hide");

    rE.innerHTML = "Steps: " + a(i).join(" → ");
    nE.innerHTML = "Number of Steps: " + l;
  } else {
    console.error("Please Enter a Number");
    iE.classList.add("error");
    rE.classList.add("error");
    nE.classList.add("hide");
    rE.innerHTML = "Please enter a Number";
    nE.innerHTML = "Please enter a Number";
  }
}

function a(n) {
  let r = [];
  if (Number.isInteger(n)) {
    let b = (i) => {
      r.push(i);
      if (i === 1) {
        return r;
      }
      if (i % 2 === 0) {
        return b(i / 2);
      }
      return b(i * 3 + 1);
    };
    return b(n);

  } else {
    console.error(n + " is no Integer");
  }
}
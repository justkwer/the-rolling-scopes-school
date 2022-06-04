import popup from "../../assets/js/popup.js";

let page = 1;
let offset = 0;
let scrollOffset = 0;
let cardsOffset = 0;
let cardsInPage = 0;
let pets = [];
let pets8 = [];
let pets6 = [];
let pets3 = [];
let count;

function createCards() {
  count = randomize(0, 7);
  pets.push(count);

  if (pets8.length >= 8) pets8 = [];
  if (pets6.length >= 6) pets6 = [];
  if (pets3.length >= 3) pets3 = [];

  while (pets8.includes(count) || pets6.includes(count) || pets3.includes(count)) {
    count = randomize(0, 7);
  }
  pets8.push(count);
  pets6.push(count);
  pets3.push(count);
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default async function pagination() {
  const res = await fetch("./../../assets/json/pets.json");
  const pets = await res.json();

  const conteiner = document.querySelector(".friends_cards");

  function createCard(count) {
    let card = document.createElement("div");

    card.innerHTML = `
      <img class="pet_img" src="${pets[count]["img"]}" alt="${pets[count]["name"]}"/>
        <div class="pet">
          <p class="pet_name">${pets[count]["name"]}</p>
          <button class="learn_more btn">Learn more</button>
      </div>
    `;

    card.classList = "card";
    conteiner.prepend(card);

    card.addEventListener("click", () => popup(count));
  }

  for (let i = 0; i < 48; i++) {
    createCards();
    createCard(count);
  }

  for (let i = 0; i < 8; i++) {
    document.querySelectorAll(".card")[document.querySelectorAll(".card").length - 1].remove();
  }

  const pageNum = document.querySelector(".pets_num");
  const sliderBtn = document.querySelector(".pets_nav");
  window.addEventListener("resize", setScrollOffset);
  window.addEventListener("load", setScrollOffset);

  sliderBtn.addEventListener("click", (el) => {
    if (document.querySelectorAll(".pets_left")[1] === el.target) {
      if (!el.target.classList.contains("btn_inactive")) {
        scroll("prev");
      }
    }
    if (document.querySelectorAll(".pets_left")[0] === el.target) {
      if (!el.target.classList.contains("btn_inactive")) {
        scroll("setFirstPage");
      }
    }
    if (document.querySelectorAll(".pets_right")[0] === el.target) {
      if (!el.target.classList.contains("btn_inactive")) {
        scroll("next");
      }
    }
    if (document.querySelectorAll(".pets_right")[1] === el.target) {
      if (!el.target.classList.contains("btn_inactive")) {
        scroll("setLastPage");
      }
    }
  });

  function setScrollOffset() {
    const clientWidth = document.documentElement.clientWidth;

    if (clientWidth >= 1280) {
      scrollOffset = 465;
      cardsOffset = 2;
      cardsInPage = 8;
    }
    if (1279 >= clientWidth && clientWidth >= 768) {
      scrollOffset = 465;
      cardsOffset = 3;
      cardsInPage = 6;
    }
    if (767 >= clientWidth && clientWidth >= 320) {
      scrollOffset = 465;
      cardsOffset = 3;
      cardsInPage = 3;
    }
  }

  function scroll(val) {
    if (val === "prev") {
      offset = offset + scrollOffset * cardsOffset;
      conteiner.style.top = offset + "px";
      pageNum.innerHTML = --page;
      checkInActiveBtn();
    }
    if (val === "setFirstPage") {
      offset = 0;
      conteiner.style.top = offset + "px";
      page = 1;
      pageNum.innerHTML = page;
      checkInActiveBtn();
    }
    if (val === "next") {
      offset = offset - scrollOffset * cardsOffset;
      conteiner.style.top = offset + "px";
      pageNum.innerHTML = ++page;
      checkInActiveBtn();
    }
    if (val === "setLastPage") {
      offset = -(document.querySelectorAll(".card").length / cardsInPage - 1) * (scrollOffset * cardsOffset);
      conteiner.style.top = offset + "px";
      page = document.querySelectorAll(".card").length / cardsInPage;
      pageNum.innerHTML = page;
      checkInActiveBtn();
    }
  }

  window.addEventListener("resize", () => {
    offset = 0;
    conteiner.style.top = offset + "px";
    page = 1;
    pageNum.innerHTML = page;
    checkInActiveBtn();
  });

  function checkInActiveBtn() {
    if (offset >= 0) {
      document.querySelectorAll(".pets_left").forEach((el) => {
        el.classList.remove("btn_light");
        el.classList.add("btn_inactive");
      });
    } else {
      document.querySelectorAll(".pets_left").forEach((el) => {
        el.classList.remove("btn_inactive");
        el.classList.add("btn_light");
      });
    }

    if (offset <= -(document.querySelectorAll(".card").length / cardsInPage - 1) * (scrollOffset * cardsOffset)) {
      document.querySelectorAll(".pets_right").forEach((el) => {
        el.classList.remove("btn_light");
        el.classList.add("btn_inactive");
      });
    } else {
      document.querySelectorAll(".pets_right").forEach((el) => {
        el.classList.remove("btn_inactive");
        el.classList.add("btn_light");
      });
    }
  }
}

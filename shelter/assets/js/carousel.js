import popup from "../../assets/js/popup.js";

let slideArr = [];
while (slideArr.length < 3) {
  let number = Math.floor(Math.random() * 8);
  if (!slideArr.includes(number)) {
    slideArr.push(number);
  }
}

function getDifNum() {
  while (slideArr.length < 6) {
    let number = Math.floor(Math.random() * 8);
    if (!slideArr.includes(number)) {
      slideArr.push(number);
    }
  }
  slideArr.splice(0, 3);
}

export default async function carousel(el) {
  const res = await fetch("./../../assets/json/pets.json");
  const pets = await res.json();

  const conteiner = document.querySelector(".cards_container");
  let contWidth = conteiner.clientWidth;

  function createCardLeft(count) {
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

  function createCardRight(count) {
    let card = document.createElement("div");

    card.innerHTML = `
      <img class="pet_img" src="${pets[count]["img"]}" alt="${pets[count]["name"]}"/>
        <div class="pet">
          <p class="pet_name">${pets[count]["name"]}</p>
          <button class="learn_more btn">Learn more</button>
      </div>
    `;

    card.classList = "card";
    conteiner.appendChild(card);

    card.addEventListener("click", () => popup(count));
  }

  const leftBtn = document.querySelector(".cards_left");
  const rightBtn = document.querySelector(".cards_right");

  function deleteCard(el, count) {
    if (el == "left") {
      leftBtn.disabled = true;
      rightBtn.disabled = true;
      setTimeout(() => {
        for (let i = 0; i < count; i++) {
          document.querySelectorAll(".card")[document.querySelectorAll(".card").length - 1].remove();
        }
        leftBtn.disabled = false;
        rightBtn.disabled = false;
      }, 2000);
    } else {
      leftBtn.disabled = true;
      rightBtn.disabled = true;
      setTimeout(() => {
        for (let i = 0; i < count; i++) {
          document.querySelectorAll(".card")[0].remove();
        }
        leftBtn.disabled = false;
        rightBtn.disabled = false;
      }, 2000);
    }
  }

  conteiner.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
      conteiner.classList.remove("transition-left");
    } else {
      conteiner.classList.remove("transition-right");
    }
  });

  if (el == "onload") {
    if (contWidth == 270) {
      getDifNum();
      createCardLeft(slideArr[0]);
      deleteCard("left", 3);
    }
    if (contWidth == 580) {
      getDifNum();
      createCardLeft(slideArr[0]);
      createCardLeft(slideArr[1]);
      deleteCard("left", 3);
    }
    if (contWidth == 990) {
      getDifNum();
      createCardLeft(slideArr[0]);
      createCardLeft(slideArr[1]);
      createCardLeft(slideArr[2]);
      deleteCard("left", 3);
    }
  }

  if (el == "left") {
    if (contWidth == 270) {
      getDifNum();
      createCardLeft(slideArr[0]);
      conteiner.classList.add("transition-left");
      deleteCard("left", 1);
    }
    if (contWidth == 580) {
      getDifNum();
      createCardLeft(slideArr[0]);
      createCardLeft(slideArr[1]);
      conteiner.classList.add("transition-left");
      deleteCard("left", 2);
    }
    if (contWidth == 990) {
      getDifNum();
      createCardLeft(slideArr[0]);
      createCardLeft(slideArr[1]);
      createCardLeft(slideArr[2]);
      conteiner.classList.add("transition-right");
      deleteCard("left", 3);
    }
  }

  if (el == "right") {
    if (contWidth == 270) {
      getDifNum();
      createCardRight(slideArr[0]);
      conteiner.classList.add("transition-right");
      deleteCard("right", 1);
    }
    if (contWidth == 580) {
      getDifNum();
      createCardRight(slideArr[0]);
      createCardRight(slideArr[1]);
      conteiner.classList.add("transition-right");
      deleteCard("right", 2);
    }
    if (contWidth == 990) {
      getDifNum();
      createCardRight(slideArr[0]);
      createCardRight(slideArr[1]);
      createCardRight(slideArr[2]);
      conteiner.classList.add("transition-left");
      deleteCard("right", 3);
    }
  }
}

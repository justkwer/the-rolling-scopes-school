import darkBody from "../../assets/js/dark.js";

function popupClose() {
  let popupBlock = document.querySelector(".popup");
  popupBlock.classList.toggle("popup_active");
  setTimeout(() => popupBlock.remove(), 500);
}

export default async function popup(count) {
  const res = await fetch("./../../assets/json/pets.json");
  const pets = await res.json();

  let popupAct = document.querySelector(".popup");

  if (!popupAct) {
    let popupBlock = document.createElement("div");
    popupBlock.classList = "popup";

    let popupBtn = document.createElement("button");
    popupBtn.classList = "popup_btn btn";

    let popupBtnImg = document.createElement("img");
    popupBtnImg.src = "./../../assets/img/main/close.svg";
    popupBtnImg.alt = "close";

    let popupCont = document.createElement("div");
    popupCont.classList = "popup_container";

    popupBtn.append(popupBtnImg);
    popupBlock.append(popupBtn);
    popupBlock.append(popupCont);
    document.body.append(popupBlock);

    setTimeout(() => popupBlock.classList.toggle("popup_active"), 100);

    let popupImg = document.createElement("img");
    popupImg.classList = "popup_img img";
    popupImg.src = pets[count]["img"];
    popupImg.alt = pets[count]["name"];
    popupCont.append(popupImg);

    let popupContent = document.createElement("div");
    popupContent.classList = "popup_content";
    popupCont.append(popupContent);

    let popupNameCon = document.createElement("div");
    popupNameCon.classList = "popup_name_cont";
    popupContent.append(popupNameCon);

    let name = document.createElement("p");
    name.classList = "popup_name popup_text";
    name.textContent = pets[count]["name"];
    popupNameCon.append(name);

    let type = document.createElement("p");
    type.classList = "popup_type popup_text";
    type.textContent = `${pets[count]["type"]} - ${pets[count]["breed"]}`;
    popupNameCon.append(type);

    let description = document.createElement("p");
    description.classList = "popup_description popup_text";
    description.textContent = pets[count]["description"];
    popupContent.append(description);

    let popupUl = document.createElement("ul");
    popupUl.classList = "popup_ul";
    popupContent.append(popupUl);

    let popupAge = document.createElement("li");
    popupAge.innerHTML = `
      <div class="popup_item">
        <p class="popup_item_title">Age:</p>
        <p class="popup_item_subtitle">${pets[count]["age"]}</p>
      </div>
    `;
    popupUl.append(popupAge);

    let popupInoculations = document.createElement("li");
    popupInoculations.innerHTML = `
      <div class="popup_item">
        <p class="popup_item_title">Inoculations:</p>
        <p class="popup_item_subtitle">${pets[count]["inoculations"]}</p>
      </div>
      `;
    popupUl.append(popupInoculations);

    let popupDiseases = document.createElement("li");
    popupDiseases.innerHTML = `
      <div class="popup_item">
        <p class="popup_item_title">Diseases:</p>
        <p class="popup_item_subtitle">${pets[count]["diseases"]}</p>
      </div>
      `;
    popupUl.append(popupDiseases);

    let popupParasites = document.createElement("li");
    popupParasites.innerHTML = `
      <div class="popup_item">
        <p class="popup_item_title">Parasites:</p>
        <p class="popup_item_subtitle">${pets[count]["parasites"]}</p>
      </div>
      `;
    popupUl.append(popupParasites);

    popupBtn.addEventListener("click", () => {
      popupClose();
      darkBody();
    });
  } else {
    popupClose();
  }

  darkBody();
}

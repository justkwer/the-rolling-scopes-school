import burgerOnclick from "../../assets/js/burger.js";
import popup from "../../assets/js/popup.js";

export default function darkBody() {
  const body = document.body;
  const bodyDark = document.createElement("div");
  bodyDark.classList = "body_white";

  let bodyDiv = body.querySelector(".body_white");

  setTimeout(() => bodyDark.classList.toggle("body_dark"), 100);

  if (!bodyDiv) {
    body.append(bodyDark);
  } else {
    bodyDiv.classList.toggle("body_dark");
    setTimeout(() => bodyDiv.remove(), 100);
  }

  let popupAct = document.querySelector(".popup");
  if (popupAct) {
    bodyDark.addEventListener("mouseover", () => {
      let btn = document.querySelector(".popup_btn");
      btn.classList.toggle("popup_btn_active");
    });
    bodyDark.addEventListener("mouseleave", () => {
      let btn = document.querySelector(".popup_btn");
      btn.classList.toggle("popup_btn_active");
    });
    bodyDark.onclick = popup;
  }

  let headerAct = document.querySelector(".header_active");
  if (headerAct) bodyDark.onclick = burgerOnclick;

  function scrollCheck() {
    if (!bodyDiv) {
      document.querySelector("body").setAttribute("style", "overflow-y:hidden");
    } else {
      document.querySelector("body").removeAttribute("style");
    }
  }

  scrollCheck();

  let pageUrl = window.location.pathname;
  if (pageUrl.indexOf("pets") != -1) document.querySelector(".header").classList.toggle("body_dark");
}

import createPreloader from "./../../assets/js/preloader.js";
import burgerOnclick from "../../assets/js/burger.js";
import carousel from "../../assets/js/carousel.js";
import popup from "../../assets/js/popup.js";

createPreloader();

window.addEventListener("resize", closeMenu);

function closeMenu() {
  if (document.querySelector(".header_active")) burgerOnclick();
  if (document.querySelector(".popup_active")) popup();
}

// logo

function logoOnclick() {
  let pageUrl = window.location.pathname;

  if (pageUrl.indexOf("pets") != -1) location.href = "./../main/index.html";
}

const logo = document.querySelector(".logo");

logo.onclick = logoOnclick;

// burger

const burger = document.querySelector(".burger");

burger.onclick = burgerOnclick;

const logoHelp = document.querySelector(".logo_help");

logoHelp.addEventListener("click", () => burgerOnclick());

const logoContacts = document.querySelector(".logo_contacts");

logoContacts.addEventListener("click", () => burgerOnclick());

//carousel

carousel("onload");

const leftBtn = document.querySelector(".cards_left");
leftBtn.addEventListener("click", () => carousel("left"));

const rightBtn = document.querySelector(".cards_right");
rightBtn.addEventListener("click", () => carousel("right"));

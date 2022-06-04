import darkBody from "../../assets/js/dark.js";

export default function burgerOnclick() {
  const header = document.querySelector(".header_nav");
  header.classList.toggle("header_active");

  const burger = document.querySelector(".burger");
  burger.classList.toggle("burger_active");

  const logo = document.querySelector(".logo");
  logo.classList.toggle("logo_inactive");

  darkBody();

  const hrefActive = document.querySelector(".href_active");
  hrefActive.addEventListener("click", () => burgerOnclick());

  let logoAct = document.querySelector(".logo_active");
  const li = document.createElement("li");
  li.classList = "logo_li";

  if (!logoAct) {
    const logoHr = document.createElement("div");
    logoHr.classList = "logo href logo_active";

    logoHr.addEventListener("click", function () {
      let pageUrl = window.location.pathname;

      if (pageUrl.indexOf("pets") != -1) location.href = "./../main/index.html";
    });

    const h = document.createElement("h1");
    h.classList = "title";
    h.textContent = "Cozy House";

    const p = document.createElement("p");
    p.classList = "subtitle";
    p.textContent = "Shelter for pets in Boston";

    logoHr.append(h);
    logoHr.append(p);
    header.prepend(logoHr);
  } else {
    setTimeout(() => logoAct.remove(), 100);
  }
}

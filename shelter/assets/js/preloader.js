export default function createPreloader() {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.cssText = `position: fixed;
left: 0;
top: 0;
right: 0;
bottom: 0;
overflow: hidden;
background: black;
z-index: 1001;
`;
  document.body.prepend(preloader);

  const preloaderImage = document.createElement("div");
  preloaderImage.className = "preloader-image";
  preloaderImage.style.cssText = `position: relative;
display: inline-block;
overflow: hidden;
top: calc(50% - 300px);
width: 800px;
height: 600px;
background: url('./../../assets/gif/preloader.gif') no-repeat;
background-size: 800px 600px;
`;
  preloader.append(preloaderImage);

  window.onload = function () {
    document.body.classList.add("loaded-hiding");
    document.body.style.transition = "0.3s opacity;";
    document.body.style.opacity = "0;";
    window.setTimeout(function () {
      document.body.classList.add("loaded");
      document.body.style.display = "none;";
      document.body.classList.remove("loaded-hiding");
      preloader.removeChild(preloaderImage);
      document.body.removeChild(preloader);
    }, 500);
  };
}

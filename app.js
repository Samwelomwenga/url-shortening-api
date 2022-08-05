const shortenUrlSubmit = document.querySelector(".shorten-url-submit");
 const shortenUrl = document.querySelector("#shorten-url")
const urlShortener = (url) => {
  fetch(`https://api.shrtco.de/v2/shorten?url=${url} || `)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      console.log(data.result.original_link);
      console.log(data.result.full_short_link);
    });
};
shortenUrlSubmit.addEventListener("click", () => {
  urlShortener(shortenUrl.value);
});


shortenUrl.oninvalid = (e) => {
  e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
    e.target.setCustomValidity("This field cannot be blank");
  }
}
shortenUrl.oninput = (e) => {
  e.target.setCustomValidity("");
}

const navBar = document.querySelector(".nav-bar");
const hamburgerMenu = document.querySelector(".hamber-menu");
hamburgerMenu.addEventListener("click", () => {
  const visibility = navBar.getAttribute("data-visible");
  if (visibility === "false") {
    navBar.setAttribute("data-visible", true);
  } else {
    navBar.setAttribute("data-visible", false);
  }
});

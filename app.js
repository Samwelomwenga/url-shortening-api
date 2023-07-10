const shortenUrlSubmit = document.querySelector(".shorten-url-submit");

const shortenUrl = document.querySelector("#shorten-url");

const urlShortener = async (link) => {
  try {
    let shortenApiUrl = new URL("https://api.shrtco.de/v2/shorten");
    shortenApiUrl.searchParams.set("url", link);
    let response = await fetch(shortenApiUrl);
    let data = await response.json();

    return data.result;
  } catch (error) {
    console.error(error.message);
  }
};
localStorage.clear();
const toLocaleStorage = async () => {
  try {
    let urlObject = await urlShortener(shortenUrl.value);
    let urlObjectJSON = JSON.stringify(urlObject);
    // console.log(urlObjectJSON)
    let = urlKey = urlObject.code;
    localStorage.setItem(urlKey, urlObjectJSON);

    return urlKey;
  } catch (error) {
    console.error(error.message);
  }
};
// toLocaleStorage();
const render = async () => {
  const localKey = await toLocaleStorage();
  const localData = JSON.parse(localStorage.getItem(localKey));
  //  console.log(localData)
  const { code, short_link, original_link } = localData;
  const shortenHistoryContainer = document.querySelector(
    ".shorten-history-container"
  );
  shortenHistoryContainer.insertAdjacentHTML(
    "beforebegin",
    `
<div class="shorten-history">
<h3>

<a href="${original_link}" target="_blank" class="original-link"> ${original_link}</a></h3>
<hr>
<div>
  <p>
  <a href="${short_link}" target="_blank" class="short-link"> ${short_link}</a>
 </p>
<button data-copied
="false" class="copy-button">Copy</button>
</div>
</div>`
  );
};
// render();

shortenUrlSubmit.addEventListener("click", () => {
  render();
});
const shortenHistory = document.querySelector(".shorten-history");

// shortenUrl.oninvalid = (e) => {
//   e.target.setCustomValidity("");
//   if (!e.target.validity.valid) {
//     e.target.setCustomValidity("This field cannot be blank");
//   }
// };
// shortenUrl.oninput = (e) => {
//   e.target.setCustomValidity("");
// };

if (navigator.clipboard) {
  const copyButton = document.querySelector("copy-button");
  const shortLink = document.querySelector(".short-link");
  const dataCopied = copyButton.getAttribute("data-copied");
  console.log(dataCopied);
  console.log(shortLink);

  copyButton.addEventListener("click",  () => {
    try {
      navigator.clipboard.writeText(shortLink.href);
      console.log("text copied");
      if (dataCopied === "false") {
        copyButton.setAttribute("data-copied", true);
      }
    } catch (error) {
      console.error(error.message);
    }
  });
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

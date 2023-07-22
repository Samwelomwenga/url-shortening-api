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
    let = urlKey = urlObject.code;
    localStorage.setItem(urlKey, urlObjectJSON);

    return urlKey;
  } catch (error) {
    console.error(error.message);
  }
};
const shortenHistoryContainer = document.querySelector(
  ".shorten-history-container"
);
const render = async () => {
  const localKey = await toLocaleStorage();
  const localData = JSON.parse(localStorage.getItem(localKey));
  const { code, short_link, original_link } = localData;
  shortenHistoryContainer.insertAdjacentHTML(
    "beforebegin",
    `
<div class="shorten-history">
<h3>

<a href="${original_link}" target="_blank" class="original-link"> ${original_link}</a></h3>
<hr>
<div>
  <p>
  <a class="short-link" href="${short_link}" target="_blank" > ${short_link}</a>
 </p>
<button data-copied
="false" class="copy-button" data-short-link="${short_link}" onclick="handleCopyData(this)">Copy</button>
</div>
</div>`
  );
};

shortenUrlSubmit.addEventListener("click", async () => {

  handleDataError();
  render();
});

const handleDataError = () => {
  shortenUrl.setCustomValidity("");
  const valid = shortenUrl.checkValidity();
  const dataError = document.querySelector("[data-error-message]");
  if (!valid) {
    dataError.setAttribute("data-error-message", true);
    dataError.innerHTML = "Please add a link";
    shortenUrl.setAttribute("data-valid", false);
  }
  shortenUrl.addEventListener("focus", () => {
    dataError.setAttribute("data-error-message", false);
    shortenUrl.setAttribute("data-valid", true);
  });
};



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


function iterateLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`Key: ${key}, Value: ${value}`);
    // You can do further processing or display the data on the page as needed
    let localData = JSON.parse(localStorage.getItem(key));
    const { code, short_link, original_link } = value;

    shortenHistoryContainer.insertAdjacentHTML(
      "beforebegin",
      `
      <div class="shorten-history">
        <h3>
          <a href="${original_link}" target="_blank" class="original-link">${original_link}</a>
        </h3>
        <hr>
        <div>
          <p>
            <a class="short-link" href="${short_link}" target="_blank">${short_link}</a>
          </p>
          <button data-copied="false" class="copy-button" data-short-link="${short_link}" onclick="handleCopyData(this)">Copy</button>
        </div>
      </div>
      `
    )
  }
}
iterateLocalStorage();
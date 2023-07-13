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
="false" class="copy-button">Copy</button>
</div>
</div>`
  );
};

shortenUrlSubmit.addEventListener("click", async () => {
  // await copyDataFunction(shortenHistoryContainer);
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

// const copyDataFunction = async (elm) => {
// await render();
// let mList = document.getElementById('myList'),
// try {
//   options = {
//     childList: true
//   },
//   observer = new MutationObserver(mCallback);

//   function mCallback(mutations) {
//     for (let mutation of mutations) {
//       if (mutation.type === 'childList') {
//         console.log('Mutation Detected: A child node has been added or removed.');
//       }
//     }
//   }

//   observer.observe(elm, options);
// } catch (error) {
//   console.error(error.message);
// }

//   const handleMutation= ()=>{
//     const copyButton = document.querySelector(".copy-button");
//     const shortLinkHref = document.querySelector('.short-link').getAttribute('href');
//     console.log(copyButton,"\n",shortLinkHref);
//     observer.disconnect();
//   }
//   let observer = new MutationObserver((mutations) => {
//     for (let mutation of mutations) {
//     if (mutation.type==='childList'&&mutation.addedNodes.length>0) {
//       console.log("Yes")
// mutation.addedNodes.forEach((node)=>{
//   if (node.classList&&node.classList.contains('.shorten-history')) {
//     handleMutation();
//   }
// })
//     }
//     }
//   });
//   observer.observe(shortenHistoryContainer, {
//     subtree: true,
//     childList: true,
//   });
// copyDataFunction();

// if (navigator.clipboard) {
//   const copyButton = document.querySelector("copy-button");
//   const dataCopied = copyButton.getAttribute("data-copied");
//   console.log(dataCopied);
//   console.log(shortLink);

//   copyButton.addEventListener("click",  () => {
//     try {
//       navigator.clipboard.writeText(shortLink.href);
//       console.log("text copied");
//       if (dataCopied === "false") {
//         copyButton.setAttribute("data-copied", true);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   });
// }
// };

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

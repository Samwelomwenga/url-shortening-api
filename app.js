const shortenUrlSubmit = document.querySelector(".shorten-url-submit");

const shortenUrl = document.querySelector("#shorten-url");

const urlShortener = async (link) => {
  try {
    let shortenApiUrl = new URL("https://api.shrtco.de/v2/shorten");
    shortenApiUrl.searchParams.set("url", link);
    let response = await fetch(shortenApiUrl);
    let data = await response.json();

    let results = {
      code: data.result.code,
      originalLink: data.result.original_link,
      shortLink: data.result.short_link,
    };
    return results;
  } catch (error) {
    alert(error.message);
  }
};
// localStorage.clear()
const toLocaleStorage = async () => {
  try {
    let ur = await urlShortener(shortenUrl.value);
    for (const [key, item] of Object.entries(ur)) {
      localStorage.setItem(key, item);
      // console.log(localStorage.getItem("originalLink"));
    }
    // console.log(localStorage.key(2))
  } catch (error) {
    alert(error.message);
  }
};
// toLocaleStorage();
const render=async()=>{
//   return`    
//   <div class="shorten-history">
//   <h3>${originalLink } </h3>
//   {/* <hr> */}
//   <div>
//     <p>${shortLink}</p>
//   <button data-copied
//   ="false">Copy</button>
//   </div>
// </div>`

//   let localKeys = Object.keys(localStorage);
//   for(let localData of localKeys) {
// console.log(`${localData} ${localStorage.getItem(localData)}`)
// return(
//   <div class="shorten-history">
//   <h3>Lorem ipsum dolor  </h3>
//   <hr>
//   <div>
//     <p>Lorem ipsum dolor, sit</p>
//   <button data-copied
//   ="false">Copy</button>
//   </div>
// </div>
// )
//   }
}
render();

shortenUrlSubmit.addEventListener("click", () => {
  urlShortener(shortenUrl.value);
});
const shortenHistory = document.querySelector(".shorten-history");

shortenUrl.oninvalid = (e) => {
  e.target.setCustomValidity("");
  if (!e.target.validity.valid) {
    e.target.setCustomValidity("This field cannot be blank");
  }
};
shortenUrl.oninput = (e) => {
  e.target.setCustomValidity("");
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

// Burger menus
document.addEventListener("DOMContentLoaded", function () {
  // open
  const burger = document.querySelectorAll(".navbar-burger");
  const menu = document.querySelectorAll(".navbar-menu");

  if (burger.length && menu.length) {
    for (var i = 0; i < burger.length; i++) {
      burger[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  // close
  const close = document.querySelectorAll(".navbar-close");
  const backdrop = document.querySelectorAll(".navbar-backdrop");

  if (close.length) {
    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }

  if (backdrop.length) {
    for (var i = 0; i < backdrop.length; i++) {
      backdrop[i].addEventListener("click", function () {
        for (var j = 0; j < menu.length; j++) {
          menu[j].classList.toggle("hidden");
        }
      });
    }
  }
});


// inject loading animation
let lodingText = `<h5 id="loadingText" class="w-6/12 m-auto lg:ml-[40%] relative top-52 lg:top-44 font-extrabold lg:text-2xl text-red-700 animate-bounce">Content is Loading ...</h5>`;
let LoadingImageSRC = `../../assets/image/LoadingImage.png`;
document.getElementById("loadingImage").src = LoadingImageSRC;
document.getElementById("renderFront").innerHTML = lodingText;

//getting featured posts
fetch("/getpost").then((res) => {
  res.json().then((data) => {
    console.log(data);
    let template = "";
    data.forEach((item) => {
      template += `<div class="max-w-sm rounded overflow-hidden shadow-lg my-4">
    <img class="w-full" src="${item.profileUrl}" alt="creator">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${item.userName}</div>
      <p class="text-gray-700 text-base">${item.profession}</p>
    </div>
    <div class="px-6 pt-4 pb-2 my-5">
      <a href="${item.slug}" class="bg-green-600 px-4 py-2 text-white rounded-lg hover:bg-green-900 DonateButton">Donate</a>
    </div>
  </div>`;
    });
    document.getElementById("loadingText").style.display = "none";
    document.getElementById("loadingImage").style.display = "none";
    document.getElementById("renderFront").innerHTML = template;
    // Perform a GET request to the query URL
    let AllDonateButtons = document.querySelectorAll(".DonateButton");
    AllDonateButtons.forEach((SelectedButton) => {
      SelectedButton.addEventListener("click", () => {
        let AccountID = sessionStorage.getItem("AccountID");
        console.log(AccountID);
        if (AccountID == null || AccountID == "") {
          alert("Please Login to Donate!");
          SelectedButton.href = "/signin";
        }
      });
    });
  });
});

// Signin Check
var AccountIDN = sessionStorage.getItem("AccountID");
if (AccountIDN != null) {
  document.querySelectorAll(".SignMethod").forEach((item) => {
    item.style.display = "none";
    document.getElementById(
      "frontName"
    ).innerText = `Hey, ${sessionStorage.getItem("Name")}`;
  });
}

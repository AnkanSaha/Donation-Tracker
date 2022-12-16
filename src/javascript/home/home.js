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

let MobileSceleton = `
<div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
    <div class="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
    </div>
    <div class="w-full">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>
`

var mobileView = window.matchMedia("(max-width: 768px)");
if (mobileView.matches) {
  document.getElementById("loadingImage").style.display = "none";
  document.getElementById("renderFront").innerHTML = MobileSceleton;
  document.getElementById("loadingImage").src = '';
} else {
  document.getElementById("loadingImage").src = LoadingImageSRC;
  document.getElementById("renderFront").innerHTML = lodingText;
}


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
    document.getElementById("loadingImage").remove();
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

//signin check
var AccountIDN = sessionStorage.getItem("AccountID");
if (AccountIDN != null) {
  document.querySelectorAll(".SignMethod").forEach((item) => {
    item.style.display = "none";
    document.getElementById(
      "frontName"
    ).innerText = `Hey, ${sessionStorage.getItem("Name")}`;
  });
}

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
var lodingText = `<h5 id="loadingText" class="w-6/12 m-auto lg:ml-[40%] relative top-52 lg:top-44 font-extrabold lg:text-2xl text-red-700 animate-bounce">Content is Loading ...</h5>`;
var LoadingImageSRC = `../../assets/image/LoadingImage.png`;
document.getElementById("loadingImage").src = LoadingImageSRC;

let TemplateTable = "";
// fetching all info
fetch("/gethistory", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ AccountID: AccountIDN }),
}).then((data) => {
  data.json().then((response) => {
    console.log(response);
    response.forEach((data) => {
      TemplateTable += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${data.SenderName}
            </th>
            <td class="py-4 px-6">
                ${data.CreatorName}
            </td>
            <td class="py-4 px-6">
                ${data.Amount}
            </td>
            <td class="py-4 px-6">
                ${data.Message}
            </td>
            <td class="py-4 px-6">
                ${data.Date}
            </td>
            <td class="py-4 px-6">
                ${data.Status}
            </td>
        </tr>`;
    });
    document.getElementById("loadingImage").style.display = "none";
    document.getElementById("dataTable").innerHTML = TemplateTable;
  });
});

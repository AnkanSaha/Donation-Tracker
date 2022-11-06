let Dates = new Date();
// DOM
let PayBtn = document.getElementById("PayBtn");
// other
var AccountID = sessionStorage.getItem("AccountID");
if (AccountID == "" || AccountID == null) {
  window.location.href = "/";
}
document.getElementById("price").addEventListener("focusout", () => {
  var Ammount = "$" + document.getElementById("price").value;
  document.getElementById("PayBtn").innerText = "Support " + Ammount;
});

// pay feature
document.getElementById("PayBtn").addEventListener("click", () => {
  var currency = document.getElementById("currency").value;
  var Amount = document.getElementById("price").value +' '+currency;
  var CreatorName = document.getElementById("cratorname").innerText;
  var SenderName = document.getElementById("Donorname").value;
  var message = document.getElementById("message").value;
  if (Amount == "" || CreatorName == "" || SenderName == "") {
    alert("Please fill all fields to proceed");
  } else {
    if (message == "") {
      message = "No message Provided";
    }
    console.log(Amount, CreatorName, SenderName, message);
    PayBtn.classList.add("cursor-not-allowed");
    PayBtn.classList.add("animate-bounce");
    PayBtn.classList.add("opacity-50");
    // send data to server
    var data = {
      Amount: Amount,
      CreatorName: CreatorName,
      SenderName: SenderName,
      message: message,
      PaymentDate: Dates,
      AccountID: AccountID,
    };
    var FetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/RegisterDonateHistory", FetchConfig).then((data) => {
      PayBtn.classList.remove("cursor-not-allowed");
      PayBtn.classList.remove("animate-bounce");
      PayBtn.classList.remove("opacity-50");
      data.json().then((response) => {
        console.log(response);
        alert(response.Status);
        window.location.href = "/";
      });
    });
  }
});

var AccountID = sessionStorage.getItem("AccountID");
if (AccountID) {
  window.location.href = "/";
}

// sending registration data to server
document.getElementById("signinbtn").addEventListener("click", () => {
  console.log("Signin button clicked");
  var Email = document.getElementById("email").value;
  var Password = document.getElementById("password").value;
  // validation
  if (Email == "" || Password == "") {
    alert("Please fill all the fields");
  } else if (Password.length < 8 || Password.length > 20) {
    alert("Password must be between 8 to 20 characters");
  } else {
    document.getElementById("signinbtn").innerText = "Signing In...";
    document.getElementById("signinbtn").disabled = true;
    document.getElementById("signinbtn").style.cursor = "not-allowed";
    document.getElementById("signinbtn").style.opacity = "0.5";
    document.getElementById("signinbtn").classList.add("animate-bounce");
    // sending data
    var ReadyData = {
      Email: Email,
      Password: Password,
    };
    fetch("/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ReadyData),
    }).then((data) => {
      document.getElementById("signinbtn").innerText = "Sign In";
      document.getElementById("signinbtn").disabled = false;
      document.getElementById("signinbtn").style.cursor = "cursor-pointer";
      document.getElementById("signinbtn").style.opacity = "1.0";
      document.getElementById("signinbtn").classList.remove("animate-bounce");
      data.json().then((result) => {
        if (result.status == "Success") {
          alert("Logged In Successfully");
          sessionStorage.setItem("AccountID", result.AccountID);
          sessionStorage.setItem("Name", result.Name);
          window.location.href = "/";
        } else if (result.status == "Not Exist") {
          Email = "";
          Password = "";
          document.getElementById("signinbtn").style.cursor = "cursor-pointer";
          alert("Email or Password is incorrect");
        }
      });
    });
  }
});

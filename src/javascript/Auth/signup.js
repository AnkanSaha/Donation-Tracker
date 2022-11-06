var AccountID = sessionStorage.getItem("AccountID");
if (AccountID) {
  window.location.href = "/";
}
// sending registration data to server
document.getElementById("signupbtn").addEventListener("click", () => {
  var Email = document.getElementById("email").value;
  var Password = document.getElementById("password").value;
  var ConfirmPassword = document.getElementById("confirm-password").value;
  var Name = document.getElementById("name").value;
  // validation
  if (Email == "" || Password == "" || ConfirmPassword == "") {
    alert("Please fill all the fields");
  } else if (Password != ConfirmPassword) {
    alert("Password and Confirm Password must be same");
  } else if (Password.length < 8 || Password.length > 20) {
    alert("Password must be between 8 to 20 characters");
  } else if (document.getElementById("terms").checked == false) {
    alert("Please Accept the terms & conditions to proceed");
  } else {
    document.getElementById("signupbtn").innerText = "Signing Up...";
    document.getElementById("signupbtn").disabled = true;
    document.getElementById("signupbtn").style.cursor = "not-allowed";
    document.getElementById("signupbtn").style.opacity = "0.5";
    document.getElementById("signupbtn").classList.add("animate-bounce");
    // sending data
    var ReadyData = {
      Email: Email,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
      name: Name,
    };
    fetch("/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ReadyData),
    })
      .then((data) => {
        document.getElementById("signupbtn").innerText = "Create an account";
        document.getElementById("signupbtn").disabled = false;
        document.getElementById("signupbtn").style.cursor = "cursor-pointer";
        document.getElementById("signupbtn").style.opacity = "1.0";
        document.getElementById("signupbtn").classList.remove("animate-bounce");
        data.json().then((result) => {
          if (result.status == "Success") {
            alert("Account Created Successfully");
            sessionStorage.setItem("AccountID", result.AccountID);
            sessionStorage.setItem("Name", result.Name);
            window.location.href = "/";
          } else if (result.status == "Exist") {
            Email = "";
            Password = "";
            ConfirmPassword = "";
            Name = "";
            document.getElementById("signupbtn").style.cursor =
              "cursor-pointer";
            alert("Email Already Exists");
          } else if (result.status == "Failed") {
            Email = "";
            Password = "";
            ConfirmPassword = "";
            Name = "";
            document.getElementById("signupbtn").style.cursor =
              "cursor-pointer";
            alert("Something went wrong");
          }
        });
      })
      .catch((senderr) => {
        document.getElementById("signupbtn").innerText = "Create an account";
        document.getElementById("signupbtn").disabled = false;
        document.getElementById("signupbtn").style.cursor = "cursor-pointer";
        document.getElementById("signupbtn").style.opacity = "1.0";
        document.getElementById("signupbtn").classList.remove("animate-bounce");
        alert("405:Please Try Again");
      });
  }
});

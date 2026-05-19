/* ========================= */
/* ELEMENTS */
/* ========================= */

const passwordInput =
document.getElementById("password");

const confirmPasswordInput =
document.getElementById("confirmPassword");

const strengthBars =
document.querySelectorAll(".strength-bar");

const strengthText =
document.getElementById("strength-text");

const matchMessage =
document.getElementById("matchMessage");

const signupForm =
document.querySelector(".auth-form");

const termsCheckbox =
document.getElementById("termsCheck");

const authButton =
document.querySelector(".auth-btn");

const toggleIcons =
document.querySelectorAll(".toggle-password");

/* ========================= */
/* PASSWORD TOGGLE */
/* ========================= */

toggleIcons.forEach(icon => {

  icon.addEventListener("click", () => {

    const input =
      icon.previousElementSibling;

    if(input.type === "password"){

      input.type = "text";

      icon.classList.remove("fa-eye");

      icon.classList.add("fa-eye-slash");

    }

    else{

      input.type = "password";

      icon.classList.remove("fa-eye-slash");

      icon.classList.add("fa-eye");

    }

  });

});

/* ========================= */
/* PASSWORD STRENGTH */
/* ========================= */

passwordInput.addEventListener("input", () => {

  const value = passwordInput.value;

  let strength = 0;

  /* CONDITIONS */

  if(value.length >= 6){
    strength++;
  }

  if(/[A-Z]/.test(value)){
    strength++;
  }

  if(/[0-9]/.test(value)){
    strength++;
  }

  /* RESET */

  strengthBars.forEach(bar => {

    bar.style.opacity = "0.2";

    bar.style.background =
      "rgba(255,255,255,0.2)";

  });

  /* WEAK */

  if(strength === 1){

    strengthBars[0].style.opacity = "1";

    strengthBars[0].style.background =
      "#ff4d4d";

    strengthText.textContent =
      "Weak Password";

    strengthText.style.color =
      "#ff4d4d";

  }

  /* MEDIUM */

  else if(strength === 2){

    strengthBars[0].style.opacity = "1";
    strengthBars[1].style.opacity = "1";

    strengthBars[0].style.background =
      "#ffb84d";

    strengthBars[1].style.background =
      "#ffb84d";

    strengthText.textContent =
      "Medium Password";

    strengthText.style.color =
      "#ffb84d";

  }

  /* STRONG */

  else if(strength === 3){

    strengthBars.forEach(bar => {

      bar.style.opacity = "1";

      bar.style.background =
        "linear-gradient(90deg,#00f0ff,#7b2ff7)";

    });

    strengthText.textContent =
      "Strong Password";

    strengthText.style.color =
      "#00f0ff";

  }

  /* EMPTY */

  else{

    strengthText.textContent =
      "Password Strength";

    strengthText.style.color =
      "#9ca3af";

  }

  checkPasswordMatch();

});

/* ========================= */
/* PASSWORD MATCH */
/* ========================= */

function checkPasswordMatch(){

  const password =
    passwordInput.value;

  const confirmPassword =
    confirmPasswordInput.value;

  /* EMPTY */

  if(confirmPassword === ""){

    matchMessage.textContent = "";

    return false;

  }

  /* MATCH */

  if(password === confirmPassword){

    matchMessage.textContent =
      "Passwords Match";

    matchMessage.style.color =
      "#00f0ff";

    return true;

  }

  /* NOT MATCH */

  else{

    matchMessage.textContent =
      "Passwords Do Not Match";

    matchMessage.style.color =
      "#ff4d4d";

    return false;

  }

}

/* CONFIRM PASSWORD INPUT */

confirmPasswordInput.addEventListener(
  "input",
  checkPasswordMatch
);

/* ========================= */
/* FORM SUBMIT */
/* ========================= */

signupForm.addEventListener("submit", (e) => {

  e.preventDefault();

  /* PASSWORD MATCH */

  const passwordsMatch =
    checkPasswordMatch();

  if(!passwordsMatch){

    matchMessage.textContent =
      "Passwords Do Not Match";

    matchMessage.style.color =
      "#ff4d4d";

    return;

  }

  /* TERMS */

  if(!termsCheckbox.checked){

    matchMessage.textContent =
      "Please accept Terms & Conditions";

    matchMessage.style.color =
      "#ff4d4d";

    return;

  }

  /* SUCCESS */

  matchMessage.textContent =
    "Account Created Successfully";

  matchMessage.style.color =
    "#00f0ff";

  /* BUTTON LOADING */

  authButton.innerHTML =
    'Creating Account <i class="fa-solid fa-spinner fa-spin"></i>';

  authButton.style.opacity = "0.8";

  /* REDIRECT */

  setTimeout(() => {

    window.location.href = "login.html";

  }, 1800);

});
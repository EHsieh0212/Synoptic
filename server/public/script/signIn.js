console.log("client side javascript file is loaded.");

////////////////////////////////////////////////////////////////////////
// get elements
const submitBtn = document.querySelector(".submit-btn");
const fbBtn = document.querySelector(".fb-btn");

// get form data for backend
submitBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    // note: "form" "formData" creation needs to be included within addEventListener, so backend api can retrieve once clicked btn
    // require: html <form action='/api_name'>
    const form = document.getElementById("aform");
    const formData = new FormData(form);
    let formResult = {};
    formData.forEach((value, key) => formResult[key] = value);
});

fbBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/api/v1/users/fbSignIn';
})
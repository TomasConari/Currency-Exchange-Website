document.addEventListener("DOMContentLoaded", async (event) => {
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const country = document.getElementById("country").value;
        const emailMsg = `mailto:tomasconari@gmail.com?subject=Hey Tomás&body=My name is ${name} ${lastname} and I am from ${country}, let's get in touch`;
        window.open(emailMsg);
    });
});
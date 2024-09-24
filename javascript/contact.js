document.addEventListener("DOMContentLoaded", () => {

    const wait = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const title = document.getElementById("presentationTittle");
    const subTitle = document.getElementById("presentationText");

    // Initialize EmailJS with the public key
    emailjs.init("CheDvvyarhhvgKfRt");  // Make sure to put your correct public key

    // Get the submit button
    const submitButton = document.getElementById("submitButton");

    // Function to send the email
    const sendEmail = async (e) => {
        e.preventDefault();  // Prevent the page from reloading

        // Get the values from the form
        const name = document.getElementById("name");
        const lastname = document.getElementById("lastname");
        const country = document.getElementById("country");
        const email = document.getElementById("email");

        // Parameters to send to the EmailJS service
        const templateParams = {
            name: name.value,
            lastname: lastname.value,
            country: country.value,
            email: email.value,
        };

        try {
            const result = await emailjs.send('service_7j42v0n', 'template_cwbrvvn', templateParams);
            console.log(result);
            if (result.text === "OK") {
                // Clear the input values
                name.value = "";
                lastname.value = "";
                country.value = "";
                email.value = "";
                title.textContent = "Email Sent"; // Changed to "Email Sent"
                subTitle.textContent = "";
                await wait(5000);
                title.textContent = "Contact"; // Changed to "Contact"
                subTitle.textContent = "Fill and Submit the form"; // Return message
            } else {
                throw new Error('Error sending the email');
            }
        } catch (error) {
            title.textContent = "Error";
            subTitle.textContent = "Try Again Later";
            await wait(5000);
            title.textContent = "Contact"; // Changed to "Contact"
            subTitle.textContent = "Fill and Submit the form"; // Return message
        }
    };

    // Assign the send function to the submit button
    submitButton.addEventListener("click", sendEmail);
});

document.addEventListener("DOMContentLoaded", () => {

    const wait = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const title = document.getElementById("presentationTittle");
    const subTitle = document.getElementById("presentationText");

    // Inicializar EmailJS con la clave pública
    emailjs.init("CheDvvyarhhvgKfRt");  // Asegúrate de poner tu clave pública correcta

    // Obtener el botón de envío
    const submitButton = document.getElementById("submitButton");

    // Función para enviar el correo
    const sendEmail = async (e) => {
        e.preventDefault();  // Prevenir la recarga de la página

        // Obtener los valores del formulario
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const country = document.getElementById("country").value;
        const email = document.getElementById("email").value;

        // Parámetros a enviar al servicio EmailJS
        const templateParams = {
            name: name,
            lastname: lastname,
            country: country,
            email: email,
        };

        try {
            const result = await emailjs.send('service_7j42v0n', 'template_cwbrvvn', templateParams);
            console.log(result);
            title.textContent = "Email Sended";
            subTitle.textContent = "";
            await wait(5000);
            title.textContent = "Contact";
            subTitle.textContent = "Fill and Submit the form";
        } catch (error) {
            title.textContent = "Error";
            subTitle.textContent = "Try Again Later";
            await wait(5000);
            title.textContent = "Contact";
            subTitle.textContent = "Fill and Submit the form";
        };
    };

    // Asignar la función de envío al botón de envío
    submitButton.addEventListener("click", sendEmail);
});

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Изпращане...";

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwc3Uw1ziRdyAU5XszYBOiuoN4lkHqir31DEbSi_7_br0ud61DvHTGjkiqzJgkUx74r/exec",
            {
                method: "POST",
                body: new URLSearchParams(new FormData(form)),
            }
        );

        if (response.ok) {
            successMsg.style.display = "block";
            form.reset();
        } else {
            alert("Неуспешно изпращане. Моля, опитайте отново.");
        }
    } catch (err) {
        alert("Грешка при изпращане на формуляра. Проверете връзката си.");
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

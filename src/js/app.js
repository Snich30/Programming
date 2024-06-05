document.getElementById('request-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });

    try {
        const response = await fetch('/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('message').textContent = 'Заявка успешно добавлена!';
        document.getElementById('message').style.color = 'green';

        // Очистка формы после успешной отправки
        event.target.reset();
    } catch (error) {
        document.getElementById('message').textContent = `Ошибка при добавлении заявки: ${error.message}`;
        document.getElementById('message').style.color = 'red';
    }
});

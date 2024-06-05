const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./db');  // Подключаем pool из файла db.js

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src'))); // Путь к статическим файлам теперь src

// Определение маршрута для корневого URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.post('/requests', async (req, res) => {
    try {
        const { request_number, date_added, car_type, car_model, problem_description, client_name, client_phone, status } = req.body;
        const newRequest = await db.query('INSERT INTO requests (request_number, date_added, car_type, car_model, problem_description, client_name, client_phone, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [request_number, date_added, car_type, car_model, problem_description, client_name, client_phone, status]);
        res.json(newRequest.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Редактирование заявки
app.put('/requests/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, problem_description } = req.body;
        const updatedRequest = await db.query('UPDATE requests SET status = $1, problem_description = $2 WHERE request_id = $3 RETURNING *', [status, problem_description, id]);
        res.json(updatedRequest.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Получение списка заявок
app.get('/requests', async (req, res) => {
    try {
        const allRequests = await db.query('SELECT * FROM requests');
        res.json(allRequests.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Установка автомеханика для заявки
app.post('/assign-mechanic', async (req, res) => {
    try {
        const { request_id, mechanic_id } = req.body;
        await db.query('INSERT INTO request_mechanics (request_id, mechanic_id) VALUES ($1, $2)', [request_id, mechanic_id]);
        res.send('Mechanic assigned to request');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

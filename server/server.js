require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];
let currentTask = null;

// Khởi tạo OpenAI client với OpenRouter
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// API endpoints
app.post('/api/tasks', (req, res) => {
  const { task, time } = req.body;
  const newTask = {
    id: Date.now(),
    task,
    time,
    completed: false,
    xp: Math.floor(Math.random() * 100) + 50 // Random XP between 50-150
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/current-task', (req, res) => {
  res.json(currentTask);
});

app.post('/api/start-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  currentTask = tasks.find(task => task.id === taskId);
  res.json(currentTask);
});

app.post('/api/complete-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = true;
    currentTask = null;
    res.json({ success: true, xp: task.xp });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Endpoint mới để chia nhỏ nhiệm vụ
app.post('/api/breakdown-task', async (req, res) => {
  try {
    const { task, time } = req.body;
    
    const prompt = `Bạn là một trợ lý lên kế hoạch công việc. Hãy chia nhỏ nhiệm vụ "${task}" thành các bước nhỏ hơn để hoàn thành trong ${time} phút. 
    Mỗi bước nên có thời gian ước tính. 
    Bạn PHẢI trả về DUY NHẤT một JSON object với format sau, không thêm bất kỳ text nào khác:
    {
      "subtasks": [
        {
          "task": "tên subtask",
          "estimatedTime": "thời gian ước tính"
        }
      ]
    }`;

    const completion = await client.chat.completions.create({
      extra_headers: {
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
        "X-Title": "Task Manager App"
      },
      model: "qwen/qwen2.5-vl-32b-instruct:free",
      messages: [
        {
          role: "system",
          content: "Bạn là một trợ lý lên kế hoạch công việc. Bạn luôn trả về kết quả dưới dạng JSON object."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    console.log('Raw response:', completion.choices[0].message.content);
    
    // Thử parse JSON
    let breakdown;
    try {
      breakdown = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      // Nếu không parse được, trả về lỗi
      return res.status(500).json({ 
        error: 'Failed to parse response', 
        details: 'The AI response was not in valid JSON format' 
      });
    }

    // Kiểm tra cấu trúc JSON
    if (!breakdown.subtasks || !Array.isArray(breakdown.subtasks)) {
      return res.status(500).json({ 
        error: 'Invalid response format', 
        details: 'The AI response did not contain the expected subtasks array' 
      });
    }

    res.json(breakdown);
  } catch (error) {
    console.error('Error breaking down task:', error);
    res.status(500).json({ 
      error: 'Failed to break down task',
      details: error.message 
    });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

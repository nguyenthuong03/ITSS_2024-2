# Task Manager Application

Ứng dụng quản lý công việc với tính năng chia nhỏ nhiệm vụ tự động sử dụng AI.

## Tính năng chính

- Thêm và quản lý nhiệm vụ
- Chia nhỏ nhiệm vụ tự động thành các subtask
- Theo dõi thời gian hoàn thành
- Hệ thống tích điểm XP
- Xếp hạng người dùng
- Lịch sử hoàn thành nhiệm vụ

## Yêu cầu hệ thống

- Node.js (v16 trở lên)
- npm hoặc yarn
- Git

## Cài đặt

1. Clone repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Cài đặt dependencies cho client:
```bash
cd client
npm install
```

3. Cài đặt dependencies cho server:
```bash
cd ../server
npm install
```

4. Tạo file .env trong thư mục server:
```
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
SITE_URL=http://localhost:3000
```

## Chạy ứng dụng

1. Chạy server:
```bash
cd server
npm start
```

2. Chạy client (trong terminal mới):
```bash
cd client
npm start
```

3. Truy cập ứng dụng:
- Mở trình duyệt và truy cập http://localhost:3000

## Cấu trúc thư mục

```
.
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── App.js         # Main App component
│       └── index.js       # Entry point
├── server/                # Node.js backend
│   ├── public/           # Build files
│   ├── server.js         # Main server file
│   └── ecosystem.config.js # PM2 configuration
└── deploy.sh             # Deployment script
```

## Deployment

### Local Deployment

1. Build React app:
```bash
cd client
npm run build
```

2. Copy build files:
```bash
cp -r build/* ../server/public/
```

3. Start server với PM2:
```bash
cd ../server
npm install -g pm2
pm2 start ecosystem.config.js
```

### AWS EC2 Deployment

1. Tạo EC2 instance (t2.micro)
2. Cấu hình Security Group:
   - Port 22 (SSH)
   - Port 80 (HTTP)
   - Port 5000 (Backend)
3. SSH vào instance
4. Clone repository
5. Chạy deploy script:
```bash
chmod +x deploy.sh
./deploy.sh
```

## API Endpoints

- `POST /api/tasks` - Thêm nhiệm vụ mới
- `GET /api/tasks` - Lấy danh sách nhiệm vụ
- `POST /api/start-task/:id` - Bắt đầu nhiệm vụ
- `POST /api/complete-task/:id` - Hoàn thành nhiệm vụ
- `POST /api/breakdown-task` - Chia nhỏ nhiệm vụ

## Công nghệ sử dụng

- Frontend: React.js
- Backend: Node.js, Express
- AI: OpenRouter API
- Deployment: PM2, Nginx
- Database: In-memory (có thể thay thế bằng MongoDB)

## Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## Giấy phép

MIT License

## Liên hệ

[Your Name] - [Your Email]

# 📦 SmartStock AI

> AI-Powered Inventory Management & Demand Forecasting System

SmartStock AI is a full-stack web application designed to help small and medium-sized businesses efficiently manage inventory, monitor sales, and forecast future product demand using Machine Learning.

The application provides real-time inventory tracking, low-stock alerts, sales analytics, and intelligent reorder recommendations, enabling businesses to make data-driven inventory decisions.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt

### 📦 Product Management
- Add New Products
- Update Product Details
- Delete Products
- Search & Filter Products
- Category Management

### 📊 Inventory Management
- Real-time Stock Tracking
- Automatic Stock Updates
- Low Stock Alerts
- Reorder Level Monitoring

### 💰 Sales Management
- Record Sales
- Sales History
- Automatic Inventory Deduction
- Revenue Tracking

### 🤖 AI Demand Forecasting
- Predict Future Product Demand
- Intelligent Reorder Recommendations
- Sales Trend Analysis

### 📈 Dashboard
- Inventory Overview
- Total Products
- Revenue Summary
- Low Stock Products
- Sales Analytics
- Demand Prediction Charts

---

# 🏗️ System Architecture

```
                   React.js Frontend
                           │
                     REST API (Axios)
                           │
                  Node.js + Express.js
                 ┌──────────┴──────────┐
                 │                     │
             MySQL Database      Python FastAPI
                                      │
                             Machine Learning Model
```

---

# 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Chart.js

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- MySQL

### Machine Learning
- Python
- FastAPI
- Scikit-learn
- Pandas
- NumPy

### Version Control
- Git
- GitHub

### Deployment
- Vercel
- Render

---

# 📂 Project Structure

```
SmartStock-AI
│
├── frontend/          # React Application
├── backend/           # Express REST API
├── ml-service/        # Python ML Service
├── database/          # SQL Scripts
├── docs/              # Documentation
│
├── README.md
└── .gitignore
```

---

# 📌 Functional Modules

- Authentication
- Product Management
- Inventory Management
- Sales Management
- Dashboard
- AI Prediction

---

# 🗄️ Database

The application uses MySQL with the following entities:

- Users
- Products
- Sales

Future versions may include:

- Suppliers
- Purchase Orders
- Notifications
- Audit Logs

---

# 🔄 Workflow

```
Login

↓

Dashboard

↓

Manage Products

↓

Record Sales

↓

Update Inventory

↓

Predict Demand

↓

Generate Insights
```

---

# 📡 REST APIs

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Products

```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Sales

```
POST /api/sales
GET  /api/sales
```

## Dashboard

```
GET /api/dashboard
```

## AI Prediction

```
POST /api/predict
```

---

# 🎯 Project Objectives

- Reduce stock shortages
- Prevent overstocking
- Improve inventory visibility
- Automate stock management
- Predict future product demand
- Help businesses make smarter purchasing decisions

---

# 📸 Screenshots

> Screenshots will be added after implementation.

- Login Page
- Dashboard
- Product Management
- Sales Module
- AI Prediction
- Analytics Dashboard

---

# 🚀 Future Enhancements

- Barcode Scanner Integration
- QR Code Support
- Supplier Management
- Purchase Order Automation
- Email & WhatsApp Alerts
- Multi-User Role Management
- Cloud Deployment
- Mobile Application
- AI Chat Assistant
- Demand Forecasting using LSTM

---

# 👨‍💻 Author

**Apoorv Anand**

B.Tech (Artificial Intelligence & Machine Learning)

---

# 📄 License

This project is developed for educational and learning purposes.

---

⭐ If you like this project, consider giving it a star.
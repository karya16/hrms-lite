# HRMS Lite

HRMS Lite is a lightweight web-based Human Resource Management System developed as part of a full-stack assignment.  
The application focuses on basic HR operations such as managing employee records and tracking daily attendance.

The goal of this project was to build a clean and functional system with proper frontend–backend integration and live deployment.

---

## Live Application

- Frontend: hrms-lite-pi.vercel.app  
- Backend API: https://hrms-backend-hmjc.onrender.com  

---

## Features

### Employee Management
- Add new employees
- View all employees
- Delete employees
- Unique employee ID validation
- Email format validation

### Attendance Management
- Mark daily attendance for employees
- Attendance status: Present or Absent
- View attendance records per employee
- Prevent duplicate attendance entries for the same date

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS

### Backend
- Django
- Django REST Framework

### Database
- MySQL (local development)
- PostgreSQL (production)

### Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

---

## API Endpoints

### Employees
- `GET /api/employees/` – Fetch all employees
- `POST /api/employees/` – Add a new employee
- `DELETE /api/employees/{id}/` – Delete an employee

### Attendance
- `POST /api/attendance/` – Mark attendance
- `GET /api/attendance/{employee_id}/` – Fetch attendance records for an employee

---

## Running the Project Locally

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend Setup
cd frontend
npm install
npm run dev
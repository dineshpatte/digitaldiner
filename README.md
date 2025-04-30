# 🍽️ Digital-Diner Live App

### 🚀 Live Website: [Digital-Diner Live App](https://6811ace39d9789d0a3be79e4--rad-donut-1ff832.netlify.app/) *(Mobile Focused UI)*

---

## 📦 Steps to Run Backend

1. **Clone the repository**
2. **Open the project folder** in your preferred code editor
3. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

4. **Install dependencies and set up environment**
   ```bash
   npm i
   cp .env.sample .env
   ```

5. **Fill in the required details in `.env`**
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/digital-diner
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 💻 Steps to Run Frontend

1. **Navigate to the frontend folder**
   ```bash
   cd ..
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm i
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 🧠 Database Design Strategy

This project uses **MongoDB** for all models due to its flexibility and speed. Since I was already familiar with MongoDB, and due to time constraints, I opted to use it for the entire backend.

### 1. User Model
- **Database Used**: MongoDB  
- **Why**: User data is consistent, but MongoDB supports indexing and schema validation.  
- **Benefits**: Easy Mongoose integration for schema enforcement and validation.

### 2. Order Model
- **Database Used**: MongoDB  
- **Why**: Orders benefit from MongoDB’s nesting and reference features.  
- **Benefits**: Quick inserts, flexible structure, user references supported.

### 3. Menu Model
- **Database Used**: MongoDB  
- **Why**: Dynamic structure (e.g., variants, add-ons).  
- **Benefits**: Perfect for frequently updated, nested content.

### 4. Cart System
- **Handled on Frontend** using React Context API  
- **Why**: Avoids backend complexity for a simple feature.  
- **Benefits**: Fast, responsive, and easy to manage globally.

---

## 🔌 API Endpoints

### User Routes
- `POST /register`
- `POST /login`

### Order Routes
- `POST /create-order`
- `GET /get-orders`
- `PATCH /update-order` (Admin only)

### Menu Routes
- `POST /add-menu` (Admin only)
- `GET /get-menu-items`
- `GET /get-menu-item`
- `PATCH /edit-menu` (Admin only)

---

## 🧩 Challenges Faced

### 🛒 Managing the Cart

Initially considered using MongoDB to store the cart but realized it added unnecessary backend calls.  
Instead:

- Used **Context API** for cart state management.
- Benefits:
  - No backend calls required.
  - Clean and lightweight solution.
  - Smooth and responsive UI.

---

## ⚠️ Note

The app is hosted on **Netlify**, which may be a bit **slow on first load**. If menu items don’t load immediately:

- Please wait **5 seconds**, or  
- Navigate to the **"Orders" page and come back** to "Menu" to refresh.


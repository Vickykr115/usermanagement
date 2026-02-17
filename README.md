# 👤 React CRUD User Management App

A clean, modern, and scalable **React-based CRUD (Create, Read, Update, Delete)** application that manages user data using an API.  
Built with **future extensibility** in mind — new fields can be added with minimal code changes.

![Vercel ](https://usermanagementcrud-git-main-vicky-s-projects-8fe8512c.vercel.app/)

---

## 🚀 Features

- ➕ Create new users with validation
- 📄 View all users in a clean table layout
- ✏️ Edit user details instantly
- 🗑 Delete users with confirmation dialog
- ✅ Required field enforcement (First Name, Last Name, Phone, Email)
- 📧 Email format validation
- 📱 Responsive UI (works well on desktop + mobile)
- 🧩 Extensible architecture (schema/config driven fields)
- 🎨 Modern UI built using Material UI

---

## 🧾 User Fields

The application currently supports the following fields:

- First Name *(Required)*
- Last Name *(Required)*
- Phone Number *(Required + Validated)*
- Email Address *(Required + Validated)*

---

## 🧩 Extensibility (Future-Proof Design)

This project is designed so that adding new fields like:

✅ Date of Birth  
✅ Address  
✅ City / Country  
✅ User Role  

...requires only updating a **single config/schema file**, without rewriting major UI or backend logic.

---

## 📁 Folder Structure

```bash
📦 root/
├── 📁 src/
│   ├── 📁 api/                 # API integration layer
│   │   └── userApis.ts
│   │
│   ├── 📁 components/          # Reusable UI components
│   │   ├── UserForm.tsx
│   │   ├── UserList.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── ...
│   │
│   ├── 📁 types/               # TypeScript types/interfaces
│   │   └── index.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── 📄 package.json
├── 📄 index.html
└── 📄 README.md

Clone the repository: git clone https://github.com/Vickykr115/usermanagement

Go inside the project folder : cd your-repo-name

Install dependencies : npm install
Start the development server:npm run dev

GET    /users        # Fetch all users
POST   /users        # Create new user
PUT    /users/:id    # Update user
DELETE /users/:id    # Delete user

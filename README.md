# Favorite Movies & TV Shows Web Application (Frontend)

This is the **frontend** for the Favorite Movies & TV Shows Web App.
It allows users to login/signup, add new entries, edit/delete them, and browse through entries with infinite scroll.

---

## ✨ Tech Stack

* **React** (via Vite)
* **TypeScript**
* **Tailwind CSS**
* **Shadcn UI** (Radix-based component library)
* **Axios** (API requests)
* **React Router DOM** (routing)
* **React Hot Toast** (notifications)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-frontend-repo-url>
cd Favorite-Movies-TV-Shows-Web-Application
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root with the following content:

```env
VITE_API_BASE_URL=https://your-backend-domain/api
```

Replace `https://your-backend-domain` with your backend URL deployed on Railway (or wherever).

### 4. Run the App

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173`

---

## 📅 Features

### ✍️ Authentication

* Signup / Login pages
* Auth token saved to `localStorage`
* Protected routes using a layout

### 🔍 Entries Management

* Add/Edit/Delete movies & TV shows
* Infinite scroll table to browse entries
* Confirmations for delete actions
* Responsive, modern UI using Shadcn UI

### 🏠 Pages

* `/signup` - Create account
* `/login` - Login page
* `/` - Home (table of entries)
* `/create` - Add new entry
* `/edit/:id` - Edit existing entry
* `/profile` - User profile (optional)

---

## 🔧 Folder Structure

```
frontend/
├── public/            # Static assets
├── src/
│   ├── components/       # Shared UI components
│   ├── context/          # Auth context
│   ├── lib/              # Axios API client
│   ├── pages/            # Page components
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app router
│   └── main.tsx          # App entry point
└── tailwind.config.js   # TailwindCSS config
```



## 📊 API Integration

All API calls are handled via `axios` using a pre-configured instance:

```ts
import api from "@/lib/apiClient";

api.get("/entries")
```

Make sure the backend is accessible and CORS is allowed for the frontend domain.



## 📅 Backend Repo

If you’re looking for the backend:

> [Backend Repo](https://github.com/darshan1928/fav-movies-tv-shows-backend.git) 

---


Happy coding! ✨

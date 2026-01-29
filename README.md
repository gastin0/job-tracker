# Job Application Tracker

A full-stack job application tracking app build with **Next.js App Router**, **MongoDB**, and **Tailwind CSS**. Designed as a portfolio project with clean architecture, RESTful APIs, admin/read-only separation, and thoughtful UX for real-world CRUD workflows.

> This project focuses on **clarity, correctness, and user experience**, rather than feature bloat.

---

## ✨ Highlight
- **Next.js App Router** (Server + Client Components)
- **RESTful API routes** (`GET / POST / PUT / DELETE`)
- **MongoDB Atlas** with shared `clientPromise` connection pattern
- **Admin vs read-only UI separation** (client-side gating)
- **Accessible UX** (keyboard navigation, focus management)
- **Dockerized setup** (via dedicated branch)

---

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Frontend**: React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **Toolong**: ESLint, PostCSS
- **Deployment-ready**: Docker

---

## 📂 Project Structure (Simplified)
```
src/
├─ app/
│ ├─ applications/
│ │ ├─ page.jsx               # Public read‑only list (Server)
│ │ ├─ new/                   # Admin‑only create page
│ │ └─ edit/[id]/             # Admin‑only edit page
│ ├─ api/applications/        # REST API routes
│ └─ layout.jsx
├─ components/
│ ├─ ApplicationsClient.jsx   # Client logic + admin gating
│ ├─ ApplicationsTable.jsx    # Presentational table
│ ├─ ApplicationsFilters.jsx
│ └─ ConfirmDeleteModal.jsx   # Accessible delete flow
├─ lib/mongodb.js             # MongoDB clientPromise
└─ public/icons/
```

---

## 🔐 Admin vs Read-Only Architecture
- Public can only view applications
- Admin features (create, edit, delete) are gated client-side
- Admin access is derived from a secret stored `localStorage`
- UI hydration safety via `mounted && isAdmin`

---

##  🧠 Data Model (Canonical Schema)
Each application follows a fixed schema:
```json
{
  companyName: string,
  jobTitle: string,
  workArrangement: string,
  applicationStatus: string,
  applicationDate: Date,
  notes: string
}
```

---

## 🗑️ Delete UX
- Custom confirmation modal (now `window.confirm`)
- Focus trapping + Escape handling
- Backdrop click to cancel
- Delete state machine
- Artificial success delay
- Focus restored to triggering button

---

## 🐳 Docker Support
Docker configuration lives in a dedicated branch:
```bash
branch: job-tracker-docker
```

---

## 🚀 Getting Started
```bash
git clone <repository-url>
cd job-tracker
npm install
npm run dev
```

Create a `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_SECRET=your_admin_secret
```

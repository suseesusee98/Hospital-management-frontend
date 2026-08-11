# Frontend — React + Vite

## Setup

```bash
cd frontend
npm install
cp .env.example .env
# edit .env and paste your deployed Apps Script Web App URL into VITE_API_BASE_URL
npm run dev
```

The app runs at http://localhost:5173.

## Build for production

```bash
npm run build
```
Outputs static files to `frontend/dist/` — deploy that folder to any static
host (Netlify, Vercel, GitHub Pages, Firebase Hosting, etc.).

## Project structure

```
src/
├── components/       Reusable UI: Navbar, Footer, Hero, DoctorCard,
│                     AchievementCard, DepartmentCard, AppointmentForm,
│                     Button, Modal, Toast, Loader
├── pages/            Home, Doctors, Appointment, About, Contact, NotFound
├── router/            AppRouter.jsx — route table + shared layout
├── services/          axios.js, appointmentService.js, doctorService.js
├── data/              Static doctor / department / testimonial content
└── css/               variables.css (design tokens) + global.css
```

## Notes

- **No Tailwind** — plain CSS per component, using a shared token file
  (`src/css/variables.css`) for color, type, spacing, radius and shadow.
- **Doctors are static data** (`src/data/doctors.js`) since the project spec
  only asks for an `Appointments` sheet in the backend. `doctorService.js`
  is already async-shaped, so swapping in a real API later is a one-file change.
- The **Book Appointment** button on each doctor card links to
  `/appointment?doctor=<name>`, which pre-fills that doctor in the form.

# Geo Attendance Tracker

Hackathon-ready employee attendance system with browser geolocation, server-side geofence validation, JWT auth, PostgreSQL storage, admin reporting, audit logs, and CSV export.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT
- Location: Browser Geolocation API
- Validation: Backend Haversine distance check

## Features

- Signup/login, organization setup, invite codes and employee accounts
- Server-side check-in/out validation and working-minute calculation
- Geofencing, late arrival tracking, auto checkout, and audit logs
- WFH, On Duty, Leave, admin exceptions, and office settings
- Employee and admin dashboards, attendance history, calendars, reports and CSV export
- Optional SMTP late-arrival email

## Local setup

1. Install dependencies with `npm install` in `backend` and `frontend`.
2. Copy `backend/.env.example` to `backend/.env`. Set a random `JWT_SECRET` of at least 32 characters and a local `DATABASE_URL`. Never reuse production secrets locally.
3. Set local PostgreSQL variables in PowerShell, then start the database:

```powershell
$env:POSTGRES_USER = 'geo_attendance_local'
$env:POSTGRES_PASSWORD = 'choose-a-local-only-password'
docker compose up -d
```

Use the same local database credentials in `backend/.env`'s `DATABASE_URL`.
4. Run `npm run migrate` in `backend`.
5. Demo seed data is disabled by default and always skipped in production. To create demo accounts locally, set `ENABLE_DEMO_SEED=true`, `DEMO_ADMIN_PASSWORD`, and `DEMO_EMPLOYEE_PASSWORD` in `backend/.env`; both passwords must be at least 12 characters. The local login demo buttons are hidden in production builds; enable them in development with `VITE_ENABLE_DEMO_ACCESS=true` in `frontend/.env.local`.
6. Run `npm run dev` in `backend` and `frontend` in separate terminals.

The backend refuses to start unless `JWT_SECRET` is configured with a unique value of at least 32 characters. Production database, JWT and SMTP configuration must be supplied through the deployment environment.

## Vercel deployment

Set `VITE_API_BASE_URL` in the Vercel project's Environment Variables to the deployed backend API base URL, including `/api`. No Render service URL is embedded in the Vercel configuration. Keep `VITE_ENABLE_DEMO_ACCESS` unset or false in deployment; demo controls are compiled only into development builds.

## Notes

Browsers cannot reliably read WiFi SSIDs. GPS geofencing is the primary location check, with optional backend request IP/range checks as a supporting signal. See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API request examples.

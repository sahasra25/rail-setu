# RAILSETU – AI-Powered Automatic Block Planning for Indian Railways
> *“Bridging Maintenance and Movement — Intelligently.”*

**RAILSETU** is a hackathon prototype designed for Indian Railways command center operations to maximize railway asset availability while minimizing train disruption. It bridges the historical divide between the Engineering/Electrical/Signal maintenance departments and Traffic Operating controllers through constraint-based optimization, real-time timetable integration, and interactive human-in-the-loop decision workflows.

---

## ⚠️ Synthetic Data Disclaimer
All train numbers, timetables, block requests, track sections, and delay metrics presented in this application are **synthetic and for demonstration purposes only**. No real Indian Railways databases (CRIS, FOIS, COA, or ICMS) or live operational networks are connected.

---

## 🚆 Key Features & Demo Walkthrough

### 1. Operations Command Dashboard
- **KPI Telemetry**: Asset availability percentage, planned maintenance blocks in 24h cycle, open corridor conflicts, and safety-critical tasks.
- **Trunk Corridor Status Map**: Linear visual map of the **NDLS–CNB–MGS–ASN–HWH** trunk route (1,451 route km) indicating sections that are **Available** (`#22C55E`), **Block Planned** (`#F59E0B`), or in **Conflict** (`#EF4444`).
- **Section Detail Table**: Route distance, track configurations (Double/Quad), speed limits (110–130 km/h), and operating railway divisions.

### 2. Live Train Timetable & "Where Is My Train"
- **Corridor Train Timetable**: Comprehensive synthetic fleet including **12301/12302 Howrah Rajdhani**, **22436 Vande Bharat**, **12273 Duronto Express**, **12311 Netaji Express**, and heavy **Freight Rakes (BOXN/BCN)**.
- **Simulated GPS Telemetry**: Real-time current block section, delay minutes (+12 min), next approaching station, and arrival ETA.
- **Path & Stoppage Inspection**: Step-by-step route timings with a direct action button to evaluate train impact against planned blocks.

### 3. Maintenance Block Request Form
- Field engineer demand logging for **Civil P-Way (Track Renewal, Rail Grinding, Ballast Screening)**, **Electrical (OHE Catenary, Neutral Section)**, and **Signal & Telecom (Interlocking, Kavach ATP)**.
- Form inputs for required machine rakes (PQRS, Tower Wagon), minimum duration (60–360 min), and technical rationale.
- Automatic routing into the centralized AI planner queue upon submission.

### 4. Automatic Block Planner with CP-SAT Logic
- Selection of pending maintenance demands and horizon (12h, 24h, 48h).
- Optimization priority objective functions: **Balanced Strategy**, **Minimum Delay**, or **Urgent Maintenance**.
- Simulated **Google OR-Tools CP-SAT** constraint satisfaction solver providing candidate slots ranked by penalty scores.

### 5. Interactive Gantt Timeline with Drag & Drop Simulation
- **Corridor Occupancy Timeline**: Visual 24-hour time axis across trunk sections.
- **Draggable Amber Block**: Shift the maintenance window across time slots using mouse drag, quick shift buttons (`-30m`, `+30m`), or the precision time slider.
- **Instant Collision Detection**: Dynamic recalculation of train headway overlap, passenger delay minutes, Super-Priority conflicts (Rajdhani protection), and risk verdicts in under 5 milliseconds.

### 6. What-If Simulation & Dynamic Re-Planning
- **Contingency Scenarios**:
  - *Scenario A*: Inject upstream delays (e.g. Train 12301 delayed by +47 min) causing downstream block collision.
  - *Scenario B*: Emergency rail fracture requiring an unplanned 90-minute track clamp block.
- **Side-by-Side Comparison**: Baseline Plan vs Disturbed Scenario variance.
- **Dynamic Re-Plan Workflow**: Automatic detection of conflict with one-click approval of an AI-shifted slot (e.g. +90 min buffer shift) to restore corridor fluidity.

### 7. Human-in-the-Loop Approval & Immutable Audit Trail
- **Core Principle**: *Safety constraints are hard rules; AI recommends, humans decide.*
- Authorized officer sign-off: **Chief Controller (Traffic)**, **Sr. DEN (Co-ord)**, **TPC (Traction Power)**, and **Divisional Safety Officer (DSO)**.
- Full chronological audit log capturing every plan generation, scenario test, approval, modification, and rejection.

---

## 🛠️ Technology Architecture

```
[ React 18 + Tailwind CSS UI ]
              ▲
              │ REST / WebSocket
              ▼
[ FastAPI High-Throughput Gateway ]
              ▲
              │ Integer Constraint Problem
              ▼
[ Google OR-Tools CP-SAT Solver ]
              ▲
              │ Timetables, Block Demands, Speed Limits
              ▼
[ Corridor Repository (Synthetic Data Store) ]
```

- **Frontend**: Single-Page Application built with React, Tailwind CSS, and custom SVG line icons adhering to the command center theme (`#0F172A`, `#1E293B`, and `#FF6B00` saffron accent).
- **Backend (Conceptual)**: Python FastAPI with asynchronous endpoints.
- **Optimizer**: Google OR-Tools CP-SAT constraint programming formulating:
  $$\min \sum \left(w_{\text{priority}} \times \text{DelayMinutes}\right) + \left(w_{\text{urgency}} \times \text{DeferredDays}\right)$$
  $$\text{subject to: } \text{NoOverlap}\left(\text{BlockInterval}, \text{TrainInterval} + 15\text{min Buffer}\right)$$

---

## 🚀 Quick Start & How to Run

### Method 1: Instant Python Runner (Zero External Dependencies)
Ensure Python 3 is installed, open PowerShell or Terminal in this directory, and run:

```bash
python server.py
```

Your default web browser will automatically open:
```
http://localhost:8000
```

### Method 2: Direct File Open
You can also directly double-click `index.html` or open it in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Method 3: Standard Node / Vite Workflow
If you prefer running a Node.js development server:

```bash
npm install
npm run dev
```

### Method 4: Deploying on Vercel (One-Click Deployment)
The repository is pre-configured with `vercel.json`, `vite.config.ts`, and full SPA routing rewrites:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of RAILSETU prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/railsetu.git
   git push -u origin main
   ```
2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Import your GitHub repository.
   - Vercel automatically detects the **Vite** preset (`Build Command: npm run build`, `Output Directory: dist`).
   - Click **Deploy** — your live railway operations center will be online in under 60 seconds!
3. **Alternatively via Vercel CLI**:
   ```bash
   npx vercel
   ```

---

## 📋 Hackathon Evaluation Checklist (Under 3 Minutes)

1. **Overview Tab**: Read the 4 problems and 4 solutions; review the 7-stage closed-loop flow.
2. **Dashboard Tab**: Check the corridor health KPI cards and click on any section (e.g. `PRYJ-DDU`) to inspect.
3. **Where Is My Train Tab**: Inspect the timetable; search for `Rajdhani` or `Vande Bharat` and examine the live telemetry card.
4. **Submit Request Tab**: Submit a sample track renewal request; notice the auto-redirect to the planner.
5. **Auto Planner Tab**: Click **“Find Best Block Plan”**; test the **Gantt Chart time slider** to move the amber block into a red conflict zone and watch the metric cards update instantly!
6. **What-If Sim Tab**: Click **“Apply This Scenario”** on Train 12301 (+47m delay); trigger the warning alert and click **“Approve New Plan”** to see dynamic re-planning in action.
7. **Approval & Audit Tab**: Select your role (e.g. *Chief Controller*) and click **“Authorize & Approve Block”** to record your decision into the immutable audit trail.

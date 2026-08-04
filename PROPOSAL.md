# Megatron

**Tech for Good 2026** · GDG Coimbatore · Build weekend Aug 8–9, GRD College

**Track:** AI for Sustainable Cities & Climate Action
**Team code:** TEAM-381

## Problem

Municipal Planning Officers lack a quick way to assess the urban heat impact of small land use changes before approving development proposals. This can lead to climate unaware decisions and increased Urban Heat Island effects.

## Who it helps

Our primary user is Mani kandan, a Municipal Planning Officer in Coimbatore, responsible for reviewing small development proposals before approval. She must balance urban development with environmental sustainability but currently has no quick way to estimate how replacing green spaces with buildings or parking areas could affect local temperatures. HELIOS helps her by providing a fast preliminary urban heat impact assessment, enabling her to identify projects that may require further environmental review and make more informed, climate conscious planning decisions.

## Solution

HELIOS is an AI assisted urban heat screening tool designed for Municipal Planning Officers. For the hackathon MVP, HELIOS focuses on one use case: estimating the local temperature impact when a green space is proposed to be replaced by a building or parking area. The application uses land use information from OpenStreetMap together with a simplified temperature estimation model based on published Urban Heat Island research to generate a preliminary temperature impact estimate. Google Gemini is then used to explain the results in simple language and provide practical mitigation recommendations, such as preserving green cover, increasing tree plantation, or using permeable materials. This enables planning officers to quickly identify projects that may require further environmental review before approval.

## Architecture

                                                         HELIOS

        Municipal Planning Officer
                   │
                   ▼
     React.js Web Application (Leaflet + OSM)
                   │
            REST API (JSON)
                   │
                   ▼
         Flask Backend (Python)
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            ▼            ▼
 OpenStreetMap  Temperature   Firebase
 Land-use Data  Estimation    Firestore
                Model (Based
                on published
                UHI research)
                     │
                     ▼
               Gemini API
 (Explains results & suggests mitigation)
                     │
                     ▼
         Dashboard & Environmental Report

## Tech stack

Frontend: React.js, HTML, CSS, JavaScript Interactive Maps: Leaflet.js + OpenStreetMap (OSM) Backend: Python (Flask) Temperature Estimation: Rule-based model using published Urban Heat Island (UHI) research and land-use data AI Service: Google Gemini API (Explanation & Mitigation Recommendations) Database: Firebase Firestore Communication: REST APIs (JSON) Data Visualization: Chart.js Deployment: Vercel (Frontend) + Render (Backend) Development Tools: Visual Studio Code, Git, GitHub

## Getting started

1. Accept your collaborator invite (check your email / GitHub notifications).
2. Clone this repo and start building.
3. Commit early and often — this repo is what you present on the day.

---

_Created automatically when your proposal was validated._
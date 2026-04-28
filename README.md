# AgriAdvisor Frontend

AgriAdvisor is a Precision Agriculture Dashboard providing data-driven crop and fertiliser recommendations powered by machine learning. This repository contains the frontend, built with modern web technologies, to interface with the AgriAdvisor ML backend.

## Features

- **Crop Recommendation:** Get suggestions on the best crops to plant based on soil nutrient levels (N, P, K) and environmental factors (temperature, humidity, pH, rainfall).
- **Fertiliser Advice:** Receive recommendations for the most suitable fertiliser type based on soil type, crop type, and field conditions.
- **Explainable AI Insights:** Visualizes SHAP feature importance to explain model predictions, helping users understand which factors most heavily influenced the recommendation.
- **Modern UI:** Built with Tailwind CSS, shadcn/ui, and Recharts to provide an intuitive, responsive, and aesthetically pleasing experience.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd AgriAdvisor-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Integration with Backend

The frontend communicates with the FastAPI backend, which should be running concurrently. By default, the frontend expects the API to be available. Ensure you have the `AgriAdvisor-backend` running on `http://localhost:8000` (or configure the environment appropriately if deployed).

## Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (including shadcn/ui components).
- `/lib`: Utility functions and helper classes.
- `/public`: Static assets.

## Deployment

The project can be deployed easily on [Vercel](https://vercel.com/):

```bash
npm run build
```

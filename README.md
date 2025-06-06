# RansomEye - Ransomware Analysis Sandbox

This is a Next.js application built with Firebase Studio, designed to act as a sandbox for analyzing ransomware behavior. It allows users to simulate ransomware execution, observe its effects on a mock system (file system, registry, network), and receive an AI-generated analysis report.

## Project Overview

RansomEye provides a safe environment to study how ransomware operates. Key features include:

*   **Sandbox Execution Simulation**: Trigger a simulated ransomware execution.
*   **Log Generation**: Generates mock logs for file system activity, registry modifications, and network traffic.
*   **AI-Powered Analysis**: Utilizes Genkit and a Google AI model to analyze the generated logs and produce a behavioral report.
*   **Dashboard Interface**: A user-friendly dashboard to control the analysis and view results.

## Tech Stack

*   **Next.js**: React framework for server-side rendering and static site generation.
*   **React**: JavaScript library for building user interfaces.
*   **TypeScript**: Superset of JavaScript for type safety.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **ShadCN UI**: Collection of reusable UI components.
*   **Genkit (with Google AI)**: AI framework for building AI-powered features, used here for analyzing ransomware behavior.
*   **Lucide React**: Library for icons.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository (if applicable)**:
    If you're working from a cloned repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies**:
    Open your terminal in the project root directory and run:
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```
    This will install all the necessary packages defined in `package.json`.

### Environment Variables

The application uses Genkit, which typically requires API keys for AI models.

1.  Create a `.env` file in the root of your project:
    ```bash
    touch .env
    ```

2.  Add your Google AI API key to the `.env` file. You can obtain one from [Google AI Studio](https://aistudio.google.com/):
    ```
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
    ```
    Replace `YOUR_GOOGLE_API_KEY` with your actual API key.

    The `src/ai/genkit.ts` file is configured to use this environment variable.

## Running the Application

### Development Mode

To run the Next.js application in development mode:

```bash
npm run dev
```

This will start the Next.js development server, usually on `http://localhost:9002` (as configured in `package.json`). The app will automatically reload if you make changes to the code.

### Genkit Development Server

For AI features powered by Genkit, you need to run the Genkit development server. This allows you to test and debug your Genkit flows.

To start the Genkit server (it will watch for changes in your AI flow files):

```bash
npm run genkit:watch
```

Alternatively, to start it without watching for changes:

```bash
npm run genkit:dev
```

The Genkit development UI will typically be available at `http://localhost:4000`.

**Note**: For the AI analysis to work, both the Next.js dev server (`npm run dev`) and the Genkit server (`npm run genkit:watch`) should be running concurrently.

### Production Build

To build the application for production:

```bash
npm run build
```

This command creates an optimized production build in the `.next` folder.

### Starting the Production Server

After building the application, you can start the production server:

```bash
npm run start
```

This will serve the optimized application, usually on `http://localhost:3000` (or the port configured for your production environment).

## How to Use RansomEye

1.  **Ensure both servers are running**:
    *   Next.js app: `npm run dev`
    *   Genkit server: `npm run genkit:watch`

2.  **Open the application**:
    Navigate to `http://localhost:9002` (or your Next.js development server URL) in your web browser.

3.  **Navigate to the Dashboard**:
    The main page (`/`) is the Ransomware Analysis Dashboard.

4.  **Initiate Analysis**:
    *   In the "Sandbox Execution" panel, click the "Analyze Sample" button.
    *   This will trigger a simulated ransomware execution.

5.  **Observe Logs**:
    *   As the simulation runs (mocked in the current version), three log panels will populate:
        *   **File System Activity**: Shows mock file creations, modifications, deletions.
        *   **Registry Modifications**: Shows mock changes to Windows Registry keys.
        *   **Network Traffic**: Shows mock network connections and data transmissions.
    *   Loading skeletons will appear while data is being fetched/generated.

6.  **View Analysis Report**:
    *   Once the logs are generated, they are sent to the Genkit AI flow for analysis.
    *   The "Behavioral Analysis Report" panel will display an AI-generated summary of the observed ransomware behaviors based on the collected (mock) logs.
    *   If there's an error during the AI analysis, an error message will be displayed.

7.  **Understanding the UI**:
    *   **App Sidebar**: Contains navigation links (currently Dashboard and a placeholder Settings link).
    *   **App Header**: Displays the current page title and user avatar/notifications.
    *   **Execution Panel**: Contains the button to start the analysis.
    *   **Log Display Cards**: Three separate cards for File System, Registry, and Network logs. Each has a scrollable area to view log content.
    *   **Analysis Report Card**: Displays the AI-generated report or error messages.

## Linting and Type Checking

*   **Linting**: To check for code quality and style issues:
    ```bash
    npm run lint
    ```

*   **Type Checking**: To perform TypeScript type checking:
    ```bash
    npm run typecheck
    ```

## Project Structure

*   `src/app/`: Contains the Next.js pages and layout components (App Router).
    *   `page.tsx`: The main dashboard page.
    *   `layout.tsx`: The root layout for the application.
    *   `globals.css`: Global styles and Tailwind CSS theme configuration.
    *   `actions.ts`: Server Actions, including the `handleAnalyzeSampleAction` which orchestrates log generation and AI analysis.
*   `src/components/`: Reusable React components.
    *   `dashboard/`: Components specific to the dashboard (AnalysisReport, ExecutionPanel, LogDisplay).
    *   `layout/`: Components for the application layout (AppHeader, AppLayout, AppSidebar).
    *   `ui/`: ShadCN UI components.
*   `src/ai/`: Contains Genkit related code.
    *   `genkit.ts`: Genkit initialization and configuration.
    *   `dev.ts`: Entry point for the Genkit development server.
    *   `flows/`: Contains Genkit flows.
        *   `analyze-ransomware-behavior.ts`: The Genkit flow responsible for analyzing ransomware logs.
*   `src/hooks/`: Custom React hooks (e.g., `useToast`, `use-mobile`).
*   `src/lib/`: Utility functions (e.g., `cn` for class names).
*   `public/`: Static assets.
*   `package.json`: Project dependencies and scripts.
*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `tsconfig.json`: TypeScript configuration.
*   `apphosting.yaml`: Firebase App Hosting configuration.
*   `README.md`: This file.

## Further Development

Potential areas for future development:

*   Implement actual file upload for ransomware samples (requires secure handling).
*   Integrate with a real sandboxing environment instead of mock logs.
*   Expand the AI analysis capabilities (e.g., identify specific ransomware families, suggest mitigation).
*   Add user authentication and a database to store analysis reports.
*   Develop the "Settings" page.

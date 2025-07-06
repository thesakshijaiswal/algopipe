# 🧩 AlgoPipe

AlgoPipe is a fast, lightweight visual pipeline editor built with React, Tailwind, FastAPI, and Pydantic. Easily drag and drop nodes to build intelligent workflows, with real-time cycle detection to ensure your graph remains a valid Directed Acyclic Graph (DAG). Ideal for no-code tools, data processing flows, and LLM-based pipelines.

## 🚀 Features

- 🔩 **Plug-and-play node system :** Minimal code, maximum scalability.

- 📝 **Smart text Inputs :** Dynamic input box resizing, handle detection and Autocomplete suggestions.

- 🎯 **Intuitive flow editor :** Easily connect nodes to build powerful pipelines.

- 🎨 **Responsive and animated UI :** Includes custom scrollbars and polished visuals.

- 🧭 **Live minimap view :** Navigate large workflows with color-coded nodes.

- 🌈 **Multiple theme support :** Instantly switch for a personalized look.

- 📡 **Real-time backend validation with DAG checks :** Alerts for cycles, node counts, and flow issues.

- 🔍 **SEO optimized build :** Built for accessibility and discoverability.

- 📦 **Clean Code & Extensibility :** Clean foundation for adding new features.

## 🧰 Tech Stack

### Frontend

| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="react"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="tailwind"> | <h1>🐻</h1> | <img src="https://reactflow.dev/img/logo.svg" width="48" height="48"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="48" height="48"> | <img src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg" width="48" height="48"> |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **React** | **Tailwind CSS** | **Zustand** | **React Flow** | **Vite** | **React Icons** |

### Backend

| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="48" height="48"> | <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" width="90" height="48"> | <img src="https://avatars.githubusercontent.com/u/110818415?s=48&v=4" width="48" height="48" style="background-color: #000000; padding: 4px; border-radius: 4px;"> | <img src="https://www.uvicorn.org/uvicorn.png" width="48" height="48"> |
|:---:|:---:|:---:|:---:|
| **Python** | **FastAPI** | **Pydantic** | **Uvicorn** |

### Development Tools

| <img src="https://prettier.io/icon.png" width="48" height="48"> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" width="48" height="48"> |
|:---:|:---:|
| **Prettier** | **ESLint** |


## Setup & Installation

### Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Python** (version 3.7 or higher)
- **pip** (Python package manager)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/thesakshijaiswal/algopipe.git
cd algopipe
```

#### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd ../backend
pip install fastapi uvicorn
```

### Running the Application

#### Start the Backend Server

From the `/backend` directory:

```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

#### Start the Frontend Development Server

From the `/frontend` directory:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Preview

![AlgoPipe-Demo](https://github.com/user-attachments/assets/f1779751-e8d1-48a5-8c70-24528b680452)

## 🛠 Developer

[![GitHub](https://img.shields.io/badge/GitHub-thesakshijaiswal-181717?style=for-the-badge&logo=github)](https://github.com/thesakshijaiswal)

If you found this project useful or inspiring, please consider ⭐️ **starring the repo** to support the work!

## 📄 License

This project is licensed under the [MIT License](LICENSE).
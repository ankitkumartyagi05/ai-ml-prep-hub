# ai-ml-prep-hub
# 🚀 ML Prep Hub

### An Interactive AI/ML Placement Preparation Platform

ML Prep Hub is a modern **AI/ML placement preparation web platform**
designed to help students learn concepts, practice them through games,
and build projects in a structured roadmap.

Instead of just watching videos, learners follow a guided path:

**Learn → Play → Build → Get Placed**

------------------------------------------------------------------------

# 📌 Project Overview

ML Prep Hub is a **Single Page Web Application (SPA)** that combines
structured learning, gamified practice, and progress tracking into one
platform.

Many students preparing for **AI/ML placements** struggle with scattered
resources and passive learning. This project solves that problem by
providing a **step‑by‑step roadmap with interactive activities**.

------------------------------------------------------------------------

# ❗ Problem Statement

Students face several issues while preparing for AI/ML:

-   Lack of structured learning resources
-   Passive learning from videos without testing knowledge
-   Low motivation due to boring study methods
-   No progress tracking

### Solution

ML Prep Hub provides:

-   Structured learning resources
-   Gamified AI practice
-   Progress tracking
-   Competitive learning through XP and leaderboards

------------------------------------------------------------------------

# ✨ Key Features

## 📚 Learning Management

-   Curated playlists for:
    -   Python
    -   Data Structures & Algorithms
    -   Discrete Mathematics
    -   Machine Learning
-   Organized learning cards
-   One‑click access to YouTube playlists

------------------------------------------------------------------------

## 🎮 Gamified AI Lab (Main Feature)

The platform transforms learning into a **game experience**.

### XP and Level System

Users earn **XP points** for correct answers and activities.

Ranks progress from: - AI Beginner - AI Explorer - AI Developer - AI
Expert - AI Pro

### Leaderboard

A leaderboard shows the top learners (stored locally for demo purposes).

### Games Included

#### 1️⃣ Quiz Battle

-   AI/ML MCQs
-   Instant feedback
-   Explanations for answers

#### 2️⃣ Drag and Drop Classification

Users classify items such as:

Example: - Neural Network → AI - Regression → Machine Learning

#### 3️⃣ Build AI Simulator

A **10×10 grid simulator** where users:

-   Place red and blue data points
-   Train a simple model
-   Observe classification accuracy

This helps learners **visualize machine learning classification
concepts**.

------------------------------------------------------------------------

## 📅 Smart Study Timetable

Features include:

-   Real‑time clock
-   Weekday and weekend study schedules
-   Task completion tracking
-   Progress saved using **Local Storage**

Even if the browser closes, the progress remains saved.

------------------------------------------------------------------------

## 🎨 Modern UI/UX Design

The project focuses heavily on design and user experience.

Design features include:

-   Glassmorphism cards
-   RGB animated buttons
-   Dark mode UI
-   Fully responsive layout

Works on:

-   Mobile
-   Tablet
-   Desktop

------------------------------------------------------------------------

# 🧠 Application Flow

The platform works as a step‑by‑step learning journey:

1.  Landing Page -- Introduction
2.  Subjects -- Learning resources
3.  AI Lab -- Practice through games
4.  Recommended -- Extra resources
5.  Projects -- Build portfolio projects

------------------------------------------------------------------------

# 🛠 Tech Stack

  Technology          Purpose
  ------------------- -----------------------------
  HTML5               Website structure
  CSS3                Layout, animations, styling
  Tailwind CSS        Fast responsive UI
  JavaScript          Logic, games, DOM control
  Local Storage API   Saving user progress

------------------------------------------------------------------------

# 📂 Project File Structure

The project is lightweight and simple.

    ML-PREP-HUB
    │
    ├── index.html
    ├── style.css
    └── script.js

### File Roles

**index.html** - Structure of all sections

**style.css** - Custom styling - Animations - Responsive design

**script.js** - SPA navigation - Game logic - XP system - Local storage
management

------------------------------------------------------------------------

# ⚙️ How the System Works

### SPA Routing

JavaScript shows and hides `<section>` elements instead of reloading
pages.

Example:

Home → Subjects → AI Lab

------------------------------------------------------------------------

### State Management

A global `state` object tracks:

-   XP
-   Level
-   Leaderboard
-   Completed tasks

This data is stored in **localStorage**.

------------------------------------------------------------------------

### Dynamic Rendering

Games such as quizzes are generated dynamically using JavaScript loops.

This allows easy future expansion.

------------------------------------------------------------------------

### Scroll Animations

The platform uses the **IntersectionObserver API** to trigger animations
when elements appear on screen.

------------------------------------------------------------------------

# 🔮 Future Scope

The project can be extended with:

-   Backend integration (Firebase / MongoDB)
-   User login and authentication
-   Online leaderboard
-   Admin panel for adding questions
-   More AI learning games
-   Dataset puzzle challenges

------------------------------------------------------------------------

# 🎯 Conclusion

ML Prep Hub demonstrates practical skills in:

-   Frontend Development
-   UI/UX Design
-   JavaScript Logic
-   Educational Product Design

The project solves a real problem by turning **AI/ML placement
preparation into an engaging and interactive learning experience**.

------------------------------------------------------------------------

# 👨‍💻 Author

Made with ❤️ by **Ankit Kumar Tyagi**

GitHub: https://github.com/ankitkumartyagi05

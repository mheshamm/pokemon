# Pokémon Task

A sample app task built with React 18, Vite, Redux Toolkit, and React Router.  
It uses the [PokéAPI](https://pokeapi.co) to fetch Pokémon lists and details, with entity management via `createEntityAdapter`.  
Tests written in Vitest and React Testing Library.

---

## 📦 Tech Stack

- **React 18**
- **Vite 4**
- **Redux Toolkit** (`@reduxjs/toolkit`)
- **React Router v7**
- **RTK Query** for API data fetching
- **React Testing Library** + **Vitest** testing
- **css** 
- **PokéAPI** as the data source

---
src/
  features/
    pokemon/
      api/                  # API slice (RTK Query)
      components/           # UI components
        test/               # Component tests
      models/               # TS interfaces
      slices/               # Redux slices
  shared/
    components/             # Shared UI (LoadingSpinner, etc.)
store/                      # Redux store setup

-- 

## 🚀 Getting Started

### 1️⃣ Install dependencies
npm install


## 🚀 NOTE : I will add .env to file to repo and not add it to gitignore

## 🚀 NOTE : i have done a very simple design using css because styling in task not specified so i used css to be easy and quick
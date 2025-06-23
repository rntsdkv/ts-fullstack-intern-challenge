import './App.css'
import Header from "./components/header.tsx"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <Header
        buttons={
        [
          {
            text: "Все котики",
            url: "/",
            active: true,
          },
          {
            text: "Любимые котики",
            url: "/following",
            active: false,
          },
          {
            text: "Вход",
            url: "/login",
            active: false,
          }
        ]
        }
      />
      <Outlet />
    </>
  )
}

export default App

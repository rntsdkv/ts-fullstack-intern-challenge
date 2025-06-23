import {useRef, useState} from "react"
import { signIn, signUp } from '../api.ts'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Auth(props: {isRegistration: boolean}) {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alert, setAlert] = useState<string>("")
  const alertRef = useRef<HTMLParagraphElement>(null)
  const navigate = useNavigate()

  const makeAuth = async () => {
    if (login === "") {
      makeAlert("Необходимо ввести логин")
      return
    }

    if (password === "") {
      makeAlert("Необходимо ввести пароль")
      return
    }

    if (props.isRegistration) {
      try {
        const res = await signUp({login, password})
        localStorage.setItem("access_token", res.data.access_token)
        navigate('/')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || 'Ошибка входа';
          await makeAlert(message)
        } else {
          await makeAlert('Неизвестная ошибка')
        }
      }
      return
    }

    if (!props.isRegistration) {
      try {
        const res = await signIn({login, password})
        localStorage.setItem("access_token", res.data.access_token)
        navigate('/')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || 'Ошибка входа';
          await makeAlert(message);
        } else {
          await makeAlert('Неизвестная ошибка');
        }
      }
      return
    }
  }

  const makeAlert = async (text: string) => {
    setAlert(text)
    alertRef.current?.classList.remove("hidden")
  }

  return (
    <div className="flex w-full justify-center p-[60px] items-center">
      <div className="flex flex-col w-100 gap-2">
        <p className="hidden text-[#FF3A00]" ref={alertRef}>{alert}</p>
        <input
          placeholder="Введите логин"
          className="h-12 border-2 border-gray-200 rounded-lg p-2"
          onChange={(e) => setLogin(e.target.value)}
        >
        </input>
        <input
          placeholder="Введите пароль"
          type="password"
          className="h-12 border-2 border-gray-200 rounded-lg p-2"
          onChange={(e) => setPassword(e.target.value)}
        >
        </input>
        <button onClick={makeAuth}>
          {props.isRegistration ? "Зарегистрироваться" : "Войти"}
        </button>
      </div>
    </div>
  )
}
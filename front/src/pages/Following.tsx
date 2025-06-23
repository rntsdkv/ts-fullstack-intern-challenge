import {useEffect, useState} from "react"
import { getUserLikes } from '../api.ts'
import {redirect} from "react-router-dom"
import axios from "axios"
import Card from "../components/card"

interface Card {
  cat_id: string;
  cat_url: string;
}

export default function Following() {
  const [cards, setCards] = useState<Card[]>([]);

  const token = localStorage.getItem('access_token')

  if (token === undefined || token === null) {
    redirect('/login')
    return
  }

  const loadCards = async () => {
    try {
      const response = await getUserLikes(token)
      const data = response.data
      console.log(data)
      setCards(data)
      console.log(cards)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message)
      } else {
        alert('Неизвестная ошибка')
      }
    }
    return
  }

  useEffect(() => {
    loadCards()
  }, [])

  return (
    <div className="grid gap-[48px] p-[60px] justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 225px))' }}>
      {cards.map((card: Card) => (
        <Card
          id={card.cat_id}
          url={card.cat_url}
          liked={true}
        ></Card>
      ))}
      {cards.length == 0 && "У вас пока нет любимых котиков"}
    </div>
  )
}
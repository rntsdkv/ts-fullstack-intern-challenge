import Card from '../components/card'
import {useEffect, useState} from "react"
import InfiniteScroll from 'react-infinite-scroll-component'

interface Card {
  id: string;
  url: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadNewCards = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10', {
      method: 'GET',
      headers: {
        'x-api-key': import.meta.env.VITE_CATS_API_KEY,
      }
    })

    if (!response.ok) {
      setHasMore(false)
      alert('Failed to load cards.')
      return
    }

    const data = await response.json();
    console.log(data)
    setCards(prevItems => [...prevItems, ...data])
    return
  }

  useEffect(() => {
    loadNewCards();
  }, [])

  return (
    // <div className="grid gap-[48px] p-[60px] justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 225px))' }}>
      <InfiniteScroll
        next={loadNewCards}
        hasMore={hasMore}
        loader={<p>Загрузка...</p>}
        dataLength={cards.length}
        className="grid gap-[48px] p-[60px] justify-center"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 225px))' }}
      >
        {cards.map((card: Card) => (
          <Card
            id={card.id}
            url={card.url}
            liked={false}
          ></Card>
        ))}
      </InfiniteScroll>
    // </div>
  )
}
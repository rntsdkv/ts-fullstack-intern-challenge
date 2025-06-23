import {useState} from "react"
import {deleteLike, postLike} from "../api.ts";
import axios from "axios";

enum LikeState {
  BORDER = '../../public/favorite_border.svg',
  HOVER = '../../public/favorite_hovered.svg',
  FILL = '../../public/favorite_filled.svg'
}

export default function Card(props: {id: string, url: string, liked: boolean}) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(props.liked);
  const [likeState, setLikeState] = useState<LikeState>(liked ? LikeState.FILL : LikeState.BORDER);

  const token = localStorage.getItem('access_token');

  const likeClickHandler = async () => {
    if (token === null) {
      alert('Необходимо авторизоваться, чтобы ставить лайки')
      return
    }

    if (liked) {
      try {
        await deleteLike(props.id, token)
        setLiked(false)
        setLikeState(LikeState.HOVER)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message)
        } else {
          alert('Неизвестная ошибка')
        }
      }
    } else {
      try {
        await postLike({ cat_id: props.id, cat_url: props.url }, token)
        setLiked(true)
        setLikeState(LikeState.FILL)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message)
        } else {
          alert('Неизвестная ошибка')
        }
      }
    }
  }

  return (
    <div>
      <div
        className="relative w-[225px] h-[225px] transition-transform duration-300 ease-in-out"
        style={{
          transform: hovered ? 'scale(1.111)' : 'scale(1)',
          boxShadow: hovered ? '0px 9px 18px rgba(0,0,0,0.18)' : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          className="w-[225px] h-[225px] object-cover transition-transform duration-300 ease-in-out"
          style={{
            transform: hovered ? 'scale(0.9009)' : 'scale(1)',
          }}
          src={props.url}
          alt="card"
        />
        <img
          src={likeState}
          className='absolute bottom-[23px] right-[17px]'
          hidden={!hovered}
          onClick={() => likeClickHandler()}
          onMouseEnter={() => setLikeState(LikeState.HOVER)}
          onMouseLeave={() => {
            liked ? setLikeState(LikeState.FILL) : setLikeState(LikeState.BORDER)
          }}
          alt='like'
        />
      </div>
    </div>
  )
}

import { useLocation, Link } from "react-router-dom"
import { ButtonInterface } from './header.tsx'

export default function Button(props: {button: ButtonInterface}) {
  const location = useLocation()
  const path = location.pathname

  const redirectFunction = async () => {
    props.button.active = true
  }

  if (path === props.button.url) {
    return (
      <Link to={`${props.button.url}`}>
        <div className="flex h-full w-fit text-white pl-[22px] pr-[22px] items-center bg-[#1E88E5]" onClick={redirectFunction}>
          <p className="text-center w-full">{props.button.text}</p>
        </div>
      </Link>
    )
  } else {
    return (
      <Link to={`${props.button.url}`}>
        <div className="flex h-full w-fit text-white pl-[22px] pr-[22px] items-center">
          <p className="text-center w-full">{props.button.text}</p>
        </div>
      </Link>
    )
  }
}
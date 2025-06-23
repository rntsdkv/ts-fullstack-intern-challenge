import Button from './button.tsx'

export interface ButtonInterface {
  text: string;
  url: string;
  active: boolean;
}

export default function Header(props: {buttons: ButtonInterface[]}) {
  return (
    <div className="flex h-[64px] bg-[#2196F3] pl-[60px] pr-[60px]">
      {props.buttons.map((button: ButtonInterface) => (
        <Button
          button={button}
        ></Button>
      ))}
    </div>
  )
}
import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
  code: string;
}

//Funcionalidade de copiar o código da sala ao clicar no ícone
export function RoomCode(props: RoomCodeProps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className="room-code" 
    onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
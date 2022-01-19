
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';
import { Question } from '../components/Question/index';
import { RoomCode } from '../components/RoomCode/index';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';


import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  // const { user } = useAuth();
  const params = useParams<RoomParams>();//type do tipo generics (entre <>)
  
  const roomId = params.id;

  const { title, questions } = useRoom(roomId!);

  //No atributo code apresentou erro por causa da tipagem. Foi necessário o uso da '!' na var roomId
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>
    
      <main className="content">
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        
        <div className="question-list">
          {questions.map(question => {
            return(
              <Question 
                key={question.id} //algoritmo de reconciliação
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
        
      </main>
    </div>
  );
}
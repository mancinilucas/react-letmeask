import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

export function useRoom(roomId: string){
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    //Extração das info da room e conversão de formato de objeto para vetor/matriz*
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions:FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
    //Método off() do firebase encerra o event listener iniciado anteriormente.
  }, [roomId, user?.id])

  return { questions, title }
}
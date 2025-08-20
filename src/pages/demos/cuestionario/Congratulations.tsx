
import "tailwindcss";
import type { Question } from "./Quiz";
import Question from "./Question";

export const menu = 3;

export default function Congratulations({ results }: { results: Question[]}) {

  return <>
    <h3>Congratulations!!</h3>
    <hr/>
    <pre>{JSON.stringify(results, null, 2)}</pre>
    <div className="!border-2 !p-3">
      {
        results.map((q: Question, i: number) => (<>
          <strong>Question {(q.index+1)}</strong>
          <ul>
            <li>{q.query}</li>
            <li>{(q.valid === q.answer)? '<strong>'+q.tests[q.valid]+'</strong>': q.tests[Number(q.answer)]+' &raquo; '+q.tests[q.valid]}</li>
            <li>{(q.valid === q.answer)? 'OK': 'KO'}</li>
          </ul>
        </>))
      }
    </div>
    <hr/>
    <p className="text-center fs-4">THE END</p>
  </>
}

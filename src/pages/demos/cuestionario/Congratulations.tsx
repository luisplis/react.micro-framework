
import "tailwindcss";
import type { Question } from "./Quiz";
import { iconKo, iconNa, iconOk } from "./QuestionTest";

export default function Congratulations({ results }: { results: Question[]}) {

  return <div className="!text-black !h-min !w-2/3 !m-7 !p-3 !mx-auto">
    <h3 className="!text-center pb-5 !text-4xl !py-10 !font-display !text-white">Congratulations!!</h3>
    <div className="!bg-indigo-300 !border-2 !p-3">
      {
        results.map((q: Question, i: number) => (
        <div>
          <h3 className="!text-center">
            Question {(q.index+1)} 
          </h3>
          <p className="!text-xl !text-white !font-title" dangerouslySetInnerHTML={{ __html: q.query }}></p>
          <div className="!text-center">
            { (q.answer === q.valid) && 
              <span className="!text-green-700">{ iconOk() }</span>
            }
            { (q.answer !== q.valid) && 
            <p>
              <span className="!text-red-700">{ iconKo() }</span>
              <span className="!text-red-700">{ q.tests[Number(q.answer)] }</span>
              <span className="!text-white">&raquo;</span>
              <span className="!text-green-700">{ q.tests[q.valid] }</span>
            </p>
            }
          </div>
        </div>
        ))
      }
    </div>
  </div>
}

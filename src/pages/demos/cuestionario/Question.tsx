import type { ReactInstance } from "react";
import type React from "react";

export const menu = 2;
      
export const iconOk = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export const iconKo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default function Question({ index, query, tests, valid, answer = null, handleAnswer}: 
  {index: number, query: string, tests: string[], valid: number; answer: number | null; handleAnswer: (index: number, answer: number, valid: number) => void }) 
{
  
  return (<div id={'question-'+index} className="!border !rounded !my-2 !p-3">
    <h2>{'Question '+Number(index+1)}</h2>
    <p className="lead">{query}</p>
      { tests.map((test: string, i: number) => {
          return <>
          <div key={i} className={'query-'+i}>
            <button className={'btn btn-primary'} onClick={() => handleAnswer(index, i, valid)}>
              { (answer !== null && answer === i && i === valid)? iconOk(): '' }
              { (answer !== null && answer === i && i !== valid)? iconKo(): '' }
              {test}
            </button>
          </div>
          </>
        })
      }
    </div>
  );
}
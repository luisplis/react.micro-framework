/**
 * QuestionTest
 */
export default function QuestionTest({ index, query, tests, valid, answer = null, handleAnswer}: 
  {index: number, query: string, tests: string[], valid: number; answer: number | null; handleAnswer: (index: number, answer: number, valid: number) => void }) 
{
  return (<div id={'question-'+index} className="!bg-indigo-600 !border !rounded !h-min !w-2/3 !m-7 !p-3">
    <h2 className="!text-white !font-display !text-3xl">{'Question '+Number(index+1)}</h2>

    <p className="!text-white !font-title !text-xl" dangerouslySetInnerHTML={{ __html: query }}></p>
    <div className="!grid !grid-cols-2">
    { tests.map((test: string, i: number) => {
        return <>
        <div key={i} className="">
          <button className={'!flex !justify-between !align-center !text-white !font-text !text-sm !p-3'} onClick={() => handleAnswer(index, i, valid)}>
            <span className="!pe-2">
              { (answer !== i || answer === null) && iconNa() }
              { (i === answer && answer === valid && answer !== null) && iconOk() }
              { (i === answer && answer !== valid && answer !== null) && iconKo() }
            </span>
            <span>{test}</span>
          </button>
        </div>
        </>
      })
    }
    </div>

    </div>
  );
}

export const iconNa = () => (
  <svg className="!mx-auto !w-5 !h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  </svg>
);
export const iconOk = () => (
  <svg className="!mx-auto !w-5 !h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <polyline points="9 11 12 14 22 4"/>
  </svg>
);
export const iconKo = () => (
  <svg className="!mx-auto !w-5 !h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
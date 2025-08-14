
export const menu = 2;

export default function Question({ index, query, tests, valid, answer, handleAnswer}: 
  {index: number, query: string, tests: string[], valid: number; answer: number; handleAnswer: (index: number, answer: number) => void }) 
{
return (<div id={'question-'+index} className="!border !rounded !my-2 !p-3">
    <h2>{'Question '+Number(index+1)}</h2>
    <p className="lead">{query}</p>
      { tests.map((test: string, i: number) => {
          return <>
          <div key={i} className={'query-'+i}>
            <p className="text-colorize">
              {test}
            </p>
            <button className="btn btn-primary" onClick={() => handleAnswer(index, i)}>
              {(i === answer && i === valid)? 'OK': 'KO'} - Option <strong>{(i+1)}</strong>
            </button>
          </div>
          </>
        })
      }
    </div>
  );
}
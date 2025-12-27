
// import "tailwindcss";
import { useEffect, useRef, useState } from "react";
import Congratulations from "./Congratulations";
import getCountries, { arrayShuffle, type Country } from "./ApiCountries";
import QuestionTest from "./QuestionTest";
import Paginate from "./Paginate";

export const menu = 1;

export type Question = {
  index: number;
  query: string;
  tests: string[];
  valid: number;
  answer: number | null;
};

export default function Quiz() {

  const num = 4;
  const [finish, setFinish] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  let countryName = useRef<HTMLHeadingElement>(null);
  let countryMap = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const apiCountries = async () => {
      const countries = await getCountries();
      const country   = countries[Math.floor(Math.random() * countries.length)];
      const questions = getQuestions(country, countries, num);
      setQuestions(questions);
      if (countryName.current) countryName.current.textContent = country.name;
      if (countryMap.current)  countryMap.current.href = country.gmap;
    };
    
    apiCountries();
  }, []);

  /**
   * Event: question data & paginate
   */
  const handleUserAnswer = function(index: number, answer: number, valid: number)
  {
    // Save questions user data answer
    const queries =[...questions];
    queries[index].answer = answer;
    setQuestions(queries);
  }
  const handlePage = function(select: number)
  {
    if (select >= 0 && select <= num-1)
    {
      setCurrent(select);
    }
    let x = 0;
    questions.forEach((item) => {
      if (item.answer !== null) x++;
    });
    if (x == num) setFinish(true);
  }
  
  // Set current question page
  const q = questions[current];
  
  return <div className="!container !text-center !bg-indigo-500 !min-h-screen">
    <h2 ref={countryName} className="!text-center !pt-6 !mx-auto !text-indigo-700">
      PAÍS
    </h2>
    {q && !finish && <>
      <div className="!flex !justify-center !items-top !text-start !w-full">
      {
        <QuestionTest index={q.index} query={q.query} tests={q.tests} valid={q.valid} answer={q.answer} handleAnswer={handleUserAnswer} />
      }
      </div>
      </>
    }
    {finish && 
      <div className="quiz-congratulations">
      {
        <Congratulations results={[...questions]}/>
      }
      </div>
    }
    <a ref={countryMap} className="!block !mx-auto !mb-6" target="_blank">
      Ver en Google Maps
    </a>
    <Paginate pages={Object.keys(questions)} active={current} handlePage={handlePage}/>
  </div>
}

/**
 * Get quiz questions and posible solutions for selected country (test questions)
 * @param country 
 * @param countries 
 * @param num 
 * @returns 
 */
function getQuestions(country: Country, countries: Country[], num: number = 10): Question[] {

  const queries = { // replace COUNTRY aliases
    capital: 'What is the capital of COUNTRY?', 
    continent: 'What continent is COUNTRY in?', 
    fifa: 'What is COUNTRY´s FIFA acronym?', 
    region: 'What is the region of COUNTRY?', 
    subregion: 'What is the subregion of COUNTRY?', 
    language: 'What is the first official language of COUNTRY?',
    area: 'How much geographical area does COUNTRY cover?', 
    population: 'What is the population of COUNTRY?', 
    flag: 'Select COUNTRY´s flag', 
    currency: 'Select COUNTRY´s currency', 
    gmap: 'Show the map where COUNTRY is centered'
  };
  const querys = arrayShuffle(Object.entries(queries));

  const questions: Question[] = [];
  
  for (let i = 0; i < num; i++) {

    const field = querys[i][0] as keyof Country;
    const value = country[field];
    const question: Question = {index: i, query: querys[i][1].replace('COUNTRY', '<strong>'+country.name+'</strong>'), tests: [], valid: 0, answer: null};
    
     // Add 3 diferent country answer
    let q = 0;
    let alternatives: any[] = [];
    while (q < 3)
    {
      let alternate = countries.find(item => (item[field] !== undefined && item[field].length && item[field] !== country[field] && !(alternatives.includes(item[field]))));
      if (alternate !== undefined) 
      {
        alternatives.push(alternate[field]);
        q++;
      }
      else
      {
        console.log('Error inexperado: campo "'+field+'" no definido!');
      }
    }

    // Add valid answer in random index
    const verity = Math.floor(Math.random() * (4));
    question.valid = verity;
    alternatives.splice(verity, 0, value);
    question.tests = alternatives;
    
    question.answer = null;

    questions.push(question);
  }

  return questions;
}

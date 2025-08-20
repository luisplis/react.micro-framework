
// import "tailwindcss";
import { useEffect, useState } from "react";
import Congratulations from "./Congratulations";
import getCountries, { arrayShuffle, type Country } from "./ApiCountries";
import Question from "./Question";

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
  const [country, setCountry] = useState<Country>();
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    const apiCountries = async () => {
      const countries = await getCountries();
      const country   = countries[Math.floor(Math.random() * countries.length)];
      setCountry(country);
      const questions = getQuestions(country, countries, num);
      setQuestions(questions);
    };
    
    apiCountries();
  }, []);

  /**
   * Event: question data & paginate
   */
  const handleUserAnswer = function(index: number, answer: number, valid: number){
    // Save questions user data answer
    const queries =[...questions];
    queries[index].answer = answer;
    setQuestions(queries);
    // Save current page
    if (index < num) index++;
    setCurrent(index);
    if (index == num) setFinish(true);
  }
  
  // Set current question page
  const q = questions[current];
  
  return <>
    <h1>Quiz test</h1>
    <hr/>
    {q && !finish && 
      <div className="!grid !grid-cols-2 !gap-4">
      {
        <Question index={current} query={q.query} tests={q.tests} valid={q.valid} answer={q.answer} handleAnswer={handleUserAnswer} />
      }
      </div>
    }
    {finish && 
      <div className="quiz-congratulations">
      {
        <Congratulations results={[...questions]}/>
      }
      </div>
    }
    <hr/>
    <pre>{JSON.stringify(country, null, 2)}</pre>
  </>
}

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
    const question: Question = {index: i, query: querys[i][1].replace('COUNTRY', country.name), tests: [], valid: 0, answer: null};
    
     // Add 3 diferent country answer
    let q = 0;
    let alternatives: any[] = [];
    while (q < 3)
    {
      q++;
      let alternate = countries.find(item => (item[field] !== undefined && item[field] !== country[field] && !(alternatives.includes(item[field]))));
      if (alternate !== undefined) 
      {
        alternatives.push(alternate[field]);
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

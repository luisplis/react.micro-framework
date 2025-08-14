
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
  answer: number;
};

export default function Quiz() {

  const [status, setStatus] = useState(false);
  const [country, setCountry] = useState<Country>();
  const [countries, setCountries] = useState<Country[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    const apiCountries = async () => {
      const countries = await getCountries();
      setCountries(countries);
      const country = countries[Math.floor(Math.random() * countries.length)];
      setCountry(country);
      const questions = getQuestions(country, countries, 4);
      setQuestions(questions);
    };

    apiCountries();

  }, []);

  return <>
    <h1>Quiz Component -- Status == {Number(status)}</h1>
    {!status && 
      <div className="!grid !grid-cols-2 !gap-4">
      {
      questions.map((q, index) => (
          <Question key={index} index={q.index} query={q.query} tests={q.tests} valid={q.valid} answer={q.answer} handleAnswer={handleUserAnswer} />
        ))
      }
      </div>
    }
    {status && 
      <div className="quiz-congratulations">
      {
        /*
        <Congratulations key={Number(status)}/>
        */
      }
      </div>
    }
    <hr/>
    <pre>{JSON.stringify(country, null, 2)}</pre>
  </>
}

function handleUserAnswer(index: number, answer: number){

  alert('User ASWER '+index+' => '+answer);

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
    const question: Question = {index: i, query: querys[i][1].replace('COUNTRY', country.name), tests: [], valid: 0, answer: 0};
    
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
    const valid = Math.floor(Math.random() * (alternatives.length + 1));
    alternatives.splice(valid, 0, value);
    question.tests = alternatives;

    questions.push(question);
  }

  return questions;
}

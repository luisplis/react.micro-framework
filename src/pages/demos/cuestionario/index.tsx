
export const menu = 3;
import Markdown from '@slots/Markdown'; 
import readme from './index.md?raw';
import "tailwindcss";

export default function cuestionario() {

  return <div className='main shadow-lg'>
  <h1 className="font-bold text-indigo-400">CUESTIONARIO</h1>
  <div className='w-100 mx-auto'>
    <div className='flex flex-col md:flex-row gap-3'>
      <div className='md:w-7/12 xl:w-8/12 border'>
        <img className="w-auto" alt="preview" src="https://github.com/user-attachments/assets/c0271189-cf88-459a-8014-e09ec5fecdec" />
      </div>
      <div className='md:w-5/12 xl:w-4/12 border p-3'>
        <p className='text-colorize mb-3'>
          <strong>Referencia:</strong> &nbsp;
          <a className="!text-link hover:!text-linked" href="https://devchallenges.io/challenge/country-quizz" target="_blank">
            Country Quiz
          </a>
        </p>
        <p className='mb-3'>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myLargeModal">
            Abrir Enunciado
          </button>
        </p>
        <p className='mb-3'>
          <a className='btn btn-secondary' href="/demos/cuestionario/Quiz" title="Iniciar el Cuestionario">
            Iniciar el Test
          </a>
        </p>
      </div>
    </div>
  </div>
  <hr/>
  <div className="modal fade" id="myLargeModal" tabIndex={-1} aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className='text-primary'>Enunciado del ejercicio</h2>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body bg-white">
          <Markdown file={readme} />
        </div>
        <div className="modal-footer text-center">
          <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</div>
}

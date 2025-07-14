
import { ReactNode } from 'react';
import reactLogo from '@assets/react.svg'
import '/public/bootstrap-min.css'
import '@/main.css'

import Menu from '@slots/Menu'

export default function App({ children }: { children?: ReactNode }) {

  return (
  <>
    <header className="sticky-top bg-dark">
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react img-fluid" alt="React logo" />
          </a>
          <Menu order='tool'/>
        </div>
      </div>
    </header>
    <main className='container'>
      <div className="row justify-content-start align-items-start vh-75">
        <div className="col-12 col-sm-3 col-lg-2 h-md-100">
          <Menu style='flex-column align-items-start'/>
        </div>
        <div className="col-12 col-sm-9 col-lg-10 h-100">
          <div className='main'>
            {children}
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-dark">
      <div className='display text-light text-center py-3'>
        <small>React Micro-Framework &reg; 2025</small>
      </div>
    </footer>
  </>
  )
}

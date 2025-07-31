
import reactLogo from '@assets/react.svg';
import '/public/bootstrap-min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './main.css';

import Menu from '@slots/Menu';
import type { ReactNode } from 'react';

export default function App({ children }: { children?: ReactNode }) {

  return (
  <>
    <header className="sticky-top bg-dark">
      <div className='container py-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <a href="/" title="inicio">
            <img src={reactLogo} className="logo react img-fluid" alt="React logo" />
          </a>
          <Menu order='tool'/>
        </div>
      </div>
    </header>
    <main className='container'>
      <div className="row justify-content-start align-items-start">
        <div className="col-12 col-sm-3 col-lg-2 py-2">
          <Menu style='flex-column align-items-start'/>
        </div>
        <div className="col-12 col-sm-9 col-lg-10">
          <div className='main shadow-lg'>
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

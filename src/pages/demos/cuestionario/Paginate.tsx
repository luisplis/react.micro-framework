
/**
 * Paginador genérico
 */
export default function Paginate({ pages, active, handlePage}: 
  {pages: any[], active: number, handlePage: (index: number) => void }) 
{
  const style    = '!border !rounded-[0.5em] border-indigo-700 !bg-transparent !text-indigo-700 !w-20 !h-10 !mx-4';
  const styleAlt = '!border !rounded-[0.5em] border-indigo-900 !bg-indigo-600 !text-indigo-900 hover:!text-white !w-20 !h-10 !mx-4';
  const classes    = '!border !rounded-full !bg-indigo-600 !text-white hover:!text-black !w-10 !h-10 !mx-2';
  const classesAlt = '!border !rounded-full !bg-fuchsia-400 !text-black !w-10 !h-10 !mx-2';
  
  return (
  <div className="!flex !justify-center !items-center !text-center">
    <div>ACTIVE = <code>{active}</code></div>
      <button className={(active > 0)? styleAlt: style}  onClick={() => handlePage(active-1)}>
        &laquo;
      </button>
      { 
        pages.map((_,i: number) => (
          <button key={'page-'+i} className={((active == i)? classesAlt: classes)}  onClick={() => handlePage(i)}>
            {i+1}
          </button>
        ))
      }
      <button className={(active < (pages.length-1))? styleAlt: style}  onClick={() => handlePage(active+1)}>
        &raquo;
      </button>
  </div>
  );
}
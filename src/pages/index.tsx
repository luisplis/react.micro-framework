import Markdown from "../slots/Markdown";
import fullstack from '/doc/fullstack.md?raw';

export const menu = 1;

export default function index() {

  return <>
    <Markdown file={fullstack}/>
  </>
}

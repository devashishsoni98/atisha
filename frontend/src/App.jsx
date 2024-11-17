import './App.css'
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router'
import '@xyflow/react/dist/style.css';


function App() {

  return (
    <>
    <div>
      {/* <Navbar/> */}
      
      <RouterProvider router={Router}/>
    </div>
    </>
  )
}

export default App

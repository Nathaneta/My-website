import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  )
}

export default App

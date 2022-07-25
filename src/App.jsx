import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddPuppy from './pages/AddPuppy/AddPuppy'
import PuppyList from './pages/PuppyList/PuppyList'
import * as puppyService from './services/puppyService'

const App = () => {
  const [puppies, setPuppies] = useState([])
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddPuppy = async newPuppyData => {
    const newPuppy = await puppyService.create(newPuppyData)
    setPuppies([...puppies, newPuppy])
  }

  useEffect(() => {
    const fetchAllPuppies = async () => {
      const puppyData = await puppyService.getAll()
      setPuppies(puppyData)
    }
    fetchAllPuppies()
  }, [])

  return (
    <>
      <div className="App">
          <NavBar user={user} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route
            path="/signup"
            element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/login"
            element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/add"
            element={<AddPuppy handleAddPuppy={handleAddPuppy} />}
          />
          <Route
            path="/"
            element={<PuppyList puppies={puppies} />}
          />
          <Route
            path="/profiles"
            element={user ? <Profiles /> : <Navigate to="/login" />}
          />
          <Route
            path="/changePassword"
            element={
              user ? (
                <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
    </div>
  </>
)
}

export default App

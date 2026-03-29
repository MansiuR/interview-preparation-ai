import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import Navbar from "./features/auth/components/Navbar.jsx"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <Navbar />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>

  )
}

export default App

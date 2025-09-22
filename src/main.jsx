import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'rsuite/dist/rsuite.min.css'
import AuthProvider from './context/AuthProvider.jsx'
import LabProvider from './context/LabProvider.jsx'
import PcProvider from './context/PcProvider.jsx'
import StudentProvider from './context/StudentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <LabProvider>
      <PcProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </PcProvider>
    </LabProvider>
  </AuthProvider>,
)

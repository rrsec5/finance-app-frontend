import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Settings } from './pages/settings/Settings'
import { Wallets } from './pages/wallets/Wallets'
import { WalletDetail } from './pages/wallets/WalletDetail'
import type { JSX } from 'react'
import { AppProviders } from './providers/AppProviders'
import { SignUp } from './pages/signup/SignUp'
import { LogIn } from './pages/login/LogIn'
import { ProtectedRoute } from './ProtectedRoute'
import { CustomToaster } from './components/UI/CustomToaster'
import { AuthProvider } from './providers/AuthProvider'
import { OAuthCallback } from './pages/OAuthCallback'

function App(): JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <CustomToaster />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                {/* !!!!! мб можно убрать просто AppProviders и его логику запихнуть внутрь ProtectedRoute? !!!!!*/}
                <AppProviders>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/wallets" element={<Wallets />} />
                      <Route path="/wallets/:id" element={<WalletDetail />} />
                    </Routes>
                  </MainLayout>
                </AppProviders>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App

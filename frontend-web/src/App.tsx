import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import InvestorLayout from './components/InvestorLayout'
import InvestorDashboard from './pages/InvestorDashboard'
import Landing from './pages/Landing'

import ArtistDetail from './pages/ArtistDetail'
import MissionsPage from './pages/MissionsPage'
import TreasuryPage from './pages/TreasuryPage'
import AudiencePage from './pages/AudiencePage'
import SmartLinksPage from './pages/SmartLinksPage'
import PublicLinkPage from './pages/PublicLinkPage'
import CampaignsPage from './pages/CampaignsPage'
import ArtistDashboard from './pages/ArtistDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/l/:slug" element={<PublicLinkPage />} /> {/* Public Viral Trap */}

      <Route element={<ProtectedRoute />}>
        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="artist-view" element={<ArtistDashboard />} /> {/* SIMULATOR */}
          <Route path="artists" element={<Dashboard />} /> {/* Reusing for demo */}
          <Route path="artists/:id" element={<ArtistDetail />} /> {/* NEW DETAIL ROUTE */}
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="audience" element={<AudiencePage />} />
          <Route path="smart-links" element={<SmartLinksPage />} />
          <Route path="missions" element={<MissionsPage />} />
          <Route path="treasury" element={<TreasuryPage />} />
        </Route>

        {/* Investor Routes */}
        <Route path="/investor" element={<InvestorLayout />}>
          <Route index element={<InvestorDashboard />} />
          <Route path="growth" element={<InvestorDashboard />} />
          <Route path="reports" element={<div className="text-slate-400">Reports Module (Coming Soon)</div>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

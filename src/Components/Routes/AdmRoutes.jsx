import React from 'react'
import { Routes } from 'react-router-dom'
import DashBoard from '../SharedComponents/Dashboard'

export const AdmRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<DashBoard />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/bookings" element={<FieldsPage />} />
    </Routes>
  )
}

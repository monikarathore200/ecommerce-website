import React from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import { Outlet } from 'react-router-dom'
import Context from '../ContextApi/Context'

export default function RootlayOut() {
  return (
    <>
    <Context>
      <Header/>


      <Outlet/>

      <Footer/>

      </Context>
    </>
  )
}

import React from 'react'
import '../styles/Layout.css'
import Sidebar from './Sidebar'
import Footer from '../pages/Footer'

const Layout = ({children}) => {
    return (
        <div className="layout_mainContainer">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="mainContent">
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout

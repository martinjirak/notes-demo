import React from 'react'
import { Header } from './components/Header'

export interface LayoutProps {
    children?: React.ReactElement
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
    <>
        <Header />
        {children}
    </>
)

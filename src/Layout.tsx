import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
};

const Layout = ({ search, setSearch }: LayoutProps) => {
    return (
    <div className="m-auto flex flex-col justify-start h-screen items-center ring-1 shadow-xl border-4 w-2/5 border-stone-700 border-2">
        <Header setSearch={setSearch}/>
        <Nav search={search} setSearch={setSearch} />
        <Outlet />
        <Footer />
    </div>

    )
};

export default Layout;
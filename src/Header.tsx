import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ setSearch }: HeaderProps) => {
    return(
        <div className="justify-between bg-sky-900 flex w-full">
            <Link to="/" className="p-4 text-5xl" onClick={(e) => setSearch('')}>React Blog</Link>
        </div>
    )
};

export default Header;
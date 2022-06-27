import React from 'react';
import { Link } from 'react-router-dom';

interface NavProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
};

const Nav = ({ search, setSearch }: NavProps) => {
    return (
        <div className="justify-center items-center flex flex-wrap border-8 w-full border-gray-600">
            <form className="w-2/6" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="text-xl w-full"
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <div className="w-1/6 rounded hover:bg-sky-700 text-center">
                <Link to="/" onClick={(e) => setSearch('')}>Home</Link>
            </div>
            <div className="w-1/6 rounded hover:bg-sky-700 text-center">
                <Link to="/labels">Labels</Link>
            </div>
            <div className="w-1/6 rounded hover:bg-sky-700 text-center">
                <Link to="/post">New Post</Link>
            </div>
            <div className="w-1/6 rounded hover:bg-sky-700 text-center">
                <Link to="/about">About</Link>
            </div>
        </div>
    )
};

export default Nav;
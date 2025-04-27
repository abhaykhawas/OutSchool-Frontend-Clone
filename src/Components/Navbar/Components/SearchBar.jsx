import { useState } from 'react';
import { NavLink } from 'react-router';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [navSearch, setNavSearch] = useState('/search');
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    if (searchQuery !== ""){
        setNavSearch(`/search?q=${searchQuery}`)
    }
    
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    setNavSearch(`/search?q=${e.target.value}`)
  }

  return (
    <div className="max-w-lg w-full mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search online classes and tutors"
          value={searchQuery}
          onChange={(e) => handleChange(e)}
          className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white text-gray-600 hidden absolute md:block md:relative"
        />
        <NavLink to={navSearch}>
            <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >         
                <Search size={20} />
            </button>
        </NavLink>
      </form>
    </div>
  );
}
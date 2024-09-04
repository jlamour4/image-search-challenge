'use client'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm.trim());
    }
  };

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    // Extract the search query from the URL
    const queryParam = searchParams?.get('q');
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className='flex items-center'>
        <div className='p-inputgroup flex-1'>
          <InputText
            placeholder="Search for images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type='submit'
            icon="pi pi-search"
            aria-label='Search'
            className='bg-green-500 hover:bg-green-600 active:bg-green-700 text-white'
          />
        </div>
    </form>
  );
};  

export default SearchBar;
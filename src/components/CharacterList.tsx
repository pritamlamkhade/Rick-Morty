import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { fetchCharacters } from '../api';
import CharacterTable from './CharacterTable';

const CharacterList = () => {
  const { page = '1' } = useSearch({ from: '/' });
  const pageNum = parseInt(page);

  const query = useQuery({
    queryKey: ['characters', pageNum],
    queryFn: () => fetchCharacters(pageNum),
    keepPreviousData: true,
  });

  const handleRefresh = () => {
    query.refetch();
  };

  return (
    <div>
      <button onClick={handleRefresh} className="mb-2 px-4 py-1 bg-blue-500 text-white rounded">
        Refresh
      </button>
      {query.isLoading ? (
        <p>Loading...</p>
      ) : query.isError ? (
        <p>Error loading characters</p>
      ) : (
        <CharacterTable data={query.data?.results ?? []}
            info={query.data?.info}
            currentPage={pageNum}/>
      )}
    </div>
  );
};

export default CharacterList;
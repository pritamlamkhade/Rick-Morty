import React from 'react';
import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api';

const CharacterDetails = () => {
  const { id } = useParams({ from: '/character/$id' });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading character</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{data.name}</h2>
      <img src={data.image} alt={data.name} className="w-40 h-40 rounded" />
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Species:</strong> {data.species}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Origin:</strong> {data.origin.name}</p>
    </div>
  );
};

export default CharacterDetails;
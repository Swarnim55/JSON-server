import { api } from '@/pages/api/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Select = (prop: any) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['category'],
    queryFn: () =>
      api.get('/categories').then((res) => {
        return res.data;
      }),
  });
  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occured';

  return (
    <select
      defaultValue={prop.defaultValue}
      value={prop.value}
      onChange={prop.onChange}
    >
      {data?.map((category: string) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Select;

import React, { useRef, useContext } from 'react';
import styles from '@/styles/ToDoForm.module.css';
import Button from './UI/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/pages/api/api';
import AuthContext from '@/context/context-auth';

interface TodoFormData {
  id: number;
  task: string | undefined;
  date: string | undefined;
  category: string | undefined;
  time: string | undefined;
  done: boolean;
}

const ToDoForm = (props: any) => {
  const ctx = useContext(AuthContext);
  const queryClient = useQueryClient();
  const taskInput = useRef<HTMLInputElement | undefined>();
  const dateInput = useRef<HTMLFormElement | undefined>();
  const catInput = useRef<HTMLSelectElement | undefined>();
  const timeInput = useRef<HTMLFormElement | undefined>();

  const formDataMutaion = useMutation({
    mutationFn: (formData) => {
      return api.post('/todo', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lists']);
    },
  });

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: TodoFormData = {
      id: Math.ceil(Math.random() * 10000),
      task: taskInput?.current?.value,
      date: dateInput?.current?.value,
      category: catInput?.current?.value,
      time: timeInput?.current?.value,
      done: false,
    };

    formDataMutaion.mutate(formData);
  };

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
    <>
      <form className={styles.form} onSubmit={formHandler}>
        <label htmlFor="task"> Task: </label>
        <input type="text" id="task" ref={taskInput} />
        <label htmlFor="date"> Date: </label>
        <input type="date" id="date" ref={dateInput} />
        <label htmlFor="cat"> Category:</label>
        <select ref={catInput}>
          <option value="">Select Category</option>
          {data?.map((category: string) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="date"> Time: </label>
        <input type="time" id="date" ref={timeInput} />
        <Button type="submit">Add Task </Button>
      </form>
    </>
  );
};

export default ToDoForm;

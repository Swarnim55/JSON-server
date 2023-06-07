import React, { useContext, useEffect, useState } from 'react';
import styles from '@/styles/ToDoForm.module.css';
import Button from './UI/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/pages/api/api';
import AuthContext from '@/context/context-auth';
import Select from './UI/Select';
import axios from 'axios';

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

  const [taskInp, setTaskInp] = useState('');
  const [dateInp, setDateInp] = useState('');
  const [catInp, setCatInp] = useState('');
  const [timeInp, setTimeInp] = useState('00:00');

  const { data, refetch } = useQuery({
    queryKey: ['editTask'],
    queryFn: () =>
      api.get(`/todo/${ctx.updateTaskId}`).then((response) => {
        return response.data;
      }),
  });

  useEffect(() => {
    // setEditTaskID(ctx.updateTaskId);
    const id = ctx.updateTaskId;
    if (id) {
      refetch();
    }
  }, [ctx.updateTaskId]);

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
      task: taskInp,
      date: dateInp,
      category: catInp,
      time: timeInp,
      done: false,
    };

    setTaskInp('');
    setTimeInp('00:00');
    setDateInp('');
    setCatInp('');

    formDataMutaion.mutate(formData);
  };

  return (
    <>
      <form className={styles.form} onSubmit={formHandler}>
        <label htmlFor="task"> Task: </label>
        <input
          type="text"
          id="task"
          value={taskInp}
          onChange={(e) => setTaskInp(e.target.value)}
        />
        <label htmlFor="date"> Date: </label>
        <input
          type="date"
          id="date"
          value={dateInp}
          onChange={(e) => setDateInp(e.target.value)}
        />
        <label htmlFor="cat"> Category:</label>

        <Select
          defaultValue={'Select'}
          onChange={(e) => setCatInp(e.target.value)}
        />
        <label htmlFor="date"> Time: </label>
        <input
          type="time"
          id="date"
          value={timeInp}
          onChange={(e) => setTimeInp(e.target.value)}
        />
        <Button type="submit">Add Task </Button>
      </form>
    </>
  );
};

export default ToDoForm;

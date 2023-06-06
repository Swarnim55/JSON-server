import React from 'react';
import styles from '@/styles/ToDoList.module.css';
import Button from '../UI/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../pages/api/api';

interface Todo {
  id: number;
  task: string;
  date: string;
  time: string;
  category: string;
  done: boolean;
}

const ToDoList = () => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`/todo/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lists']);
    },
  });

  const deleteTaskHandler = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['lists'],
    queryFn: () =>
      api.get('/todo').then((response) => {
        return response.data;
      }),
  });

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occured';

  return (
    <>
      {data?.map((list: Todo) => {
        const listDate = new Date(list.date);
        const tempDate = String(listDate.getDate());
        const toDoDate = tempDate.padStart(2, '0');
        const toDoMonth = listDate.toLocaleString('en-US', { month: 'short' });
        const toDoYear = listDate.getFullYear();

        return (
          <div className={styles.listShow} key={list.id}>
            <div className={styles.listDate}>
              <span>{toDoDate}</span>
              <span style={{ fontSize: '2rem' }}>{toDoMonth}</span>
              <span>{toDoYear}</span>
              <span>10:00 AM</span>
            </div>
            <div className={styles.listTask}>
              <span className={styles.task}> {list.task} </span>
              <span className={styles.cat}> {list.category}</span>
              <span className={styles.status}>
                {' '}
                {list.done ? 'Complete' : 'Pending'}
              </span>
              <div className={styles.listActions}>
                <Button>EDIT</Button>
                <Button onClick={() => deleteTaskHandler(list.id)}>
                  DELETE
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ToDoList;

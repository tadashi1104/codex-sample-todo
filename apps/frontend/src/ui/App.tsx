import React from 'react';
import { MainLayout } from '../components/templates/MainLayout';
import { TodosPage } from '../pages/TodosPage';

export function App() {
  return (
    <MainLayout>
      <TodosPage />
    </MainLayout>
  );
}


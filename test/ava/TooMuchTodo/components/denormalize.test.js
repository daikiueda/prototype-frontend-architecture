import test from 'ava';
import { createStore } from 'redux';

import { denormalize, schema } from 'normalizr';

import Todo from 'TooMuchTodo/domain/models/Todo';
import TodoList from 'TooMuchTodo/domain/models/TodoList';

import reducers from 'TooMuchTodo/store/modules/reducers';
import { actions as todoActions } from 'TooMuchTodo/store/modules/entities/todo';
import { actions as todoListActions } from 'TooMuchTodo/store/modules/entities/todoList';


test('仮置き：denormalizeのテスト', (t) => {
  const store = createStore(reducers);
  store.dispatch(todoActions.addTodo({ id: '1' }));
  store.dispatch(todoActions.addTodo({ id: '2' }));
  // store.dispatch(todoActions.addTodo(new Todo({ id: '1' })));
  // store.dispatch(todoActions.addTodo(new Todo({ id: '2' })));
  // store.dispatch(todoListActions.addTodoList(new TodoList({ id: '1', todos: ['1', '2'] })));
  store.dispatch(todoListActions.addTodoList({ id: '1', todos: ['1', '2'] }));
  // console.log(store.getState().entities);

  const tempEntities = {
    todo: {
      1: new Todo({ id: 1 }),
      2: new Todo({ id: 2 }),
    },
    todoList: {
      1: new TodoList({
        id: 1,
        todos: [1, 2],
      }),
    },
  };

  const todo = new schema.Entity('todos');
  const todoList = new schema.Entity('todoLists', { todos: [todo] });
  const mySchema = { todoLists: [todoList] };
  console.log(denormalize({ todoLists: ['1'] }, mySchema, tempEntities));
  // console.log(denormalize({ todoLists: ['1'] }, mySchema, store.getState().entities));
});

test('？', (t) => {
  const user = new schema.Entity('users');
  const mySchema = { users: [user] };
  const entities = { users: {'1': { id: 1 }, '2': { id: 2 } } };
  const denormalizedData = denormalize({ users: [1, 2] }, mySchema, entities);
  t.deepEqual(denormalizedData, { users: [{ id: 1 }, { id: 2 }] });
});

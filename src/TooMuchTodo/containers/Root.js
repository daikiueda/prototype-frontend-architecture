import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoListTable from '../components/TodoList/Table';

import { actions } from '../store/modules/entities/todoLists';

class Root extends React.PureComponent {
  static get propTypes() {
    return {
      entities: PropTypes.object.isRequired,
      // requests: PropTypes.object.isRequired,
    };
  }

  render() {
    const { dispatch, entities } = this.props;
    return (
      <main>
        <button onClick={() => dispatch(actions.createTodoList({ id: Date.now() }))}>Add</button>
        <TodoListTable toDoGroups={entities.todoGroups} />
      </main>
    );
  }
}

export default connect((state) => state)(Root);
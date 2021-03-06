import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../commons/components/frames/Modal';
import Dialog from '../../commons/components/frames/Dialog';
import Button from '../../commons/components/elements/Button';
import TodoListDetail from './models/TodoList/Detail';

export default class DialogForCreateTodoList extends React.Component {
  static get propTypes() {
    return {
      onSubmit: PropTypes.func.isRequired,
      onClickCloseButton: PropTypes.func.isRequired,
    };
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <Modal>
        <form onSubmit={onSubmit}>
          <Dialog
            footer={<Button>Add</Button>}
            footerAside={
              <Button type="button" onClick={this.props.onClickCloseButton}>Close</Button>
            }
          >
            <TodoListDetail />
          </Dialog>
        </form>
      </Modal>
    );
  }
}

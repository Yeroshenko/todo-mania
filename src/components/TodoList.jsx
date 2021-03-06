import React, { memo } from 'react'
import { Dropdown, Menu, Modal, Form, Input, Result } from 'antd'

import { randomColor, max } from 'utils'
import { MoreIcon, EditOutlinedIcon, DeleteOutlinedIcon } from 'icons'
import { TodoCreator, TodoItem } from 'containers'
import 'styles/components/TodoList.sass'

export const TodoList = memo(
  ({
    canCreate,
    todos,
    list,
    editMode,
    formInstance,
    featching,
    submitModal,
    cancelModal,
    deleteList,
    toggleEditMode,
    emptyText
  }) => {
    const menu = (
      <Menu>
        <Menu.Item onClick={toggleEditMode}>
          <EditOutlinedIcon />
          <span>Редактировать список</span>
        </Menu.Item>
        <Menu.Item onClick={deleteList}>
          <DeleteOutlinedIcon />
          <span>Удалить список</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className='todo-list'>
        {list && (
          <>
            <div className='todo-list__header'>
              <Modal
                className='todo-list__editor'
                title='Редактирование списка'
                okText='Сохранить изменения'
                cancelText='Отменить'
                visible={editMode}
                onOk={submitModal}
                onCancel={cancelModal}
                okButtonProps={{ loading: featching }}
              >
                {editMode && (
                  <Form
                    layout='vertical'
                    className='todo-list__editor-form'
                    initialValues={{ title: list.title }}
                    form={formInstance}
                  >
                    <Form.Item
                      name='title'
                      label='Название списка'
                      rules={[max(512, 'Максимальная длина 512 символов')]}
                    >
                      <Input
                        autoFocus
                        className='todo-list__editor-input'
                        placeholder='Введите название списка'
                      />
                    </Form.Item>
                  </Form>
                )}
              </Modal>

              <h2 className='todo-list__title' style={{ color: randomColor() }}>
                {list.title}
              </h2>
              {canCreate && (
                <Dropdown overlay={menu}>
                  <span className='todo-list__dropdown-icon'>
                    <MoreIcon />
                  </span>
                </Dropdown>
              )}
            </div>
            <ul className='todo-list__items'>
              {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
            {!canCreate && !todos.length && (
              <Result status='404' title='Список пуст' subTitle={emptyText} />
            )}
            {canCreate && (
              <div className='todo-list__todo-creator'>
                <TodoCreator listId={list.id} />
              </div>
            )}
          </>
        )}
      </div>
    )
  }
)

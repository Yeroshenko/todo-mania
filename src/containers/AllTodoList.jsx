import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getTodos } from 'redux/reducers'
import { TodoList } from 'components'

const AllTodoListContainer = ({ todos, getTodos }) => {
  const [currentTodos, setCurrentTodos] = useState([])

  const list = { title: 'Все задачи' }

  const emptyText = 'Создайте задачу в любом списке и тогда она здесь появиться'

  useEffect(() => {
    getTodos()
  }, [getTodos])

  useEffect(() => {
    setCurrentTodos(todos)
  }, [todos])

  return (
    <TodoList
      canCreate={false}
      todos={currentTodos}
      list={list}
      emptyText={emptyText}
    />
  )
}

const mapStateToProps = state => ({
  todos: state.todos.todos
})

export default connect(mapStateToProps, { getTodos })(AllTodoListContainer)
const React = require('react')

const { map } = require('fun-fp')
const TodoItem = require('./todo-item')

const App = React.createClass({
  getInitialState: function() {
    return {
      viewState: 'all',
      editing: null,
      newTodo: {
        title: '',
        completed: false
      },
      activeTodosLength: 2,
      todos: [
      {
        id: 1,
        title: 'Pick Final Project',
        completed: false
      }, {
        id: 2,
        title: 'Plan Final Project',
        completed: false
      }, {
        id: 3,
        title: 'Do the Final Project',
        completed: true
      }]
    }
  },
  handleChange(e) {
    this.setState({newTodo: {title: e.target.value, completed: false}})
  },
  handleSubmit(e) {
    e.preventDefault()
    const newTodo = {...this.state.newTodo}
    newTodo.id = new Date().toISOString()
    var todos = [...this.state.todos, newTodo]
    this.setState({todos, newTodo: {title: '', completed: ''}})
  },
  handleToggle(todo) {
    return (e) => {
      const todos = this.state.todos.map(item => {
        if (item.id === todo.id) {
          item.completed = !item.completed
        }
        return item
      })
      this.setState({todos})
    }
  },
  editToDo(todo) {
    return (e) => {
      this.setState({editing: todo.id})
    }
  },
  saveToDo(todo) {
    return (title) => {
      const todos = this.state.todos.map(
        item => {
          if (item.id === todo.id) {
            item.title = title
          }
          return item
        }
      )
      this.setState({
        editing: null,
        todos
      })
    }
  },
  destroyToDo(todo) {
    return (e) => {
      var todos = this.state.todos.filter( item => {
        return item.id !== todo.id
      })
      this.setState({todos})
    }
  },
  setViewState(view) {
    return (e) => {
      e.preventDefault()
      this.setState({viewState: view})
    }
  },
  clearCompleted() {
    let todos = this.state.todos.filter( item => {
       return !item.completed
    })
    this.setState({todos})
  },
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.newTodo.title}
              onChange={this.handleChange}
              className="new-todo" type="text" placeholder="What needs to be done?" autoFocus />
          </form>
        </header>
        <section id="main">
          <input type="checkbox" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">

            {map(todo => <TodoItem
              key={todo.id}
              todo={todo}
              editing={this.state.editing}           //Passed functions so todo item can see
              onToggle={this.handleToggle(todo)}
              onSave={this.saveToDo(todo)}
              onEdit={this.editToDo(todo)}
              onDestroy={this.destroyToDo(todo)}
              />, this.state.todos.filter( todo => {
                if (this.state.viewState === 'active') {
                  return !todo.completed
                }
                if (this.state.viewState === 'completed') {
                  return todo.completed
                }
                if (this.state.viewState === 'all') {
                  return true
                }
              })
            )}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>{this.state.todos.reduce((acc, todo) => !todo.completed ? ++acc : acc, 0)}</strong> item(s) left</span>
          <ul className="filters">
            <li><a href="/" onClick={this.setViewState('all')}>All</a></li>
            <li>
              <a href="/active" onClick={this.setViewState('active')}>Active</a>
            </li>
            <li><a href="/completed" onClick={this.setViewState('completed')}>Completed</a></li>
          </ul>
          <button onClick={this.clearCompleted} className="clear-completed">Clear completed</button>
        </footer>
      </section>
    )
  }
})

module.exports = App

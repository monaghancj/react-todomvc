const React = require('react')

// const { map } = require('fun-fp')
const TodoItem = require('./todo-item')

const App = React.createClass({
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <input className="new-todo" type="text" placeholder="What needs to be done?" autoFocus />
        </header>
        <section id="main">
          <input type="checkbox" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item(s) left</span>
          <ul className="filters">
            <li><a href="/">All</a></li>
            <li>
              <a href="/active">Active</a>
            </li>
            <li><a href="/completed">Completed</a></li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    )
  }
})

module.exports = App

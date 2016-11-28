const React = require('react')

const TodoItem = React.createClass({
  render () {
    return (
      <li>
        <div className="view">
          <input type="checkbox" className="toggle"/>
          <label htmlFor="">{this.props.todo.title}</label>
          <button className="destroy"></button>
        </div>
        <input type="text" className="edit"/>
      </li>
    )
  }
})

module.exports = TodoItem

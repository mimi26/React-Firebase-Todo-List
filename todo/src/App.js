import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class App extends Component {
  constructor() {
    super();
    this.state = { todos: {} };

    this.handleNewTodoInput = this.handleNewTodoInput.bind(this);
  }

  componentDidMount() {
    axios.get('https://to-do-9f345.firebaseio.com/.json')
      .then((response) => {
        let todos = response.data;
        //console.log(response.data.name);
        this.setState({ todos })
      })
  }

  createTodo(todoText) {
    // your code goes here
    let newTodo = { title: todoText, createdAt: new Date };

    axios({
      url: '/todos.json',
      baseURL: 'https://to-do-9f345.firebaseio.com/',
      method: "POST",
      data: newTodo
    }).then((response) => {
      let todos = this.state.todos;
      let newTodoId = response.data.name;
      todos[newTodoId] = newTodo;
      this.setState({ todos: todos });
    }).catch((error) => {
      console.log(error);
    });
  }

 // axios.post('https://to-do-9f345.firebaseio.com/.json', {
    //   content: todoText,
    //   title:,
    //   createdAt: new Date()
    //    })
    //   .then((response) => {
    //     this.setState({
    //       todos: response.data
    //     })
    //   })

  handleNewTodoInput(event) {
    if (event.charCode === 13) {
      this.createTodo(event.target.value);
      event.target.value = "";
    }
  }


  renderNewTodoBox() {
    return (
      <div className="new-todo-box pb-2">
        <input className="w-100" placeholder="What do you have to do?" onKeyPress={ this.handleNewTodoInput } />
      </div>
    );
  }

  renderTodoList() {
    let todoElements = [];

    for(let todoId in this.state.todos) {
      let todo = this.state.todos[todoId]

      todoElements.push(
        <div className="todo d-flex justify-content-between pb-4" key={todoId}>
          <div className="mt-2">
            <h4>{todo.title}</h4>
            <div>{moment(todo.createdAt).calendar()}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="todo-list">
        {todoElements}
      </div>
    );
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row pt-3">
          <div className="col-6 px-4">
            {this.renderNewTodoBox()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

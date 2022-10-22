import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          items: []
      };
  }

  componentDidMount() {
    this.callBackendAPI()
      .then((json) => {this.setState({items: json});})
      .catch(err => console.log(err));
  }
  callBackendAPI = async () => {
    const response = await fetch('/documents');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };



  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Наименование документа</th>
            <th scope="col">Количество заявок</th>
          </tr>
        </thead><tbody>{
            items.map((item) => (
              <tr key={item.doc_name}><td>{item.doc_name }</td><td>{item.count }</td></tr>
            ))}
        </tbody>
      </table>
      </div>
    );
  }
}

export default App;

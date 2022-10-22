import React, { Component } from 'react';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', userID: 1, users: [], errorMessage: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.callBackendAPIUsers()
      .then((json) => {this.setState({users: json});})
      .catch(err => console.log(err));
  }

  callBackendAPIUsers = async () => {
    const response = await fetch('/users');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSelectChange(event) {
    this.setState({userID: event.target.value});
  }

  handleSubmit(event) {
    fetch('/post-data', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(this.state)
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          this.setState({errorMessage: ""});
          return response.json();
        }
        if (response.status == "409") {
          this.setState({errorMessage: "Вы уже отправляли заявку на этот документ, она уже была учтена"});

          throw new Error('Вы уже отправляли заявку на этот документ, она уже была учтена');
        }
        throw new Error('Произошла ошибка');
      })
      .then((responseJson) => {
      })
      .catch((error) => {
        console.log(error)
      });
    event.preventDefault();
  }

  render() {
    const { users } = this.state;


    return (
      <form onSubmit={this.handleSubmit}>

      { this.state.errorMessage &&
        <h3 className="error"> { this.state.errorMessage } </h3> }

      <div className="form-group row">

        <label className="col-sm-2 col-form-label" htmlFor="inputName">
          Наименование документа: </label>
          <div className="col-sm-8">
          <input className="form-control" id="inputName" type="text" value={this.state.value} onChange={this.handleChange} />
          </div>

      </div>

        <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="controlSelect">ФИО конструктора</label>
        <div className="col-sm-8">
        <select className="form-select" id="controlSelect" aria-label="Default select example" onChange={this.handleSelectChange}>
      {
        users.map((user) => (
          <option key={user.id} value={user.id}>{user.user_name}</option>
        ))
      }
        </select></div>
        </div>

        <input className="btn btn-primary" type="submit" value="Отправить" />
      </form>

    );
  }
}

export default NameForm;

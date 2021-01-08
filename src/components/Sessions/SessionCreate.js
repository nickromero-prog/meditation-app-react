import React, { Component, Fragment } from 'react'
import { createSession } from '../../api/session'
import { Redirect } from 'react-router-dom'

class SessionCreate extends Component {
  constructor () {
    super()
    this.state = {
      session: {
        time_length: ''
      },
      createdId: null
    }
  }
  // update the state for each input so the 'value' of the input updates and we can see what we type
  // create an object where the key (input, name), value(input value)
  // use object.assign to merge that object with the current state "session"
  // run setState to reassign the 'session' to our merged object
  handleChange = (event) => {
    // This code currently uses `event.target.value` for all inputs, storing string values in the state
    // add an "if the event.target.type is an integer"
    // then parse `event.target.value` and store the number rather than the string
    if (event.target.type === parseInt(event.target.value, 10)) {
      return parseInt(event.target.value, 10)
    }

    const updatedField = { [event.target.name]: event.target.value }

    this.setState(currState => {
      // one way of doing it using object.assign
      // const updatedSession = Object.assign({}, currState.session, updatedField)
      const updatedSession = { ...currState.session, ...updatedField }
      return { session: updatedSession }
    })
  }

  // handle form submission
  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    createSession(user, this.state.session)
      // .then((res) => {
      //   console.log(res)
      // })
      .then((res) => {
        this.setState({ createdId: res.data.session.id })
      })
      .then(() => {
        msgAlert({
          heading: 'Session Logged',
          message: 'Good effort!',
          variant: 'success'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Unable to log session',
          message: 'Something went wrong, try again. Error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to='/sessions'/>
    }
    return (
      <Fragment>
        <h2>Log a Session</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="How many minutes?"
            value={this.state.session.time_length}
            onChange={this.handleChange}
            name="time_length"
          />
          <button type='submit'>Submit</button>
        </form>
      </Fragment>
    )
  }
}

export default SessionCreate

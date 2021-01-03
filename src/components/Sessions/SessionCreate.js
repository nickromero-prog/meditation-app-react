import React, { Component, Fragment } from 'react'
import { createSession } from '../../api/session'
import { Redirect } from 'react-router-dom'

class SessionCreate extends Component {
  constructor () {
    super()
    this.state = {
      session: {
        length: ''
      },
      createdId: null
    }
  }
  // update the state for each input so the 'value' of the input updates and we can see what we type
  // create an object where the key (input, name), value(input value)
  // use object.assign to merge that object with the current state "session"
  // run setState to reassign the 'session' to our merged object
  handleChange = (event) => {
    console.log('changing')

    const updatedField = { [event.target.name]: event.target.value }

    this.setState(currState => {
      // const updatedSession = Object.assign({}, currState.session, updatedField)
      const updatedSession = { ...currState.session, ...updatedField }
      return { session: updatedSession }
    })
  }

  // handle form submission
  handleSubmit = (event) => {
    event.preventDefault()

    const { user } = this.props
    createSession(user, this.state.session)
      .then((res) => {
        this.setState({ createdId: res.data.session._id })
      })
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to='sessions'/>
    }
    return (
      <Fragment>
        <h2>Log a Session</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="How many minutes?"
            value={this.state.session.length}
            onChange={this.handleChange}
            name="length"
          />
        </form>
        <button type='submit'>Submit</button>
      </Fragment>
    )
  }
}

export default SessionCreate

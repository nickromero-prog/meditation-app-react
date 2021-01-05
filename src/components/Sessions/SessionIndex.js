import React, { Component, Fragment } from 'react'
import { indexSessions } from '../../api/session'
import { Link } from 'react-router-dom'
// beginning of component
class SessionIndex extends Component {
  // always necessary constructor function when using a class component
  constructor () {
    // super function
    super()
    // set the initial state to null since you will populate the array with the created ones from the user
    this.state = {
      sessionArray: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexSessions(user)
      .then(res => {
        this.setState({ sessionArray: res.data.sessions })
      })
      .then(() => {
        msgAlert({
          heading: 'Acquired sessions',
          message: 'Displaying sessions',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Session Index Failed',
          message: 'Failed with error: ' + err.message,
          variant: 'danger '
        })
      })
  }

  render () {
    if (!this.state.sessionArray) {
      return (
        'Loading...'
      )
    } else if (this.state.sessionArray.length === 0) {
      return (
        'No sessions yet'
      )
    } else {
      return (
        <div>
          {this.state.sessionArray.map(session => (
            <Fragment key={session.id}>
              <h2>Length {session.time_length}</h2>
              <p>{session.created_at}</p>
              <Link to={`/session-show/${session._id}`}>See this session</Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default SessionIndex

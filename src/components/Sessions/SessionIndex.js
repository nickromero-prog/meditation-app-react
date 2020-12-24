import React, { Component, Fragment } from 'react'
import { indexSessions } from '../../api/session'
class SessionIndex extends Component {
  constructor () {
    super()
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
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default SessionIndex

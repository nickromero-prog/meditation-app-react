import React, { Component, Fragment } from 'react'
import { indexSessions } from '../../api/session'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
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
      // .then(() => {
      //   msgAlert({
      //     heading: 'Acquired sessions',
      //     message: 'Displaying sessions',
      //     variant: 'success'
      //   })
      // })
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
        <div>
          <br />
          <h2>No logged connections to the Force</h2>
        </div>
      )
    } else {
      return (
        <div>
          {this.state.sessionArray.map(session => (
            <Fragment key={session.id}>
              <br />
              <h3 className="indexHeader">{session.time_length} minutes observing the Force</h3>
              <p>{new Date(session.created_at).toString().slice(0, 15)}</p>
              <Link to={`/sessions/${session.id}`}><Button variant="warning">Edit</Button></Link>
              <br />
              <br />
            </Fragment>
          ))}
        </div>
      )
    }
  }
}
// <p>{session.created_at}</p>

export default SessionIndex

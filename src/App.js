import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// Components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import SessionIndex from './components/Sessions/SessionIndex'
import SessionCreate from './components/Sessions/SessionCreate'
import SessionShow from './components/Sessions/SessionShow'
import SessionUpdate from './components/Sessions/SessionUpdate'

// Master Component
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sessions' render={() => (
            <SessionIndex user={user} msgAlert={this.msgAlert}/>
          )} />
          <AuthenticatedRoute user={user} path='/session-create' render={() => (
            <SessionCreate
              user={user}
              msgAlert={this.msgAlert}
            />
          )} />
          <AuthenticatedRoute user={user} path='/sessions/:sessionId' render={({ match }) => (
            <SessionShow
              user={user}
              msgAlert={this.msgAlert}
              match={match}
            />
          )} />
          <AuthenticatedRoute user={user} path='/session-update/:sessionId' render={({ match }) => (
            <SessionUpdate
              match={match}
              msgAlert={this.msgAlert}
              user={user}
            />
          )}/>
        </main>
      </Fragment>
    )
  }
}

export default App

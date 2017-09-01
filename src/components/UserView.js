import React from 'react'
import CSSModules from 'react-css-modules'
import store from '../store'
import { fromNow } from '../filters'
import mainstyles from '../css/Main.sass'
import styles from '../css/UserView.sass'

class UserView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.match.params.id || '',
      user: {}
    }
  }

  componentWillMount () {
    store.fetchUser(this.state.id).then(user => {
      document.title = 'Profile: ' + this.state.id + ' | React.js HN Clone'
      this.setState({ user: user })
    })
  }

  render () {
    return <div className={styles.userview + ' ' + mainstyles.view} >
        <ul>
          <li><span styleName="label">user:</span> {this.state.user.id}</li>
          <li><span styleName="label">created:</span> {fromNow(this.state.user.created)} ago</li>
          <li><span styleName="label">karma:</span> {this.state.user.karma}</li>
          <li>
            <span styleName="label">about:</span>
            { React.createElement('div', { styleName: 'about', dangerouslySetInnerHTML: { __html: this.state.user.about } }) }
          </li>
        </ul>
        <p styleName="links">
          <a href={'https://news.ycombinator.com/submitted?id=' + this.state.user.id}>submissions</a><br />
          <a href={'https://news.ycombinator.com/threads?id=' + this.state.user.id}>comments</a><br />
        </p>
      </div>
  }
}

export default CSSModules(UserView, styles)

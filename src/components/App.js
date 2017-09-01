import React from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import NewsView from './NewsView'
import UserView from './UserView'
import ItemView from './ItemView'
import styles from '../css/Main.sass'

class App extends React.Component {
  render () {
    return <div id="wrapper" className={styles.wrapper}>
      <div id="header" className={styles.header}>
        <a id="yc" className={styles.yc} href="http://www.ycombinator.com">
          <img src="https://news.ycombinator.com/y18.gif" />
        </a>
        <h1><a href="#/news/1">Hacker News</a></h1>
        <span className={styles.source}>
          Built with <a href="https://facebook.github.io/react/" rel="noopener noreferrer" target="_blank">React.js</a> |
          <a href="https://github.com/facebook/react" rel="noopener noreferrer" target="_blank">Source</a>
        </span>
      </div>
      <HashRouter hashType="hashbang">
          <switch>
              <Route path="/news/:page" component={NewsView} />
              <Route path="/user/:id" component={UserView} />
              <Route path="/item/:id" component={ItemView} />
              <Route exact path="/" render={() => <Redirect to="/news/1" />} />
          </switch>
      </HashRouter>
    </div>
  }
}

export default CSSModules(App, styles)

import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import store from '../store'
import Item from './Item'
import mainstyles from '../css/Main.sass'
import styles from '../css/NewsView.sass'

class NewsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: parseInt(props.match.params.page) || 1,
      items: []
    }
    this.update = this.update.bind(this);
  }

  componentWillMount () {
    store.on('topstories-updated', this.update)
    this.update()
  }

  componentWillReceiveProps (nextProps) {
    let page = parseInt(nextProps.match.params.page) || 1
    this.setState({ page: page })
    this.update()
  }

  componentWillUnmount () {
    store.removeListener('topstories-updated', this.update)
  }

  update () {
    store.fetchItemsByPage(this.state.page).then(items => {
      this.setState({ items: items })
    })
  }

  render () {
    let items = []
    for (let i = 0; i < this.state.items.length; i++) {
      items.push(<Item key={ this.state.items[i].id } index={ i + 1 + ((this.state.page - 1) * 30) } item={ this.state.items[i] } />)
    }

    let nav = ''
    if (this.state.items.length > 0) {
      let more = ''
      if (this.state.page < 4) {
        more = <Link to = { '/news/' + (this.state.page + 1) }>more...</Link>
      }
      let prev = ''
      if (this.state.page > 1) {
        prev = <Link to = { '/news/' + (this.state.page - 1) }>&lt; prev</Link>
      }
      nav = <div className={styles.nav} >{prev} {more}</div>
    }

    return <div className={`${styles.newsview} ${mainstyles.view} ${!items.length && styles.loading}`} >{items}{nav}</div>
  }
}

export default CSSModules(NewsView, styles)

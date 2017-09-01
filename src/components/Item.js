import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { domain, fromNow } from '../filters'
import styles from '../css/Item.sass'
import itemviewstyles from '../css/ItemView.sass'

class Item extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {},
      index: 0
    }
  }

  componentWillMount () {
    this.setState({ index: parseInt(this.props.index) })
    this.setState({ item: this.props.item })
  }

  componentWillReceiveProps (newProps) {
    this.setState({ index: parseInt(this.props.index) })
    this.setState({ item: this.props.item })
  }

  render () {
    let elmIndex = (this.state.index !== 0) ? <span className={styles.index} >{this.state.index}.</span> : ''
    let itemClass = styles.item + ((this.state.index !== 0) ? '' : ' ' + itemviewstyles.item)

    let domainName = ''
    if (this.state.item.type === 'story') {
        domainName = <span className={styles.domain} >
            ({ domain(this.state.item.url) })
          </span>
    }

    let info = ''
    if (this.state.item.type === 'story' || this.state.item.type === 'poll') {
        info = <span >
            {this.state.item.score} points by&nbsp;
            <Link to = { '/user/' + this.state.item.by } >{this.state.item.by}</Link>&nbsp;
          </span>
    }

    let descendants = ''
    if (this.state.item.descendants) {
      if (this.state.index !== 0) {
        descendants = <span className='comments-link' > | <Link to = { '/item/' + this.state.item.id } >{this.state.item.descendants} comments</Link></span>
      } else {
        descendants = <span className='comments-link' > | {this.state.item.descendants} comments</span>
      }
    }

    return <div className={itemClass} >
      {elmIndex}
      <p>
        <a className='title' href={this.state.item.url} target='_blank' >{this.state.item.title}</a>&nbsp;
        {domainName}
      </p>
      <p className={styles.subtext} >
        { info }
        { fromNow(this.state.item.time) } ago&nbsp;
        { descendants }
      </p>
    </div>
  }
}

export default CSSModules(Item, styles)

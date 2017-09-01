import React from 'react'
import CSSModules from 'react-css-modules'
import { fromNow } from '../filters'
import styles from '../css/Comment.sass'
import store from '../store'

class Comment extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      comment: props.comment,
      childComments: [],
      open: true
    }
    this.changeToggle = this.changeToggle.bind(this)
  }

  componentWillMount () {
    if (this.state.comment.kids) {
      store.fetchItems(this.state.comment.kids).then(comments => {
        this.setState({ childComments: comments })
      })
    }
  }

  changeToggle (e) {
    this.setState({ open: !this.state.open })
  }

  render () {
    let comment
    if (this.state.comment.text !== '') {

      let childcommentTags
      if (this.state.childComments.length > 0 && this.state.open) {
        let _childcomments = []
        for (let comment of this.state.childComments) {
          _childcomments.push(<Comment key={comment.id} comment={comment} />)
        }
        childcommentTags = <ul className={styles.childcomments}>
                  {_childcomments}
                </ul>
      }

      let toggleLabel = (this.state.open) ? '[-]' : '[+]'

      comment = <li>
        <div className={styles.comhead}>
          <a className={styles.toggle} onClick={this.changeToggle}>{toggleLabel}</a>
          <a href={'#/user/' + this.state.comment.by}>{this.state.comment.by}</a>&nbsp;
          { fromNow(this.state.comment.time) } ago&nbsp;
        </div>
        <div className={!this.state.open && styles.commenthide}>
          { React.createElement('p', { className: styles.commentcontent, dangerouslySetInnerHTML: { __html: this.state.comment.text } }) }
          {childcommentTags}
        </div>
      </li>
    }
    return comment
  }
}

export default CSSModules(Comment, styles)

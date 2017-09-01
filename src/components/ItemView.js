import React from 'react'
import CSSModules from 'react-css-modules'
import store from '../store'
import Item from './Item'
import Comment from './Comment'
import mainstyles from '../css/Main.sass'
import styles from '../css/ItemView.sass'

class ItemView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.match.params.id || '',
      item: {},
      comments: [],
      pollOptions: null
    }
  }

  componentWillMount () {
    let _self = this
    store.fetchItem(this.state.id).then(item => {
      store.fetchItems(item.kids).then(comments => {
        document.title = item.title + ' | React.js HN Clone'
        _self.setState({
          item: item,
          comments: comments
        })
      }).then((comments) => {
        if (item.type === 'poll') {
          store.fetchItems(item.parts).then(pollParts => {
            _self.setState({pollOptions: pollParts})
          })
        }
      })
    })
  }

  render () {
    let itemview
    if (this.state.item.id) {
      let item = this.state.item
      let itemtext = <p styleName="itemtext">{item.text}</p>

      let polloptions = []
      if (this.state.pollOptions) {
        for (var i = 0; i < this.state.pollOptions.length; i++) {
          let polloption = <li key={this.state.pollOptions[i].id}>
                { React.createElement('p', { dangerouslySetInnerHTML: { __html: this.state.pollOptions[i].text } }) }
                <p styleName="subtext">{this.state.pollOptions[i].score} points</p>
              </li>
          polloptions.push(polloption)
        }
      }

      let commentTags
      if (this.state.comments) {
        let _comments = []
        for (let comment of this.state.comments) {
          _comments.push(<Comment key={comment.id} comment={comment} />)
        }
        commentTags = <ul className="comments">
                  {_comments}
                </ul>
      } else if (!this.state.comments && this.item.type === 'job') {
        commentTags = <p>No comments yet.</p>
      }

      itemview = <div className={styles.itemview + ' ' + mainstyles.view} >
          <Item key={this.state.item.id} index={0} item={this.state.item} />
          {itemtext}
          <ul className={styles.polloptions} >
            {polloptions}
          </ul>
          {commentTags}
        </div>
    }

    return itemview
  }
}
export default CSSModules(ItemView, styles)

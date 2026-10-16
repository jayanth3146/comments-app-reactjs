import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emrald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentList: []}

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.lenth - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialContainerBackgroundClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  deleteComment = id => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== id),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentList} = this.state
    return commentList.map(eachItem => (
      <CommentItem
        key={eachItem.id}
        commentDetails={eachItem}
        deleteComment={this.deleteComment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Techonologies
              </p>
              <input
                type="text"
                value={nameInput}
                placeholder="your name"
                onChange={this.onChangeName}
              />
              <textarea
                placeholder="your comment"
                className="comment-input"
                value={commentInput}
                onChange={this.onChangeComment}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentList.length}</span>Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}
export default Comments

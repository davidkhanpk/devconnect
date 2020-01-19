import React, { Component } from 'react'
import { getPost } from '../../actions/postActions'
import { connect} from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { Link } from 'react-router-dom'

class Post extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id)
    }
    componentDidUpdate() {
        if(this.props.post && this.props.post.post == null && this.props.post.loading == false) {
            this.props.history.push('/feed');
        }
    }
  render() {
    let postContent;
    let { post, loading} = this.props.post;
    if(post == null ||  loading || Object.keys(post).length === 0){
        postContent = <Spinner />
    }else{
        postContent = <div>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
            </div>;
    }
    return (
      <div className="post">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/feed" className="btn btn-light mb-3">Go to Feed</Link>
                    {postContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}
Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(Post);

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
    constructor(props){
        super(props);
        this.state = {
            clinetid: '',
            clientSecret: '',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }
    componentDidMount(){
        const { username } = this.props;
        const { count, sort, clinetid, clientSecret} = this.state;

        fetch(`https://api.github.com/users/${username}/reposs?per_page=${count}&sort=${sort}&client_id=${clinetid}&client_secret=${clientSecret}`).then(res => res.json()).then(data => {
            this.setState({repos: data})
        }).catch(err => console.log(err))
    }
  render() {
      const {repos} = this.state;
      const repoItems = repos.map(repo => (
          <div key={repo.id} className="card card-body mb-2">
            <div className="row">
                <h4><Link to={repo.html_url} className="text-info" target="_blank">{repo.name}</Link></h4>
                <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
                <span className="badge badhe-info mr-1">Stars: {repo.stargazers_count}</span>
                <span className="badge badhe-secondary mr-1">Watchers: {repo.watchers_count}</span>
                <span className="badge badhe-info">Forks: {repo.forks_count}</span>
            </div>
          </div>
      )) 
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default ProfileGithub;
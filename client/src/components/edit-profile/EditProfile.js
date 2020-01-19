import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectGroupList';
import { createProfile, getCurrentProfile } from '../../actions/profileAction';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../validations/is-empty';

class EditProfile extends Component {
    constructor(){
        super();
        this.state = {
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){

            this.setState({errors: nextProps.errors});
        }
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;
            const skillsCsv = profile.skills.join(',')
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.socail = !isEmpty(profile.socail) ? profile.socail : {};
            profile.twitter = !isEmpty(profile.socail.twitter) ? profile.socail.twitter : '';
            profile.facebook = !isEmpty(profile.socail.facebook) ? profile.socail.facebook : '';
            profile.youtube = !isEmpty(profile.socail.youtube) ? profile.socail.youtube : '';
            profile.linkedin = !isEmpty(profile.socail.linkedin) ? profile.socail.linkedin : '';
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCsv,
                githubusername: profile.githubusername,
                bio: profile.bio,
                facebook: profile.facebook,
                twitter: profile.twitter,
                youtube: profile.youtube,
                linkedin: profile.linkedin,

            })
        }
    }
    onSubmit (e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history);
        console.log('submit');

    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value });
        
    }
  render() {
      console.log(this.state);
      const {errors, displaySocailInputs  } = this.state;
      let socailInputs;
      if(displaySocailInputs){
        socailInputs= (
            <div>
                <InputGroup placeholder="Twitter" name="twitter" icon="fab fa-twitter" value={this.state.twitter} onChange={this.onChange} error={errors.twitter} />
                <InputGroup placeholder="Facebook" name="twitter" icon="fab fa-facebook" value={this.state.facebook} onChange={this.onChange} error={errors.facebook} />
                <InputGroup placeholder="Youtube" name="youtube" icon="fab fa-youtube" value={this.state.youtube} onChange={this.onChange} error={errors.youtube} />
                <InputGroup placeholder="Instagram" name="instagram" icon="fab fa-instagram" value={this.state.instagram} onChange={this.onChange} error={errors.instagram} />
            </div>
        )
      }else{

      }
        const options = [
            {label: "* Select Professional Status" , value: 0},
            {label: "Developer" , value: "Developer"},
            {label: "Junior Developer" , value: "Junior Developer"},
            {label: "Senior Developer" , value: "Senior Developer"},
            {label: "Manager" , value: "Manager" },
            {label: "Student or Learning" , value: "Student or Learning"},
            {label: "Instrctor or Teacher" , value: "Instrctor or Teacher"},
            {label: "Intern" , value: "Intern"},
            {label: "Other" , value: "Other"},
            
        ]
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Profile</h1>
                    <small className="d-block pb-3">* = Required</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup placeholder="* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} info="Your Profile Details" />
                        <SelectListGroup placeholder="* Status" name="status" value={this.state.status} onChange={this.onChange} error={errors.status} options={options} info="Your Status" />
                        <TextFieldGroup placeholder="Company" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} info="Your Company" />
                        <TextFieldGroup placeholder="Website" name="website" value={this.state.website} onChange={this.onChange} error={errors.website} info="Your Website" />
                        <TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} info="Your Location" />
                        <TextFieldGroup placeholder="Skills" name="skills" value={this.state.skills} onChange={this.onChange} error={errors.skills} info="Please use comma seaparated" />
                        <TextFieldGroup placeholder="Github Username" name="githubusername" value={this.state.githubusername} onChange={this.onChange} error={errors.githubusername} info="Github" />
                        <TextAreaFieldGroup placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} info="Your Bio" />
                        <div className="mb-3">
                            <button type="button" onClick={() => {this.setState(prevState => ({ displaySocailInputs: !prevState.displaySocailInputs })) }} className="btn btn-light">Add Socail Network</button>
                            <span className="text-muted">Optional</span>
                        </div>
                        {socailInputs}
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
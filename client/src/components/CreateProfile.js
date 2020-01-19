import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../components/common/TextFieldGroup';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';
import InputGroup from '../components/common/InputGroup';
import SelectListGroup from '../components/common/SelectGroupList';
import { createProfile } from '../actions/profileAction';
import { withRouter } from 'react-router-dom';

class CreateProfile extends Component {
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
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
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

    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value });
        
    }
  render() {
      const {errors, displaySocailInputs  } = this.state;
      let socailInputs;
      if(displaySocailInputs){
        socailInputs= (
            <div>
                <InputGroup placeholder="Twitter" name="twitter" icon="fab fa-twitter" value={this.state.twitter} onChange={this.onChange} error={errors.twitter} />
                <InputGroup placeholder="Facebook" name="facebook" icon="fab fa-facebook" value={this.state.facebook} onChange={this.onChange} error={errors.facebook} />
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
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">Lest create a profile</p>
                    <small className="d-block pb-3">* = REquired</small>
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

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
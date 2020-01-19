import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from './types';


export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profiles').then(res => {
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }).catch(err => dispatch({
        type: GET_PROFILE,
        payload: {}
    }))
}

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profiles/handle/${handle}`).then(res => {
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }).catch(err => dispatch({
        type: GET_PROFILE,
        payload: null
    }))
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profiles', profileData).then(res => history.push('/dashboard')).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const setProfileLoading = ()  => {
    return {
        type: PROFILE_LOADING
    }
}

export const addExperience = (expData, history)  => dispatch => {
    axios.post('./api/profiles/experience', expData).then(res => history.push('/dashboard')).catch(err => dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const addEducation = (eduData, history)  => dispatch => {
    axios.post('./api/profiles/education', eduData).then(res => history.push('/dashboard')).catch(err => dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const deleteExperience = (id)  => dispatch => {
    axios.delete(`./api/profiles/experience/${id}`).then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const deleteEducation = (id)  => dispatch => {
    axios.delete(`./api/profiles/education/${id}`).then(res => dispatch({
        type: GET_PROFILE,
        payload: res.data
    })).catch(err => dispatch ({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

export const getProfiles = (id)  => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`./api/profiles/all`).then(res => dispatch({
        type: GET_PROFILES,
        payload: res.data
    })).catch(err => dispatch ({
        type: GET_PROFILE,
        payload: null
    }))
}

export const deleteAccount = () => dispatch =>  {
    if(window.confirm("Are you sure?")) {
        axios.delete('/api/profiles').then(res => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
        })).catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
    }
}

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
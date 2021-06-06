import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import getApiUrl from "../../helpers/getApiUrl";
import axios from 'axios';

class AddHeroe extends Component {

    state = {
        nickname: '',
        realName: '', 
        originDescription: '',
        superpowers: '',
        catchPhrase: '',
        pathImage: null,
        errors: {}
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { nickname, realName, originDescription, superpowers, catchPhrase, pathImage } = this.state;

    //Check for errors
        if(nickname === "") {
            this.setState({errors: {nickname: 'Nickname is required'}});
            return;
        }
        if(realName === "") {
            this.setState({errors: {realName: 'RealName is required'}});
            return;
        }
        if(originDescription === "") {
            this.setState({errors: {originDescription: 'Description is required'}});
            return;
        }
        if(superpowers === "") {
            this.setState({errors: {superpowers: 'Superpowers is required'}});
            return;
        }
        if(catchPhrase === "") {
            this.setState({errors: {catchPhrase: 'Catch phrase is required'}});
            return;
        }

        const newHeroe = {
            nickname,
            realName, 
            originDescription,
            superpowers,
            catchPhrase,
        };

        const formData = new FormData();
        // add form data
        for ( var key in newHeroe ) {
            formData.append(key, newHeroe[key]);
        }
        // add image
        formData.append('image', pathImage);

        const res = await axios
            .post(`${getApiUrl()}/heroe/add`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })


            dispatch({type: 'ADD_HEROE', payload: res.data});


        //clear State
        this.setState({
            realName: '', 
            originDescription: '',
            superpowers: '',
            catchPhrase: '',
            errors: {}
        });

        //redirect 
        this.props.history.push('/')
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});
    
    uploadImage = e => {
        this.setState({pathImage: e.target.files[0]});
    }

    render() {
        const { nickname, realName, originDescription, superpowers, catchPhrase, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                        <div className="card-header text-center font-weight-bold">Add Heroe</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this.setState, dispatch)}>
                                <TextInputGroup
                                    label="Name of Heroe"
                                    name="nickname"
                                    placeholder="Enter heroe name"
                                    value={nickname}
                                    onChange={this.onChange}
                                    error={errors.nickname}
                                />
                                <TextInputGroup
                                    label="Real name of Heroe"
                                    name="realName"
                                    placeholder="Enter real name"
                                    value={realName}
                                    onChange={this.onChange}
                                    error={errors.realName}
                                />
                                <TextInputGroup
                                    label="Description"
                                    name="originDescription"
                                    placeholder="Enter Description of heroe"
                                    value={originDescription}
                                    onChange={this.onChange}
                                    error={errors.originDescription}
                                />
                                <TextInputGroup
                                    label="Superpowers of Heroe"
                                    name="superpowers"
                                    placeholder="Enter superpowers"
                                    value={superpowers}
                                    onChange={this.onChange}
                                    error={errors.superpowers}
                                />
                                <TextInputGroup
                                    label="Catch Phrase"
                                    name="catchPhrase"
                                    placeholder="Enter Catch Phrase"
                                    value={catchPhrase}
                                    onChange={this.onChange}
                                    error={errors.catchPhrase}
                                />
                                <div className="form-group mb-3">
                                    <label htmlFor="file" className="d-block mb-1">Heroe image</label>
                                    <input onChange={this.uploadImage} type="file" name="file" />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Add Heroe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    )
                }}
            </Consumer>
        )
        
    }
}

export default AddHeroe;
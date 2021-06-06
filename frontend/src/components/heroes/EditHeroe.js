import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
import getApiUrl from "../../helpers/getApiUrl";


class EditHeroe extends Component {

    state = {
        nickname: '',
        realName: '', 
        originDescription: '',
        superpowers: '',
        catchPhrase: '',
        pathImage: null,
        errors: {}
    };

    //get heroe info
    async componentDidMount() {
        const { id } = this.props.match.params;

        const res = await axios
            .get(`${getApiUrl()}/${id}`);


        const heroe = res.data;

        this.setState({
            nickname: heroe.nickname,
            realName: heroe.realName,
            originDescription: heroe.originDescription,
            superpowers: heroe.superpowers,
            catchPhrase: heroe.catchPhrase,
            pathImage: heroe.pathImage,
        })
    }


    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { nickname, realName, originDescription, superpowers, catchPhrase, pathImage} = this.state;

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

        const updHeroe = {
            nickname,
            realName, 
            originDescription,
            superpowers,
            catchPhrase,
        }
        const { id } = this.props.match.params;


        const formData = new FormData();
        // add form data
        for ( var key in updHeroe ) {
            formData.append(key, updHeroe[key]);
        }
        // add image
        formData.append('image', pathImage);

        const res = await axios
            .put(`${getApiUrl()}/update/${id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })





        dispatch({type: 'UPDATE_HEROE', payload: res.data});

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

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
  
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
                        <div className="card-header text-center">Edit Heroe</div>
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
                                    <label htmlFor="file" className="d-block mb-1">Add another Heroe image</label>
                                    <input onChange={this.uploadImage} type="file" name="file" />
                                </div>
                                 <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Update Heroe</button>
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

export default EditHeroe;
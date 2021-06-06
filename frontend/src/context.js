import React, { Component } from 'react';
import axios from 'axios';
import getApiUrl from "./helpers/getApiUrl";

const Context = React.createContext();
 

const reducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_HEROE':
            return {
                ...state,
                heroes: state.heroes.filter(heroe => heroe._id !== action.payload)
            };
            case 'ADD_HEROE':
            return {
                ...state,
                heroes: [action.payload, ...state.heroes]
            };
            case 'UPDATE_HEROE':
                return {
                    ...state,
                    heroes: state.heroes.map(heroe => heroe._id === action.payload._id ? (heroe = action.payload) : heroe)
                }
        default: 
        return state;
    }
}

export class Provider extends Component {
    state = {
        heroes: [],
        dispatch: action => this.setState(state => reducer(state, action))
    };

    async componentWillMount() {
        const res = await axios.get(getApiUrl());

        this.setState({heroes: res.data})
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
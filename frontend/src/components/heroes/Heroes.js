import React, { Component } from 'react'
import Heroe from './Heroe'
import Row from 'react-bootstrap/Row';
import { Consumer } from '../../context'
import {Link} from "react-router-dom";


class Heroes extends Component {

    render() {
        return (
            <Consumer>
                {value => {
                    const { heroes = [] } = value;

                    const heroesMap = heroes.length > 0 ? (heroes || []).map(heroe => (
                        <Heroe
                            id={heroe._id}
                            key={heroe._id}
                            heroe={heroe}
                        />
                    )) : <div>
                        You don't have any heroes added. Please use the link to <Link to="/heroe/add">add some</Link>
                    </div>;

                    return (
                        <React.Fragment>
                            <h1 className="display-4 mb-2 text-center">
                                All Heroes
                            </h1>
                            <Row>
                                {heroesMap}
                            </Row>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        )
    }
}

export default Heroes
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col';
import getImageUrl from "../../helpers/getImageUrl";
import getApiUrl from "../../helpers/getApiUrl";



class Heroe extends Component {

    onDeleteClick = async (id, dispatch) => {
        const deleteId = id;

            await axios
                .delete(`${getApiUrl()}/delete/${id}`, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })



        dispatch({
            type: 'DELETE_HEROE',
            payload: deleteId
        })
    }

    render() {
        
        const { _id, nickname, pathImage } = this.props.heroe

        return (


            <Consumer>
                {value => {

                    const { dispatch } = value

                    return(
                        <Col md={3} className="mb-3">
                            <Card style={{ width: '18rem' }}>
                            <Card.Img style={{ height: '28rem' }} variant="top" src={getImageUrl(pathImage)}/>
                            <Card.Body>
                                <Card.Title className="text-center">{nickname}</Card.Title>
                                <Link to={`heroe/info/${_id}`}>Heroe characteristics</Link>
                                <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}}
                                    onClick={this.onDeleteClick.bind(this, _id, dispatch)}
                                />
                                <Link to={`heroe/edit/${_id}`}>
                                <i 
                                    style={{
                                        cursor: 'pointer',
                                        float: 'right',
                                        color: 'black',
                                        marginRight: '1rem',
                                    }}
                                    className="fas fa-pencil-alt"></i>
                                </Link>
                            </Card.Body>
                            </Card>
                        </Col>
                    )
                }}
            </Consumer>


            
        )
    }
}

Heroe.propTypes = {
    heroe: PropTypes.object.isRequired,
}

export default Heroe
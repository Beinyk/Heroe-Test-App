import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import getApiUrl from "../../../helpers/getApiUrl";
import axios from 'axios';
import getImageUrl from "../../../helpers/getImageUrl";

import classes from './HeroeInfo.module.css'


class EditHeroe extends Component {

    state = {
        nickname: '',
        realName: '', 
        originDescription: '',
        superpowers: '',
        catchPhrase: '',
        pathImage: ''
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
            pathImage: heroe.pathImage
        })
    }


    render() {
        const { nickname, realName, originDescription, superpowers, catchPhrase, pathImage } = this.state;

        return (
               
            <Container>
                <div className={classes.textHeader}>{nickname}</div>
                <Row>
                    <Col xs={6} md={3}>
                        <Image  style={{ height: '28rem' }} src={getImageUrl(pathImage)} rounded />
                    </Col>
                    <Col xs={6} md={9}>
                        <Row>
                            <Col md={3} className={classes.infoGroup}>Nickname</Col>
                            <Col md={9}>{nickname}</Col>
                        </Row>
                        <Row>
                            <Col md={3} className={classes.infoGroup}>Real Name:</Col>
                            <Col md={9}>{realName}</Col>
                        </Row>
                        <Row>
                            <Col md={3} className={classes.infoGroup}>Origin Description:</Col>
                            <Col md={9}>{originDescription}</Col>
                        </Row>
                        <Row>
                            <Col md={3} className={classes.infoGroup}>Super Powers:</Col>
                            <Col md={9}>{superpowers}</Col>
                        </Row>
                        <Row>
                            <Col md={3} className={classes.infoGroup}>Catch Phrase:</Col>
                            <Col md={9}>{catchPhrase}</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
                   
        )
        
    }
}

export default EditHeroe;
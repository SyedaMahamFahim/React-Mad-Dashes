import React, { Component } from 'react';
import axios from 'axios';
import AppWrapper from '../wrapper/AppWrapper'
// import '../components/Context/GV';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';

import Xslider from '../components/Sliders/Xslider';
import Yslider from '../components/Sliders/Yslider';

// import Iframe from 'react-iframe'

import Canvas from '../components/canva/Canvas';
import PageHeading from '../components/PageHeading/PageHeading';

class Draw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userToken: '',
            device: '',
            pattern: '',
            cord: '',
            shift: 0
        }
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        var d = localStorage.getItem("device");
        this.setState({ userToken: token, device: d });
        console.log("token : " + this.state.userToken);
    }

    handleAxis() {
        console.log("X : " + global.axis0);
        console.log("Y : " + global.axis1);
    }

    handleChange = event => {
        this.setState({ pattern: event.target.value });
    }
    
    handleSubmit(a,b){
       

        var Xarray = [];
        var Yarray = [];

        global.xcord.forEach(element => {
            // console.log(element)
            Xarray.push(element)
        });

        global.ycord.forEach(element => {
            Yarray.push(element)
        });

        console.log(JSON.stringify(Xarray));

        console.log(a,b)
    
            
            if (this.state.userToken == '') {
                console.log("Please login first");
                alert("Please login first");
            }
            else {
                console.log("esle is working")
                axios.put(`http://165.227.123.50:5000/api/realTime`, {
                    Device: this.state.device,
                    cord: a,
                    shift: b
                })
                    .then(res => {
                        if (res.status == 200) {
                            console.log("Shifted successfully");

                        }
                        else {
                            alert("Pattern Failed");
                        }

    
                        console.log(res);
                        console.log(res.data);
                    })
                    console.log("esle is working 2")
            }
    
    }
    

    handlePatternSubmit = event => {
        console.log(this.state.device);

        var Xarray = [];
        var Yarray = [];

        global.xcord.forEach(element => {
            // console.log(element)
            Xarray.push(element)
        });

        global.ycord.forEach(element => {
            Yarray.push(element)
        });

        console.log(JSON.stringify(Xarray));

        if (this.state.userToken == '') {
            console.log("Please login first");
            alert("Please login first");
        }
        else {
            axios.post(`http://165.227.123.50:5000/api/addPattern`, {
                Device: this.state.device,
                Pattern: this.state.pattern,
                x: Xarray,
                y: Yarray,
                len: Xarray.length,
            })
                .then(res => {
                    if (res.status == 200) {
                        console.log("Pattern Saved Successful");

                    }
                    else {
                        alert("Pattern Failed");
                    }


                    console.log(res);
                    console.log(res.data);
                })

            global.xcord = [];
            global.ycord = [];
        }
    }

    render() {

        return (
            <>
             <div className="container-fluid">
          <PageHeading title={"Draw"} />
        </div>
            <div className="App" style={{ height: '100%' }}>
                <h3><Badge bg="secondary">Draw Pattern</Badge></h3>

                <Card className="col-md-12" style={{ alignItems: 'center', marginTop: '5%' }}>
                    <div className="row" style={{ justifyContent: 'space-between' }}>


                    </div>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("x",1)}>Right Small</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("x",5)}>Right Medium</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("x",10)}>Right Large</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("x",-1)}>Left Small</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("x",-5)}>Left Medium</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("x",-10)}>Left Large</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("y",1)}>Up small </Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("y",5)}>Up medium</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("y",10)}>Up Large</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("y",-1)}>Down Small</Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("y",-5)}>Down Medium </Button>
                    <Button style={{ marginTop: '1%', marginBottom: '1%' }} onClick={()=>this.handleSubmit("y",-10)}>Down Large</Button>
                </Card>

                <Card className="col-md-12" style={{ marginTop: '2%', }}>
                    <Canvas />
                </Card>

                <Card className="col-md-12" style={{ marginTop: '2%' }}>
                    <Dropdown style={{ marginTop: '0.5%', marginBottom: '0.5%' }}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Speed
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Slow</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Fast</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card>

                <Card className="col-md-12" style={{ marginTop: '2%', }}>
                    <input onChange={this.handleChange} style={{ width: '30%', alignSelf: 'center', marginTop: '1%', marginBottom: '1%' }} placeholder="Name Pattern" />
                </Card>

                <div className="col-md-12" style={{ marginTop: '2%' }}>
                    <Button style={{ marginBottom: '10%' }} onClick={this.handlePatternSubmit.bind(this)}>Save Pattern</Button>
                </div>

            </div>
            </>
        )
    }
}


export default AppWrapper(Draw);
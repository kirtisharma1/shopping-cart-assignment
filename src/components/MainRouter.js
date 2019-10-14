import React from 'react';
import {Switch, Route, Link } from "react-router-dom";
import Login from './login/Login';
import Home from './home/Home';
import PLP from './plp/PLP';

export default class MainRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    render() {
        return (
                <Switch>
                    <Route path="/login" render={(props) => <Login {...props} page='login'/>} />
                    <Route path="/registration" render={(props) => <Login {...props} page='registration'/>} />
                    <Route path="/plp/:id?" render={(props) => <PLP {...props} categoryList={this.props.categoryList} cart={this.props.cart}/>} />
                    <Route path="/" exact render={(props) => <Home {...props} categoryList={this.props.categoryList}/>} /> />
                </Switch>
        )
    }

    componentDidMount() {
        this.setState({
            categoryList : this.props.categoryList
        })
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props);
    //     // if (this.state.categoryList.length === 0) {
            
    //     //     this.setState({
    //     //         categoryList : this.props.categoryList
    //     //     })
    //     // }
    // }
}
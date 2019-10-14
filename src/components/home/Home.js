import React from 'react';
import Category from './../common/category/Category';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        }
    }

    render() {
        const {categoryList} = this.state;
        return (
            <section className='section-main'>
                <div>
                    Carousal
                </div>
                {categoryList.map((category, i) => {
                    return (
                        <Category key={category.key} details={category} className={i%2 ? 'even' : 'odd'}/>
                    )
                })}
            </section>
        )
    }

    componentDidMount() {
        this.setState({
            categoryList: this.props.categoryList
        })
    }

    componentDidUpdate() {
        if(this.props.categoryList.length === 0){
            setTimeout(() => {
                this.setState({
                    categoryList: this.props.categoryList
                })
            }, 100);
        }
    }

    // onClick = () => {
    //     const data = {
    //         key: 'a',
    //         value: 'data'
    //     }
    //     fetch('/addtocart',
    //     {
    //         headers : { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify(data)
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log( JSON.stringify( data ) ) )
    // }
}
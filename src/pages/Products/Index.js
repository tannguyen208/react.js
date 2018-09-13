import React, { Component } from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';
import ProductList from './Components/ProductList';
import Loading from "../../Components/Loading";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShoppingCartItems: [],
            Products: [],
            open: false,
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ShoppingCartItems: JSON.parse(localStorage.getItem('shopping-cart') || '[]')});        
        // get json data from remote api        
        fetch('http://localhost:9000/api/products', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('token')
            })
        })
            .then(res => res.json())
            .then((result) => {            
                console.log(result);    
                if (result.success === true) {                                       
                    this.setState({ loading: false });                    
                    this.setState({ Products: result.data });                                         
                }                
            });
    }

    render() {
        if (this.state.loading === false) {
            return (
                <Segment style={{ padding: '2em 0em' }} vertical>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Header as='h3' style={{ fontSize: '2em' }}>Products</Header>
                                <ProductList products={this.state.Products}
                                />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Segment>
            );
        } else {
            return (
                <Loading />
            );
        }
    }
}

export default Products;
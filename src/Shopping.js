import React, { Component } from 'react'
import axios from './config/axios'
import Favourites from './Favourites'
import CheckOuts from './CheckOuts'
import Cakes from './Cakes'
import Games from './Games'
import Bags from './Bags'
import './Cakes.css'
import 'antd/dist/antd.css'
import { Layout, Menu, Row, Col, Button, notification } from 'antd';

const { Header, Content, Footer } = Layout;

class Shopping extends Component {
    state = {
        cakes: [],
        games: [],
        bags: [],
        checkOut: [],
        favourite: [],
        components: [true, true, true, false, false],
        total: 0,
        title: [],
        titleFav: [],
        inLoginRegister: false
    }

    componentDidMount = () => {
        let dataCal = 0
        axios.get('http://localhost:8000/cakes').then(res => this.setState({ cakes: res.data }))
        axios.get('http://localhost:8000/games').then(res => this.setState({ games: res.data }))
        axios.get('http://localhost:8000/bags').then(res => this.setState({ bags: res.data }))
        axios.get('http://localhost:8000/checkouts').then(res => {
            console.log(res)
            let newTitles = res.data.map(el => el.title)
            this.setState({ checkOut: res.data, title: newTitles })
            for (let i = 0; i < res.data.length; i++) dataCal += res.data[i].price * res.data[i].quantity
            this.setState({ total: dataCal })

        }).catch(err => notification.info({ message: 'You are currently logged out' }))
        axios.get('http://localhost:8000/favourites').then(res => {
            this.setState({ favourite: res.data })
        })
    }

    updateCheckout = (ind, id) => {
        let newItem = this.state.cakes[ind]
        let newPrice = this.state.cakes[ind].price

        if (this.state.title.indexOf(newItem.title) < 0) {
            newItem.quantity = 1
            this.setState({ title: [...this.state.title, newItem.title] })
            axios.post('http://localhost:8000/checkouts', newItem).then(() => {
                axios.get('http://localhost:8000/checkouts').then(res => this.setState({ checkOut: res.data, total: this.state.total + newPrice }))
            }).catch(err => notification.error({ message: 'Please login to add items' }))
        }
    }
    updateFav = (ind) => {
        let newItem = this.state.cakes[ind]
        if (this.state.titleFav.indexOf(newItem.title) < 0) {
            this.setState({ titleFav: [...this.state.titleFav, newItem.title] })
            axios.post('http://localhost:8000/favourites', newItem).then(() => {
                axios.get('http://localhost:8000/favourites').then(res => {
                    this.setState({ favourite: res.data })
                })
            }).catch(err => notification.error({ message: 'Please login to add items' }))
        }

    }
    updateCheckoutGames = (ind) => {
        let newItem = this.state.games[ind]
        let newPrice = this.state.games[ind].price

        if (this.state.title.indexOf(newItem.title) < 0) {
            newItem.quantity = 1
            this.setState({ title: [...this.state.title, newItem.title] })
            axios.post('http://localhost:8000/checkouts', newItem).then(() => {
                axios.get('http://localhost:8000/checkouts').then(res => this.setState({ checkOut: res.data, total: this.state.total + newPrice }))
            }).catch(err => notification.error({ message: 'Please login to add items' }))
        }
    }
    updateFavGames = (ind) => {
        let newItem = this.state.games[ind]

        if (this.state.titleFav.indexOf(newItem.title) < 0) {
            this.setState({ titleFav: [...this.state.titleFav, newItem.title] })
            axios.post('http://localhost:8000/favourites', newItem).then(() => {
                axios.get('http://localhost:8000/favourites').then(res => this.setState({ favourite: res.data }))
            }).catch(err => notification.error({ message: 'Please login to add items' }))
        }
    }
    updateCheckoutBags = (ind) => {
        let newItem = this.state.bags[ind]
        let newPrice = this.state.bags[ind].price

        if (this.state.title.indexOf(newItem.title) < 0) {
            newItem.quantity = 1
            this.setState({ title: [...this.state.title, newItem.title] })
            axios.post('http://localhost:8000/checkouts', newItem).then(() => {
                axios.get('http://localhost:8000/checkouts').then(res => this.setState({ checkOut: res.data, total: this.state.total + newPrice }))
            }).catch(err => notification.error({ message: 'Please login to add items' }))
        }

    }
    updateFavBags = (ind) => {
        let newItem = this.state.bags[ind]
        if (this.state.titleFav.indexOf(newItem.title) < 0) {
            this.setState({ titleFav: [...this.state.titleFav, newItem.title] })
            axios.post('http://localhost:8000/favourites', newItem).then(() => {
                axios.get('http://localhost:8000/favourites').then(res => this.setState({ favourite: res.data }))
            }).catch(err => notification.error({ message: 'Please login to add items' }))
        }
    }
    deleteItem = (id) => {
        let dataCal = 0
        axios.delete('http://localhost:8000/checkouts/' + id).then(() => {
            axios.get('http://localhost:8000/checkouts').then(res => {
                let newTitle = res.data.map(el => el.title)
                this.setState({ checkOut: res.data, title: newTitle })
                for (let i = 0; i < res.data.length; i++) dataCal += res.data[i].price * res.data[i].quantity
                this.setState({ total: dataCal })
            })
        })
        window.location.reload()
    }
    deleteFav = (id) => {
        axios.delete('http://localhost:8000/favourites/' + id).then(() => {
            axios.get('http://localhost:8000/favourites').then(res => {
                let newTitle = res.data.map(el => el.title)
                this.setState({ favourite: res.data, titleFav: newTitle })
            })
        })
        window.location.reload()
    }
    addQuantity = (id) => {
        let dataCal = 0
        let newData = [...this.state.checkOut].filter(el => el.id === id)
        newData[0].quantity += 1
        axios.put('http://localhost:8000/checkouts/' + id, newData[0]).then(() => {
            axios.get('http://localhost:8000/checkouts').then(res => {
                for (let i = 0; i < res.data.length; i++) dataCal += res.data[i].price * res.data[i].quantity
                this.setState({ total: dataCal })
            })
        })
    }
    deleteQuantity = (id) => {
        let dataCal = 0
        let newData = [...this.state.checkOut].filter(el => el.id === id)

        if (newData[0].quantity > 1) {
            newData[0].quantity -= 1
            axios.put('http://localhost:8000/checkouts/' + id, newData[0]).then(() => {
                axios.get('http://localhost:8000/checkouts').then(res => {
                    for (let i = 0; i < res.data.length; i++) dataCal += res.data[i].price * res.data[i].quantity
                    this.setState({ total: dataCal })
                })
            })
        }
    }

    render() {
        return (
            <div>
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={() => this.setState({ components: [true, true, true, false, false] })}>All</Menu.Item>
                        <Menu.Item key="2" onClick={() => this.setState({ components: [false, false, true, false, false] })}>Bags</Menu.Item>
                        <Menu.Item key="3" onClick={() => this.setState({ components: [true, false, false, false, false] })}>Cakes</Menu.Item>
                        <Menu.Item key="4" onClick={() => this.setState({ components: [false, true, false, false, false] })}>Games</Menu.Item>
                    </Menu>
                </Header>
                {(this.state.components[0] || this.state.components[1] || this.state.components[2]) && <Content>
                    <Row className="content" style={{ padding: '20px' }}>
                        <Col xl={17} md={14} sm={24}>
                            <h2 style={{ padding: '0 15px' }}>Shopping Items</h2>
                            {this.state.components[0] && <Cakes cakes={this.state.cakes} newCheckOut={this.updateCheckout} newFav={this.updateFav} />}
                            {this.state.components[1] && <Games games={this.state.games} newCheckOut={this.updateCheckoutGames} newFav={this.updateFavGames} />}
                            {this.state.components[2] && <Bags bags={this.state.bags} newCheckOut={this.updateCheckoutBags} newFav={this.updateFavBags} />}
                        </Col>
                        <Col xl={7} md={10} sm={24}>
                            {this.state.checkOut.length > 0 && <CheckOuts checkOut={this.state.checkOut} addQuantity={this.addQuantity} deleteQuantity={this.deleteQuantity} deleteItem={this.deleteItem} total={this.state.total} />}
                            {this.state.checkOut.length <= 0 && <div style={{ marginLeft: '15px', marginTop: '10px' }}>
                                <h2>CheckOut</h2>
                                <p>You have no checkout items. Checkout our new promotions!</p>
                            </div>}
                        </Col>
                    </Row>
                </Content>}
                <Footer style={{ textAlign: 'center', background: '#001529', color: 'white', padding: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Shopping Project ©2020 Created by Nicha N.</Footer>
            </div>
        )
    }
}

export default Shopping

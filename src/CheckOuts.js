import React from 'react'
import './CheckOut.css'
import { Button,notification } from 'antd'
import { DeleteFilled } from '@ant-design/icons';
import LocalStorageService from './services/localStorageService'
import axios from './config/axios';

function CheckOuts(props) {

    const logOut = values => {
        LocalStorageService.removeToken()
        notification.info({message:'You are now logged out'})
        window.location.replace('/')
    }

    return (
        <div style={{marginLeft:'15px',marginTop:'10px',position:'relative'}}>
            <h2>CheckOut</h2>
            {props.checkOut.map((el, index) => <div className="checkoutOuter" key={index + 1}>
                <div className="checkOutLeft">
                    <img src={el.image} />
                    <div>{el.title}</div>
                </div>
                <div className="checkOutRight" >
                    <div className="checkOutQuantity" style={{ display: 'flex' }}>
                        <button className="quanButton" style={{marginLeft:'10px'}} onClick={() => props.addQuantity(el.id)}>+</button>
                        <div style={{ width: "15px", paddingLeft: "5px" }} >{el.quantity}</div>
                        <button className="quanButton" onClick={() => props.deleteQuantity(el.id)}>-</button>
                    </div>
                    <div style={{marginLeft:'10px'}}>${el.price * el.quantity}</div>
                    <Button icon={<DeleteFilled style={{ fontSize: '20px' }} />} style={{ color: 'maroon', background: 'white', border: 'none' }} onClick={() => props.deleteItem(el.id)}></Button>
                </div>
            </div>)}
            <div className="totalPrice" >
                <div>Total</div>
                <div>${props.total}</div>
            </div>
            <Button style={{position:'absolute',bottom:'-45px',right:'5px', border:'none', color:'white',background:'maroon'}} onClick={logOut}>Logout</Button>
        </div>
    )
}

export default CheckOuts

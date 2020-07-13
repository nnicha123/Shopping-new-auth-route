import React from 'react'
import './CheckOut.css'
import { Button } from 'antd'
import { DeleteFilled } from '@ant-design/icons';

function Favourites(props) {
    return (
        <div style={{ marginLeft: '15px', marginTop: '10px' }}>
            <h2>Favourites</h2>
            {props.favourite.map((el, index) => <div className="checkoutOuter" key={index + 1}>
                <div className="checkOutLeft">
                    <img src={el.image} />
                    <div>{el.title}</div>
                </div>
                <div>
                    <Button icon={<DeleteFilled style={{ fontSize: '20px' }} />} style={{ color: 'maroon', background: 'white', border: 'none' }} onClick={() => props.deleteFav(el.id)}></Button>
                </div>
            </div>)}
        </div>
    )
}

export default Favourites

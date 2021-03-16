import React, { memo, useState } from 'react'
import {  Minus, Plus, X,ShoppingCart as Cart} from 'react-feather';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';
import {CheckOut,ShopingBag,OrderTotal,GoToShopingBag} from '../../../constant'

const ShoppingCartComponent= memo(()=> {
    const [cartDropdown, setCartDropDown] = useState(false)


    return (
        <li className="cart-nav onhover-dropdown">
            <div className="cart-box" onClick={() => setCartDropDown(!cartDropdown)}><Cart/><span className="badge badge-pill badge-primary">{"2"}</span></div>
            <ul className={`cart-dropdown onhover-show-div ${cartDropdown ? "active" : ""}`}>
              <li>
                <h6 className="mb-0 f-20">{ShopingBag}</h6><Cart/>
              </li>
              <li className="mt-0">
                <div className="media" ><img className="img-fluid rounded-circle mr-3 img-60" src={require("../../../assets//images/ecommerce/01.jpg")} alt=""/>
                  <div className="media-body"><span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                    <p>{"Yellow(#fcb102)"}</p>
                    <div className="qty-box">
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                              <button className="btn quantity-left-minus" type="button" data-type="minus" data-field=""><Minus/></button>
                          </InputGroupAddon>
                            <input className="form-control input-number" type="text" name="quantity" defaultValue="1"/>
                          <InputGroupAddon addonType="prepend">
                              <button className="btn quantity-right-plus" type="button" data-type="plus" data-field=""><Plus/></button>
                          </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <h6 className="text-right text-muted">{"$299.00"}</h6>
                  </div>
                  <div className="close-circle"><a href="#javascript"><X/></a></div>
                </div>
              </li>
              <li className="mt-0">
                <div className="media" ><img className="img-fluid rounded-circle mr-3 img-60" src={require("../../../assets//images/ecommerce/03.jpg")} alt=""/>
                  <div className="media-body"><span>{"V-Neck Shawl Collar Woman's Solid T-Shirt"}</span>
                    <p>{"Yellow(#fcb102)"}</p>
                    <div className="qty-box">
                      <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <button className="btn quantity-left-minus" type="button" data-type="minus" data-field=""><Minus/></button>
                          </InputGroupAddon>
                          <input className="form-control input-number" type="text" name="quantity" defaultValue="1"/>
                          <InputGroupAddon addonType="prepend">
                            <button className="btn quantity-right-plus" type="button" data-type="plus" data-field=""><Plus/></button>
                          </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <h6 className="text-right text-muted">{"$299.00"}</h6>
                  </div>
                  <div className="close-circle"><a href="#javascript"><X/></a></div>
                </div>
              </li>
              <li>
                <div className="total">
                  <h6 className="mb-2 mt-0 text-muted">{OrderTotal} : <span className="f-right f-20">{"$598.00"}</span></h6>
                </div>
              </li>
              <li>
                <Button color="primary" className="btn btn-block view-cart">{GoToShopingBag}</Button>
                <Button color="secondary" className="btn-block view-cart mt-2">{CheckOut}</Button>
              </li>
            </ul>
          </li>
    )
})

export default ShoppingCartComponent

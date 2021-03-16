import React, { useState } from 'react'
import { MessageSquare } from 'react-feather';
import { AinChavez, EricaHughes, KoriThomas, MessageBox, ViewAll } from '../../../constant';


function MessageAlarmComponent(props) {
    const [chatDropDown, setChatDropDown] = useState(false)
    return (
        <li className="onhover-dropdown" onClick={() => setChatDropDown(!chatDropDown)}><MessageSquare />
        <ul className={`chat-dropdown onhover-show-div ${chatDropDown ? "active" : ""}`}>
          <li>
            <MessageSquare />
            <h6 className="f-18 mb-0">{MessageBox}</h6>
          </li>
          <li>
            <div className="media"><img className="img-fluid rounded-circle mr-3" src={require("../../../assets/images/user/1.jpg")} alt="" />
              <div className="status-circle online"></div>
              <div className="media-body"><span>{EricaHughes}</span>
                <p>{"Lorem Ipsum is simply dummy..."}</p>
              </div>
              <p className="f-12 font-success">{"58 mins ago"}</p>
            </div>
          </li>
          <li>
            <div className="media"><img className="img-fluid rounded-circle mr-3" src={require("../../../assets/images/user/2.jpg")} alt="" />
              <div className="status-circle online"></div>
              <div className="media-body"><span>{KoriThomas}</span>
                <p>{"Lorem Ipsum is simply dummy..."}</p>
              </div>
              <p className="f-12 font-success">{"1 hr ago"}</p>
            </div>
          </li>
          <li>
            <div className="media"><img className="img-fluid rounded-circle mr-3" src={require("../../../assets/images/user/4.jpg")} alt="" />
              <div className="status-circle offline"></div>
              <div className="media-body"><span>{AinChavez}</span>
                <p>{"Lorem Ipsum is simply dummy..."}</p>
              </div>
              <p className="f-12 font-danger">{"32 mins ago"}</p>
            </div>
          </li>
          <li className="text-center"> <button className="btn btn-primary">{ViewAll}     </button></li>
        </ul>
      </li>
    )
}

export default MessageAlarmComponent

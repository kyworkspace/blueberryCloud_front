import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const LogoComponent = memo(()=> {
    return (
        <>
          <Link to={`${process.env.PUBLIC_URL}/cloud/dashboard`}>
            <img className="img-fluid for-light" src={require("../../../assets/images/logo/logo.png")} alt="" style={{width:'180px', height:'30px'}}/>
            <img className="img-fluid for-dark" src={require("../../../assets/images/logo/logo_dark.png")} alt="" style={{width:'180px', height:'30px'}}/>
          </Link>  
        </>
    )
})

export default LogoComponent

import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Layers, X} from 'react-feather'
import { Link } from 'react-router-dom'
import { errorPages, authPages, usefullPages, comingsoonPages } from '../pages'
import {BonusUi,MegaMenu,ErrorPage,Authentication,UsefullPages,ComingSoon} from '../../../constant'
import { windowClickEvent } from '../EventListener/eventListener';


const MegaMenuComponent= memo(() =>{

    const [bonusui, setBonusUI] = useState(false)
    const [megaboxtoggle1, setMegaboxtoggle1] = useState(true)
    const [megaboxtoggle2, setMegaboxtoggle2] = useState(true)
    const [megaboxtoggle3, setMegaboxtoggle3] = useState(true)
    const [megaboxtoggle4, setMegaboxtoggle4] = useState(true)

    const width = useWindowSize()

    const responsiveMegaMenuclose = () => {
        setBonusUI(false)
        document.querySelector(".mega-menu-container").classList.remove("d-block")
      }


    useEffect(() => {
     document.addEventListener('click', windowClickEvent);
        if (width <= 767) {
            setMegaboxtoggle1(true)
            setMegaboxtoggle2(true)
            setMegaboxtoggle3(true)
            setMegaboxtoggle4(true)
        } else {
            setMegaboxtoggle1(false)
            setMegaboxtoggle2(false)
            setMegaboxtoggle3(false)
            setMegaboxtoggle4(false)
        }
    }, [width])

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }


    const responsiveMegaBox1 = (megabox) => {
        if(width <= 1199){
          if (megabox) {
            setMegaboxtoggle1(!megabox);
          } else {
            setMegaboxtoggle1(!megabox);
          }
        }
      }
      const responsiveMegaBox2 = (megabox) => {
        if(width <= 1199){
          if (megabox) {
            setMegaboxtoggle2(!megabox);
          } else {
            setMegaboxtoggle2(!megabox);
          }
        }
      }
      const responsiveMegaBox3 = (megabox) => {
        if(width <= 1199){
          if (megabox) {
            setMegaboxtoggle3(!megabox);
          } else {
            setMegaboxtoggle3(!megabox);
          }
        }
      }
      const responsiveMegaBox4 = (megabox) => {
        if(width <= 1199){
          if (megabox) {
            setMegaboxtoggle4(!megabox);
          } else {
            setMegaboxtoggle4(!megabox);
          }
        }
      }

      const ToggleBonusUI = (value) => {
        if (value) {
          setBonusUI(!value)
          document.querySelector(".mega-menu-container").classList.remove("d-block")
        } else {
          setBonusUI(!value)
          if (width <= 991) {
            document.querySelector(".page-header").className = "page-header close_icon";
            document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
            document.querySelector(".mega-menu-container").classList.add("d-block")
          } else {
            document.querySelector(".mega-menu-container").classList.add("d-block")
          }
        }
      }
    
      


    return (
        <>
        <li className="mega-menu outside">
        <a className={`nav-link ${bonusui ? 'active' : ''}`} href="#javascript" onClick={() => ToggleBonusUI(bonusui)}><Layers /><span>{BonusUi}</span></a>
        <div className="mega-menu-container nav-submenu menu-to-be-close" style={bonusui ? { display: "" } : { display: "none" }}>
              
                <Container fluid={true}>
                  <Row>
                    <Col className="mega-box" onClick={() => responsiveMegaBox1(megaboxtoggle1)}>
                      <div className="mobile-title d-none">
                        <h5>{MegaMenu}</h5><X onClick={() => responsiveMegaMenuclose()} />
                      </div>
                      <div className="link-section icon">
                        <div className={`${megaboxtoggle1 ? "active" : ""}`}>
                          <h6>{ErrorPage}</h6>
                        </div>
                        <ul className={`${megaboxtoggle1 ? "d-none" : ""}`}>
                          {errorPages.map((pagesItem, i) =>
                            <li key={i}>
                              <Link to={pagesItem.path}>{pagesItem.title}</Link>
                            </li>)}
                        </ul>
                      </div>
                    </Col>
                    <Col className="mega-box" onClick={() => responsiveMegaBox2(megaboxtoggle2)}>
                      <div className="link-section doted">
                        <div className={`${megaboxtoggle2 ? "active" : ""}`}>
                          <h6>{Authentication}</h6>
                        </div>
                        <ul className={`${megaboxtoggle2 ? "d-none" : ""}`}>
                          {authPages.map((pagesItem, i) =>
                            <li key={i}><Link to={pagesItem.path}>{pagesItem.title}</Link></li>
                          )}

                        </ul>
                      </div>
                    </Col>
                    <Col className="mega-box" onClick={() => responsiveMegaBox3(megaboxtoggle3)}>
                      <div className="link-section dashed-links">
                        <div className={`${megaboxtoggle3 ? "active" : ""}`}>
                          <h6>{UsefullPages}</h6>
                        </div>
                        <ul className={`${megaboxtoggle3 ? "d-none" : ""}`}>
                          {usefullPages.map((pagesItem, i) =>
                            <li key={i}><Link to={pagesItem.path}>{pagesItem.title}</Link></li>
                          )}
                        </ul>
                      </div>
                    </Col>
                    <Col className="mega-box" onClick={() => responsiveMegaBox4(megaboxtoggle4)}>
                      <div className="link-section">
                        <div className={`${megaboxtoggle4 ? "active" : ""}`}>
                          <h6>{ComingSoon}</h6>
                        </div>
                        <ul className={`svg-icon ${megaboxtoggle4 ? "d-none" : ""}`}>
                          {comingsoonPages.map((pagesItem, i) =>
                            <li key={i}><Link to={pagesItem.path}><pagesItem.icon />{pagesItem.title}</Link></li>
                          )}
                        </ul>

                      </div>
                    </Col>
                  </Row>
                </Container>
            </div>
            </li>
            </>
    )
})

export default MegaMenuComponent

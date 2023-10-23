import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Home.css";
import Cart from './Cart Modal/Cart';
import Watches from './Pages/Watches';
import Earphones from './Pages/Earphones';
import Mobiles from './Pages/Mobiles';
import Laptops from './Pages/Laptops';
function Home() {

  const [pageShow, setPageShow] = useState('');


  const setModalChange = (modalid) => {
    setPageShow(modalid)
  }

  return (
    <div className='container-fluid p-0 overflow-hidden'>
      <div className="col-md-12 mainContent">
        <div className='row'>

          <div className='col-md-2 px-0'>
            <button class="sideMenuBtn w-100 h-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Side Menu</button>

            <div class="sideMenuColor offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Products</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body px-0">
                <ul className='productTypes list-unstyled'>
                  <li onClick={() => setModalChange('modal1')}>
                    All Watch Products
                  </li>
                  <li onClick={() => setModalChange('modal2')}>
                    All Earphone Products
                  </li>
                  <li onClick={() => setModalChange('modal3')}>
                    All Mobile Products
                  </li>
                  <li onClick={() => setModalChange('modal4')}>
                    All Laptops Products
                  </li>
                  <li onClick={() => setModalChange('modal5')}>
                    Back to Home Page
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className='col-md-10 px-0'>
            <div className="btnImageWrapper position-relative">

              {pageShow === "modal1" ? <Watches /> : pageShow === "modal2" ? <Earphones /> : pageShow === "modal3" ? <Mobiles /> : pageShow === "modal4" ? <Laptops /> : <img className='shopImg' src="../assets/1.jpg" alt="store" />}
              <div className='position-absolute logout'>
                <div className='d-flex' >
                  <Cart className = "cartIcon" />
                  <Link className='logoutBtn px-5 py-2 my-auto me-4'to={"/"}>Logout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Home

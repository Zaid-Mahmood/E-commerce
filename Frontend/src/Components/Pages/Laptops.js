import React from 'react';
import '../../Styles/Page.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { globalArray , globalState } from '../Store/GlobalState';
function Laptops() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useRecoilState(globalArray);
  const [modalShow, setModalShow] = useRecoilState(globalState);

  const handleShow = (data) => {
    //  setSelectedProduct([...selectedProduct, data])
    // Check if the product is already in the cart
    const existingProduct = selectedProduct.find((item) => item.id === data.id);

    if (existingProduct) {
      // If it exists, the quantity should be stored which is selected in the previous modal quantity
      const updatedCart = selectedProduct.map((item) =>
        item.id === data.id ? { ...item, quantity: item.quantity + 0 } : item
      );
      setSelectedProduct(updatedCart);
    } 
    else {
      // If it doesn't exist, add it to the cart with quantity 1
      setSelectedProduct([...selectedProduct, { ...data, quantity: 1 }]);
    }
    setModalShow({...modalShow  , show: true});
  }


  useEffect(() => {
    axios.get("http://localhost:3000/Laptops")
      .then((res) => {
        setData(res.data)
        setLoading(false);
      })

      .catch((err) => {
        console.log("error in data" + err)
        setLoading(false)
      })

  }, [])

  return (
    <>
      {loading ? <p>Page is loading</p> : (
        <div className='container-fluid watchContainer'>
          <div className='col-md-12 p-5'>
            <div className='row'>
              <h3 className='text-center'>Laptops</h3>
              {data.map((data) =>
                <>
                  <div className='col-md-4'>
                    <div className="card my-2">
                      <img src={data.imgUrl} className="watchImages card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{data.price}{data.currency}</h5>
                        <p className="card-text"><span className='fw-bold'>Colors :</span>   {data.firstColor +","} &nbsp;
                          {data.secondColor + ","} &nbsp;{data.thirdColor} </p>
                        <Button className="cartBtn" onClick={() => handleShow(data)}>
                          Add to cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* Modal */}

            </div>
          </div>
        </div >

      )
      }
    </>
  )
}

export default Laptops


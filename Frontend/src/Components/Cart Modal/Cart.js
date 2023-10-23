import { BsCart } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { globalState, globalArray, globalCounterValue } from '../Store/GlobalState';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../Styles/Cart.css';
function Cart() {
    const [selectedProduct, setSelectedProduct] = useRecoilState(globalArray);
    const [modalShow, setModalShow] = useRecoilState(globalState);
    const [, setCartCounter] = useRecoilState(globalCounterValue);

    const handleOpenModal = () => {
        selectedProduct.length === 0 ? setCartCounter(alert("Your Cart is empty\n Please pick items from the store")) :
            setModalShow({ ...modalShow, show: true })
        setSelectedProduct([...selectedProduct])
    }
    const btnUp = (id) => {

        setSelectedProduct(selectedProduct.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ))
    };

    const btnDown = (id) => {

        setSelectedProduct(selectedProduct.map((item) =>
            item.id === id ?
                { ...item, quantity: item.quantity - 1 }
                : item)
        )
    }
    const handleClose = () => {
        setModalShow({ ...modalShow, show: false });
    };


    const deleteCart = (id) => {
        let deletedCart = selectedProduct.filter((item) => item.id !== id)
        setSelectedProduct(deletedCart)

    }
    const removeAll = () => {
        let removeAllCart = selectedProduct.map((item) => item.id === "")
        let deleteArray = removeAllCart
        removeAllCart.splice(0, deleteArray.length)
        setSelectedProduct(deleteArray)


    }
    const totalBill = () => {
        let totalBill = selectedProduct.reduce((total, item) => (total + item.price * item.quantity), 0)
        return totalBill
    }
    return (
        <div className='pe-4'>
            <h3 className='cartColor'><BsCart onClick={handleOpenModal} /><span className='textValue fs-6 position-absolute cartBtns' onClick={handleOpenModal}>{selectedProduct.length}</span></h3>
            {/* Modal */}
            {selectedProduct.length === 0 ? <Modal show={modalShow.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart is empty
                    </Modal.Title>
                </Modal.Header>

            </Modal> :
                <Modal show={modalShow.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Cart
                            <Button className='ms-5 btn btn-danger' onClick={() => removeAll()}>Remove all Items from Cart</Button>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedProduct.map((item, id) =>
                        (
                            <>
                                <div key={id}>
                                    <div className='d-flex'>
                                        <div className='smallImages'>
                                            <img src={item.imgUrl} className="watchImages w-50 h-75" alt="..." />
                                            <p className='fw-bold'>${item.price}</p>
                                        </div>
                                        <div className='d-grid'>
                                            <div>
                                                <p className='fw-bold d-block'>Quantity</p>
                                                <span>
                                                    &nbsp;
                                                    <button className='btn btn-outline-success' onClick={() => btnUp(item.id)}>+</button> &nbsp;
                                                    <input className='w-50' type="number" value={item.quantity} readOnly />&nbsp;
                                                    {item.quantity === 1 ? <button className='btn btn-outline-danger' disabled>-</button> : <button className='btn btn-outline-danger' onClick={() => btnDown(item.id)} >-</button>}</span>
                                            </div>
                                            <div className='py-2 d-block'>
                                                <p className='fw-bold'>Colors:</p>
                                                &nbsp; &nbsp;
                                                <select>
                                                    <option className='selected'>{item.firstColor}</option>
                                                    <option className=''>{item.secondColor}</option>
                                                    <option className=''>{item.thirdColor}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <p className='fw-semibold'> Current Item Bill : <span className='fw-bold'> ${item.price * item.quantity}</span></p>
                                    <button className='btn btn-danger mb-5' onClick={() => deleteCart(item.id)}>Remove current item</button>
                                </div>
                            </>
                        ))}

                        <h2>Your Total Bill</h2>
                        <p className='fw-bold'>{totalBill(selectedProduct.price)}$</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='sideMenuBtn' onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>}
        </div>

    )
}

export default Cart

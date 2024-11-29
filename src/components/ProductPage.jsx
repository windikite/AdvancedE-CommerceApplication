import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Image, Row, Col } from 'react-bootstrap';
import { State } from "../StateProvider"
import { fetchProduct, deleteProduct } from "../hooks/queries";

function ProductPage() {
    const { user, cart, setCart } = State();
    const [product, setProduct] = useState({title: '', price: '', image: ''});
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMesage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const data = await fetchProduct(id);  // Fetch the product data asynchronously
                setProduct(data);  // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching product:", error);
                setErrorMessage("Error fetching product data.");
            }
        };
    
        if (id) {
            fetchedData();  // Call the asynchronous function to fetch data
        }
    }, [id]);

    const handleDelete = async (id) => {
        try {
            setSubmitting(true);
            await deleteProduct(id)
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    const handleclose = () => {
        setShowSuccessModal(false);
        setSubmitting(false);
        navigate('/catalog')
    }

    function addToCart(id){
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = [...cart, id]
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
    }
    return (
        <Row className="w-75 mx-auto">
            <Col>
                <Image src={product.image} alt="product picture" rounded style={{maxHeight: '20rem'}} />
            </Col>
            <Col className="d-flex flex-column text-align-center align-items-center">
                <h2>{product.title}</h2>
                <h3>from ${product.price}</h3>
                <h4>{product.description}</h4>
                {user.name === 'admin' && 
                    <div className='d-flex'>
                        <Button 
                            variant="warning" 
                            disabled={isSubmitting ? true : false}
                            onClick={() => navigate(`/edit-product/${id}`)} 
                            className="me-2">Edit
                        </Button>
                        <Button 
                            variant="danger" 
                            disabled={isSubmitting ? true : false}
                            onClick={() => handleDelete(id)} 
                            className="me-2">Delete
                        </Button>
                    </div>
                }
                {user.name !== 'admin' && user.name !== '' && 
                    <div className='d-flex'>
                        <Button variant="primary" onClick={() => addToCart(id)} className="me-2">Add to Cart</Button>
                    </div>
                }
                {user.name === '' && 
                    <div className='d-flex'>
                        <Button variant="primary" onClick={() => navigate(`/login`)} className="me-2">Add to Cart</Button>
                    </div>
                }
            </Col>
            <Modal show={showSuccessModal} onHide={handleclose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product has been successfully deleted!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleclose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
}

export default ProductPage;
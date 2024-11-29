import { Container, Button, Alert, Modal } from "react-bootstrap";
import { State } from "../StateProvider"
import { useEffect, useState } from "react";
import { deleteUser, fetchUser } from "../hooks/queries";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const {user, setUser} = State();
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const getUserData = async () => {
        const foundUser = await fetchUser(user.userId); 

        if (foundUser) {
            setUserInfo(foundUser)
            console.log(user.userId, foundUser)
        } else {
            setErrorMessage("User not found");
        }
    }

    const handleDeleteUser = async () => {
        try {
            setShowSuccessModal(true)
            setSubmitting(true)
            deleteUser(user.userId);
            localStorage.removeItem('userSession');
            setUser({
                userId: '',
                username: '', 
                isLoggedIn: false});
            setShowSuccessModal(true)
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    const handleclose = () => {
        setShowSuccessModal(false);
        navigate(`/login`);
    }

    useEffect(() => {
        getUserData()
    }, [])

    if(!userInfo) return <p>loading...</p>
    if (isSubmitting) return <p>Submitting request...</p>

    return (
        <Container>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <h1>User Profile</h1>
            <h2>Username: {userInfo.username}</h2>
            <h2>Email: {userInfo.email}</h2>
            <h2>Name: {userInfo.name.firstname} {userInfo.name.lastname}</h2>
            <h2>Address: {userInfo.address.number} {userInfo.address.street}, {userInfo.address.city}, {userInfo.address.zipcode}</h2>
            <Button 
                variant="warning"
                onClick={() => navigate('/edit-user')}
            >Edit</Button>
            <Button 
                variant="danger"
                onClick={() => handleDeleteUser()}
            >Delete</Button>
            <Modal show={showSuccessModal} onHide={handleclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Account has been deleted!!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleclose}>Close</Button>
                    </Modal.Footer>
                </Modal>
        </Container>
    );
}

export default UserProfile;
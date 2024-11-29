import UserForm from "./UserForm";
import { State } from "../StateProvider"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { updateUser } from "../hooks/queries";
import {Container, Row, Col, Alert} from 'react-bootstrap'

function EditUser() {
    const {user, setUser} = State();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async (userInfo) => {
        try {
            // Log in the user (assuming logIn is synchronous)
            updateUser(userInfo);
    
            navigate('/view-user');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <Container className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <h1>Edit User</h1>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <UserForm
                        submitFunction={handleUpdate}
                        prefillData={user}
                        buttonMessage='Update'
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default EditUser;
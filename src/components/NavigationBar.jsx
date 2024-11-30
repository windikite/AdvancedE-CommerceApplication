import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { State } from "../StateProvider"
import { Button, Badge} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavigationBar(){
    const { user, cart } = State();
    const navigate = useNavigate();

    return (
        <Navbar bg="light" expand="lg" className="p-2 mb-3">
            <Navbar.Brand href="/" className="text-info align-items-center">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/catalog" activeclassname="active">
                        Browse
                    </Nav.Link>

                    {user.isLoggedIn ? 
                        <Nav.Link as={NavLink} to="/logout" activeclassname="active">
                            Log Out
                        </Nav.Link> :
                        <Nav.Link as={NavLink} to="/login" activeclassname="active">
                            Log In
                        </Nav.Link>
                    }

                    {user.isLoggedIn && 
                        <Nav.Link as={NavLink} to="/view-user" activeclassname="active">
                            Account
                        </Nav.Link>
                    }

                    {!user.isLoggedIn &&
                        <Nav.Link as={NavLink} to="/sign-up" activeclassname="active">
                            Sign Up
                        </Nav.Link>
                    }

                    {user.name === 'johnd' && 
                        <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
                            Add Product
                        </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
            {user.isLoggedIn && 
                <Button 
                    variant='light'
                    onClick={() => navigate('/cart')}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <Badge bg="secondary">{cart.length}</Badge>
                </Button>
            }
        </Navbar>
    )
}

export default NavigationBar
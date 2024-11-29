import { Container } from "react-bootstrap";
import { State } from "../StateProvider"

function HomePage() {
    const {user, setUser} = State();

    return (
        <Container className="bg bg-light">
            {user.isLoggedIn && `Hello, ${user.username}!`}
        </Container>
    );
}

export default HomePage;
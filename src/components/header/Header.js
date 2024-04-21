import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsCart4 } from "react-icons/bs";
const Header=()=>{
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Товари</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/add">Додати товар</Nav.Link>
                        <Nav.Link href="#features">Корзина <BsCart4 size="1.5em"/></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
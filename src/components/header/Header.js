import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsCart4 } from "react-icons/bs";
import {useEffect, useState} from "react";
const Header=()=>{

    const [getCount, setCount] = useState(0);

    useEffect(() => {
        // Отримуємо довжину масиву з localStorage
        let array = parseInt(localStorage.getItem("arrayLength"), 10);
        setCount(array);
    }, []);

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Товари</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/add">Додати товар</Nav.Link>
                        <Nav.Link href="/basket">Корзина <BsCart4 size="1.5em"/>{getCount > 0 ? getCount : ''}</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
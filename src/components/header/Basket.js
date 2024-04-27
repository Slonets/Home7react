import {useEffect, useState} from "react";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const Basket=()=>{

    const [logs, setLogs] = useState([]);

    const [products, setProducts] = useState([]);

    const [same, setSame] = useState([]);

    // Завантаження даних з localStorage під час першого рендерингу
    useEffect(() =>
    {
        const basketData = localStorage.getItem('basket');
        if (basketData)
        {
            // Якщо дані знайдено, розпарсимо їх та встановимо стан кошика
            setLogs(JSON.parse(basketData));
        }

        return () => {
            localStorage.removeItem('basket');
            localStorage.removeItem('arrayLength');
        };

    }, []); // Пустий масив залежностей, щоб ефект запускався лише раз

    useEffect(() => {
        if (same.length === 0) {
            localStorage.removeItem('basket');
            localStorage.removeItem('arrayLength');
        }
    }, [same]);

    console.log("Basket", logs);

    useEffect(() => {
        axios.get("http://localhost:5087/api/unit/list").then(resp=>{

            setProducts(resp.data);
        })
    }, []);

    // Функція для знаходження співпадінь між кошиком і продуктами
    useEffect(() => {

        let array = [];

        for (let i = 0; i < logs.length; i++)
        {
            const basketItem = logs[i];

            for (let j = 0; j < products.length; j++)
            {
                const product = products[j];

                if (basketItem.id === product.id)
                {
                    array.push(product);
                    break; // Перериваємо цикл, оскільки ми знайшли збіг
                }
            }
        }
        setSame(array);
    }, [logs, products]);

    return(
        <>
                {same.length !== 0 ? (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Image</th>
                        </tr>
                        </thead>
                        <tbody>
                        {same.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>
                                    <Container>
                                        <Row>
                                            <Col xs={6} md={4}>
                                                <Image src={`http://localhost:5087/images/${product.image}`} roundedCircle />
                                            </Col>
                                        </Row>
                                    </Container>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <h2>Корзина порожня</h2>
                )}
            </>
    )
}
export default Basket;
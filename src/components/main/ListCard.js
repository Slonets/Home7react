import {useEffect, useState} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./card_style.css";

const CardList=()=>{

    const [getCard, setCard] = useState([]);
    const [getCount, setCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5087/api/unit/list").then(resp=>{

            setCard(resp.data);
            console.log("server respons = ", resp );
        })

    }, []);


    const handleOnAddBasketClick = (id) => {

        setCount(prevCount => {
            const newCount = prevCount + 1;
            localStorage.setItem("arrayLength", newCount.toString());
            return newCount;
        });

        let basket =  localStorage.basket;
        let list = basket ? JSON.parse(basket) : [];

        // Перевірка, чи існує вже об'єкт з таким id у кошику
        const existingItemIndex = list.findIndex(item => item.id === id);

        if (existingItemIndex !== -1)
        {
            // Якщо знайдено, збільшуємо значення count на 1
            list[existingItemIndex].count += 1;
        }
        else
        {
            // Якщо не знайдено, додаємо новий об'єкт до списку
            list.push({
                id: id,
                count: 1
            });
        }

        localStorage.basket = JSON.stringify(list); // Зберігаємо змінений список у localStorage

        console.log("Після додавання", JSON.parse(localStorage.basket));

    }

    return(
        <>
            <div className="custom-container">

                {getCard.map((product)=>(
                    <Card className="card" key={product.id}>
                        <div className="foto_container">
                        <Card.Img className="img" variant="top" src={`http://localhost:5087/images/${product.image}`} />
                        </div>
                        <div className="body_card">
                            <hr/>
                            <div className="text_card">
                            <p >{product.name}</p>
                            </div>
                            <div className="d-flex justify-content-center"> {/* Центрування кнопки */}
                                <Button variant="primary"
                                    onClick = {()=> handleOnAddBasketClick(product.id)}>Додати у корзину</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default CardList;
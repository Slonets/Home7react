import {useEffect, useState} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./card_style.css";

const CardList=()=>{

    const [getCard, setCard] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5087/api/unit/list").then(resp=>{

            setCard(resp.data);
            console.log("server respons = ", resp );
        })
    }, []);


    return(
        <>
            <div className="custom-container">

                {getCard.map((card)=>(
                    <Card className="card" key={card.id}>
                        <div className="foto_container">
                        <Card.Img className="img" variant="top" src={`http://localhost:5087/images/${card.image}`} />
                        </div>
                        <div className="body_card">
                            <p className="text_card">{card.name}</p>
                            <div className="d-flex justify-content-center"> {/* Центрування кнопки */}
                                <Button variant="primary">Додати у корзину</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default CardList;
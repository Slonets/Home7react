import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import "./add.css";

const AddFunc=()=>{

    //підключення навігації
    const navigate=useNavigate();

    const [getUnits, setUnits] = useState([]);

    // Початковий стан нової одиниці
    let newUnit = {
        name: "",
        image: ""
    };

    // register відслідковує змінит
    const { register, handleSubmit } = useForm();

    const onSubmit = (newUnit) => {
        axios.post("http://localhost:5087/api/unit/addnewunit", newUnit)
            .then(resp=>{
                setUnits([...getUnits, newUnit]); // Оновлення стану з додаванням нового товару

                navigate('/');
            })
            .catch(error => {
                console.error("Не вдалося додати:", error);
            });
    };

    return(
        <>
            <div className="newForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Назва нового товару</label>
                        <input type="text" name="name" {...register("name")} required/>
                    </div>

                    <div>
                        <label>Опис картини</label>
                        <input type="file" name="image" {...register("image")} required/>
                    </div>

                    <div>
                        <input className="bt" type="submit" value="Додати товар"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddFunc;
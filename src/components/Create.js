import React from "react";
import { useState } from "react";
import env from '../env.json';

function Create() {

    const [url, setUrl] = useState("");
    const [сlassLine, setсlassLine] = useState('hide'); // скрываем форму
    const [сlassForm, setсlassForm] = useState('');


    let sendData = (obj) => {
        setсlassForm('hide');
        setсlassLine('');

        fetch(env.urlBackend, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj)
        })
            .then( response => response.json())
            .then(response => {
                console.log(response);
                if (response.result) {
                    setUrl(env.url+'/'+response.url);
                }
            });
    };

    let loadDataFromForm = (event) => {
        event.preventDefault();

        let note = event.target.elements.note.value;
        note = note.trim();

        if (note === '') {
            alert('Поля не заполнены');
            return false;
        }
        sendData({"note" : note});
    };

    return (
        <div>

            <form onSubmit={loadDataFromForm} className={сlassForm}>
                <label htmlFor="">Добавьте заметку</label>
                <textarea name="note" id="note" defaultValue="Text"></textarea>
                <button type="submit">Вперед</button>
            </form>

            <div className={сlassLine}>
                <div>{url}</div>
                <div><button onClick={function(){window.location.reload()}}>Cоздать еще заметку</button></div>
            </div>
            
        </div>
    );
}

export default Create;
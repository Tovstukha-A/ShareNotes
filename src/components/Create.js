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
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.result) {
                    setUrl(env.url + '/' + response.url);
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
        sendData({ "note": note });
    };

    return (
        <div className="container col-12 text">

            <form onSubmit={loadDataFromForm} className={сlassForm} action="">
                <div className="form-group">
                    <label htmlFor="">Добавьте заметку</label>
                    <textarea className="form-control" name="note" id="note" defaultValue="Add text"></textarea>
                    <p><strong>Внимание!</strong> Длина заметки не должна превышать 1000 символов.</p>
                </div>
                <div className="form-group text-right">
                    <button type="submit" className="btn btn-warning">Вперед</button>
                </div>
            </form>

            <div className={сlassLine}>
                <div className="alert alert-primary" role="alert">{url}</div>
                <p>Скопируйте URL и передайте адресату. Внимание! Заметка доступна к просмотру только <b>один</b> раз!</p>
                <div className="text-right"><button className="btn btn-warning" onClick={function () { window.location.reload() }}>Cоздать еще одну заметку</button></div>
            </div>

        </div>
    );
}

export default Create;
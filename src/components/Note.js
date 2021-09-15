// http://localhost:3000/note/018bmpdmeuj3mmk6x0ex2j40
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import env from '../env.json';

function Note() {

    let { noteURL } = useParams();
    const [noteText, setNoteText] = useState('');
    const [noteClass, setNoteClass] = useState('hide');
    const [formClass, setFormClass] = useState('hide');
    const [errorClass, setErrorClass] = useState('hide');

    useEffect(() => {
        if (noteURL !== undefined) {
            setFormClass('hide');
            fetch(env.urlBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ "url": noteURL })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    if (response.result) {
                        setNoteText(response.note);
                        setNoteClass('');
                        setFormClass('hide');
                    }
                    else if (!response.result) {
                        setNoteClass('hide');
                        setFormClass('hide');
                        setErrorClass('');
                    }
                });
        }
        else {
            setNoteClass('hide');
            setFormClass('');
        }
    }, [noteURL]);

    function receiveNote(event) {
        event.preventDefault();

        let url = event.target.elements.url.value;
        url = url.trim();

        if (url === '') {
            alert('Поля не заполнены');
            return false;
        }

        noteURL = url;
        window.location.href = env.url + '/' + url;
    }

    function searchNote() {
        window.location.href = env.url;
    }

    return (
        <div className="container">
            <div className="col-12">

                <div className="text">
                    <form action="" onSubmit={receiveNote} className={formClass}>
                        <div className="form-group">
                            <label htmlFor="url">Введите hash заметки</label>
                            <input type="text" name="url" id="url" className="form-control" />
                        </div>
                        <div className="form-group text-right">
                            <button type="submit" className="btn btn-warning">Найти заметку</button>
                        </div>
                    </form>
                </div>

                <div className={noteClass}>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Note: {noteURL}</h4>
                        <div>{noteText}</div>
                        <hr />
                        <p className="mb-0">Внимание!!! Скопируйте заметку. После показа заметка будет удалена!</p>
                    </div>
                    <div className="text-right"><button onClick={searchNote} className="btn btn-warning">Искать другую заметку</button></div>
                </div>

                <div className={errorClass}>
                    <div className="alert alert-danger" role="alert">
                        <p>Ошибка, hash с такой заметкой не найден!</p>
                    </div>
                    <div className="text-right"><button onClick={searchNote} className="btn btn-warning">Искать другую заметку</button></div>
                </div>

            </div>
        </div>
    );
}

export default Note;
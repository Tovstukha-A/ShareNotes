function Main() {
    return (
        <div className="container">
            <div className="col-12">

                <div className="text">
                    <ul className="row button-list">
                        <li className="col-6"><a href="/create" type=" button" className="btn btn-warning">Создать заметку</a></li>
                        <li className="col-6"><a href="/note" type=" button" className="btn btn-warning">Посмотреть заметку</a></li>
                    </ul>
                </div>

                <div className="text">
                    <p><b>ShareNotes</b> – сервис для обмена заметками. Создайте заметку, затем отправьте ссылку на заметку и ваш друг сможет ее просмотреть.
                        После просмотра заметка будет удалена (или по истечении 15 минут с момента создания).</p>
                    <p>Как сделать заметку? </p>
                    <ul>
                        <li>Пройдите по ссылке.</li>
                        <li>Вставьте или напишите текст и нажмите "Вперед".</li>
                        <li>Отправьте сгенерированный адрес другу!</li>
                    </ul>
                    <p>Как прочитать заметку? Перейдите по присланному URL, либо введите адрес руками здесь.</p>
                </div>
                
            </div>
        </div>
    );
}

export default Main;
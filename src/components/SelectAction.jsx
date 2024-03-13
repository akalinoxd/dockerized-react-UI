import { useEffect, useState } from 'react'

export default function SelectAction() {

    const [currentAction, setNewAction] = useState(<div className='data'>Selecione a ação</div>)
    const [currentUsers, setNewUsers] = useState([])

    let nome, idade, id, searchID

    function post(nome, idade) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const data = JSON.stringify({
            "nome": nome,
            "idade": idade
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: data,
            redirect: "follow"
        };
    
        fetch("http://localhost:3001/add", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    
    function put(id, nome, idade) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
    
        const raw = JSON.stringify({
            "nome": nome,
            "idade": idade
        });
    
        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch(`http://localhost:3001/update/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
    
    function deleteData(id) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };
    
        fetch(`http://localhost:3001/delete/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }


    function handleSelect(action) {
        switch (action) {
            case 'get':
                setNewAction(
                    <div className='data'>
                        <input type="number" placeholder='ID' onChange={(e) => {
                            searchID = e.target.value
                        }} />

                        <button onClick={() => {
                            if (searchID == undefined || searchID == '') {
                                fetch('http://localhost:3001')
                                    .then(response => response.json())
                                    .then(result => setNewUsers(result))
                                    .catch(err => console.log(err))
                            } else if (searchID) {
                                fetch(`http://localhost:3001/id/${searchID}`)
                                    .then(response => response.json())
                                    .then(result => setNewUsers(result))
                                    .catch(err => console.log(err))
                            } 
                        }}>Buscar</button>
                    </div>
                )
                break
            case 'post':
                setNewAction(
                    <div className='data'>
                        <input type="text" placeholder='Nome' onChange={(e) => {
                            nome = e.target.value
                        }} />
                        <input type="number" placeholder='Idade' onChange={(e) => {
                            idade = e.target.value
                        }} />

                        <button onClick={
                            () => {
                                post(nome, idade)
                            }
                        }>Inserir na tabela</button>
                    </div>
                )
                break
            case 'put':
                setNewAction(
                    <div className='data'>
                        <input type="number" placeholder='ID' onChange={(e) => {
                            id = e.target.value
                        }} />
                        <input type="text" placeholder='Nome' onChange={(e) => {
                            nome = e.target.value
                        }} />
                        <input type="number" placeholder='Idade' onChange={(e) => {
                            idade = e.target.value
                        }} />

                        <button onClick={() => {
                            put(id, nome, idade)
                        }}>Alterar elemento</button>
                    </div>
                )
                break
            case 'delete':
                setNewAction(
                    <div className='data'>
                        <input type="number" placeholder='ID' onChange={(e) => {
                            id = e.target.value
                        }} />

                        <button onClick={() => {
                            deleteData(id)
                        }}>Excluir elemento</button>
                    </div>
                )
                break
        }
    }

    return (
        <>
            <nav>
                <button id="get" onClick={() => handleSelect('get')}>GET</button>
                <button id="post" onClick={() => handleSelect('post')}>POST</button>
                <button id="put" onClick={() => handleSelect('put')}>PUT</button>
                <button id="delete" onClick={() => handleSelect('delete')}>DELETE</button>
            </nav>

            <section className='insertDataContainer'>
                {currentAction}
            </section>

            <main>
                <section>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Idade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((currentVal) => {
                                return (
                                    <tr key={currentVal.id}>
                                        <td>{currentVal.id}</td>
                                        <td>{currentVal.nome}</td>
                                        <td>{currentVal.idade}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    )
}
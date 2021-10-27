import React, { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';



const CrudApi = () => {
    const 
    [db, setDb] = useState(null),
    [dataToEdit, setDataToEdit] = useState(null),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(false)

    let api = helpHttp()
    let url = "http://localhost:5000/santos"

    useEffect(() => {
        setLoading(true)
        api.get(url).then(res => {
            //console.log(res)
            if(!res.err){
                setDb(res)
                setError(null)
            }else{
                setDb(null)
                setError(res)
            }
        })
        setLoading(false)
     }, [url])
 

    const createData = (data) =>{
        data.id = Date.now()
        let 
        options = {body: data, headers:{"content-type": "application/json"}}
        api.post(url,options).then((res) => {
            console.log(res)
            if(!res.err){
                setDb([...db, res])
            }else{
                setError(res)
            }
        })
        
        //console.log(data)
        
    }

    const updateData = (data) =>{
        let newData = db.map(el => el.id ===data.id ? data : el)
        setDb(newData)
    }

    const deleteData = (id) =>{
        let isDelete = window.confirm(
            `¿Estás seguro de eliminar el registro con el id ${id}?`
            )


        if(isDelete){
            let newData = db.filter(el => el.id !== id)
            setDb(newData)
        }else{
            return
        }
    }

    return (
        <div>
            <h2>CRUD API</h2>
            <article className="grid-1-2">
                <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit}/>
                {loading && <Loader /> }
                {error && <Message msg={`Erro ${error.status}: ${error.statusText}`} bgColor="#dc3545" /> }
                {db && <CrudTable data={db} setDataToEdit={setDataToEdit} deleteData={deleteData} />}
               
            </article>
            
        </div>
    )
}

export default CrudApi

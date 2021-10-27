import React from 'react'
import CrudTableRow from './CrudTableRow'

const CrudTable = ({data,setDataToEdit,deleteData}) => {
    return (
        <div>
            <h3>Tabla de datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Constelación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {   data.length > 0 ? 
                        data.map((el) => <CrudTableRow el={el} key={el.id} setDataToEdit={setDataToEdit} deleteData={deleteData}/>)
                     : 
                        <tr><td colSpan="3">Sin datos</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable

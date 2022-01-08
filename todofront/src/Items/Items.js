import { React, useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { ItemsContext } from '../Context/ItemsContext'
export const Items = ({folderId}) => {
    const [loader, setLoader] = useState(false)

    const[values, setValues] = useState({
        task: ""
    })

    const {items, setItems, setEdit, edit} = useContext(ItemsContext)
    

    const handleInputChange = (e) => {
        setValues({
            values,
            [e.target.name]: e.target.value,
            folder_id: folderId
        })
    }

    const handleChecked = () => {

    }

    const handleDelete = (e) => {
        let id = e.target.id
        axios.delete('http://localhost:8080/api/items/' + id)
        .then(res => console.log(res))
        const fetch = async (folderId) => {
            const res = await axios.get('http://localhost:8080/api/items/' + folderId)
            return await res.data
        }
        fetch(folderId).then(data => setItems(data))
        
    }

    const handleSubmit = (e) => {
            e.preventDefault()
            axios.post('http://localhost:8080/api/items' , {task:values.task, folder_id:values.folder_id})
            .then((res)=> console.log(res))
            .catch(error => console.log(error))
            const fetch = async () => {
                const res = await axios.get('http://localhost:8080/api/items/' + folderId)
                return await res.data
            }
            fetch().then((data) => setItems(data))
            e.target.parentElement.firstChild.firstChild.value = ""
            
            
            
    }

    useEffect(()=> {
        
        return(() => {
            
        })
    }, [items, loader, folderId])

    
    return (
        <>
            <div className="itemsCont">
            {folderId ?
            <>
                {items.map((item) =>{
                    return(
                        <div key={item.items_id} id={item.items_id}>
                            <label>
                            <input type="checkbox"/>
                            {item.task}
                            </label>
                            <button>edit</button>
                            <button id={item.items_id} onClick={handleDelete}>delete</button>
                        </div>
                    )
                })}
                
                <div> 
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} id="add" name="task" placeholder="Add new task"/>
                        <button type="submit">Add</button>
                    </form>
                </div> 
                </>
                :
                <div className="itemsCont"> seleccione una carpeta </div>
                }
            </div>
            
        </>
    )
}
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Items } from '../Items/Items'
import { ItemsContext } from '../Context/ItemsContext'


export const Folders = () => {

    const [folders, setFolders] = useState([])
    const [folderId, setFolderId] = useState(null)
    const [loader, setLoader] = useState(false)
    const[values, setValues] = useState({
        name: ""
    })

    const {items, setItems, edit} = useContext(ItemsContext)

    const fetchFoldersData = async () => {
        const res = await axios.get('http://localhost:8080/api/folders')
        return await res.data
    }

    const fetchItemsHandler = (e) => {
        let id = e.target.id
        setFolderId(id)
        const fetch = async (id) => {
            const res = await axios.get('http://localhost:8080/api/items/' + id)
            return await res.data
        }
        fetch(id).then(data => setItems(data))
    }

    const handleInputChange = (e) => {
        setValues({
            values,
            [e.target.name]: e.target.value
        })
    }

    const handleDelete = (e) => {
        let id = e.target.id
        axios.delete('http://localhost:8080/api/folders/' + id)
        .then(res => console.log(res))
        fetchFoldersData().then(data => setFolders(data))
        setLoader(!loader)
        setFolderId(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/folders' , {name:values.name})
        .then((res)=> console.log(res))
        .catch(error => console.log(error))
        const fetch = async () => {
            const res = await axios.get('http://localhost:8080/api/folders')
            return await res.data
        }
        fetch().then((data) => setFolders(data))
        e.target.parentElement.firstChild.firstChild.value = ""
        setLoader(!loader)
    }

    useEffect(() => {
        fetchFoldersData().then(data => setFolders(data))
    },[items, loader, edit, folderId])
     
    return (
        <>
        { folderId ?
            <div className="foldersCont">
                <div>
                    {folders.map((folder)=>{
                        return (
                            <div key={folder.folder_id} >
                                <button id={folder.folder_id} onClick={fetchItemsHandler}>{folder.name}</button>
                                <button id={folder.folder_id} onClick={handleDelete}>Delete</button>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} id="add" name="name" placeholder="Add new folder"/>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div> :
            <Items folderId={folderId}/>
                }
        </>
    )
}
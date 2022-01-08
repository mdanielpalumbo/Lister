import {createContext, useState} from 'react'

export const ItemsContext = createContext()

export const ItemsProvider = ({children}) => {

    const [items, setItems] = useState([])

    const [edit, setEdit] = useState(false)

    const [item, setItem] = useState({})
    
    return(
        <ItemsContext.Provider value={{items, setItems, edit, setEdit, item, setItem}}>
            {children}
        </ItemsContext.Provider>
    )
}

import React, { useState, useEffect, useContext } from 'react'
import { Folders } from '../Folders/Folders'
import axios from 'axios'
import { ItemsContext } from '../Context/ItemsContext'

export const Container = () => {
    const {items} = useContext(ItemsContext)

    useEffect(()=> {
        
    },items)
    return (
        <div className="body">
            <Folders/>
        </div>
    )
}
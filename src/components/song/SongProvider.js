import React, { createContext, useState } from "react"

export const SongContext = createContext()

export const SongProvider = (props) => {
    const [songs, setSongs] = useState([])

    const getSongs = (search) => {
        return fetch(`http://localhost:8000/songs?search=${search}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("bars_token")}`
            }
        })
        .then(res=>res.json())
        .then(setSongs)
    }

    return(
        <SongContext.Provider value={{
            songs, getSongs
        }}>
            {props.children}
        </SongContext.Provider>
    )
}
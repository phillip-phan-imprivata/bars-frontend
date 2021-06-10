import React, { createContext, useState } from "react"

export const PlaylistContext = createContext()

export const PlaylistProvider = (props) => {
    const [playlists, setPlaylists] = useState([])

    const getPlaylists = () => {
        return fetch("http://localhost:8000/playlists", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("bars_token")}`
            }
        })
        .then(res=>res.json())
        .then(setPlaylists)
    }

    const createPlaylist = (playlist) => {
        return fetch("http://localhost:8000/playlists", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("bars_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playlist)
        })
        .then(getPlaylists)
    }

    return (
        <PlaylistContext.Provider value={{
            playlists, getPlaylists, createPlaylist
        }}>
            {props.children}
        </PlaylistContext.Provider>
    )
}
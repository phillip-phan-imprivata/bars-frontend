import React, { createContext, useState } from "react"

export const PlaylistContext = createContext()

export const PlaylistProvider = (props) => {
    const [playlists, setPlaylists] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState([])

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

    const deletePlaylist = (playlistId) => {
        return fetch(`http://localhost:8000/playlists/${playlistId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("bars_token")}`,
            }
        })
        .then(getPlaylists)
    }

    const getSongsByPlaylist = (playlistId) => {
        return fetch(`http://localhost:8000/playlists/${playlistId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("bars_token")}`
            }
        })
        .then(res=>res.json())
        .then(setPlaylistSongs)
    }

    const addSongToPlaylist = (obj) => {
        return fetch(`http://localhost:8000/playlists/playlistsong`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("bars_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    }

    const removeSongFromPlaylist = (obj) => {
        return fetch(`http://localhost:8000/playlists/playlistsong`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("bars_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(() => getSongsByPlaylist(obj.playlistId))
    }

    const editPlaylistName = (playlist) => {
        return fetch(`http://localhost:8000/playlists/${playlist.playlistId}`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("bars_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playlist)
        })
        .then(() => getSongsByPlaylist(playlist.playlistId))
    }

    return (
        <PlaylistContext.Provider value={{
            playlists, getPlaylists, createPlaylist, 
            getSongsByPlaylist, playlistSongs, addSongToPlaylist, 
            removeSongFromPlaylist, editPlaylistName, deletePlaylist
        }}>
            {props.children}
        </PlaylistContext.Provider>
    )
}
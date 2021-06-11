import React, { useContext, useEffect, useState } from "react"
import { PlaylistContext } from "./PlaylistProvider"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom"

export const PlaylistList = () => {
    const {playlists, getPlaylists, createPlaylist} = useContext(PlaylistContext)
    const [show, setShow] = useState(false)
    const [newPlaylist, setNewPlaylist] = useState("")

    useEffect(() => {
        getPlaylists()
    }, [])

    const handleShow = () => {
        setShow(true)
    }

    const handleHide = () => {
        setNewPlaylist("")
        setShow(false)
    }

    const handlePlaylistChange = (event) => {
        const playlistName = event.target.value
        setNewPlaylist(playlistName)
    }

    const handlePlaylistSave = (event) => {
        event.preventDefault()
        createPlaylist({
            "name": newPlaylist
        })
        handleHide()
    }

    return (
        <section className="playlists">
            <Button onClick={handleShow} variant="primary">Create</Button>
            <Modal show={show} onHide={handleHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create Playlist
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon2"
                        value={newPlaylist}
                        onKeyDown={event => event.key === "Enter" ? handlePlaylistSave(event) : <></>}
                        onChange={handlePlaylistChange}
                        autoComplete="off"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePlaylistSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                playlists.map(playlist => {
                    return (
                        <div className="playlist" key={playlist.id}>
                            <Link className="playlist__link" to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                        </div>
                    )
                })
            }
        </section>
    )
}
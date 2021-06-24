import React, { useContext, useEffect, useState } from "react"
import { PlaylistContext } from "./PlaylistProvider"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useHistory } from "react-router-dom"
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ListGroup from 'react-bootstrap/ListGroup'
import "./PlaylistList.css"
import kebabMenu from "../images/kebab-menu.png"
import defaultPlaylist from "../images/defaultPlaylist.png"

export const PlaylistList = () => {
    const {playlists, getPlaylists, createPlaylist, deletePlaylist, getSongsByPlaylist, currentPlaylist} = useContext(PlaylistContext)
    const [show, setShow] = useState(false)
    const [newPlaylist, setNewPlaylist] = useState("")
    
    const history = useHistory()

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

    const handleDeletePlaylist = (event) => {
        const [prefix, id] = event.target.id.split("--")
        deletePlaylist(id)
    }

    const renderPreview = (playlist) => {
        if (playlist.songs.length >= 4){
            return (
                <div className="playlistPreviewRow">
                    <div className="playlistPreviewColumn">
                        <img className="playlistPreviewImg1" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                        <img className="playlistPreviewImg2" src={playlist.songs[1].song.thumbnail} alt={`song ${playlist.songs[1].song.id} thumbnail`} />
                    </div>
                    <div className="playlistPreviewColumn">
                        <img className="playlistPreviewImg3" src={playlist.songs[2].song.thumbnail} alt={`song ${playlist.songs[2].song.id} thumbnail`} />
                        <img className="playlistPreviewImg4" src={playlist.songs[3].song.thumbnail} alt={`song ${playlist.songs[3].song.id} thumbnail`} />
                    </div>
                </div>
            )
        } else if (playlist.songs.length >= 1 && playlist.songs.length < 2){
            return (
                <div className="playlistPreviewRow">
                    <div className="playlistPreviewColumn">
                        <img className="playlistPreviewImg1" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                        <img className="playlistPreviewImg2" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                    </div>
                    <div className="playlistPreviewColumn">
                        <img className="playlistPreviewImg3" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                        <img className="playlistPreviewImg4" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                    </div>
                </div>
            )
        } else if (playlist.songs.length >= 2 && playlist.songs.length < 4){
            return (
                <div className="playlistPreviewRow">
                    <div className="playlistPreviewColumn">
                        <img className="playlistPreviewImg1" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                        <img className="playlistPreviewImg2" src={playlist.songs[1].song.thumbnail} alt={`song ${playlist.songs[1].song.id} thumbnail`} />
                    </div>
                    <div className="playlistPreviewColumn">
                        <img className="playlistPreviewImg3" src={playlist.songs[1].song.thumbnail} alt={`song ${playlist.songs[1].song.id} thumbnail`} />
                        <img className="playlistPreviewImg4" src={playlist.songs[0].song.thumbnail} alt={`song ${playlist.songs[0].song.id} thumbnail`} />
                    </div>
                </div>
            )
        } else if (playlist.songs.length === 0){
            return (
                <div className="playlistPreviewNoImg">
                    <img src={defaultPlaylist} alt={'default playlist img'} className="playlistDefault" />
                </div>
            )
        }
    }

    const popover = (playlistId) => {
        return (
        <Popover id="popover-basic">
          <Popover.Content>
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action className="playlist__delete" id={`id--${playlistId}`} onClick={handleDeletePlaylist}>Delete Playlist</ListGroup.Item>
            </ListGroup>
          </Popover.Content>
        </Popover>
        )
    }

    return (
        <section className="playlistList">
            <div className="playlistsList__title">Your Playlists</div>
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
                    <Button variant="secondary" onClick={handlePlaylistSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <section className="playlists">
                <Button onClick={handleShow} className="newPlaylistButton" variant="outline-light">+</Button>
                {
                    playlists.map(playlist => {
                        return (
                            <div className="playlist" key={playlist.id}>
                                <div className="playlistPreview">
                                    {renderPreview(playlist)}
                                </div>
                                <div className="playlistInfoContainer">
                                    <div className="playlistName">
                                        <Link className="playlist__link" to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                                    </div>
                                    <OverlayTrigger trigger="click" placement="right" overlay={popover(playlist.id)} rootClose={true} transition={false} animation={null}>
                                        <Button variant="outline-light" className="optionsButton"><img src={kebabMenu} alt="Options Menu Button" className="optionsImg" /></Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </section>
    )
}
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { PlaylistContext } from "./PlaylistProvider"
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import kebabMenu from "../images/kebab-menu.png"
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import "./PlaylistDetail.css"
import { SongContext } from "../song/SongProvider"

export const PlaylistDetail = () => {
    const {currentPlaylist, getSongsByPlaylist, editPlaylistName, removeSongFromPlaylist, deletePlaylist} = useContext(PlaylistContext)
    const {setVideoLink} = useContext(SongContext)
    const [hidden, setHidden] = useState(false)
    const [newPlaylistName, setNewPlaylistName] = useState("")
    
    const {playlistId} = useParams()

    const history = useHistory()
    
    useEffect(() => {
        getSongsByPlaylist(playlistId)
    }, [])
    
    const playVideo = (event) => {
        const [id, videoId] = event.target.id.split("--")
        setVideoLink(videoId)
    }

    const handleEditPlaylist = (event) => {
        setHidden(!hidden)
        if (newPlaylistName !== ""){
            editPlaylistName({
                "playlistId": currentPlaylist.id,
                "name": newPlaylistName
            })
            setNewPlaylistName("")
        }
    }

    const handleEditKeyPress = (event) => {
        if (event.key === "Enter"){
            setHidden(!hidden)
            if (newPlaylistName !== ""){
                editPlaylistName({
                    "playlistId": currentPlaylist.id,
                    "name": newPlaylistName
                })
            }
            setNewPlaylistName("")
        } else if (event.key === "Escape"){
            setHidden(!hidden)
            setNewPlaylistName("")
        }
    }

    const handleInputChange = (event) => {
        let newName = newPlaylistName
        newName = event.target.value
        setNewPlaylistName(newName)
    }

    const handleRemoveSong = (event) => {
        const [prefix, id] = event.target.id.split("--")
        removeSongFromPlaylist({
            "playlistId": currentPlaylist.id,
            "songId": parseInt(id)
        })
    }

    const handleDeletePlaylist = (event) => {
        return deletePlaylist(currentPlaylist.id)
        .then(history.push("/playlists"))
    }

    const songsPopover = (songId) => {
        return (
        <Popover id="popover-basic">
          <Popover.Content>
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action className="song__remove" id={`id--${songId}`} onClick={handleRemoveSong}>Remove Song</ListGroup.Item>
            </ListGroup>
          </Popover.Content>
        </Popover>
        )
    }

    const playlistPopover = (
        <Popover id="popover-basic">
          <Popover.Content>
            <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action className="playlist__rename" onClick={handleEditPlaylist}>Rename Playlist</ListGroup.Item>
                <ListGroup.Item action className="playlist__delete" onClick={handleDeletePlaylist}>Delete Playlist</ListGroup.Item>
            </ListGroup>
          </Popover.Content>
        </Popover>
    )

    return (
        <section className="playlistSongs">
            <div className="playlistNameContainer">
                <div className="playlistTitle" hidden={hidden}>{currentPlaylist.name}</div>
                <OverlayTrigger trigger="click" placement="right" overlay={playlistPopover} rootClose={true}>
                    <Button variant="outline-light" hidden={hidden} className="optionsButton"><img src={kebabMenu} alt="Options Menu Button" className="optionsImg" /></Button>
                </OverlayTrigger>
            </div>

            <div className="playlistSongCount">
                {currentPlaylist.songs?.length} Songs
            </div>

            <div className="playlistNameInput">
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder={currentPlaylist.name}
                    className="playlistNameInput"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    id="playlistNameInput"
                    value={newPlaylistName}
                    onKeyDown={handleEditKeyPress}
                    onChange={handleInputChange}
                    autoComplete="off"
                    hidden={!hidden}
                    />
                    <InputGroup.Append>
                    <Button 
                        variant="outline-light" 
                        className="cancelButton" 
                        hidden={!hidden} 
                        onClick={() => {
                            setHidden(!hidden)
                            setNewPlaylistName("")
                            }
                        }>Cancel</Button>
                    </InputGroup.Append>
                    <InputGroup.Append>
                    <Button variant="outline-light" className="saveButton" hidden={!hidden} onClick={handleEditPlaylist}>Save</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            
            {
                currentPlaylist.songs?.map(ps => {
                    return (
                        <div className="song" key={ps.id}>
                            <div className="song__container">
                                <img className="song__thumbnail" src={ps.song.thumbnail} alt="thumbnail" id={`id--${ps.song.song_link}`} onClick={playVideo} />
                                <div className="song__info">
                                    <div className="song__title">{ps.song.title.replace(/&#39;/g, "'").replace(/&quot;/g, `"`).replace(/&amp;/g, "&")}</div>
                                    <div className="song__channelTitle">{ps.song.channel}</div>
                                </div>
                            </div>
                            <div className="optionsContainer">
                                <OverlayTrigger trigger="click" placement="right" overlay={songsPopover(ps.song.id)} rootClose={true} transition={false} animation={null}>
                                    <Button variant="outline-light" className="optionsButton" ><img src={kebabMenu} alt="Options Menu Button" className="optionsImg" /></Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}
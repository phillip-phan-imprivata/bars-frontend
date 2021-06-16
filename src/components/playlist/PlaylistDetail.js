import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { PlaylistContext } from "./PlaylistProvider"
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export const PlaylistDetail = () => {
    const {currentPlaylist, getSongsByPlaylist, editPlaylistName, removeSongFromPlaylist, deletePlaylist} = useContext(PlaylistContext)
    const [videoLink, setVideoLink] = useState("")
    const [hidden, setHidden] = useState(false)
    const [buttonText, setButtonText] = useState("Options")
    const [newPlaylistName, setNewPlaylistName] = useState("")
    
    const {playlistId} = useParams()

    const history = useHistory()
    
    useEffect(() => {
        getSongsByPlaylist(playlistId)
    }, [])
    

    const renderVideo = () => {
        if (videoLink !== ""){
            return(
                <iframe 
                    width="375"
                    height="100" 
                    src={`https://www.youtube.com/embed/${videoLink}?autoplay=1`}
                    title="YouTube Video"
                    autoPlay="On"
                    allow="autoplay"
                    allowFullScreen></iframe>
            )
        }
    }

    const playVideo = (event) => {
        const [id, videoId] = event.target.id.split("--")
        setVideoLink(videoId)
    }

    const handleEditPlaylist = (event) => {
        setHidden(!hidden)
        if (buttonText === "Options"){
            setButtonText("Save")
        } else if (buttonText === "Save"){
            editPlaylistName({
                "playlistId": currentPlaylist.id,
                "name": newPlaylistName
            })
            setButtonText("Options")
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
            <div className="playlistName" hidden={hidden}>{currentPlaylist.name}</div>
            <input type="text" className="playlistNameInput" hidden={!hidden} value={newPlaylistName} placeholder={currentPlaylist.name} onChange={handleInputChange} />
            <OverlayTrigger trigger="click" placement="right" overlay={playlistPopover} rootClose={true}>
                <Button variant="primary" hidden={hidden}>Options</Button>
            </OverlayTrigger>
            <Button variant="primary" hidden={!hidden} onClick={handleEditPlaylist}>Save</Button>
            {
                currentPlaylist.songs?.map(ps => {
                    return (
                        <div className="song" key={ps.id}>
                            <div className="song__thumbnail"><img src={ps.song.thumbnail} alt="thumbnail" id={`id--${ps.song.song_link}`} onClick={playVideo} /></div>
                            <div className="song__info">
                                <div className="song__title">{ps.song.title.replace(/&#39;/g, "'").replace(/&quot;/g, `"`).replace(/&amp;/g, "&")}</div>
                                <div className="song__channelTitle">{ps.song.channel}</div>
                            </div>
                            <OverlayTrigger trigger="click" placement="right" overlay={songsPopover(ps.song.id)} rootClose={true} flip={false}>
                                <Button variant="success">Options</Button>
                            </OverlayTrigger>
                        </div>
                    )
                })
            }
            <footer className="currentSong">{renderVideo()}</footer>
        </section>
    )
}
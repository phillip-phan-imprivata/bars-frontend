import React, { useContext, useEffect, useState } from "react"
import { SongContext } from "./SongProvider"
import "./SongList.css"
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { PlaylistContext } from "../playlist/PlaylistProvider"
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ListGroup from 'react-bootstrap/ListGroup'

export const SongList = () => {
    const {songs, getSongs, setVideoLink} = useContext(SongContext)
    const {playlists, getPlaylists, addSongToPlaylist} = useContext(PlaylistContext)

    const [searchQuery, setSearchQuery] = useState("")
    const [newSong, setNewSong] = useState({
        "songLink": "",
        "title": "",
        "channel": "",
        "thumbnail": ""
    })

    const songQueue = []

    useEffect(() => {
        getPlaylists()
    }, [])

    const handleSearchChange = (event) => {
        let newSearch = searchQuery
        newSearch = event.target.value
        setSearchQuery(newSearch)
    }
    
    const handleSearchClick = (event) => {
        event.preventDefault()
        getSongs(searchQuery)
    }

    const playVideo = (event) => {
        const [id, videoId] = event.target.id.split("--")
        setVideoLink(videoId)
    }

    const songDetails = (song) => {
        let songDetail = {...newSong}
        songDetail.songLink = song.songLink
        songDetail.title = song.title
        songDetail.channel = song.channel
        songDetail.thumbnail = song.thumbnail

        setNewSong(songDetail)
    }
    
    const addSong = (event) => {
        const [prefix, id] = event.target.id.split("--")

        let songDetail = {...newSong}
        songDetail.playlistId = parseInt(id)
        addSongToPlaylist(songDetail)
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Playlists</Popover.Title>
          <Popover.Content>
            <ListGroup defaultActiveKey="#link1">
                {
                    playlists.map(playlist => {
                        return(
                            <ListGroup.Item action key={playlist.id} className="playlist__name" id={`id--${playlist.id}`} onClick={addSong}>{playlist.name}</ListGroup.Item>
                            )
                    })
                }
            </ListGroup>
          </Popover.Content>
        </Popover>
      )

    return(
        <section className="songList">
            <div className="searchTitle">Search Songs</div>
            <div className="searchContainer">
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Search"
                    className="searchBar"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    id="search"
                    value={searchQuery}
                    onKeyDown={event => event.key === "Enter" ? handleSearchClick(event) : <></>}
                    onChange={handleSearchChange}
                    autoComplete="off"
                    />
                    <InputGroup.Append>
                    <Button variant="outline-light" className="searchButton" onClick={handleSearchClick}>Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            {
                songs.map(song => {
                    songQueue.push(song.id.videoId)
                    return(
                        <div className="song" key={song.etag}>
                            <div className="song__container">
                                <div className="song__thumbnail"><img src={song.snippet.thumbnails.default.url} alt="thumbnail" id={`id--${song.id.videoId}`} onClick={playVideo} /></div>
                                <div className="song__info">
                                    <div className="song__title">{song.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g, `"`).replace(/&amp;/g, "&")}</div>
                                    <div className="song__channelTitle">{song.snippet.channelTitle}</div>
                                </div>
                            </div>
                            <div className="song__playlist">
                            <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true} transition={false} animation={null}>
                                <Button 
                                variant="outline-light" 
                                className="addButton"
                                onClick={()=>songDetails(
                                    {
                                        "songLink": song.id.videoId,
                                        "title": song.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g, `"`).replace(/&amp;/g, "&"),
                                        "channel": song.snippet.channelTitle,
                                        "thumbnail": song.snippet.thumbnails.default.url
                                    }
                                    )}>+</Button>
                            </OverlayTrigger>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}
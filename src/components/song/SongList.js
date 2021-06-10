import React, { useContext, useState } from "react"
import { SongContext } from "./SongProvider"
import "./SongList.css"
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export const SongList = () => {
    const {songs, getSongs} = useContext(SongContext)
    const [searchQuery, setSearchQuery] = useState("")
    const [videoLink, setVideoLink] = useState("")

    const handleSearchChange = (event) => {
        let newSearch = searchQuery
        newSearch = event.target.value
        setSearchQuery(newSearch)
    }
    
    const handleSearchClick = (event) => {
        event.preventDefault()
        getSongs(searchQuery)
    }

    const renderVideo = () => {
        if (videoLink !== ""){
            return(
                <iframe 
                    width="175"
                    height="100" 
                    src={`https://www.youtube.com/embed/${videoLink}?autoplay=1`}
                    title="YouTube Video"
                    autoPlay="On"
                    allow="autoplay"></iframe>
            )
        }
    }

    const playVideo = (event) => {
        const [id, videoId] = event.target.id.split("--")
        setVideoLink(videoId)
    }

    return(
        <section className="songList">
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                id="search"
                value={searchQuery}
                onKeyDown={event => event.key === "Enter" ? handleSearchClick(event) : <></>}
                onChange={handleSearchChange}
                autoComplete="off"
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" className="searchButton" onClick={handleSearchClick}>Submit</Button>
                </InputGroup.Append>
            </InputGroup>
            {
                songs.map(song => {
                    return(
                        <div className="song" key={song.etag}>
                            <div className="song__thumbnail"><img src={song.snippet.thumbnails.default.url} alt="thumbnail" id={`id--${song.id.videoId}`} onClick={playVideo} /></div>
                            <div className="song__info">
                                <div className="song__title">{song.snippet.title.replace(/&#39;/g, "'").replace(/&quot;/g, `"`)}</div>
                                <div className="song__channelTitle">{song.snippet.channelTitle}</div>
                            </div>
                        </div>
                    )
                })
            }
            <footer className="currentSong">{renderVideo()}</footer>
        </section>
    )
}
import React, { useContext, useEffect, useState } from "react"
import { SongContext } from "./song/SongProvider"
import { PlaylistContext } from "./playlist/PlaylistProvider"
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ListGroup from 'react-bootstrap/ListGroup'
import "./Home.css"

export const Home = () => {
    const {songs, getSongs, setVideoLink, videoLink} = useContext(SongContext)
    const {playlists, getPlaylists, addSongToPlaylist} = useContext(PlaylistContext)

    const [newSong, setNewSong] = useState({
        "songLink": "",
        "title": "",
        "channel": "",
        "thumbnail": ""
    })

    useEffect(() => {
        getSongs("")
        .then(getPlaylists)
    }, [])

    const playVideo = (event) => {
        const [id, videoId] = event.target.id.split("--")
        setVideoLink(videoId)
        console.log(videoId)
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
            <div className="songList__title">Explore New Music</div>
            {
                songs.map(song => {
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
                            <OverlayTrigger trigger="click" placement="right" rootClose={true} transition={false} animation={null} overlay={popover}>
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
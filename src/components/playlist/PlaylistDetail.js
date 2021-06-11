import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { PlaylistContext } from "./PlaylistProvider"

export const PlaylistDetail = () => {
    const {playlistSongs, getSongsByPlaylist} = useContext(PlaylistContext)
    const [videoLink, setVideoLink] = useState("")

    const {playlistId} = useParams()

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

    return (
        <section className="playlistSongs">
            {
                playlistSongs.map(ps => {
                    return (
                        <div className="song" key={ps.id}>
                            <div className="song__thumbnail"><img src={ps.song.thumbnail} alt="thumbnail" id={`id--${ps.song.song_link}`} onClick={playVideo} /></div>
                            <div className="song__info">
                                <div className="song__title">{ps.song.title.replace(/&#39;/g, "'").replace(/&quot;/g, `"`).replace(/&amp;/g, "&")}</div>
                                <div className="song__channelTitle">{ps.song.channel}</div>
                            </div>
                        </div>
                    )
                })
            }
            <footer className="currentSong">{renderVideo()}</footer>
        </section>
    )
}
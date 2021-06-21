import React, { useContext, useEffect } from "react"
import { SongContext } from "../song/SongProvider"
import "./Footer.css"

export const Footer = () => {
    const {videoLink} = useContext(SongContext)

    const renderVideo = () => {        
        if (videoLink !== ""){
            let player = (
                <iframe 
                    width="375"
                    height="100" 
                    src={`https://www.youtube.com/embed/${videoLink}?autoplay=1`}
                    title="YouTube Video"
                    autoPlay="On"
                    allow="autoplay"
                    allowFullScreen
                    />
            )
            return player
        } else {
            return <div>{videoLink}</div>
        }
    }

    return (
        <footer className="currentSong">
            {renderVideo()}
        </footer>
    )
}
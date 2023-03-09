import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { shell } from "electron";

const AnimePlayer: React.FC = () => {
  const [dowload,setDowload] = useState<boolean>(false)
  const [torrent,setTorrent] = useState<boolean>(false)
  const [torrentProgress,setTorrentProgress] = useState<string>("0%")
  const { state } = useLocation()
  const [episode, setEpisode] = useState<string>("")

  const getAnimeUrl = async () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/dowload/${state.anime.substring(29,state.anime.length-11)}/${state.episode}`)
        .then((response) =>shell.openExternal(response.data) )
        .catch(error => console.error(error))

}
  useEffect(() => {
  if (dowload) {
    getAnimeUrl()
    setDowload(false)
  }
  },[dowload])
  useQuery({
    queryKey: ['Episode'], queryFn: async () => {
      console.log(`${import.meta.env.VITE_API_URL}/url/${state.anime.substring(29, state.anime.length - 11)}/${state.episode}`)
      return axios.get(`${import.meta.env.VITE_API_URL}/url/${state.anime.substring(29, state.anime.length - 11)}/${state.episode}`)
        .then(response => { setEpisode(response.data) })
        .catch(error => console.error(error))
    }
  })
  return (
    <>
      {episode.length > 1 ? (
        <div style={{ width: "100%", height: "100%", objectFit: "fill" }}>
          <div style={{ display: "flex", gap: "2%", alignItems: "center" }}><h1>{state.name} {state.episode}</h1> <Button onClick={() => setDowload(true) }>Descargar</Button></div>
          <video width="100%" height="100%" src={episode}>

          </video></div>) :<div style={{ textAlign: "center",cursor : "wait" }}><img src="/loader.gif" /></div>}
    </>
  )
}

export default AnimePlayer
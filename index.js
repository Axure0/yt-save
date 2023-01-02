const express = require('express')
const app = express()

const ytdl = require('youtube-dl')
const fs = require('fs')
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
})

app.post('/:link', (req, res) => {

    let filename 
    const video = ytdl(req.params.link, ['--format=18'], { cwd: process.cwd() })
    
    const fpath = path.join(__dirname + '/mp4')
    
    video.on('info', (info) => {
      filename = info._filename
      elm1.innerHtml = "Download Started"
      elm2.innerHtml = `Filename: ${filename}`
      elm3.innerHtml = `File size: ${info.size}`
    })
    
    video.pipe(fs.createWriteStream(fpath, `${filename}.mp4`))
})
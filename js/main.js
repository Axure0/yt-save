const ytdl = require('youtube-dl')
const fs = require('fs')
const path = require('path')

function saveVideo(form, elm1, elm2, elm3) {
  
  let filename 
  const video = ytdl(form.link.value, ['--format=18'], { cwd: process.cwd() })
  
  const fpath = path.join(__dirname + '/mp4')
  
  video.on('info', (info) => {
     filename = info._filename
     elm1.innerHtml = "Download Started"
     elm2.innerHtml = `Filename: ${filename}`
     elm3.innerHtml = `File size: ${info.size}`
  })
  
  video.pipe(fs.createWriteStream(fpath, `${filename}.mp4`))
  
}

module.exports = saveVideo
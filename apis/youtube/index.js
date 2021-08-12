const apikey = "AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g"
var axios = require("axios").default;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.listen(4244, () => {
    console.log("Listening on port 4244.");
});

app.post("/youtube", (req, res) => {
    res.set("Content-Type", "application/json");
    var thumbnail, name, id, url, views, subs, vids;
    if (req.body.data.Channel) {
        axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + req.body.data.Channel + "&type=channel&key=AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g").then(function (rev) {
            thumbnail = rev.data.items[0].snippet.thumbnails.default.url
            name = rev.data.items[0].snippet.title;
            id = rev.data.items[0].id.channelId;
            axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=" + id + "&key=AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g").then(function (rev) {
                views = rev.data.items[0].statistics.viewCount;
                subs = rev.data.items[0].statistics.subscriberCount;
                vids = rev.data.items[0].statistics.videoCount;
                res.status(200).json({ status: "Success", code: 200, thumbnail: thumbnail, name: name, id: id, views: views, subs: subs, vids: vids, url: "https://youtube.com/channel/" + id })
            }).catch(function (error) {
                res.status(500).json({ status: "Failure", code: 500, msg: "Unknow Channel" })
            });
        }).catch(function (error) {
            res.status(500).json({ status: "Failure", code: 500, msg: "Unknow Channel" })
        })
    } else {
        res.status(500).json({ status: "Failure", code: 500, msg: "Unknow Channel" })
    }
});



const apikey = "AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g"
var axios = require("axios").default;

exports.channel = function (req, res) {
    res.set("Content-Type", "application/json");
    var thumbnail, name, id, url, views, subs, vids;
    if (req.query.channel) {
        axios.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + req.query.channel + "&type=channel&key=AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g").then(function (rev) {
            thumbnail = rev.data.items[0].snippet.thumbnails.default.url
            name = rev.data.items[0].snippet.title;
            id = rev.data.items[0].id.channelId;
            axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=" + id + "&key=AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g").then(function (rev) {
                views = rev.data.items[0].statistics.viewCount;
                subs = rev.data.items[0].statistics.subscriberCount;
                vids = rev.data.items[0].statistics.videoCount;
                axios.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyB8UFWjfK7B2SHBnsgE6yBKYYyaKj4w13g&channelId=" + id +"&part=snippet,id&order=date&maxResults=1").then((result) => {
                    if (result.data.items[0].id)
                        res.status(200).json({ status: "Success", code: 200, thumbnail: thumbnail, name: name, id: id, views: views, subs: subs, vids: vids, url: "https://youtube.com/channel/" + id, video: result.data.items[0].id.videoId})
                    else
                        res.status(200).json({ status: "Success", code: 200, thumbnail: thumbnail, name: name, id: id, views: views, subs: subs, vids: vids, url: "https://youtube.com/channel/" + id})
                })
            }).catch(function (error) {
                res.status(500).json({ status: "Failure", code: 500, msg: "Unknow Channel" })
            });
        }).catch(function (error) {
            res.status(500).json({ status: "Failure", code: 500, msg: "Unknow Channel" })
        })
    } else {
        res.status(500).json({ status: "Failure", code: 500, msg: "Unknow Channel" })
    }
};
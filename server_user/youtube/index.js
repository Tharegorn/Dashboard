const apikey = process.env.YOUTUBE_KEY;
var axios = require("axios").default;

exports.search = function (req, res) {
  if (req.query.value) {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
          req.query.value +
          "&type=video&key=" +
          apikey
      )
      .then((r) => {
        let list = [];
        r.data.items.forEach((e) => {
          list.push({
            title: e.snippet.title,
            channelTitle: e.snippet.channelTitle,
            thumbnail: e.snippet.thumbnails.default.url,
            channelLink: "https://youtube.com/channel/" + e.snippet.channelId,
            videoLink: "https://www.youtube.com/watch?v=" + e.id.videoId,
          });
        });
        res.status(200).json({ status: "Success", code: 200, list: list });
      })
      .catch((err) => {
        res.status(401).json({ status: "Unauthorized", code: 401 });
      });
  } else res.status(401).json({ status: "Invalid parameters", code: 401 });
};

exports.channel = function (req, res) {
  res.set("Content-Type", "application/json");
  var thumbnail, name, id, url, views, subs, vids;
  if (req.query.channel) {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
          req.query.channel +
          "&type=channel&key=" +
          apikey
      )
      .then(function (rev) {
        thumbnail = rev.data.items[0].snippet.thumbnails.default.url;
        name = rev.data.items[0].snippet.title;
        id = rev.data.items[0].id.channelId;
        axios
          .get(
            "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=" +
              id +
              "&key=" +
              apikey
          )
          .then(function (rev) {
            views = rev.data.items[0].statistics.viewCount;
            subs = rev.data.items[0].statistics.subscriberCount;
            vids = rev.data.items[0].statistics.videoCount;
            axios
              .get(
                "https://www.googleapis.com/youtube/v3/search?key=" +
                  apikey +
                  "&channelId=" +
                  id +
                  "&part=snippet,id&order=date&maxResults=1"
              )
              .then((result) => {
                if (result.data.items[0].id)
                  res.status(200).json({
                    status: "Success",
                    code: 200,
                    thumbnail: thumbnail,
                    name: name,
                    id: id,
                    views: views,
                    subs: subs,
                    vids: vids,
                    url: "https://youtube.com/channel/" + id,
                    video: result.data.items[0].id.videoId,
                  });
                else
                  res.status(200).json({
                    status: "Success",
                    code: 200,
                    thumbnail: thumbnail,
                    name: name,
                    id: id,
                    views: views,
                    subs: subs,
                    vids: vids,
                    url: "https://youtube.com/channel/" + id,
                  });
              });
          })
          .catch(function (error) {
            res
              .status(500)
              .json({ status: "Failure", code: 500, msg: "Unknow Channel" });
          });
      })
      .catch(function (error) {
        res
          .status(500)
          .json({ status: "Failure", code: 500, msg: "Unknow Channel" });
      });
  } else {
    res
      .status(500)
      .json({ status: "Failure", code: 500, msg: "Unknow Channel" });
  }
};

module.exports = {
  json: {
    client: {
      host: "",
    },
    server: {
      current_time: 0,
      services: [
        {
          name: "Weather",
          widgets: [
            {
              name: "city_weather",
              description: "Display the weather of the selected city",
              params: [
                {
                  name: "city",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "Currency",
          widgets: [
            {
              name: "currency_exchange",
              description: "Display the amount of currency",
              params: [
                {
                  name: "from",
                  type: "string",
                },
                {
                  name: "to",
                  type: "string",
                },
                {
                  name: "amount",
                  type: "integer",
                },
              ],
            },
          ],
        },
        {
          name: "YouTube",
          widgets: [
            {
              name: "channer_stats",
              description: "Display the stats on the selected Youtube Channel",
              params: [
                {
                  name: "channel",
                  type: "string",
                },
              ],
            },
            {
              name: "youtube_player",
              description: "Launch a Youtube player",
              params: [
                {
                  name: "link",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

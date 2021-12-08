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
              name: "city",
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
              name: "exchange",
              description: "Display the amount of currency",
              params: [
                {
                  name: "from",
                  type: "enum",
                },
                {
                  name: "to",
                  type: "enum",
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
              name: "channel_stats",
              description: "Display the stats on the selected Youtube Channel",
              params: [
                {
                  name: "channel",
                  type: "string",
                },
              ],
            },
            {
              name: "player",
              description: "Launch a Youtube player",
              params: [
                {
                  name: "link",
                  type: "string",
                },
              ],
            },
            {
              name: "search",
              description: "Search videaos with given name",
              params: [
                {
                  name: "search",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "Epitech",
          widgets: [
            {
              name: "Profile",
              description: "Display epitech profile card",
              params: [
                {
                  name: "auth",
                  type: "string",
                }
              ],
            },
          ],
        },
        {
          name: "Notes",
          widgets: [
            {
              name: "stick",
              description: "Create and manage stick notes on the board",
              params: [
                {
                  name: "title",
                  type: "string",
                },{
                  name: "content",
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

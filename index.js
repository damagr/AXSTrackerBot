import { Client, Intents } from "discord.js";
import axios from "axios";

const url = "https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=usd";
let lastPrice;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

const BOT_ID = process.env["BOT_ID"];
const BOT_TOKEN = process.env["BOT_TOKEN"];

client.once("ready", () => {
  console.log("We on . . .");

  const SERVER_ID = process.env["SERVER_ID"];
  const guild = client.guilds.cache.get(SERVER_ID);
  const BOT = guild.members.cache.get(BOT_ID);

  setInterval(async () => {
    getPrice();
    BOT.user.setActivity("AXS: " + lastPrice);
  }, 5000);
});

function getPrice() {
  axios.get(url).then((response) => {
    lastPrice = response.data['axie-infinity']['usd'];
  });
}

client.login(BOT_TOKEN);

// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Env from "./Env.mjs";
import * as Curry from "../../../node_modules/rescript/lib/es6/curry.js";
import * as DiscordJs from "discord.js";
import * as Caml_exceptions from "../../../node_modules/rescript/lib/es6/caml_exceptions.js";
import * as Parser_DetectHandler from "./parser/Parser_DetectHandler.mjs";
import * as UpdateOrReadGistMjs from "./updateOrReadGist.mjs";

var RequestHandlerError = /* @__PURE__ */Caml_exceptions.create("Bot.RequestHandlerError");

function updateGist(prim0, prim1) {
  return UpdateOrReadGistMjs.updateGist(prim0, prim1);
}

Env.createEnv(undefined);

var config = Env.getConfig(undefined);

var client = new DiscordJs.Client(undefined);

function updateGistOnGuildCreate(guild) {
  return UpdateOrReadGistMjs.updateGist(guild.id, {
              name: guild.name,
              role: "Verified"
            });
}

function onGuildCreate(guild) {
  var roleManager = guild.roles;
  var createRoleOptions = {
    data: {
      name: "Verified",
      color: "ORANGE"
    },
    reason: "Verify users with BrightID"
  };
  roleManager.create(createRoleOptions);
  updateGistOnGuildCreate(guild);
  
}

function onMessage(message) {
  var author = message.author;
  var isBot = author.bot;
  if (isBot) {
    return ;
  }
  var guildMember = message.member;
  var handler = Parser_DetectHandler.detectHandler(message);
  if (handler !== undefined) {
    Curry._3(handler, guildMember, client, message);
  } else {
    message.reply("Could not find the requested command");
    console.error({
          RE_EXN_ID: RequestHandlerError,
          date: Date.now(),
          message: "Could not find the requested command"
        });
  }
  
}

client.on("ready", (function (param) {
        console.log("Logged In");
        
      }));

client.on("guildCreate", onGuildCreate);

client.on("message", onMessage);

if (config.TAG === /* Ok */0) {
  client.login(config._0.discordApiToken);
} else {
  console.log(config._0);
}

export {
  RequestHandlerError ,
  updateGist ,
  config ,
  client ,
  updateGistOnGuildCreate ,
  onGuildCreate ,
  onMessage ,
  
}
/*  Not a pure module */
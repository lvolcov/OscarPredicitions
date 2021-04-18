const createLeagueMessage = require('../../textsMenus/createLeagueMessage')

const createLeagueGetName = (async (ctx) => {

    await ctx.telegram.sendMessage(ctx.chat.id, "What will be the name of your league?", { reply_markup: { force_reply: true } })

    await ctx.telegram.sendMessage(ctx.chat.id, createLeagueMessage(), {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: "Back", callback_data: "leagues deleteLastMessage" }]] }
    })
})

module.exports = createLeagueGetName
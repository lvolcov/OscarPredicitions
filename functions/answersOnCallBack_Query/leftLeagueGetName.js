const sqlFunctions = require('../sqlResources/sqlFunctions')
const leftLeagueMessage = require('../../textsMenus/leftLeagueMessage')

const leftLeagueGetName = (async (ctx) => {
    const telegramID = ctx.update.callback_query.from.id
    let notOwnLeague = []
    const info = await sqlFunctions.getLeaguesDetails(telegramID)
    info.map((elem) => elem.TelegramIDDono === elem.TelegramIDParticipante ? 0 : notOwnLeague.push(elem.NomeLiga))

    if (notOwnLeague[0]) {
        await ctx.telegram.sendMessage(ctx.chat.id, "Which league do you want to leave?", { reply_markup: { force_reply: true } })
        await ctx.telegram.sendMessage(ctx.chat.id, leftLeagueMessage(notOwnLeague),
            { parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: "Back", callback_data: "leagues deleteLastMessage" }]] } })
    } else {
        await ctx.telegram.sendMessage(ctx.chat.id, 'You are not a member of any league.',
            { parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: "Back", callback_data: "leagues" }]] } })
    }
})

module.exports = leftLeagueGetName
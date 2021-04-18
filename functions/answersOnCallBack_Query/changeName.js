const sqlFunctions = require('../sqlResources/sqlFunctions')
const changeNameMessage = require('../../textsMenus/changeNameMessage')

const changeName = (async (ctx) => {
    const telegramID = ctx.update.callback_query.from.id
    const info = await sqlFunctions.getVotes(telegramID)

    await ctx.telegram.sendMessage(ctx.chat.id, "What is your new name for the Ranking?", { reply_markup: { force_reply: true, } })

    await ctx.telegram.sendMessage(ctx.chat.id, changeNameMessage(info[0].Nome), {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: "Back", callback_data: "moreInfo deleteLastMessage" }]] }
    })
})

module.exports = changeName
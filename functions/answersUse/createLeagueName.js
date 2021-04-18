const validateAnswer = require('../validateAnswer')
const sqlFunctions = require('../sqlResources/sqlFunctions')
const createLeagueMessage = require('../../textsMenus/createLeagueMessage')

const createLeagueName = (async (ctx) => {
    const messageTextUser = ctx.update.message.text
    const telegramID = ctx.update.message.from.id
    let validAnswer = validateAnswer(messageTextUser)

    if (validAnswer === true) {
        const validLeagues = await sqlFunctions.getNamesExistingLeagues()
        const upperValidLeagues = validLeagues.map((elem) => elem.toUpperCase())
        upperValidLeagues.indexOf(messageTextUser.toUpperCase()) !== -1 ? validAnswer = `❌ The name ${messageTextUser} is already being used! ❌` : ""
    }

    if (validAnswer === true) {
        ctx.telegram.sendMessage(ctx.chat.id, `You are creating a league named: ${messageTextUser} \n\nDo you want to save?`,
            { reply_markup: { inline_keyboard: [[{ text: 'Yes', callback_data: String('criaLiga ' + messageTextUser) }, { text: 'No', callback_data: 'naoCriaLiga' }]] } })
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, validAnswer)
            .then((result) => {
                setTimeout(() => {
                    ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
                        .then(async (result) => {
                            await ctx.telegram.sendMessage(ctx.chat.id, "What will be the name of your league?", { reply_markup: { force_reply: true, } })
                            await ctx.telegram.sendMessage(ctx.chat.id, createLeagueMessage(), { parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: "Back", callback_data: "leagues deleteLastMessage" }]] } })
                        })
                        .catch(err => console.log(err))
                }, 3000)
            })
            .catch(err => console.log(err))
    }
})

module.exports = createLeagueName
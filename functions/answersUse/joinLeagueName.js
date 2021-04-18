const validateAnswer = require('../validateAnswer')
const sqlFunctions = require('../sqlResources/sqlFunctions')

const joinLeagueName = (async (ctx) => {
    const messageTextUser = ctx.update.message.text
    const telegramID = ctx.update.message.from.id
    let validAnswer = validateAnswer(messageTextUser)
    let leagueJoined = ''

    if (validAnswer === true) {
        const validLeagues = await sqlFunctions.getNamesExistingLeagues()
        const upperValidLeagues = validLeagues.map((elem) => elem.toUpperCase())
        upperValidLeagues.indexOf(messageTextUser.toUpperCase()) === -1 ? validAnswer = "❌ League not found! ❌" : leagueJoined = validLeagues[upperValidLeagues.indexOf(messageTextUser.toUpperCase())]
        const listLeaguesUser = await sqlFunctions.getLeaguesList(telegramID)
        listLeaguesUser.indexOf(leagueJoined) !== -1 ? validAnswer = "❌ You are already a member of this league! ❌" : ""
    }
    if (validAnswer === true) {
        ctx.telegram.sendMessage(ctx.chat.id, `Confirm you want to join the League ${leagueJoined}?`,
            { reply_markup: { inline_keyboard: [[{ text: 'Yes', callback_data: String('joinLeagueYes ' + leagueJoined) }, { text: 'No', callback_data: 'leagues' }]] } })
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, validAnswer)
            .then((result) => {
                setTimeout(() => {
                    ctx.telegram.deleteMessage(ctx.chat.id, result.message_id)
                        .then(async (result) => {
                            await ctx.telegram.sendMessage(ctx.chat.id, "What is the name of the league you want to join?", { reply_markup: { force_reply: true } })
                            await ctx.telegram.sendMessage(ctx.chat.id, "Type the exact name of the league you want to join.", { parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: "Back", callback_data: "leagues deleteLastMessage" }]] } })
                        })
                        .catch(err => console.log(err))
                }, 3000)
            })
            .catch(err => console.log(err))
    }
})

module.exports = joinLeagueName
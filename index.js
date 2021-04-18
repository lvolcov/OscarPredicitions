// http://49.213.81.43/static/tool/thuocbot/node_modules/telegraf/docs/#/

const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

// const { Composer } = require('micro-bot')
// const bot = new Composer


const answers = require('./functions/answers')

//Closing date set to 26/04/2021 - 00:00 UTC
const closingTime = new Date(Date.UTC(2021, 3, 26, 00, 00, 0, 0));
const timeNow = Date.now()

bot.start(async (ctx) => {
    let i = ctx.update.message.message_id < 100 ? 0 : ctx.update.message.message_id - 100
    while (i < ctx.update.message.message_id) {
        ctx.telegram.deleteMessage(ctx.update.message.chat.id, i)
            .then(i++)
            .catch((err) => {
                const error = err
            });
    }
    answers.start(ctx)
})

bot.on('callback_query', async (ctx) => {
    ctx.deleteMessage()
    const previousInfo = ctx.update.callback_query.data.split(" ").slice(1).join(" ")

    previousInfo === "deleteLastMessage" ? ctx.telegram.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id - 1) : ""

    const callbackInfo = (() => {
        const called = ctx.update.callback_query.data.split(" ", 2)
        if (called[0].substring(0, 3) === 'cat' || called[0].substring(0, 3) === 'ind') {
            return called[0].substring(0, 3)
        } else if (called[1] === 'voltaMenuJaVotados') {
            return 'voted'
        } else {
            return called[0]
        }
    })

    let answer = callbackInfo()
    const onlyBeforeClosing = ["cat", "ind", "volCategoria", "voted", "resetVotes", "resetVotesYes"]

    if (timeNow > closingTime && onlyBeforeClosing.indexOf(answer) != -1) {
        answer = "menuInicial"
    }

    answers[answer](ctx)

})

bot.use(async (ctx) => {
    ctx.deleteMessage()

    const possibleReplies = {
        "What is your new name for the Ranking?": 'newRankingName',
        "What will be the name of your league?": 'createLeagueName',
        "What is the name of the league you want to join?": 'joinLeagueName',
        "What will be the new name of your league?": 'changeLeagueName',
        "Which league do you want to leave?": 'leftLeague'
    }
    const replyObject = ctx.update.message.reply_to_message
    if (replyObject === undefined) {
        ''
    } else if (replyObject.from.is_bot && Object.keys(possibleReplies).indexOf(replyObject.text) !== -1) {
        ctx.telegram.deleteMessage(replyObject.chat.id, replyObject.message_id)
        ctx.telegram.deleteMessage(replyObject.chat.id, replyObject.message_id + 1)
        answers[possibleReplies[replyObject.text]](ctx)
    }
})

// module.exports = bot
bot.launch()

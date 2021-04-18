const resetVotes = (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, "Are you sure you want to reset your predictions?",
        { reply_markup: { inline_keyboard: [[{ text: "Yes", callback_data: "resetVotesYes" }, { text: "No", callback_data: "moreInfo" }]] } })
}

module.exports = resetVotes
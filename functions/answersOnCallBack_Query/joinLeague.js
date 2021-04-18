const joinLeague = (async (ctx) => {
    await ctx.telegram.sendMessage(ctx.chat.id, "What is the name of the league you want to join?", { reply_markup: { force_reply: true } })
    await ctx.telegram.sendMessage(ctx.chat.id, "Write the exact name of the league you want to join.",
        { parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: "Voltar", callback_data: "leagues deleteLastMessage" }]] } })
})

module.exports = joinLeague
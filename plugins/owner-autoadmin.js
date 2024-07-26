 const handler = async (message, { conn, isAdmin }) => {
    if (message.fromMe) return;
    if (isAdmin) throw '*[❗] انت ادمن اصلا يا مطوري ❤️*\x0a@+201283419708';
    try {
        await conn.groupParticipantsUpdate(message.chat, [message.sender], 'promote');
    } catch {
        await message.reply('*[❗] ايفون مش قادر*');
    }
};

handler.command = /^ارفعني|adme$/i;
handler.rowner = true;
handler.botAdmin = true;
handler.fromMe = true;

export default handler;
import { sticker } from '../lib/sticker.js';
const handler = (m) => m;

handler.all = async function(m, { conn }) {
  const chat = global.db.data.chats[m.chat];

  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace')) && !m.isBaileys && !m.isGroup && !chat.isBanned) {
    const joinMessage = `
      ✨ مساعدة داخل البوت إلي جروبك / ✨
      أهلا @${m.sender.split('@')[0]}، لتستطيع إدخال البوت إلي جروبك استعمل #انضم
      علي سبيل المثال
      — ⦿ #انضم https://chat.whatsapp.com/BjrqiXLZKmZ3jW7vEDyV27
    `;

    const mentions = joinMessage.match(/@([0-9]{5,16}|0)/g).map((v) => v.replace('@', '') + '@s.whatsapp.net');

    await this.sendMessage(m.chat, {
      text: joinMessage.trim(),
      mentions,
      contextInfo: {
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: mentions,
        externalAdReply: {
          showAdAttribution: true,
          containsAutoReply: true,
          renderLargerThumbnail: true,
          title: global.titulowm2,
          mediaType: 1,
          thumbnail: global.imagen6,
          mediaUrl: `https://chat.whatsapp.com/LjJbmdO0qSDEKgB60qivZj`,
          sourceUrl: `https://chat.whatsapp.com/LjJbmdO0qSDEKgB60qivZj`
        }
      }
    }, { quoted: m });
  }

  const sendAudio = async (filePath) => {
    await this.sendPresenceUpdate('recording', m.chat);
    await this.sendMessage(m.chat, { audio: { url: filePath }, fileName: 'audio.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
  };

  if (/^hola$/i.test(m.text) && chat.audios && !chat.isBanned) {
    if (!global.db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
    await sendAudio('./media/Hola.mp3');
  }

  const audioMatches = [
    { pattern: /(bañate|Bañate)/gi, file: './media/Banate.mp3' },
    { pattern: /(baneado|Baneado)/gi, file: './media/baneado.mp3' },
    { pattern: /(bebito fiu fiu|bff|Bebito Fiu Fiu|Bff)/gi, file: './media/bff.mp3' },
    { pattern: /(buenas noches|Buenas noches|Boanoite|boanoite)/gi, file: './media/boanoite.mp3' },
    { pattern: /(buenas tardes|Buenas tardes|boatarde|Boatarde)/gi, file: './media/boatarde.mp3' },
    { pattern: /(buenos dias|Buenos dias|buenos días|Buenos días)/gi, file: './media/Buenos-dias-2.mp3' },
    { pattern: /(chica lgante|Chica lgante|Chicalgante|chicalgante|chical gante|Chical gante)/gi, file: './media/chica lgante.mp3' },
    { pattern: /(fiesta del administrador)/gi, file: './media/fiesta.mp3' },
    { pattern: /(fiesta del admin 3|atención grupo|atencion grupo|aviso importante|fiestadeladmin3)/gi, file: './media/Fiesta1.mp3' },
    { pattern: /(gemidos|gemime|gime|gemime|gemi2)/gi, file: './media/gemi2.mp3' },
    { pattern: /(audio hentai|Audio hentai|audiohentai|Audiohentai)/gi, file: './media/hentai.mp3' },
    { pattern: /(sexo|Sexo|Hora de sexo|hora de sexo)/gi, file: './media/maau1.mp3' },
    { pattern: /(laoracion|La biblia|La oración|La biblia|La oración|la biblia|La Biblia)/gi, file: './media/ora.mp3' },
    { pattern: /(Marica tu|cancion1|Marica quien)/gi, file: './media/cancion.mp3' },
    { pattern: /(Murió el grupo|Murio el grupo|murio el grupo|murió el grupo|Grupo muerto|grupo muerto)/gi, file: './media/Murio.m4a' },
    { pattern: /(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/gi, file: './media/navidad.m4a' },
    { pattern: /(noche de paz|Noche de paz|Noche de amor|noche de amor|Noche de Paz)/gi, file: './media/Noche.mp3' },
    { pattern: /(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure)/gi, file: './media/otaku.mp3' },
    { pattern: /(ho me vengo|oh me vengo|o me vengo|Ho me vengo|Oh me vengo|O me vengo)/gi, file: './media/vengo.mp3' },
    { pattern: /(oni-chan|onichan|o-onichan)/gi, file: './media/Onichan.mp3' },
    { pattern: /(Pasa pack|vendes tu nudes|pasa video hot|pasa tu pack|pasa fotos hot|vendes tu pack|Vendes tu pack|Vendes tu pack?|vendes tu pack|Pasa Pack Bot|pasa pack Bot|pasa tu pack Bot|Pásame tus fotos desnudas|pásame tu pack|me pasas tu pak|me pasas tu pack|pasa pack)/gi, file: './media/Elmo.mp3' },
    { pattern: /(Quién es tu senpai botsito 7u7|Quien es tu senpai botsito 7u7|Quién es tu sempai botsito 7u7|Quien es tu sempai botsito 7u7|Quién es tu senpai botsito 7w7|Quien es tu senpai botsito 7w7|quién es tu senpai botsito 7u7|quien es tu senpai botsito 7u7|Quién es tu sempai botsito 7w7|Quien es tu sempai botsito 7w7|Quién es tu senpai botsito|Quien es tu senpai botsito|Quién es tu sempai botsito|Quien es tu sempai botsito|Quién es tu senpai botsito|Quien es tu senpai botsito|quién es tu senpai botsito|quien es tu senpai botsito|Quién es tu sempai botsito|Quien es tu sempai botsito)/gi, file: './media/Tu.mp3' },
    { pattern: /(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/gi, file: './media/rawr.mp3' },
    { pattern: /(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/gi, file: './media/siu.mp3' },
    { pattern: /(te amo|teamo)/gi, file: './media/Te-amo.mp3' },
    { pattern: /(ooo tio|tio que rico)/gi, file: './media/oh_tio.mp3' }
  ];

  for (const { pattern, file } of audioMatches) {
    if (!chat.isBanned && chat.audios && m.text.match(pattern)) {
      if (!global.db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;
      await sendAudio(file);
    }
  }
};

export default handler;
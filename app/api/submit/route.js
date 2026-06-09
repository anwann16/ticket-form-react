const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BACKUP_URL = process.env.BACKUP_URL;

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate
    const required = ["seat", "nama_lengkap", "no_hp", "email"];
    const missing = required.filter((f) => !data[f]?.trim());
    if (missing.length) {
      return Response.json(
        { ok: false, error: `Field wajib kosong: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    // Format message
    const now = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });
    const msg = [
      "🎟️ <b>PENDAFTARAN TIKET BARU</b>",
      "━━━━━━━━━━━━━━━━━━━━",
      `🪑 <b>Seat:</b> ${data.seat || "-"}`,
      `🔄 <b>Backup Seat:</b> ${data.backup_seat || "-"}`,
      `🎫 <b>Jumlah Tiket:</b> ${data.jumlah_tiket || "-"}`,
      `👤 <b>Gender:</b> ${data.gender || "-"}`,
      `📛 <b>Nama Lengkap:</b> ${data.nama_lengkap || "-"}`,
      `🪪 <b>No. KTP:</b> ${data.no_ktp || "-"}`,
      `📱 <b>No. HP:</b> ${data.no_hp || "-"}`,
      `📧 <b>Email:</b> ${data.email || "-"}`,
      `🔑 <b>Membership Code:</b> ${data.membership_code || "-"}`,
      "━━━━━━━━━━━━━━━━━━━━",
      `🕐 ${now}`,
    ].join("\n");

    // 1) Send to Telegram
    let telegramOk = false;
    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: msg,
            parse_mode: "HTML",
          }),
        },
      );
      telegramOk = tgRes.ok;
    } catch {
      telegramOk = false;
    }

    // 2) Backup to VPS JSON
    let backupOk = false;
    try {
      const bkRes = await fetch(BACKUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _telegram_sent: telegramOk,
          _timestamp: now,
        }),
      });
      backupOk = bkRes.ok;
    } catch {
      backupOk = false;
    }

    if (!telegramOk && !backupOk) {
      return Response.json(
        { ok: false, error: "Gagal kirim ke Telegram & backup" },
        { status: 500 },
      );
    }

    return Response.json({
      ok: true,
      telegram: telegramOk,
      backup: backupOk,
      message: !telegramOk
        ? "Terkirim via backup. Telegram gagal."
        : "Berhasil terkirim ke Telegram!",
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: "Server error: " + err.message },
      { status: 500 },
    );
  }
}

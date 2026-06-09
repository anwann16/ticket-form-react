export default function Success() {
  return (
    <div className="wrap">
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <h1 style={{ marginBottom: 8 }}>Data Berhasil Dikirim!</h1>
        <p className="sub" style={{ marginBottom: 32 }}>
          Pendaftaran tiket kamu sudah terkirim dan tersimpan.
          <br />
          Cek Telegram untuk konfirmasi.
        </p>
        <a href="/" className="btn" style={{ textDecoration: "none", display: "inline-block" }}>
          ➕ Tambah Data Lagi
        </a>
      </div>
    </div>
  );
}

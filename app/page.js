"use client";

import { useState } from "react";

const INITIAL = {
  seat: "",
  backup_seat: "",
  jumlah_tiket: "1",
  gender: "",
  nama_lengkap: "",
  no_ktp: "",
  no_hp: "",
  email: "",
  membership_code: "",
};

export default function Home() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState(null); // { type: 'ok'|'err', text: '' }
  const [loading, setLoading] = useState(false);

  const set = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (json.ok) {
        window.location.href = "/success";
      } else {
        setStatus({
          type: "err",
          text: "❌ " + (json.error || "Gagal mengirim"),
        });
      }
    } catch {
      setStatus({ type: "err", text: "❌ Error koneksi, coba lagi." });
    }

    setLoading(false);
  };

  return (
    <div className="wrap">
      <div className="card">
        <h1>🎟️ Pendaftaran Tiket</h1>
        <p className="sub">Isi data diri dengan lengkap lalu klik Daftar</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <Field
              label="Seat"
              req
              name="seat"
              value={form.seat}
              onChange={set}
              placeholder="A1"
            />
            <Field
              label="Backup Seat"
              name="backup_seat"
              value={form.backup_seat}
              onChange={set}
              placeholder="B3"
            />
          </div>

          <div className="row">
            <div className="field">
              <label>Jumlah Tiket</label>
              <select
                name="jumlah_tiket"
                value={form.jumlah_tiket}
                onChange={set}
              >
                <option value="1">1 Tiket</option>
                <option value="2">2 Tiket</option>
                <option value="3">3 Tiket</option>
                <option value="4">4 Tiket</option>
              </select>
            </div>
            <div className="field">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={set}>
                <option value="">Pilih...</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>

          <Field
            label="Nama Lengkap"
            req
            name="nama_lengkap"
            value={form.nama_lengkap}
            onChange={set}
            placeholder="Nama sesuai KTP"
          />
          <Field
            label="No. KTP"
            name="no_ktp"
            value={form.no_ktp}
            onChange={set}
            placeholder="16 digit NIK"
            maxLength={16}
          />

          <div className="row">
            <Field
              label="No. HP"
              req
              name="no_hp"
              value={form.no_hp}
              onChange={set}
              placeholder="08xxx"
              type="tel"
            />
            <Field
              label="Email"
              req
              name="email"
              value={form.email}
              onChange={set}
              placeholder="email@domain.com"
              type="email"
            />
          </div>

          <Field
            label="Membership Code"
            name="membership_code"
            value={form.membership_code}
            onChange={set}
            placeholder="Kode membership (opsional)"
          />

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Mengirim..." : "Daftar Sekarang"}
          </button>

          {status && <p className={`msg ${status.type}`}>{status.text}</p>}
        </form>
      </div>
    </div>
  );
}

function Field({ label, req, type = "text", ...rest }) {
  return (
    <div className="field">
      <label>
        {label} {req && <span className="req">*</span>}
      </label>
      <input type={type} {...rest} />
    </div>
  );
}

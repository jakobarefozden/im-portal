// src/pages/AdminSubThemePage.jsx
import { useState } from "react";
import { API_BASE_URL } from "../api/client";
import { request } from "../api/client";

function AdminSubThemePage() {
  const [adminToken, setAdminToken] = useState("");
  const [classId, setClassId] = useState("im-vg1");
  const [courseId, setCourseId] = useState("teknologiforstaelse");
  const [themeId, setThemeId] = useState("digital-teknologi");
  const [subId, setSubId] = useState("maskinvare-grunnleggende");

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [notePdf, setNotePdf] = useState("");
  const [tasksPdf, setTasksPdf] = useState("");
  const [formUrl, setFormUrl] = useState("");

  const [status, setStatus] = useState("");

  const loadExisting = async () => {
    setStatus("Laster eksisterende undertema...");
    try {
      const data = await request(
        `/subthemes/${classId}/${courseId}/${themeId}/${subId}`
      );
      setTitle(data.title ?? "");
      setShortDesc(data.shortDescription ?? "");
      setDesc(data.description ?? "");
      setNotePdf(data.notePdf ?? "");
      setTasksPdf(data.tasksPdf ?? "");
      setFormUrl(data.formUrl ?? "");
      setStatus("Eksisterende data lastet.");
    } catch (err) {
      console.error(err);
      setStatus("Kunne ikke laste undertema (finnes kanskje ikke ennå).");
    }
  };

  const save = async () => {
    if (!adminToken) {
      setStatus("Skriv inn admin token.");
      return;
    }

    setStatus("Lagrer...");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/subthemes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": adminToken,
        },
        body: JSON.stringify({
          classId,
          courseId,
          themeId,
          id: subId,
          title,
          shortDescription: shortDesc,
          description: desc,
          notePdf,
          tasksPdf,
          formUrl,
          images: [],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(errText);
        setStatus(`Feil ved lagring: ${res.status}`);
        return;
      }

      const saved = await res.json();
      setStatus(`Lagret OK (id: ${saved.id})`);
    } catch (err) {
      console.error(err);
      setStatus("Nettverksfeil ved lagring.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <h1>Admin – UnderTema</h1>
      <p>
        Her kan du opprette eller oppdatere et undertema (subtheme). Fyll ut
        feltene og trykk <strong>Lagre</strong>.
      </p>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Admin auth</h2>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Admin token (fra Render):
          <input
            type="password"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
        <p style={{ fontSize: "0.9rem" }}>
          Token lagres ikke noe sted; det bare sendes i header til backend.
        </p>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Identifikatorer</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <label>
            Class ID (im-vg1 / it-vg2 / mp-vg2)
            <input
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              style={{ width: "100%", padding: "0.4rem" }}
            />
          </label>
          <label>
            Course ID (f.eks. teknologiforstaelse)
            <input
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              style={{ width: "100%", padding: "0.4rem" }}
            />
          </label>
          <label>
            Theme ID (f.eks. digital-teknologi)
            <input
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              style={{ width: "100%", padding: "0.4rem" }}
            />
          </label>
          <label>
            Subtheme ID (f.eks. maskinvare-grunnleggende)
            <input
              value={subId}
              onChange={(e) => setSubId(e.target.value)}
              style={{ width: "100%", padding: "0.4rem" }}
            />
          </label>
        </div>
        <button onClick={loadExisting} style={{ marginTop: "0.75rem" }}>
          Last eksisterende (hvis finnes)
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>Innhold</h2>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Tittel
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Kort beskrivelse
          <input
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Beskrivelse (lang tekst)
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={6}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>PDF og lenker</h2>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Notat-PDF (f.eks. /static/pdf/im-vg1/teknologiforstaelse/maskinvare-notat.pdf)
          <input
            value={notePdf}
            onChange={(e) => setNotePdf(e.target.value)}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Oppgave-PDF
          <input
            value={tasksPdf}
            onChange={(e) => setTasksPdf(e.target.value)}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Form URL (f.eks. Microsoft Forms)
          <input
            value={formUrl}
            onChange={(e) => setFormUrl(e.target.value)}
            style={{ width: "100%", padding: "0.4rem", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      <button onClick={save} style={{ padding: "0.5rem 1.25rem" }}>
        Lagre / opprett undertema
      </button>

      {status && <p style={{ marginTop: "1rem" }}><strong>Status:</strong> {status}</p>}
    </div>
  );
}

export default AdminSubThemePage;

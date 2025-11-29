// src/pages/PdfViewerPage.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildAssetUrl } from "../utils/url";

// pdfjs-dist importları
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";

// Worker'ı ayarla (Vite için doğru pattern)
GlobalWorkerOptions.workerSrc = workerSrc;

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

function PdfViewerPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fileParam = query.get("file"); // örn: /static/pdf/...
  const fileUrl = fileParam ? buildAssetUrl(fileParam) : null;

  // PDF'yi yükle
  useEffect(() => {
    if (!fileUrl) {
      setError("Ingen PDF-fil er angitt.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    const loadingTask = getDocument(fileUrl);

    loadingTask.promise
      .then((loadedPdf) => {
        setPdf(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setPageNumber(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Kunne ikke laste PDF-filen.");
        setLoading(false);
      });

    return () => {
      loadingTask.destroy();
    };
  }, [fileUrl]);

  // Sayfayı canvas'a render et
  useEffect(() => {
    if (!pdf || !canvasRef.current) return;

    let cancelled = false;

    const renderPage = async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;
    };

    renderPage();

    return () => {
      cancelled = true;
    };
  }, [pdf, pageNumber, scale]);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));
  const handleNextPage = () =>
    setPageNumber((p) => (p < numPages ? p + 1 : p));
  const handlePrevPage = () =>
    setPageNumber((p) => (p > 1 ? p - 1 : p));

  const handleDownload = () => {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="pdf-viewer-page">
      <div className="pdf-viewer-page__topbar">
        <button onClick={handleBack} className="btn">
          ← Tilbake
        </button>

        <div className="pdf-viewer-page__controls">
          <button onClick={handlePrevPage} className="btn" disabled={pageNumber <= 1}>
            ◀
          </button>
          <span>
            Side {pageNumber} / {numPages || "?"}
          </span>
          <button onClick={handleNextPage} className="btn" disabled={pageNumber >= numPages}>
            ▶
          </button>

          <span className="pdf-viewer-page__divider">|</span>

          <button onClick={handleZoomOut} className="btn">
            −
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} className="btn">
            +
          </button>

          <span className="pdf-viewer-page__divider">|</span>

          <button onClick={handleDownload} className="btn">
            Åpne i ny fane
          </button>
        </div>
      </div>

      <div className="pdf-viewer-page__body">
        {loading && <p>Laster PDF...</p>}
        {error && !loading && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <div className="pdf-viewer-page__canvas-wrapper">
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfViewerPage;

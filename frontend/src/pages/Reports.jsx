import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getParticipants } from "../services/api";

export default function Reports() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // LOAD PARTICIPANTS
  // =========================================================

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {
    try {
      setLoading(true);

      const data = await getParticipants();

      console.log("REPORT PARTICIPANTS:", data);

      if (data?.success && Array.isArray(data.participants)) {
        setParticipants(data.participants);
      } else {
        setParticipants([]);

        console.error(
          "Unable to load report:",
          data?.message
        );
      }
    } catch (error) {
      console.error(
        "Unable to load participants:",
        error
      );

      setParticipants([]);
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // TOTAL PARTICIPANTS
  // =========================================================

  const totalParticipants = participants.length;

  // =========================================================
  // CHECKED IN
  // =========================================================

  const checkedIn = participants.filter(
    (p) =>
      p.checkin &&
      String(p.checkin).trim() !== ""
  ).length;

  const pending =
    totalParticipants - checkedIn;

  const attendance =
    totalParticipants === 0
      ? 0
      : Math.round(
          (checkedIn / totalParticipants) * 100
        );

  // =========================================================
  // ORGANIZATIONS
  // =========================================================

  const organizations = useMemo(() => {
    const counts = {};

    participants.forEach((p) => {
      const org =
        String(p.organization || "Unknown").trim() ||
        "Unknown";

      counts[org] =
        (counts[org] || 0) + 1;
    });

    return Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    );
  }, [participants]);

  // =========================================================
  // COUNTRIES
  // =========================================================

  const countries = useMemo(() => {
    const counts = {};

    participants.forEach((p) => {
      const country =
        String(p.country || "Unknown").trim() ||
        "Unknown";

      counts[country] =
        (counts[country] || 0) + 1;
    });

    return Object.entries(counts).sort(
      (a, b) => b[1] - a[1]
    );
  }, [participants]);

  const totalCountries =
    countries.length;

  // =========================================================
  // EXPORT CSV
  // =========================================================

  function exportCSV() {
    const rows = [
      [
        "ID",
        "Name",
        "Email",
        "Phone",
        "Organization",
        "Country",
        "Tag Category",
        "Status",
        "Check In",
      ],
    ];

    participants.forEach((p) => {
      rows.push([
        csvValue(p.id),
        csvValue(p.name),
        csvValue(p.email),
        csvValue(p.phone),
        csvValue(p.organization),
        csvValue(p.country),
        csvValue(p.tagCategory),
        csvValue(p.status),
        csvValue(p.checkin),
      ]);
    });

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      "Participant_Report.csv";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }

  function csvValue(value) {
    const text =
      value === null ||
      value === undefined
        ? ""
        : String(value);

    return `"${text.replace(
      /"/g,
      '""'
    )}"`;
  }

  // =========================================================
  // PRINT
  // =========================================================

  function printReport() {
    window.print();
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          PRINT CSS
      ===================================================== */}

      <style>{`

        @media print {

          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            height: auto !important;
            overflow: visible !important;
          }

          body * {
            visibility: hidden;
          }

          #print-report,
          #print-report * {
            visibility: visible;
          }

          #print-report {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .print-card {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .print-section {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          table {
            width: 100% !important;
            border-collapse: collapse !important;
          }

          tr {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          th {
            background: #4B0082 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .kpi-grid {
            display: grid !important;
            grid-template-columns:
              repeat(5, 1fr) !important;
            gap: 8px !important;
          }

          .summary-grid {
            display: grid !important;
            grid-template-columns:
              1fr 1fr !important;
            gap: 15px !important;
          }

          .latest-section {
            margin-top: 20px !important;
          }

          .print-title {
            display: block !important;
          }
        }

        @media screen {

          .print-title {
            display: none;
          }
        }

      `}</style>

      <MainLayout>

        <div
          id="print-report"
          style={{
            padding: 30,
            background: "#F5F7FB",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="print-section">

            <h1
              className="print-title"
              style={{
                color: "#4B0082",
                marginBottom: 5,
                fontSize: 24,
              }}
            >
              ICEE 2026
            </h1>

            <h1
              style={{
                color: "#4B0082",
                marginBottom: 5,
              }}
            >
              📊 Registration Report
            </h1>

            <p
              style={{
                color: "#666",
                marginBottom: 30,
              }}
            >
              Participant Registration Summary
            </p>

          </div>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <div
            className="kpi-grid print-section"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: 20,
              marginBottom: 30,
            }}
          >

            <Card
              title="👥 Total Participants"
              value={totalParticipants}
              color="#4B0082"
            />

            <Card
              title="✅ Checked In"
              value={checkedIn}
              color="#2E8B57"
            />

            <Card
              title="⏳ Pending"
              value={pending}
              color="#F39C12"
            />

            <Card
              title="🏢 Organizations"
              value={organizations.length}
              color="#1976D2"
            />

            <Card
              title="🌍 Countries"
              value={totalCountries}
              color="#009688"
            />

          </div>

          {/* =================================================
              ATTENDANCE
          ================================================= */}

          <div
            className="print-card"
            style={{
              background: "white",
              borderRadius: 15,
              padding: 25,
              marginBottom: 30,
              boxShadow:
                "0 2px 10px rgba(0,0,0,.08)",
            }}
          >

            <h2
              style={{
                color: "#4B0082",
              }}
            >
              Attendance Progress
            </h2>

            <div
              style={{
                marginTop: 20,
                background: "#EEE",
                borderRadius: 50,
                height: 28,
                overflow: "hidden",
              }}
            >

              <div
                style={{
                  width: attendance + "%",
                  background: "#4B0082",
                  height: "100%",
                  transition:
                    "width .3s ease",
                  WebkitPrintColorAdjust:
                    "exact",
                  printColorAdjust:
                    "exact",
                }}
              />

            </div>

            <h2
              style={{
                color: "#4B0082",
                marginTop: 15,
              }}
            >
              {attendance}% Attendance
            </h2>

            <p
              style={{
                color: "#666",
              }}
            >
              {checkedIn} of{" "}
              {totalParticipants}{" "}
              participants have checked in.
            </p>

          </div>

          {/* =================================================
              ORGANIZATION + COUNTRY
          ================================================= */}

          <div
            className="summary-grid print-section"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 20,
              marginBottom: 30,
            }}
          >

            {/* ORGANIZATION */}

            <div
              className="print-card"
              style={{
                background: "white",
                borderRadius: 15,
                padding: 20,
                boxShadow:
                  "0 2px 10px rgba(0,0,0,.08)",
              }}
            >

              <h2
                style={{
                  color: "#4B0082",
                  marginBottom: 15,
                }}
              >
                🏢 Organization Summary
              </h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                }}
              >

                <tbody>

                  {organizations.map(
                    ([org, total]) => (
                      <tr key={org}>

                        <td style={cell}>
                          {org}
                        </td>

                        <td
                          style={{
                            ...cell,
                            textAlign:
                              "right",
                            fontWeight:
                              "bold",
                            color:
                              "#4B0082",
                          }}
                        >
                          {total}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* COUNTRY */}

            <div
              className="print-card"
              style={{
                background: "white",
                borderRadius: 15,
                padding: 20,
                boxShadow:
                  "0 2px 10px rgba(0,0,0,.08)",
              }}
            >

              <h2
                style={{
                  color: "#4B0082",
                  marginBottom: 15,
                }}
              >
                🌍 Country Summary
              </h2>

              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                }}
              >

                <tbody>

                  {countries.map(
                    ([country, total]) => (
                      <tr key={country}>

                        <td style={cell}>
                          {country}
                        </td>

                        <td
                          style={{
                            ...cell,
                            textAlign:
                              "right",
                            fontWeight:
                              "bold",
                            color:
                              "#4B0082",
                          }}
                        >
                          {total}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* =================================================
              PARTICIPANT LIST
          ================================================= */}

          <div
            className="latest-section print-section"
            style={{
              background: "white",
              borderRadius: 15,
              padding: 20,
              boxShadow:
                "0 2px 10px rgba(0,0,0,.08)",
            }}
          >

            <h2
              style={{
                color: "#4B0082",
                marginBottom: 15,
              }}
            >
              👥 Participant List
            </h2>

            <div
              style={{
                overflowX: "auto",
              }}
            >

              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse",
                  fontSize: 12,
                }}
              >

                <thead>

                  <tr
                    style={{
                      background:
                        "#4B0082",
                      color: "white",
                    }}
                  >

                    <th style={cell}>
                      ID
                    </th>

                    <th style={cell}>
                      Name
                    </th>

                    <th style={cell}>
                      Organization
                    </th>

                    <th style={cell}>
                      Country
                    </th>

                    <th style={cell}>
                      Tag Category
                    </th>

                    <th style={cell}>
                      Status
                    </th>

                    <th style={cell}>
                      Check In
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {participants.map(
                    (p) => (

                      <tr key={p.id}>

                        <td style={cell}>
                          {p.id}
                        </td>

                        <td style={cell}>
                          {p.name}
                        </td>

                        <td style={cell}>
                          {p.organization ||
                            "-"}
                        </td>

                        <td style={cell}>
                          {p.country ||
                            "-"}
                        </td>

                        <td style={cell}>
                          {p.tagCategory ||
                            "-"}
                        </td>

                        <td style={cell}>

                          {p.checkin ? (
                            <span
                              style={{
                                color:
                                  "green",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              ✅ Checked In
                            </span>
                          ) : (
                            <span
                              style={{
                                color:
                                  "#E67E22",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              Pending
                            </span>
                          )}

                        </td>

                        <td style={cell}>

                          {p.checkin
                            ? new Date(
                                p.checkin
                              ).toLocaleString()
                            : "-"}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="no-print"
            style={{
              display: "flex",
              gap: 15,
              marginTop: 30,
              flexWrap: "wrap",
            }}
          >

            <button
              style={purpleButton}
              onClick={exportCSV}
            >
              📥 Export CSV
            </button>

            <button
              style={greenButton}
              onClick={printReport}
            >
              🖨 Print Report
            </button>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <p
              className="no-print"
              style={{
                marginTop: 25,
              }}
            >
              Loading report...
            </p>
          )}

        </div>

      </MainLayout>
    </>
  );
}

// ==========================================================
// KPI CARD
// ==========================================================

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      className="print-card"
      style={{
        background: "white",
        borderRadius: 15,
        padding: 20,
        borderTop:
          `6px solid ${color}`,
        boxShadow:
          "0 2px 10px rgba(0,0,0,.08)",
      }}
    >

      <h3
        style={{
          color: "#666",
          marginBottom: 10,
          fontSize: 15,
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color,
          margin: 0,
          fontSize: 36,
        }}
      >
        {value}
      </h1>

    </div>
  );
}

// ==========================================================
// TABLE CELL
// ==========================================================

const cell = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  verticalAlign: "top",
};

// ==========================================================
// BUTTONS
// ==========================================================

const purpleButton = {
  background: "#4B0082",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
  fontWeight: "bold",
};

const greenButton = {
  background: "#2E8B57",
  color: "white",
  border: "none",
  borderRadius: 8,
  padding: "12px 20px",
  cursor: "pointer",
  fontWeight: "bold",
};

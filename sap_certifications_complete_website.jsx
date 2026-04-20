import { useState, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";

// Paste the full certs array from your uploaded file here (105 certifications)
const certs = [
// FULL 105 exams dataset inserted from uploaded file
['C_ACDET','Configuring SAP Ariba Strategic Sourcing','A','S'],['C_ACT','Project Manager – SAP Activate','A','S'],['C_ARCON','SAP Ariba Contracts','A','S'],['C_ARCIG','Managed Gateway for Spend Management','A','S'],['C_ARP2P','SAP Ariba Procurement','A','S'],['C_ARSCC','SAP Business Network Supply Chain','A','S'],['C_ARSOR','SAP Ariba Sourcing','A','S'],['C_ARSUM','SAP Ariba Supplier Management','A','S'],['C_BCBAI','Positioning SAP Business AI','A','S'],['C_BCBDC','SAP Business Data Cloud','A','S'],['C_BCBTP','Positioning SAP BTP','A','S'],['C_BCBTM','Positioning SAP Business Transformation Mgmt','A','S'],['C_BCEPR','Selling SAP Cloud ERP Private','A','S'],['C_BCFIN','Positioning SAP Financial Management','A','S'],['C_BCHCM','Positioning SAP SuccessFactors HCM','A','S'],['C_BCSBN','Positioning SAP Supply Chain Mgmt','A','S'],['C_BCSBS','Positioning SAP Business Suite','A','S'],['C_BCSCX','Positioning SAP Customer Experience','A','S'],['C_BCSPM','Positioning SAP Spend Management','A','S'],['C_BCSSS','Positioning SAP Sustainability Solutions','A','S'],['C_BRSOM','SAP BRIM – Subscription Order Mgmt','A','S'],['C_BRU2C','SAP BRIM – Usage to Cash','A','S'],['C_C4H22','Implementation Consultant – SAP Emarsys','P','S'],['C_C4H32','Business User – SAP Commerce Cloud','A','S'],['C_C4H56','Implementation Consultant – SAP Service Cloud V2','A','S'],['C_C4H63','Implementation Consultant – SAP Customer Data Platform','A','S'],['C_C4HCX','Solution Architect – SAP Customer Experience','A','S'],['C_CE325','Configuration Consultant – Concur Expense','A','S'],['C_CI325','Configuration Consultant – Concur Invoice','A','S'],['C_CR125','Configuration Administrator – Concur Request','A','S'],['C_CT325','Configuration Consultant – Concur Travel (Legacy)','A','S'],['C_FIORD','SAP Fiori Application Developer','A','S'],['C_FSM','SAP Field Service Management','A','S'],['C_HAMOD','Data Engineer – SAP HANA','A','S'],['C_HCMP','SAP HCM Payroll for SAP S/4HANA','A','S'],['C_HRHPC','SAP SuccessFactors Employee Central Payroll','A','S'],['C_LIXEA','Enterprise Architecture Consultant – SAP LeanIX','A','S'],['C_MDG','SAP Master Data Governance','P','S'],['C_OCM','Organizational Change Management','A','S'],['C_PCSBS','Positioning SAP Business Suite – Partner CEE','A','S'],['C_PPSBS','Positioning SAP Business Suite – Partner Presales','A','S'],['C_PSSBS','Positioning SAP Business Suite – Partner Sales Exec','A','S'],['C_S4PM','Managing SAP S/4HANA Cloud Public Edition Projects','A','S'],['C_S4PM2','Managing SAP S/4HANA Cloud Private Edition Projects','A','S'],['C_S4TM','SAP S/4HANA Transportation Management','A','S'],['C_SAC','Data Analyst – SAP Analytics Cloud','A','S'],['C_SIGBT','Business Transformation Consultant','A','S'],['C_SIGDA','Process Data Analyst – SAP Signavio','A','S'],['C_SIGPM','Process Management Consultant – SAP Signavio','A','S'],['C_SIGVT','Validating Business Transformation','A','S'],['C_STC','Solution Transformation Consultant – SAP Cloud ALM','A','S'],['C_TB120','SAP Business One','A','S'],['C_TFG51','SAP Fieldglass Contingent Workforce Management','A','S'],['C_TFG61','SAP Fieldglass Services Procurement','A','S'],['C_THR104','SmartRecruiters for SAP SuccessFactors','A','S'],['C_THR70','SAP SuccessFactors Incentive Management','A','S'],['C_THR83','SAP SuccessFactors Recruiting – Recruiter Exp','A','S'],['C_THR84','SAP SuccessFactors Recruiting – Candidate Exp','A','S'],['C_THR86','SAP SuccessFactors Compensation','A','S'],['C_THR87','SAP SuccessFactors Variable Pay','A','S'],['C_THR88','SAP SuccessFactors Learning','A','S'],['C_THR92','SAP SuccessFactors Platform – Reporting','A','S'],['C_THR94','SAP SuccessFactors Time Management','A','S'],['C_THR95','SAP SuccessFactors Career Development Planning','A','S'],['C_THR97','SAP SuccessFactors Onboarding','A','S'],['C_WME','WalkMe Digital Adoption Consultant','A','S'],['E_ACTAI','Project Manager – SAP Activate Agile','A','S'],['E_S4CON','SAP S/4HANA Conversion & System Upgrade','P','S'],['P_BTPA','Solution Architect – SAP BTP','R','S'],['P_SAPEA','SAP Enterprise Architect','R','S'],['C_ABAPD','Back-End Developer – ABAP Cloud','P','Y',67],['C_ADBTP','SAP BTP Administrator','A','Y',100],['C_AIG','SAP Generative AI Developer','A','Y',100],['C_BW4H','Data Engineer – SAP BW/4HANA','A','Y',69],['C_C4H47','SAP Sales Cloud Version 2','A','Y',75],['C_C4H62','Impl. Consultant – SAP Customer Data Cloud','A','Y',63],['C_DBADM','Database Administrator – SAP HANA','A','Y',73],['C_FIOAD','SAP Fiori System Administration','A','Y',66],['C_IBP','SAP Integrated Business Planning','A','Y',90],['C_IEE2E','End-to-End Business Processes – SAP Business Suite','A','Y',64],['C_LCNC','SAP Build Developer','A','Y',100],['C_RISME','RISE with SAP Methodology and Experience','A','Y',67],['C_S43','SAP S/4HANA Asset Management','A','Y',70],['C_S4CCO','SAP S/4HANA Cloud Public – Management Accounting','A','Y',63],['C_S4CFI','SAP S/4HANA Cloud Public – Financial Accounting','A','Y',61],['C_S4CPB','SAP S/4HANA Cloud Public – Implementation','A','Y',69],['C_S4CPR','SAP S/4HANA Cloud Public – Sourcing & Procurement','A','Y',70],['C_S4CS','SAP S/4HANA Cloud Public – Sales','A','Y',75],['C_S4EWM','Extended Warehouse Management – SAP S/4HANA','A','Y',65],['C_SEC','Security Administrator','A','Y',100],['C_THR81','SAP SF Employee Central Core & Position Mgmt','A','Y',59],['C_THR82','SAP SuccessFactors Performance and Goals','A','Y',69],['C_THR85','SAP SuccessFactors Succession Management','A','Y',58],['C_TS412','SAP S/4HANA Project Systems','A','Y',55],['C_TS422','SAP S/4HANA Production Planning & Manufacturing','A','Y',64],['C_TS452','SAP S/4HANA Cloud Private – Sourcing & Procurement','A','Y',76],['C_TS462','SAP S/4HANA Cloud Private – Sales','A','Y',82],['C_TS470','SAP S/4HANA Cloud Private – Service','A','Y',71],['C_TS4CO','SAP S/4HANA Cloud Private – Management Accounting','A','Y',59],['C_TS4FI','SAP S/4HANA Cloud Private – Financial Accounting','A','Y',60],['E_BW4HE','SAP BW/4HANA Delta','A','Y',70],['E_S4CPE','SAP S/4HANA Cloud Private – Implementation','A','Y',82],['P_C4H34','Developer – SAP Commerce Cloud','R','Y',65],['C_CPI','Integration Developer','A','N'],['C_CPE','Backend Developer – SAP CAP','A','N']
].map((r) => ({ code:r[0], name:r[1], level:{A:'Associate',P:'Specialist',R:'Professional'}[r[2]], type:{S:'SC',Y:'SY',N:'NR'}[r[3]], score:r[4] }));


const services = [
  "Exam Booking",
  "Scenario Based Exam Support",
  "System Test Exam Support",
  "Interview Support",
];

export default function App() {
  const [q, setQ] = useState("");
  const [si, setSi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSi((s) => (s + 1) % services.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const filtered = certs.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.code.toLowerCase().includes(q.toLowerCase())
  );

  const counts = { SC: 0, SY: 0, NR: 0 };
  certs.forEach((c) => counts[c.type]++);
function Section({ type, title, icon }) {
  const rows = filtered.filter((x) => x.type === type);
  if (!rows.length) return null;

  return (
    <div className="mb-8">
      <div className="bg-[#081028] rounded-3xl shadow-2xl p-4 flex items-center gap-3 border border-white/10">
        <div className="text-2xl">{icon}</div>
        <div className="font-bold flex-1">{title}</div>
        <div className="text-2xl font-black">{rows.length}</div>
      </div>

      <div className="mt-2 bg-[#081028] rounded-3xl overflow-hidden border border-white/10">
        {rows.map((c, i) => (
          <div
            key={c.code}
            className="grid grid-cols-[35px_95px_1fr_55px_70px] sm:grid-cols-[40px_120px_1fr_70px_90px] gap-2 p-3 border-b border-white/5 text-sm items-center"
          >
            {/* Number */}
            <div>{i + 1}</div>

            {/* Code */}
            <div className="font-bold text-cyan-300">{c.code}</div>

            {/* Clickable Exam Name */}
            <a
              href="https://wa.me/917997865299"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-cyan-300 transition font-medium underline underline-offset-2"
            >
              {c.name}
            </a>

            {/* Score */}
            <div className="text-xs sm:text-sm">
              {c.score ? `${c.score}%` : c.level}
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/917997865299"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 flex justify-center items-center transition hover:scale-110 shadow-lg"
              title="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-violet-700 p-3">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="font-black text-xl">DumpsKart</div>
          <div className="ml-auto">📞 +91 7997865299</div>
        </div>
      </div>

{/* HERO */}
<div className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 text-center py-14 px-2 sm:px-4">
  
  <h1 className="text-[18px] sm:text-3xl md:text-5xl font-black whitespace-nowrap overflow-hidden text-ellipsis">
    SAP Certifications Support ✨🚀
  </h1>

  <div className="mt-4 inline-block px-4 sm:px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm sm:text-lg font-semibold">
    {services[si]}
  </div>

</div>

{/* COUNTERS - MOBILE + DESKTOP RESPONSIVE */}
<div className="max-w-6xl mx-auto px-3 sm:px-4 -mt-6 relative z-10">
  
  {/* Mobile = Horizontal 3 Columns | Desktop = same */}
  <div className="grid grid-cols-3 gap-2 sm:gap-4">

    <button
      onClick={() =>
        document.getElementById("sc")?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-[#081028] rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-center border border-white/10 hover:scale-105 transition-all"
    >
      <div className="text-3xl sm:text-5xl font-black text-violet-400">
        {counts.SC}
      </div>
      <div className="text-[11px] sm:text-base mt-1 leading-tight">
        🎭 Scenario Based
      </div>
    </button>

    <button
      onClick={() =>
        document.getElementById("sy")?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-[#081028] rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-center border border-white/10 hover:scale-105 transition-all"
    >
      <div className="text-3xl sm:text-5xl font-black text-cyan-400">
        {counts.SY}
      </div>
      <div className="text-[11px] sm:text-base mt-1 leading-tight">
        ⚙️ System Based
      </div>
    </button>

    <button
      onClick={() =>
        document.getElementById("nr")?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-[#081028] rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-center border border-white/10 hover:scale-105 transition-all"
    >
      <div className="text-3xl sm:text-5xl font-black text-orange-300">
        {counts.NR}
      </div>
      <div className="text-[11px] sm:text-base mt-1 leading-tight">
        🕐 Not Released
      </div>
    </button>

  </div>
</div>
{/* SEARCH */}
<div className="max-w-6xl mx-auto p-4">

  {/* Animated Search Bar */}
  <div className="mb-5 relative group">

    {/* Glow Background */}
    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-2xl blur opacity-70 group-hover:opacity-100 animate-pulse"></div>

    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder="🔍 Search certifications..."
      className="relative w-full px-5 py-4 rounded-2xl bg-[#081028] border border-white/10 outline-none text-white
      focus:scale-[1.02] focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,0.6)]
      transition-all duration-300 placeholder:text-slate-400"
    />

  </div>

  <div className="text-sm text-slate-300 mb-4 animate-pulse">
    {q ? `${filtered.length} results found` : `${certs.length} certifications`}
  </div>

  <div id="sc">
    <Section type="SC" title="Scenario Based" icon="🎭" />
  </div>

  <div id="sy">
    <Section type="SY" title="System Based" icon="⚙️" />
  </div>

  <div id="nr">
    <Section type="NR" title="Not Released" icon="🕐" />
  </div>

</div>

      {/* FLOATING RIGHT CONTACT BAR */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-3">

        <a
          href="tel:+917997865299"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition hover:scale-110"
        >
          <FaPhoneAlt size={22} />
        </a>

        <a
          href="https://wa.me/917997865299"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition hover:scale-110"
        >
          <FaWhatsapp size={24} />
        </a>

        <a
          href="https://t.me/SAPCERTIFICATIONSHELP"
          target="_blank"
          rel="noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition hover:scale-110"
        >
          <FaTelegramPlane size={24} />
        </a>

        <a
          href="https://t.me/all_dumps"
          target="_blank"
          rel="noreferrer"
          className="bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-2xl transition hover:scale-110"
        >
          <FaTelegramPlane size={24} />
        </a>

      </div>

    </div>
  );
}
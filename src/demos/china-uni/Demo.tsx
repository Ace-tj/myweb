"use client";
import { useState } from "react";
import {
  IconSearch, IconMapPin, IconStar, IconUsers, IconBook,
  IconUpload, IconCheck, IconClock, IconChevronRight,
  IconArrowLeft, IconPlus, IconEye, IconBuildingSkyscraper,
  IconSchool, IconGlobe, IconMedal,
} from "@tabler/icons-react";

type Role = "public" | "student" | "agent";
type Page = "catalog" | "detail" | "apply" | "applications" | "agent-dash" | "post-uni" | "review-apps";

const UNIVERSITIES = [
  { id: 1, name: "Tsinghua University", city: "Beijing", ranking: "#1 China", tuition: "$4,500/yr", grant: "Up to $8,000", acceptance: "6%", programs: ["Computer Science","Engineering","Business","Medicine"], lang: "Chinese + English", emoji: "🏛️", desc: "China's top university, world-renowned for science and technology." },
  { id: 2, name: "Peking University",   city: "Beijing", ranking: "#2 China", tuition: "$4,200/yr", grant: "Up to $7,500", acceptance: "8%", programs: ["Medicine","Law","Economics","Physics"], lang: "Chinese + English", emoji: "🎓", desc: "One of Asia's most prestigious universities with a 125-year history." },
  { id: 3, name: "Fudan University",    city: "Shanghai",ranking: "#3 China", tuition: "$3,800/yr", grant: "Up to $6,000", acceptance: "10%",programs: ["Journalism","Finance","Chemistry","History"], lang: "Chinese", emoji: "🏫", desc: "Leading research university in Shanghai's heart of innovation." },
  { id: 4, name: "Zhejiang University", city: "Hangzhou",ranking: "#4 China", tuition: "$3,500/yr", grant: "Up to $5,500", acceptance: "12%",programs: ["Agriculture","Pharmacy","Architecture","IT"], lang: "Chinese + English", emoji: "🏢", desc: "Top-ranked comprehensive university in scenic Hangzhou." },
  { id: 5, name: "Shanghai Jiao Tong", city: "Shanghai",ranking: "#5 China", tuition: "$4,000/yr", grant: "Up to $7,000", acceptance: "9%", programs: ["Engineering","AI","Naval Arch","Finance"], lang: "English Track", emoji: "⚙️", desc: "World-class engineering and technology institution." },
  { id: 6, name: "Nanjing University",  city: "Nanjing", ranking: "#6 China", tuition: "$3,200/yr", grant: "Up to $4,500", acceptance: "14%",programs: ["Physics","Chemistry","Astronomy","Literature"], lang: "Chinese", emoji: "🌟", desc: "Historic university famous for fundamental sciences." },
];

const APPLICATIONS = [
  { id: "APP-2026-001", university: "Tsinghua University",  program: "Computer Science",  status: "Under Review",  submitted: "May 5", docs: { passport: true, transcript: true, lang: true, letter: true } },
  { id: "APP-2026-002", university: "Fudan University",     program: "Finance",           status: "Accepted",       submitted: "Apr 20",docs: { passport: true, transcript: true, lang: true, letter: true } },
  { id: "APP-2026-003", university: "Zhejiang University",  program: "Architecture",      status: "Awaiting Docs",  submitted: "May 10",docs: { passport: true, transcript: false,lang: false,letter: true } },
];

const AGENT_APPS = [
  { id: "APP-2026-001", student: "Amir Karimov",   university: "Tsinghua",  program: "CS",       status: "Under Review", submitted: "May 5" },
  { id: "APP-2026-004", student: "Dilnoza Yusupova",university: "PKU",       program: "Medicine", status: "New",          submitted: "May 13" },
  { id: "APP-2026-005", student: "Rustam Nazarov",  university: "SJTU",      program: "Engineering",status:"Accepted",    submitted: "Apr 15" },
  { id: "APP-2026-006", student: "Barno Tashkentova",university:"Fudan",     program: "Finance",  status: "Rejected",     submitted: "Apr 2" },
];

const STATUS_STYLE: Record<string, string> = {
  "Under Review": "bg-blue-100 text-blue-700",
  "Accepted":     "bg-emerald-100 text-emerald-700",
  "Awaiting Docs":"bg-amber-100 text-amber-700",
  "Rejected":     "bg-red-100 text-red-700",
  "New":          "bg-purple-100 text-purple-700",
};

const CITIES = ["All Cities", "Beijing", "Shanghai", "Hangzhou", "Nanjing"];
const PROGRAMS = ["All Programs", "Engineering", "Medicine", "Business", "Sciences", "Arts"];

export default function ChinaUniDemo() {
  const [role, setRole]             = useState<Role>("public");
  const [page, setPage]             = useState<Page>("catalog");
  const [selectedUni, setSelectedUni] = useState(UNIVERSITIES[0]);
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [search, setSearch]         = useState("");
  const [step, setStep]             = useState(1);
  const [selectedProgram, setSelectedProgram] = useState("");

  const filteredUnis = UNIVERSITIES.filter((u) => {
    if (cityFilter !== "All Cities" && u.city !== cityFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  /* ── HEADER ── */
  const Header = () => (
    <header className="sticky top-0 z-40 bg-[#6b0f1a] text-white border-b border-[#8b1a24]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button onClick={() => { setPage("catalog"); setRole("public"); }} className="flex items-center gap-2 font-extrabold text-xl">
          <span className="text-2xl">🏛️</span> ChinaEdu
        </button>
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <button onClick={() => { setPage("catalog"); setRole("public"); }} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${page === "catalog" && role === "public" ? "bg-white/20" : "hover:bg-white/10"}`}>Universities</button>
          <button onClick={() => { setPage("applications"); setRole("student"); }} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${role === "student" ? "bg-white/20" : "hover:bg-white/10"}`}>Student View</button>
          <button onClick={() => { setPage("agent-dash"); setRole("agent"); }} className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${role === "agent" ? "bg-white/20" : "hover:bg-white/10"}`}>Agent Portal</button>
        </nav>
        <div className="flex items-center gap-2">
          <div className="text-xs bg-white/20 px-3 py-1.5 rounded-full">
            {role === "agent" ? "🔑 Agent: agent1@demo" : role === "student" ? "👤 Student: student1@demo" : "🌐 Visitor"}
          </div>
        </div>
      </div>
    </header>
  );

  /* ── CATALOG ── */
  if (page === "catalog") return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#6b0f1a] to-[#9b1c2a] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">🎓 2026 Admissions Open</div>
          <h1 className="text-5xl font-extrabold mb-4">Study in China</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">Access top Chinese universities with grants up to $8,000/year. Our agents guide you from application to visa.</p>
          <div className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1"><IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search universities..." className="w-full pl-9 pr-3 py-3 text-sm rounded-xl text-neutral-900 focus:outline-none" /></div>
            <button className="px-5 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-400 transition-colors whitespace-nowrap">Search</button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[["6+","Universities"],["$8k","Max Grant"],["95%","Visa Success"],["24/7","Support"]].map(([v,l]) => (
            <div key={l} className="bg-white rounded-2xl border border-amber-100 p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-[#6b0f1a]">{v}</div>
              <div className="text-xs text-neutral-500 mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CITIES.map((c) => (<button key={c} onClick={() => setCityFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${cityFilter === c ? "bg-[#6b0f1a] text-white border-[#6b0f1a]" : "bg-white border-amber-200 text-neutral-600 hover:border-[#6b0f1a]"}`}>{c}</button>))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUnis.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="h-32 bg-gradient-to-br from-[#6b0f1a] to-[#9b1c2a] flex items-center justify-center"><span className="text-6xl">{u.emoji}</span></div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs text-neutral-400 flex items-center gap-1"><IconMapPin size={11}/> {u.city} · {u.ranking}</div>
                    <h3 className="font-extrabold text-lg text-neutral-900 mt-0.5 leading-tight">{u.name}</h3>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <div className="text-xs text-neutral-400">From</div>
                    <div className="font-extrabold text-[#6b0f1a]">{u.tuition}</div>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mb-3 leading-relaxed">{u.desc}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {u.programs.slice(0,3).map((p) => (<span key={p} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">{p}</span>))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedUni(u); setPage("detail"); }} className="flex-1 py-2 border border-[#6b0f1a] text-[#6b0f1a] rounded-xl text-xs font-bold hover:bg-[#6b0f1a] hover:text-white transition-colors">Details</button>
                  <button onClick={() => { setSelectedUni(u); setPage("apply"); setRole("student"); setStep(1); }} className="flex-1 py-2 bg-[#6b0f1a] text-white rounded-xl text-xs font-bold hover:bg-[#8b1a24] transition-colors">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── DETAIL ── */
  if (page === "detail") return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => setPage("catalog")} className="flex items-center gap-1.5 text-sm text-[#6b0f1a] hover:underline mb-5"><IconArrowLeft size={14}/> All Universities</button>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
              <div className="h-48 bg-gradient-to-br from-[#6b0f1a] to-[#9b1c2a] flex items-center justify-center"><span className="text-8xl">{selectedUni.emoji}</span></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-neutral-400 flex items-center gap-1 mb-1"><IconMapPin size={11}/> {selectedUni.city} · {selectedUni.ranking}</div>
                    <h1 className="text-3xl font-extrabold text-neutral-900">{selectedUni.name}</h1>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">{selectedUni.acceptance} acceptance</span>
                </div>
                <p className="text-neutral-600 leading-relaxed mb-5">{selectedUni.desc} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[["Tuition",selectedUni.tuition],["Grant Available",selectedUni.grant],["Language",selectedUni.lang],["Acceptance Rate",selectedUni.acceptance]].map(([k,v]) => (
                    <div key={String(k)} className="bg-amber-50 rounded-xl p-3"><div className="text-xs text-neutral-400 mb-0.5">{k}</div><div className="font-bold text-neutral-900">{v}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
              <h3 className="font-extrabold text-lg mb-3">Programs Offered</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedUni.programs.map((p) => (<div key={p} className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-lg text-sm font-medium"><IconBook size={14} className="text-[#6b0f1a]"/>{p}</div>))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
              <h3 className="font-extrabold text-lg mb-3">Application Requirements</h3>
              <div className="flex flex-col gap-2">
                {[["Passport Copy","Valid for 2+ years"],["Academic Transcripts","Last 3 years with notarized translation"],["Language Certificate","HSK 4+ or IELTS 6.0+ (English track)"],["Motivation Letter","500–800 words"],["Medical Certificate","From licensed hospital"]].map(([req,detail]) => (
                  <div key={String(req)} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                    <IconCheck size={14} className="text-emerald-500 mt-0.5 shrink-0"/>
                    <div><div className="text-sm font-semibold">{req}</div><div className="text-xs text-neutral-400">{detail}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-fit space-y-4">
            <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-xs text-neutral-400 mb-1">Tuition per year</div>
                <div className="text-4xl font-extrabold text-[#6b0f1a]">{selectedUni.tuition}</div>
                <div className="text-xs text-emerald-600 font-bold mt-1">+ Grant: {selectedUni.grant}</div>
              </div>
              <button onClick={() => { setPage("apply"); setRole("student"); setStep(1); }} className="w-full py-3 bg-[#6b0f1a] text-white font-extrabold rounded-xl hover:bg-[#8b1a24] transition-colors mb-2">Apply Now →</button>
              <button onClick={() => setPage("catalog")} className="w-full py-2 border border-amber-200 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-50 transition-colors">← All Universities</button>
              <div className="mt-4 text-xs text-neutral-400 text-center">🕐 Application deadline: July 15, 2026</div>
            </div>
            <div className="bg-[#6b0f1a] text-white rounded-2xl p-4 text-sm">
              <div className="font-bold mb-2">🤝 Your Agent</div>
              <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold">A</div><div><div className="font-semibold text-sm">Agent Wang Li</div><div className="text-[10px] text-white/60">ChinaEdu Certified</div></div></div>
              <button className="w-full py-2 bg-white/20 rounded-lg text-xs font-semibold hover:bg-white/30 transition-colors">💬 Chat with Agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── APPLY (multi-step) ── */
  if (page === "apply") return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => setPage("detail")} className="flex items-center gap-1.5 text-sm text-[#6b0f1a] hover:underline mb-5"><IconArrowLeft size={14}/> Back</button>
        <h1 className="text-2xl font-extrabold mb-2">Apply to {selectedUni.name}</h1>
        {/* Steps */}
        <div className="flex items-center gap-0 mb-8">
          {["Personal Info","Documents","Program","Review"].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center gap-2 ${i < step - 1 ? "text-emerald-600" : i === step - 1 ? "text-[#6b0f1a] font-bold" : "text-neutral-300"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 ${i < step - 1 ? "bg-emerald-500 border-emerald-500 text-white" : i === step - 1 ? "border-[#6b0f1a] text-[#6b0f1a]" : "border-neutral-200 text-neutral-300"}`}>{i < step - 1 ? <IconCheck size={13}/> : i + 1}</div>
                <span className="text-xs hidden sm:block">{s}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 mx-1 ${i < step - 1 ? "bg-emerald-300" : "bg-neutral-200"}`}/>}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
          {step === 1 && (
            <div>
              <h2 className="font-extrabold text-lg mb-4">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Full Name (as in passport)","Date of Birth","Nationality","Passport Number","Email Address","Phone Number","Current Address","Emergency Contact"].map((f) => (
                  <div key={f} className={f === "Current Address" ? "sm:col-span-2" : ""}><label className="text-xs font-semibold text-neutral-500 block mb-1">{f}</label><input placeholder={f} className="w-full text-sm border border-amber-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#6b0f1a] transition-colors" /></div>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="font-extrabold text-lg mb-4">Upload Documents</h2>
              <div className="flex flex-col gap-3">
                {[{label:"Passport Copy",required:true,tip:"PDF or JPG, max 5MB"},{label:"Academic Transcripts",required:true,tip:"Last 3 years with translation"},{label:"Language Certificate (HSK/IELTS)",required:true,tip:"Minimum HSK 4 or IELTS 6.0"},{label:"Motivation Letter",required:true,tip:"500–800 words, PDF"},{label:"Medical Certificate",required:false,tip:"Optional for initial application"}].map((doc) => (
                  <div key={doc.label} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div><div className="flex items-center gap-1.5 font-semibold text-sm">{doc.label}{doc.required && <span className="text-red-500 text-xs">*</span>}</div><div className="text-xs text-neutral-400">{doc.tip}</div></div>
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-[#6b0f1a] text-white text-xs font-bold rounded-lg hover:bg-[#8b1a24] transition-colors"><IconUpload size={12}/> Upload</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="font-extrabold text-lg mb-4">Choose Program</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {selectedUni.programs.map((p) => (
                  <button key={p} onClick={() => setSelectedProgram(p)} className={`p-4 rounded-xl border-2 text-left transition-all ${selectedProgram === p ? "border-[#6b0f1a] bg-red-50" : "border-amber-200 hover:border-amber-400"}`}>
                    <div className="font-bold text-sm">{p}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">Bachelor · 4 years</div>
                  </button>
                ))}
              </div>
              <div><label className="text-xs font-semibold text-neutral-500 block mb-1">Academic Background</label><textarea rows={3} placeholder="Briefly describe your academic background and why you chose this program..." className="w-full text-sm border border-amber-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#6b0f1a] resize-none" /></div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="font-extrabold text-lg mb-4">Review & Submit</h2>
              <div className="bg-amber-50 rounded-xl p-4 mb-5">
                <div className="font-bold mb-3">Application Summary</div>
                {[["University",selectedUni.name],["Program",selectedProgram || selectedUni.programs[0]],["City",selectedUni.city],["Tuition",selectedUni.tuition],["Grant",selectedUni.grant]].map(([k,v]) => (
                  <div key={String(k)} className="flex justify-between text-sm py-1.5 border-b border-amber-200 last:border-0"><span className="text-neutral-500">{k}</span><span className="font-semibold">{v}</span></div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {["Passport: ✅ Uploaded","Transcripts: ✅ Uploaded","Language Certificate: ✅ Uploaded","Motivation Letter: ✅ Uploaded"].map((d,i) => (<div key={i} className="flex items-center gap-2 text-sm text-emerald-600"><IconCheck size={14}/>{d}</div>))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-600">📋 Our agent will review your application within 3–5 business days and contact you via email.</div>
            </div>
          )}
          <div className="flex gap-3 mt-6">
            {step > 1 && <button onClick={() => setStep(step - 1)} className="flex-1 py-3 border border-amber-200 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors">← Back</button>}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="flex-1 py-3 bg-[#6b0f1a] text-white rounded-xl font-bold text-sm hover:bg-[#8b1a24] transition-colors">Continue →</button>
            ) : (
              <button onClick={() => { setPage("applications"); setRole("student"); }} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors">Submit Application ✓</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  /* ── STUDENT: MY APPLICATIONS ── */
  if (page === "applications") return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-extrabold">My Applications</h1><p className="text-sm text-neutral-500">Logged in as: student1@demo</p></div>
          <button onClick={() => setPage("catalog")} className="flex items-center gap-2 px-4 py-2 bg-[#6b0f1a] text-white font-bold rounded-xl hover:bg-[#8b1a24] transition-colors text-sm"><IconPlus size={15}/> New Application</button>
        </div>
        <div className="flex flex-col gap-4">
          {APPLICATIONS.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-extrabold text-lg">{app.university}</div>
                  <div className="text-sm text-neutral-500">{app.program} · {app.id}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Submitted: {app.submitted}</div>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_STYLE[app.status]}`}>{app.status}</span>
              </div>
              {/* Document status */}
              <div className="flex gap-3 mb-4">
                {[["Passport",app.docs.passport],["Transcript",app.docs.transcript],["Language",app.docs.lang],["Letter",app.docs.letter]].map(([label,ok]) => (
                  <div key={String(label)} className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${ok ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                    {ok ? <IconCheck size={11}/> : <span>!</span>} {label}
                  </div>
                ))}
              </div>
              {/* Timeline */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {["Submitted","Under Review","Decision Made","Visa Application","Enrolled"].map((s, i) => {
                  const idx = app.status === "Accepted" ? 3 : app.status === "Under Review" ? 1 : app.status === "Awaiting Docs" ? 0 : 1;
                  return (<div key={s} className="flex items-center gap-1 shrink-0">
                    <div className={`w-2 h-2 rounded-full ${i <= idx ? "bg-[#6b0f1a]" : "bg-neutral-200"}`}/>
                    <span className={`text-[9px] font-medium ${i <= idx ? "text-[#6b0f1a]" : "text-neutral-300"}`}>{s}</span>
                    {i < 4 && <div className={`w-5 h-0.5 ${i < idx ? "bg-[#6b0f1a]" : "bg-neutral-200"}`}/>}
                  </div>);
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── AGENT DASHBOARD ── */
  if (page === "agent-dash") return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-extrabold">Agent Dashboard</h1><p className="text-sm text-neutral-500">agent1@demo · ChinaEdu Certified Agent</p></div>
          <div className="flex gap-2">
            <button onClick={() => setPage("post-uni")} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors text-sm"><IconPlus size={15}/> Post University</button>
            <button onClick={() => setPage("review-apps")} className="flex items-center gap-2 px-4 py-2 bg-[#6b0f1a] text-white font-bold rounded-xl hover:bg-[#8b1a24] transition-colors text-sm"><IconEye size={15}/> Review Apps</button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[{label:"Total Applications",value:"4",icon:<IconUsers size={20}/>,color:"text-blue-500"},{label:"Accepted",value:"1",icon:<IconCheck size={20}/>,color:"text-emerald-500"},{label:"Pending Review",value:"2",icon:<IconClock size={20}/>,color:"text-amber-500"},{label:"Universities Posted",value:`${UNIVERSITIES.length}`,icon:<IconBuildingSkyscraper size={20}/>,color:"text-purple-500"}].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-amber-100 p-4 shadow-sm">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-xs text-neutral-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
          <h3 className="font-extrabold text-lg mb-4">Assigned Applications</h3>
          <div className="flex flex-col divide-y divide-amber-50">
            {AGENT_APPS.map((app) => (
              <div key={app.id} className="flex items-center justify-between py-3 hover:bg-amber-50 px-2 rounded-lg cursor-pointer" onClick={() => setPage("review-apps")}>
                <div><div className="font-semibold text-sm">{app.student}</div><div className="text-xs text-neutral-400">{app.university} — {app.program} · {app.submitted}</div></div>
                <div className="flex items-center gap-3"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[app.status]}`}>{app.status}</span><IconChevronRight size={14} className="text-neutral-300"/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ── AGENT: POST UNIVERSITY ── */
  if (page === "post-uni") return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={() => setPage("agent-dash")} className="flex items-center gap-1.5 text-sm text-[#6b0f1a] hover:underline mb-5"><IconArrowLeft size={14}/> Back to Dashboard</button>
        <h1 className="text-2xl font-extrabold mb-6">Post New University</h1>
        <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            {["University Name","City","Official Website","QS World Ranking","Acceptance Rate (%)","Annual Tuition (USD)","Grant Available (USD)","Instruction Language","Application Deadline","Number of Programs"].map((f) => (
              <div key={f} className={f === "University Name" ? "sm:col-span-2" : ""}>
                <label className="text-xs font-semibold text-neutral-500 block mb-1">{f}</label>
                <input placeholder={f} className="w-full text-sm border border-amber-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#6b0f1a] transition-colors" />
              </div>
            ))}
            <div className="sm:col-span-2"><label className="text-xs font-semibold text-neutral-500 block mb-1">Description</label><textarea rows={4} placeholder="University description..." className="w-full text-sm border border-amber-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#6b0f1a] resize-none transition-colors" /></div>
            <div className="sm:col-span-2"><label className="text-xs font-semibold text-neutral-500 block mb-1">Programs (comma separated)</label><input placeholder="e.g. Computer Science, Engineering, Business" className="w-full text-sm border border-amber-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#6b0f1a] transition-colors" /></div>
          </div>
          <div className="mt-4 p-4 border-2 border-dashed border-amber-200 rounded-xl text-center cursor-pointer hover:bg-amber-50 transition-colors">
            <IconUpload size={24} className="text-amber-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-neutral-600">Upload university photos</div>
            <div className="text-xs text-neutral-400">PNG, JPG up to 10MB each</div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={() => setPage("agent-dash")} className="flex-1 py-3 border border-amber-200 rounded-xl font-bold text-sm hover:bg-amber-50">Cancel</button>
            <button onClick={() => setPage("agent-dash")} className="flex-1 py-3 bg-[#6b0f1a] text-white rounded-xl font-bold text-sm hover:bg-[#8b1a24] transition-colors">Publish University</button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── AGENT: REVIEW APPLICATIONS ── */
  return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button onClick={() => setPage("agent-dash")} className="flex items-center gap-1.5 text-sm text-[#6b0f1a] hover:underline mb-5"><IconArrowLeft size={14}/> Back</button>
        <h1 className="text-2xl font-extrabold mb-6">Review Applications</h1>
        <div className="flex flex-col gap-4">
          {AGENT_APPS.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-extrabold text-lg">{app.student}</div>
                  <div className="text-sm text-neutral-500">{app.university} · {app.program} · {app.id}</div>
                  <div className="text-xs text-neutral-400">Submitted: {app.submitted}</div>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUS_STYLE[app.status]}`}>{app.status}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Passport ✅","Transcript ✅","Language Cert ✅","Motivation Letter ✅"].map((d,i) => (<span key={i} className="text-[10px] font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full">{d}</span>))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors">✓ Mark Accepted</button>
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">📤 Submit to University</button>
                <button className="flex-1 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors">✗ Reject</button>
                <button className="flex-1 py-2 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-50 transition-colors">💬 Message Student</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

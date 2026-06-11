const STORAGE_KEY = "eftweb-v1";

const starterMissions = [
  createMission("개인", "오늘 올라온 감정에 정확한 이름 붙이기", ""),
  createMission("개인", "겉반응 아래의 일차정서를 한 문장으로 적기", ""),
  createMission("개인", "배우자에게 바랐던 반응을 비난 없이 적어보기", ""),
  createMission("공동", "하루 5분 감정 나누기", ""),
  createMission("공동", "오늘 고마웠던 점 한 가지 말하기", ""),
  createMission("공동", "갈등 후 회복 대화 10분 연습하기", "")
];

let state = loadState();
let currentStep = 1;

const emptyTemplate = document.querySelector("#emptyTemplate");

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("role-personal");
  bindNavigation();
  bindRoleSwitcher();
  bindForms();
  setDefaultDates();
  moveStep(0);
  renderAll();
});

function createMission(type, title, due) {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    due,
    done: false,
    createdAt: new Date().toISOString()
  };
}

function loadState() {
  const fallback = {
    checkins: [],
    cycle: null,
    missions: starterMissions,
    sessions: []
  };

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    return {
      checkins: Array.isArray(parsed.checkins) ? parsed.checkins : [],
      cycle: parsed.cycle || null,
      missions: Array.isArray(parsed.missions) && parsed.missions.length ? parsed.missions : starterMissions,
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : []
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindNavigation() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.jump));
  });
}

function bindRoleSwitcher() {
  document.querySelectorAll("[data-role]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
      document.body.classList.remove("role-personal", "role-couple", "role-therapist");
      document.body.classList.add(`role-${button.dataset.role}`);

      if (button.dataset.role === "therapist") showView("dashboard");
      if (button.dataset.role === "couple") showView("share");
      if (button.dataset.role === "personal") showView("home");
    });
  });
}

function bindForms() {
  const intensityInput = document.querySelector("#intensityInput");
  intensityInput.addEventListener("input", () => {
    document.querySelector("#intensityLabel").textContent = intensityInput.value;
  });

  document.querySelector("#prevStep").addEventListener("click", () => moveStep(-1));
  document.querySelector("#nextStep").addEventListener("click", () => moveStep(1));
  document.querySelector("#checkinForm").addEventListener("submit", saveCheckin);
  document.querySelector("#cycleForm").addEventListener("submit", saveCycle);
  document.querySelector("#missionForm").addEventListener("submit", saveMission);
  document.querySelector("#sessionForm").addEventListener("submit", saveSession);
  document.querySelector("#recordFilter").addEventListener("change", renderRecords);
  document.querySelector("#recordSearch").addEventListener("input", renderRecords);
  document.querySelector("#exportBtn").addEventListener("click", exportData);
  document.querySelector("#importFile").addEventListener("change", importData);
}

function setDefaultDates() {
  const today = new Date();
  document.querySelector("#sessionForm [name='date']").valueAsDate = today;
}

function showView(id) {
  document.querySelectorAll(".nav-item, .bottom-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === id);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === id);
  });
  renderAll();
}

function moveStep(direction) {
  currentStep = Math.min(3, Math.max(1, currentStep + direction));
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === currentStep);
  });
  document.querySelector("#prevStep").disabled = currentStep === 1;
  document.querySelector("#nextStep").classList.toggle("hidden", currentStep === 3);
  document.querySelector("#saveCheckin").classList.toggle("hidden", currentStep !== 3);
}

function saveCheckin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());

  state.checkins.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: data.author,
    weather: data.weather,
    scene: data.scene,
    emotion: data.emotion,
    intensity: data.intensity,
    body: data.body,
    protective: data.protective,
    thought: data.thought,
    primary: data.primary,
    need: data.need,
    newResponse: data.newResponse,
    sharePartner: form.sharePartner.checked,
    shareTherapist: form.shareTherapist.checked
  });

  saveState();
  form.reset();
  document.querySelector("#intensityInput").value = 5;
  document.querySelector("#intensityLabel").textContent = "5";
  currentStep = 1;
  moveStep(0);
  renderAll();
  showView("records");
}

function saveCycle(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.cycle = {
    ...Object.fromEntries(new FormData(form).entries()),
    updatedAt: new Date().toISOString()
  };
  saveState();
  renderAll();
}

function saveMission(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  state.missions.unshift(createMission(data.type, data.title, data.due));
  saveState();
  form.reset();
  renderAll();
}

function saveSession(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  state.sessions.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data
  });
  saveState();
  form.reset();
  setDefaultDates();
  renderAll();
}

function renderAll() {
  renderHome();
  renderRecords();
  renderShared();
  renderCycle();
  renderMissions();
  renderSessions();
  renderDashboard();
}

function renderHome() {
  const total = state.missions.length || 1;
  const done = state.missions.filter((mission) => mission.done).length;
  const progress = Math.round((done / total) * 100);
  document.querySelector("#homeProgress").textContent = `${progress}%`;
  document.querySelector("#homeProgressBar").style.width = `${progress}%`;
}

function renderRecords() {
  const filter = document.querySelector("#recordFilter")?.value || "all";
  const search = (document.querySelector("#recordSearch")?.value || "").trim().toLowerCase();
  let records = [...state.checkins];

  if (filter === "private") records = records.filter((record) => !record.sharePartner && !record.shareTherapist);
  if (filter === "partner") records = records.filter((record) => record.sharePartner);
  if (filter === "therapist") records = records.filter((record) => record.shareTherapist);

  if (search) {
    records = records.filter((record) => {
      return [
        record.scene,
        record.emotion,
        record.primary,
        record.need,
        record.newResponse
      ].some((value) => String(value || "").toLowerCase().includes(search));
    });
  }

  renderRecordCards(document.querySelector("#recordList"), records, true);
}

function renderShared() {
  const records = state.checkins.filter((record) => record.sharePartner);
  renderRecordCards(document.querySelector("#sharedList"), records, false);
}

function renderRecordCards(container, records, editable) {
  if (!container) return;
  container.innerHTML = "";

  if (!records.length) {
    container.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }

  records.forEach((record) => {
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>${escapeHtml(record.emotion)} <span class="muted">${record.intensity}/10</span></h3>
          <p class="muted">${formatDate(record.createdAt)} · ${escapeHtml(record.author)} · ${escapeHtml(record.weather)}</p>
        </div>
        <span class="badge coral">${escapeHtml(record.protective)}</span>
      </header>
      <p><strong>장면</strong><br>${escapeHtml(record.scene)}</p>
      <p><strong>몸의 반응</strong><br>${escapeHtml(record.body || "기록 없음")}</p>
      <p><strong>자동 생각</strong><br>${escapeHtml(record.thought || "기록 없음")}</p>
      <p><strong>일차정서</strong><br>${escapeHtml(record.primary || "아직 찾는 중")}</p>
      <p><strong>애착욕구 / 바랐던 반응</strong><br>${escapeHtml(record.need || "기록 없음")}</p>
      <p><strong>새 반응</strong><br>${escapeHtml(record.newResponse || "기록 없음")}</p>
      <div class="badge-row">
        ${record.sharePartner ? '<span class="badge green">배우자 공유</span>' : '<span class="badge">나만 보기</span>'}
        ${record.shareTherapist ? '<span class="badge green">치료자 공유</span>' : ""}
      </div>
    `;

    if (editable) {
      const actions = document.createElement("div");
      actions.className = "card-actions";
      actions.innerHTML = `
        <button class="small-button" type="button" data-action="partner">${record.sharePartner ? "배우자 공유 해제" : "배우자 공유"}</button>
        <button class="small-button" type="button" data-action="therapist">${record.shareTherapist ? "치료자 공유 해제" : "치료자 공유"}</button>
        <button class="small-button" type="button" data-action="delete">삭제</button>
      `;
      actions.addEventListener("click", (event) => handleRecordAction(event, record.id));
      card.appendChild(actions);
    }

    container.appendChild(card);
  });
}

function handleRecordAction(event, id) {
  const button = event.target.closest("button");
  if (!button) return;

  const record = state.checkins.find((item) => item.id === id);
  if (!record) return;

  if (button.dataset.action === "partner") record.sharePartner = !record.sharePartner;
  if (button.dataset.action === "therapist") record.shareTherapist = !record.shareTherapist;
  if (button.dataset.action === "delete") state.checkins = state.checkins.filter((item) => item.id !== id);

  record.updatedAt = new Date().toISOString();
  saveState();
  renderAll();
}

function renderCycle() {
  const container = document.querySelector("#cycleMap");
  if (!container) return;

  if (!state.cycle) {
    container.innerHTML = '<div class="empty-state">아직 저장된 고리 지도가 없습니다.</div>';
    return;
  }

  const cycle = state.cycle;
  container.innerHTML = `
    <div class="cycle-column">
      <h3>배우자 A</h3>
      ${cyclePiece("겉반응", cycle.aAction)}
      ${cyclePiece("속감정", cycle.aPrimary)}
      ${cyclePiece("애착욕구", cycle.aNeed)}
      ${cyclePiece("새 반응", cycle.aNew)}
    </div>
    <div class="cycle-center">고리가<br>문제입니다</div>
    <div class="cycle-column">
      <h3>배우자 B</h3>
      ${cyclePiece("겉반응", cycle.bAction)}
      ${cyclePiece("속감정", cycle.bPrimary)}
      ${cyclePiece("애착욕구", cycle.bNeed)}
      ${cyclePiece("새 반응", cycle.bNew)}
    </div>
  `;
}

function cyclePiece(label, value) {
  return `<div class="cycle-piece"><strong>${label}</strong><br>${escapeHtml(value || "함께 찾아가는 중")}</div>`;
}

function renderMissions() {
  const container = document.querySelector("#missionList");
  if (!container) return;
  container.innerHTML = "";

  state.missions.forEach((mission) => {
    const card = document.createElement("article");
    card.className = `mission-card ${mission.done ? "done" : ""}`;
    card.innerHTML = `
      <header>
        <span class="badge ${mission.type === "공동" ? "coral" : "green"}">${mission.type} 미션</span>
        <span class="muted">${mission.done ? "완료" : "진행 중"}</span>
      </header>
      <h3>${escapeHtml(mission.title)}</h3>
      <p class="muted">${mission.due ? `마감 ${escapeHtml(mission.due)}` : "마감일 없음"}</p>
      <div class="card-actions">
        <button class="small-button" type="button" data-action="toggle">${mission.done ? "완료 취소" : "완료 표시"}</button>
        <button class="small-button" type="button" data-action="delete">삭제</button>
      </div>
    `;
    card.addEventListener("click", (event) => handleMissionAction(event, mission.id));
    container.appendChild(card);
  });
}

function handleMissionAction(event, id) {
  const button = event.target.closest("button");
  if (!button) return;

  const mission = state.missions.find((item) => item.id === id);
  if (!mission) return;

  if (button.dataset.action === "toggle") mission.done = !mission.done;
  if (button.dataset.action === "delete") state.missions = state.missions.filter((item) => item.id !== id);

  saveState();
  renderAll();
}

function renderSessions() {
  const container = document.querySelector("#sessionList");
  if (!container) return;
  container.innerHTML = "";

  if (!state.sessions.length) {
    container.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }

  state.sessions.forEach((session) => {
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>${escapeHtml(session.kind)}</h3>
          <p class="muted">${escapeHtml(session.date)} · ${formatDate(session.createdAt)}</p>
        </div>
        <span class="badge">${escapeHtml(session.kind)}</span>
      </header>
      <p><strong>장면 / 새 감정</strong><br>${escapeHtml(session.scene)}</p>
      <p><strong>주제 / 이해한 점</strong><br>${escapeHtml(session.insight || "기록 없음")}</p>
      <p><strong>연습 반응 / 과제</strong><br>${escapeHtml(session.practice || "기록 없음")}</p>
    `;
    container.appendChild(card);
  });
}

function renderDashboard() {
  const therapistRecords = state.checkins.filter((record) => record.shareTherapist);
  const sharedRecords = state.checkins.filter((record) => record.sharePartner);
  const completed = state.missions.filter((mission) => mission.done).length;

  document.querySelector("#statsGrid").innerHTML = [
    ["전체 체크인", state.checkins.length],
    ["배우자 공유", sharedRecords.length],
    ["치료자 공유", therapistRecords.length],
    ["미션 완료", `${completed}/${state.missions.length}`]
  ].map(([label, value]) => `<article class="stat-card"><span>${label}</span><strong>${value}</strong></article>`).join("");

  renderMiniList("#dashCheckins", therapistRecords.slice(0, 5).map((record) => `${record.emotion} ${record.intensity}/10 - ${record.primary || record.scene}`));
  renderMiniList("#dashMissions", state.missions.map((mission) => `${mission.done ? "완료" : "진행"} · ${mission.type} · ${mission.title}`));
  renderMiniList("#dashSessions", state.sessions.slice(0, 5).map((session) => `${session.kind} · ${session.date} · ${session.scene}`));

  document.querySelector("#dashCycle").innerHTML = state.cycle
    ? `<p><strong>A:</strong> ${escapeHtml(state.cycle.aAction || "")} → ${escapeHtml(state.cycle.aPrimary || "")}</p>
       <p><strong>B:</strong> ${escapeHtml(state.cycle.bAction || "")} → ${escapeHtml(state.cycle.bPrimary || "")}</p>
       <p><strong>새 반응:</strong> ${escapeHtml(state.cycle.aNew || "A 미정")} / ${escapeHtml(state.cycle.bNew || "B 미정")}</p>`
    : '<div class="empty-state">고리 지도가 없습니다.</div>';
}

function renderMiniList(selector, items) {
  const container = document.querySelector(selector);
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">표시할 내용이 없습니다.</div>';
    return;
  }
  container.innerHTML = `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `EFTWEB_v1_backup_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const imported = JSON.parse(reader.result);
      state = {
        checkins: Array.isArray(imported.checkins) ? imported.checkins : [],
        cycle: imported.cycle || null,
        missions: Array.isArray(imported.missions) ? imported.missions : starterMissions,
        sessions: Array.isArray(imported.sessions) ? imported.sessions : []
      };
      saveState();
      renderAll();
      event.target.value = "";
      alert("데이터를 복원했습니다.");
    } catch {
      alert("JSON 파일을 읽을 수 없습니다.");
    }
  });
  reader.readAsText(file);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

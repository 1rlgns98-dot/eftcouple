const STORAGE_KEY = "eftweb-v3";

const eftStages = [
  {
    id: "1",
    title: "1단계: 고리 멈추기",
    plain: "싸움의 상대가 배우자가 아니라 반복되는 고리임을 알아차립니다.",
    steps: ["서로의 힘든 장면을 안전하게 정리하기", "추궁·회피 같은 반복 패턴 찾기", "겉반응 아래의 감정 신호 보기", "문제를 한 사람 탓이 아니라 고리로 다시 보기"]
  },
  {
    id: "2",
    title: "2단계: 속마음 나누기",
    plain: "화, 침묵, 방어 아래의 여린 감정과 연결 욕구를 배우자에게 전달합니다.",
    steps: ["더 깊은 두려움·외로움·수치심 알아차리기", "배우자의 속감정을 방어하지 않고 받아보기", "내가 바라는 연결을 직접 요청하기"]
  },
  {
    id: "3",
    title: "3단계: 새 대화 굳히기",
    plain: "오래된 문제를 새 방식으로 다루고, 회복 대화를 일상에서 반복합니다.",
    steps: ["자주 부딪히던 주제를 새 반응으로 다시 다루기", "잘 된 대화를 정리하고 다음 주 연습으로 굳히기"]
  }
];

const appNavigation = [
  { view: "home", label: "홈", icon: "⌂", mobile: true },
  { view: "stages", label: "EFT단계", icon: "◇", mobile: false },
  { view: "checkin", label: "체크인", icon: "＋", mobile: true },
  { view: "records", label: "내 기록", icon: "☰", mobile: true },
  { view: "share", label: "공유공간", icon: "◉", mobile: true },
  { view: "cycle", label: "고리 지도", icon: "↔", mobile: false },
  { view: "missions", label: "미션", icon: "✓", mobile: true },
  { view: "sessions", label: "회기 정리", icon: "□", mobile: false },
  { view: "settings", label: "설정", icon: "⚙", mobile: false }
];

const starterMissions = [
  createMission("개인", "갈등 장면에서 내가 보인 보호반응 표시하기", "", "1"),
  createMission("공동", "우리 고리의 이름을 함께 정하기", "", "1"),
  createMission("개인", "겉감정 아래의 일차정서를 한 문장으로 적기", "", "2"),
  createMission("개인", "배우자에게 바랐던 반응을 요청문으로 바꾸기", "", "2"),
  createMission("공동", "하루 5분 속마음 나누기", "", "2"),
  createMission("공동", "갈등 후 회복 대화 10분 연습하기", "", "3"),
  createMission("공동", "이번 주 잘 된 새 반응 한 가지 기록하기", "", "3")
];

let state = loadState();
let currentStep = 1;
let missionStageFilter = "all";

const emptyTemplate = document.querySelector("#emptyTemplate");

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindForms();
  setDefaultDates();
  moveStep(0);
  renderNavigation();
  showView("home");
});

function createMission(type, title, due, stage = "1") {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    due,
    stage,
    done: false,
    createdAt: new Date().toISOString()
  };
}

function loadState() {
  const fallback = {
    checkins: [],
    cycle: null,
    missions: starterMissions,
    sessions: [],
    stageProgress: {}
  };

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    return {
      checkins: Array.isArray(parsed.checkins) ? parsed.checkins : [],
      cycle: parsed.cycle || null,
      missions: normalizeMissions(parsed.missions),
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      stageProgress: parsed.stageProgress || {}
    };
  } catch {
    return fallback;
  }
}

function normalizeMissions(missions) {
  if (!Array.isArray(missions) || !missions.length) return starterMissions;
  return missions.map((mission, index) => ({
    ...mission,
    stage: mission.stage || String(Math.min(3, Math.floor(index / 2) + 1))
  }));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const jumpButton = event.target.closest("[data-jump]");
    if (jumpButton) {
      showView(jumpButton.dataset.jump);
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      showView(viewButton.dataset.view);
    }
  });
}

function renderNavigation() {
  const sideNav = document.querySelector("#sideNav");
  const bottomNav = document.querySelector("#bottomNav");

  sideNav.innerHTML = appNavigation.map((item) => `
    <button class="nav-item" type="button" data-view="${item.view}">
      <span aria-hidden="true">${item.icon}</span>
      <strong>${item.label}</strong>
    </button>
  `).join("");

  bottomNav.innerHTML = appNavigation.filter((item) => item.mobile).map((item) => `
    <button class="bottom-item" type="button" data-view="${item.view}">
      <span aria-hidden="true">${item.icon}</span>
      <strong>${item.label}</strong>
    </button>
  `).join("");
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
  document.querySelectorAll(".chip-row button").forEach((button) => {
    button.addEventListener("click", () => applyHelperChip(button));
  });
}

function setDefaultDates() {
  const today = new Date();
  document.querySelector("#sessionForm [name='date']").valueAsDate = today;
}

function showView(id) {
  const allowedViews = appNavigation.map((item) => item.view);
  const viewId = allowedViews.includes(id) ? id : "home";

  document.querySelectorAll(".nav-item, .bottom-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
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
    eftStep: data.eftStep,
    primary: data.primary,
    need: data.need,
    newResponse: data.newResponse,
    sharePartner: form.sharePartner.checked,
    shareTherapist: false
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
  state.missions.unshift(createMission(data.type, data.title, data.due, data.stage));
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
  renderStages();
  renderRecords();
  renderShared();
  renderCycle();
  renderMissions();
  renderSessions();
}

function renderHome() {
  const total = state.missions.length || 1;
  const done = state.missions.filter((mission) => mission.done).length;
  const progress = Math.round((done / total) * 100);
  document.querySelector("#homeProgress").textContent = `${progress}%`;
  document.querySelector("#homeProgressBar").style.width = `${progress}%`;
  const strip = document.querySelector("#homeStageStrip");
  if (strip) {
    strip.innerHTML = eftStages.map((stage) => {
      const doneText = state.stageProgress[stage.id] ? "체크됨" : "진행 전";
      return `<article class="stage-pill"><strong>${stage.title}</strong><span>${escapeHtml(stage.plain)} · ${doneText}</span></article>`;
    }).join("");
  }
}

function renderStages() {
  const board = document.querySelector("#stageBoard");
  if (!board) return;

  board.innerHTML = eftStages.map((stage) => `
    <article class="stage-card">
      <header>
        <div>
          <p class="eyebrow">Stage ${stage.id}</p>
          <h3>${stage.title}</h3>
          <p>${escapeHtml(stage.plain)}</p>
        </div>
        <span class="badge ${state.stageProgress[stage.id] ? "green" : ""}">${state.stageProgress[stage.id] ? "연습 중" : "대기"}</span>
      </header>
      <ul>
        ${stage.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ul>
      <label class="stage-check">
        <input type="checkbox" data-stage-check="${stage.id}" ${state.stageProgress[stage.id] ? "checked" : ""}>
        이번 주에 이 단계를 연습합니다
      </label>
    </article>
  `).join("");

  board.querySelectorAll("[data-stage-check]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.stageProgress[checkbox.dataset.stageCheck] = checkbox.checked;
      saveState();
      renderAll();
    });
  });
}

function getStageTitle(stageId) {
  return eftStages.find((stage) => stage.id === String(stageId))?.title || "단계 미정";
}

function applyHelperChip(button) {
  const row = button.closest("[data-helper-target]");
  const form = document.querySelector("#checkinForm");
  const targetName = row?.dataset.helperTarget;
  const field = targetName ? form.elements[targetName] : null;
  if (!field) return;

  const current = field.value.trim();
  field.value = current ? `${current}\n${button.textContent}` : button.textContent;
  field.focus();
}

function renderRecords() {
  const filter = document.querySelector("#recordFilter")?.value || "all";
  const search = (document.querySelector("#recordSearch")?.value || "").trim().toLowerCase();
  let records = [...state.checkins];

  if (filter === "private") records = records.filter((record) => !record.sharePartner);
  if (filter === "partner") records = records.filter((record) => record.sharePartner);

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
        <span class="badge">${escapeHtml(getStageTitle(record.eftStep || "1"))}</span>
        ${record.sharePartner ? '<span class="badge green">배우자 공유</span>' : '<span class="badge">나만 보기</span>'}
      </div>
    `;

    if (editable) {
      const actions = document.createElement("div");
      actions.className = "card-actions";
      actions.innerHTML = `
        <button class="small-button" type="button" data-action="partner">${record.sharePartner ? "배우자 공유 해제" : "배우자 공유"}</button>
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
    <div class="span-2 cycle-summary">
      <h3>${escapeHtml(cycle.cycleName || "우리의 반복 고리")}</h3>
      <p><strong>시작 신호:</strong> ${escapeHtml(cycle.trigger || "아직 찾는 중")}</p>
      <p><strong>멈추는 문장:</strong> ${escapeHtml(cycle.cycleExit || "지금 우리 고리에 들어간 것 같아. 잠깐 멈추고 다시 말해보자.")}</p>
    </div>
    <div class="cycle-column">
      <h3>배우자 A</h3>
      ${cyclePiece("겉반응", cycle.aAction)}
      ${cyclePiece("속으로 해석한 뜻", cycle.aMeaning)}
      ${cyclePiece("속감정", cycle.aPrimary)}
      ${cyclePiece("애착욕구", cycle.aNeed)}
      ${cyclePiece("새 반응", cycle.aNew)}
    </div>
    <div class="cycle-center">고리가<br>문제입니다</div>
    <div class="cycle-column">
      <h3>배우자 B</h3>
      ${cyclePiece("겉반응", cycle.bAction)}
      ${cyclePiece("속으로 해석한 뜻", cycle.bMeaning)}
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
  renderMissionStageFilter();

  const missions = missionStageFilter === "all"
    ? state.missions
    : state.missions.filter((mission) => String(mission.stage || "1") === missionStageFilter);

  if (!missions.length) {
    container.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }

  missions.forEach((mission) => {
    const card = document.createElement("article");
    card.className = `mission-card ${mission.done ? "done" : ""}`;
    card.innerHTML = `
      <header>
        <span class="badge ${mission.type === "공동" ? "coral" : "green"}">${mission.type} 미션</span>
        <span class="muted">${mission.done ? "완료" : "진행 중"}</span>
      </header>
      <h3>${escapeHtml(mission.title)}</h3>
      <p class="muted">${escapeHtml(getStageTitle(mission.stage || "1"))} · ${mission.due ? `마감 ${escapeHtml(mission.due)}` : "마감일 없음"}</p>
      <div class="card-actions">
        <button class="small-button" type="button" data-action="toggle">${mission.done ? "완료 취소" : "완료 표시"}</button>
        <button class="small-button" type="button" data-action="delete">삭제</button>
      </div>
    `;
    card.addEventListener("click", (event) => handleMissionAction(event, mission.id));
    container.appendChild(card);
  });
}

function renderMissionStageFilter() {
  const filter = document.querySelector("#missionStageFilter");
  if (!filter) return;
  const buttons = [{ id: "all", title: "전체" }, ...eftStages.map((stage) => ({ id: stage.id, title: stage.title }))];
  filter.innerHTML = buttons.map((item) => `
    <button type="button" class="${missionStageFilter === item.id ? "active" : ""}" data-mission-stage="${item.id}">${item.title}</button>
  `).join("");

  filter.querySelectorAll("[data-mission-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      missionStageFilter = button.dataset.missionStage;
      renderMissions();
    });
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
        missions: normalizeMissions(imported.missions),
        sessions: Array.isArray(imported.sessions) ? imported.sessions : [],
        stageProgress: imported.stageProgress || {}
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

const STORAGE_KEY = "eftweb-v5";

function uid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const stages = [
  { id: "stage1", step: 1, title: "지금의 어려움 함께 보기", short: "어려움 정리" },
  { id: "stage2", step: 2, title: "반복되는 고리 알아차리기", short: "고리 알아차리기" },
  { id: "stage3", step: 3, title: "고리를 멈추는 작은 신호 만들기", short: "멈춤 신호" },
  { id: "stage4", step: 4, title: "겉반응 아래의 속감정 찾기", short: "속감정 찾기" },
  { id: "stage5", step: 5, title: "멀어지는 사람도 다시 참여하기", short: "다시 참여" },
  { id: "stage6", step: 6, title: "서운함을 부드럽게 말하기", short: "부드럽게 말하기" },
  { id: "stage7", step: 7, title: "새로운 대화를 실제로 해보기", short: "새 대화" },
  { id: "stage8", step: 8, title: "문제를 함께 해결하는 방식 만들기", short: "공동 해결" },
  { id: "stage9", step: 9, title: "새로운 연결을 유지하기", short: "유지하기" }
];

const defaultMissions = [
  { id: uid(), type: "personal", stageId: "stage2", title: "오늘 갈등 장면에서 내 보호반응 하나 찾기", done: false },
  { id: uid(), type: "personal", stageId: "stage4", title: "화 아래 숨어 있던 속감정 한 문장으로 적기", done: false },
  { id: uid(), type: "couple", stageId: "stage2", title: "하루 5분, 누가 맞는지보다 고리 이름 붙이기", done: false },
  { id: uid(), type: "couple", stageId: "stage7", title: "갈등 후 회복 문장으로 다시 말해보기", done: false }
];

let state = loadState();
let currentStep = 0;
let recordFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindCheckin();
  bindCycle();
  bindMissions();
  bindSessions();
  bindSettings();
  hydrateStageSelects();
  renderAll();
  showView("home");
});

function loadState() {
  const fallback = {
    currentStageId: "stage2",
    checkins: [],
    cycles: [],
    missions: defaultMissions,
    sessions: []
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return seedState(fallback);
    return {
      ...fallback,
      ...saved,
      missions: saved.missions?.length ? saved.missions : defaultMissions
    };
  } catch {
    return seedState(fallback);
  }
}

function seedState(base) {
  const today = new Date();
  const sampleDays = [13, 12, 10, 8, 7, 5, 3, 1];
  const samples = sampleDays.map((offset, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const intensities = [7, 8, 6, 6, 5, 7, 5, 6];
    const emotions = ["외로움", "불안", "서운함", "답답함", "두려움", "화", "그리움", "긴장감"];
    return {
      id: uid(),
      date: date.toISOString(),
      author: index % 3 === 2 ? "배우자 A" : "나",
      weather: index % 2 ? "긴장감" : "거리감",
      scene: "최근 반복된 대화에서 마음이 멀어지는 느낌이 있었다.",
      emotion: emotions[index],
      intensity: intensities[index],
      body: "가슴이 답답했다",
      protective: index % 2 ? "침묵하거나 물러났다" : "따지고 확인했다",
      secondaryEmotion: index % 2 ? "무기력" : "화",
      primary: index % 2 ? "부족한 사람처럼 느껴졌다" : "중요하지 않은 사람처럼 느껴졌다",
      need: index % 2 ? "비난 없이 들어주길 바랐다" : "내 편이라는 확신이 필요했다",
      newResponse: "잠깐 멈추고 내 마음을 더 부드럽게 말해보기",
      share: index < 3 ? "private" : "partner",
      stageId: index < 4 ? "stage2" : "stage4"
    };
  });
  return { ...base, checkins: samples };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindNavigation() {
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest("[data-view]");
    if (!target) return;
    showView(target.dataset.view);
  });
}

function showView(id) {
  const view = document.getElementById(id) ? id : "home";
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === view));
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    const main = ["home", "checkin", "records", "cycle", "more"].includes(view) ? view : "more";
    button.classList.toggle("active", button.dataset.view === main);
  });
  document.querySelector(".app-scroll").scrollTo({ top: 0, behavior: "smooth" });
  renderAll();
}

function bindCheckin() {
  document.querySelector("#intensityInput").addEventListener("input", (event) => {
    document.querySelector("#intensityOutput").textContent = event.target.value;
  });
  document.querySelector("#prevStep").addEventListener("click", () => moveStep(-1));
  document.querySelector("#nextStep").addEventListener("click", () => moveStep(1));
  document.querySelectorAll("[data-fill]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const field = document.querySelector(`[name="${group.dataset.fill}"]`);
      field.value = field.value ? `${field.value}, ${button.textContent}` : button.textContent;
    });
  });
  document.querySelector("#checkinForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    state.checkins.unshift({
      id: uid(),
      date: new Date().toISOString(),
      ...data,
      intensity: Number(data.intensity)
    });
    saveState();
    form.reset();
    document.querySelector("#intensityInput").value = 5;
    document.querySelector("#intensityOutput").textContent = "5";
    currentStep = 0;
    showView("records");
  });
  moveStep(0);
}

function moveStep(delta) {
  currentStep = Math.min(2, Math.max(0, currentStep + delta));
  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === currentStep);
  });
  document.querySelector("#prevStep").classList.toggle("hidden", currentStep === 0);
  document.querySelector("#nextStep").classList.toggle("hidden", currentStep === 2);
  document.querySelector("#saveCheckin").classList.toggle("hidden", currentStep !== 2);
  renderStepDots();
}

function renderStepDots() {
  const labels = ["장면·감정", "속마음", "새 반응"];
  document.querySelector("#stepDots").innerHTML = labels.map((label, index) =>
    `<span class="step-dot ${index === currentStep ? "active" : ""}">${label}</span>`
  ).join("");
}

function bindCycle() {
  document.querySelector("#cycleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    state.cycles.unshift({ id: uid(), date: new Date().toISOString(), ...data });
    saveState();
    event.currentTarget.reset();
    renderCycle();
  });
}

function bindMissions() {
  document.querySelector("#missionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!data.title.trim()) return;
    state.missions.unshift({
      id: uid(),
      type: data.type,
      stageId: state.currentStageId,
      title: data.title.trim(),
      done: false
    });
    saveState();
    event.currentTarget.reset();
    renderMissions();
  });
  document.querySelector("#missionList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mission]");
    if (!button) return;
    const mission = state.missions.find((item) => item.id === button.dataset.mission);
    mission.done = !mission.done;
    saveState();
    renderMissions();
  });
}

function bindSessions() {
  document.querySelector("#sessionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    state.sessions.unshift({ id: uid(), date: new Date().toISOString(), ...data });
    saveState();
    event.currentTarget.reset();
    renderSessions();
  });
}

function bindSettings() {
  document.querySelector("#currentStageSelect").addEventListener("change", (event) => {
    state.currentStageId = event.target.value;
    saveState();
    renderAll();
  });
  document.querySelector("#exportData").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eftweb-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
  document.querySelector("#importData").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    state = JSON.parse(await file.text());
    saveState();
    renderAll();
  });
  document.querySelector("#resetData").addEventListener("click", () => {
    if (!confirm("저장된 모든 기록을 삭제할까요?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = seedState({ currentStageId: "stage2", checkins: [], cycles: [], missions: defaultMissions, sessions: [] });
    saveState();
    renderAll();
    showView("home");
  });
}

function hydrateStageSelects() {
  const options = stages.map((stage) => `<option value="${stage.id}">${stage.step}단계 · ${stage.short}</option>`).join("");
  document.querySelector("#stageSelect").innerHTML = options;
  document.querySelector("#currentStageSelect").innerHTML = options;
}

function renderAll() {
  document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date());
  document.querySelector("#stageSelect").value = state.currentStageId;
  document.querySelector("#currentStageSelect").value = state.currentStageId;
  renderHome();
  renderRecords();
  renderShared();
  renderCycle();
  renderMissions();
  renderSessions();
}

function renderHome() {
  const recent = state.checkins.slice(0, 14).reverse();
  const avg = recent.length ? recent.reduce((sum, item) => sum + Number(item.intensity || 0), 0) / recent.length : 0;
  document.querySelector("#avgIntensity").textContent = avg.toFixed(1);
  document.querySelector("#intensityChart").innerHTML = buildChart(recent);
  document.querySelector("#monthLabel").textContent = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long" }).format(new Date());
  document.querySelector("#emotionCalendar").innerHTML = buildCalendar();
  renderLayerStats();
  renderStageCard();
}

function buildChart(records) {
  const data = records.length ? records : [{ intensity: 5, date: new Date().toISOString() }];
  const width = 384;
  const height = 150;
  const padTop = 14;
  const padBottom = 26;
  const plotHeight = height - padTop - padBottom;
  const xAt = (i) => data.length === 1 ? 8 : 8 + i * ((width - 16) / (data.length - 1));
  const yAt = (value) => padTop + (1 - value / 10) * plotHeight;
  const points = data.map((item, index) => ({ x: xAt(index), y: yAt(Number(item.intensity || 5)), label: dayLabel(item.date) }));
  const line = points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L ${points.at(-1).x.toFixed(1)} ${height - padBottom} L ${points[0].x.toFixed(1)} ${height - padBottom} Z`;
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="${area}" fill="rgba(201,122,82,0.12)"></path>
      <path d="${line}" fill="none" stroke="#b3653e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
      ${points.map((point, index) => `<circle cx="${point.x}" cy="${point.y}" r="${index === points.length - 1 ? 5 : 3.5}" fill="${index === points.length - 1 ? "#b3653e" : "#fffdf8"}" stroke="#b3653e" stroke-width="2"></circle>`).join("")}
      ${points.map((point, index) => index % Math.ceil(points.length / 5) === 0 ? `<text x="${point.x}" y="144" text-anchor="middle" fill="#897b72" font-size="10">${point.label}</text>` : "").join("")}
    </svg>
  `;
}

function buildCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const last = new Date(year, month + 1, 0).getDate();
  const intensityMap = {};
  state.checkins.forEach((record) => {
    const date = new Date(record.date);
    if (date.getFullYear() === year && date.getMonth() === month) {
      intensityMap[date.getDate()] = Math.max(intensityMap[date.getDate()] || 0, Number(record.intensity || 0));
    }
  });
  const heads = ["일", "월", "화", "수", "목", "금", "토"].map((day) => `<div class="calendar-head">${day}</div>`);
  const blanks = Array.from({ length: first }, () => "<div></div>");
  const days = Array.from({ length: last }, (_, index) => {
    const day = index + 1;
    const value = intensityMap[day];
    const bucket = heatColor(value);
    return `<div class="calendar-day ${day === now.getDate() ? "today" : ""}" style="background:${bucket.bg}; color:${bucket.fg}" title="${day}일${value ? ` · 강도 ${value}` : ""}">${day}</div>`;
  });
  return [...heads, ...blanks, ...days].join("");
}

function heatColor(value) {
  if (!value) return { bg: "#f4eee5", fg: "#b3a79d" };
  if (value <= 2) return { bg: "#f6e2d5", fg: "#9c5333" };
  if (value <= 4) return { bg: "#f0cfb9", fg: "#9c5333" };
  if (value <= 6) return { bg: "#db9876", fg: "#fffdf8" };
  if (value <= 8) return { bg: "#c97a52", fg: "#fffdf8" };
  return { bg: "#b3653e", fg: "#fffdf8" };
}

function renderLayerStats() {
  const records = weekRecords();
  const stats = [
    { key: "protect", label: "보호반응", icon: "○", color: "var(--emo-protect)", bg: "var(--emo-protect-bg)", count: records.filter((item) => item.protective).length },
    { key: "primary", label: "속감정", icon: "◌", color: "var(--emo-primary)", bg: "var(--emo-primary-bg)", count: records.filter((item) => item.primary).length },
    { key: "need", label: "애착욕구", icon: "♡", color: "var(--emo-need)", bg: "var(--emo-need-bg)", count: records.filter((item) => item.need).length },
    { key: "new", label: "새 반응", icon: "↗", color: "var(--emo-new)", bg: "var(--emo-new-bg)", count: records.filter((item) => item.newResponse).length }
  ];
  document.querySelector("#layerStats").innerHTML = stats.map((item) => `
    <div class="layer-tile" style="background:${item.bg}; color:${item.color}">
      <span>${item.icon}</span>
      <strong>${item.count}</strong><small>${item.label}</small>
    </div>
  `).join("");
}

function renderStageCard() {
  const stage = currentStage();
  document.querySelector("#stageCard").innerHTML = `
    <span class="badge">${stage.step}단계 · ${stage.short}</span>
    <h2>지금은 “${stage.title}”를 연습하는 중이에요.</h2>
    <div class="progress"><div style="width:${Math.round((stage.step / stages.length) * 100)}%"></div></div>
  `;
}

function renderRecords() {
  const filterButtons = document.querySelectorAll("#recordFilter button");
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === recordFilter);
    button.onclick = () => {
      recordFilter = button.dataset.filter;
      renderRecords();
    };
  });
  const records = filteredRecords();
  renderList("#recordList", records, "아직 기록이 없어요", "감정 체크인에서 첫 기록을 남겨보세요.", renderRecordCard);
}

function renderShared() {
  const records = state.checkins.filter((item) => item.share && item.share !== "private");
  renderList("#sharedList", records, "공유한 기록이 없어요", "기록 저장 시 배우자 또는 치료자 공유를 선택하면 이곳에 모입니다.", renderRecordCard);
}

function filteredRecords() {
  if (recordFilter === "private") return state.checkins.filter((item) => !item.share || item.share === "private");
  if (recordFilter === "shared") return state.checkins.filter((item) => item.share && item.share !== "private");
  return state.checkins;
}

function renderRecordCard(record) {
  const color = recordColor(record);
  return `
    <article class="record-card" style="--record-color:${color}">
      <header><span>${formatDate(record.date)} · ${record.author}</span><strong>강도 ${record.intensity}/10</strong></header>
      <h3>${escapeHtml(record.emotion || "이름 붙이지 않은 감정")}</h3>
      <div class="bar"><div style="width:${Number(record.intensity || 0) * 10}%"></div></div>
      <p>${escapeHtml(record.scene || "장면 기록 없음")}</p>
      ${record.primary ? `<p><strong>속감정</strong> · ${escapeHtml(record.primary)}</p>` : ""}
      ${record.need ? `<p><strong>바랐던 반응</strong> · ${escapeHtml(record.need)}</p>` : ""}
      <div class="card-actions">
        <button type="button" data-share="${record.id}">${record.share && record.share !== "private" ? "공유 중" : "공유하기"}</button>
        <button type="button" data-delete="${record.id}">삭제</button>
      </div>
    </article>
  `;
}

document.addEventListener("click", (event) => {
  const shareButton = event.target.closest("[data-share]");
  const deleteButton = event.target.closest("[data-delete]");
  if (shareButton) {
    const record = state.checkins.find((item) => item.id === shareButton.dataset.share);
    record.share = record.share && record.share !== "private" ? "private" : "partner";
    saveState();
    renderAll();
  }
  if (deleteButton) {
    state.checkins = state.checkins.filter((item) => item.id !== deleteButton.dataset.delete);
    saveState();
    renderAll();
  }
});

function renderCycle() {
  const latest = state.cycles[0] || {
    signal: "답장이 늦거나 표정이 굳어질 때",
    aProtect: "따지고 확인한다",
    bProtect: "침묵하고 물러난다",
    aUnder: "또 내가 밀려난 것 같아 외롭다. 나를 선택한다는 확신이 필요하다.",
    bUnder: "부족한 사람처럼 느껴져 물러난다. 비난 없이 들어주길 바란다.",
    repair: "지금 우리 고리에 들어간 것 같아. 잠깐 멈추고 다시 말해보자."
  };
  document.querySelector("#cycleSignalText").textContent = latest.signal;
  document.querySelector("#cycleMap").innerHTML = `
    <div class="cycle-pair">
      <div class="cycle-column">
        ${cycleNode("A 겉반응", latest.aProtect, "var(--emo-protect)")}
        ${cycleNode("A 속감정·욕구", latest.aUnder, "var(--emo-primary)")}
      </div>
      <div class="cycle-arrow">↔</div>
      <div class="cycle-column">
        ${cycleNode("B 겉반응", latest.bProtect, "var(--emo-protect)")}
        ${cycleNode("B 속감정·욕구", latest.bUnder, "var(--emo-need)")}
      </div>
    </div>
    <div class="repair-card">
      <small>고리를 멈추는 공동 문장</small>
      <p>“${escapeHtml(latest.repair)}”</p>
    </div>
  `;
}

function cycleNode(label, text, color) {
  return `<div class="cycle-node" style="--node-color:${color}"><small>${label}</small><p>${escapeHtml(text || "")}</p></div>`;
}

function renderMissions() {
  const missions = state.missions.filter((mission) => mission.stageId === state.currentStageId || !mission.stageId);
  renderList("#missionList", missions, "현재 단계의 미션이 없어요", "새 미션을 추가하거나 설정에서 EFT 단계를 바꿔보세요.", (mission) => `
    <article class="mission-card ${mission.done ? "done" : ""}">
      <header><span>${mission.type === "couple" ? "공동 미션" : "개인 미션"}</span><strong>${currentStage(mission.stageId).short}</strong></header>
      <p>${escapeHtml(mission.title)}</p>
      <div class="card-actions"><button type="button" data-mission="${mission.id}">${mission.done ? "완료 취소" : "완료 표시"}</button></div>
    </article>
  `);
}

function renderSessions() {
  renderList("#sessionList", state.sessions, "저장된 회기 정리가 없어요", "회기 전후 메모를 남기면 이곳에 쌓입니다.", (session) => `
    <article class="session-card">
      <header><span>${formatDate(session.date)}</span><strong>${session.type === "after" ? "회기 후" : "회기 전"}</strong></header>
      <p>${escapeHtml(session.topic)}</p>
      ${session.practice ? `<p><strong>연습</strong> · ${escapeHtml(session.practice)}</p>` : ""}
    </article>
  `);
}

function renderList(selector, items, title, description, renderer) {
  const container = document.querySelector(selector);
  if (!items.length) {
    const template = document.querySelector("#emptyTemplate").content.cloneNode(true);
    template.querySelector("strong").textContent = title;
    template.querySelector("p").textContent = description;
    container.replaceChildren(template);
    return;
  }
  container.innerHTML = items.map(renderer).join("");
}

function currentStage(id = state.currentStageId) {
  return stages.find((stage) => stage.id === id) || stages[1];
}

function weekRecords() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return state.checkins.filter((record) => new Date(record.date) >= cutoff);
}

function recordColor(record) {
  if (record.need) return "var(--emo-need)";
  if (record.primary) return "var(--emo-primary)";
  if (record.protective) return "var(--emo-protect)";
  return "var(--emo-new)";
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(new Date(date));
}

function dayLabel(date) {
  return new Intl.DateTimeFormat("ko-KR", { day: "numeric" }).format(new Date(date));
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

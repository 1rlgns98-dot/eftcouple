const STORAGE_KEY = "eftweb-v6";

function uid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const stages = [
  {
    id: "stage1",
    step: 1,
    phase: "1기 · 안정화",
    short: "어려움 정리",
    title: "지금의 어려움 함께 보기",
    focus: "누가 잘못했는지보다, 두 사람이 어떤 순간에 힘들어지는지 안전하게 정리합니다.",
    checkin: "사건을 길게 설명하기보다 ‘어떤 장면에서 감정이 올라왔는지’를 짧고 구체적으로 적어보세요.",
    cycle: "아직 고리를 완성하려 하지 않아도 괜찮습니다. 반복되는 시작 신호만 모으는 단계입니다.",
    prompts: ["최근 가장 힘들었던 장면 하나", "내가 보인 겉반응", "배우자가 보인 겉반응"],
    missionPersonal: "이번 주 힘들었던 장면을 하나만 골라 감정 강도와 몸 반응 적기",
    missionCouple: "서로를 설득하지 않고 ‘각자 힘들었던 순간’만 5분씩 말하기"
  },
  {
    id: "stage2",
    step: 2,
    phase: "1기 · 고리 보기",
    short: "고리 알아차리기",
    title: "반복되는 고리 알아차리기",
    focus: "A가 다가가거나 따지면 B가 물러나고, 그 물러남이 다시 A의 불안을 키우는 식의 순환을 봅니다.",
    checkin: "내 반응만 보지 말고 ‘내 반응이 배우자의 어떤 반응을 불렀는지’를 함께 적어보세요.",
    cycle: "고리 지도에서 A와 B의 겉반응을 먼저 채우세요. 속감정은 아직 불완전해도 됩니다.",
    prompts: ["고리 시작 신호", "A의 겉반응", "B의 겉반응", "고리가 커지는 방식"],
    missionPersonal: "오늘 내 보호반응 하나에 이름 붙이기",
    missionCouple: "갈등이 커지기 전 ‘우리 고리에 들어간 것 같아’라고 말해보기"
  },
  {
    id: "stage3",
    step: 3,
    phase: "1기 · 멈춤",
    short: "멈춤 신호",
    title: "고리를 멈추는 작은 신호 만들기",
    focus: "갈등을 해결하기 전에 먼저 고리를 알아차리고 속도를 늦추는 공동 신호를 만듭니다.",
    checkin: "기록의 마지막에는 다음번에 멈춤을 요청할 수 있는 짧은 문장을 적어보세요.",
    cycle: "고리 지도 하단의 공동 문장을 실제로 사용할 수 있게 짧고 자연스럽게 만드세요.",
    prompts: ["멈춤이 필요한 신호", "내가 듣기 쉬운 멈춤 문장", "다시 시작할 때 필요한 조건"],
    missionPersonal: "내가 과열되는 몸 신호 2가지 적기",
    missionCouple: "갈등 중 사용할 멈춤 문장을 함께 정하기"
  },
  {
    id: "stage4",
    step: 4,
    phase: "2기 · 속감정",
    short: "속감정 찾기",
    title: "겉반응 아래의 속감정 찾기",
    focus: "비난, 방어, 침묵 아래에 있는 외로움, 두려움, 부족감 같은 더 여린 감정을 찾습니다.",
    checkin: "‘화났다’에서 멈추지 말고, 그 아래에 있던 더 여린 감정을 한 문장으로 적어보세요.",
    cycle: "고리 지도에 겉반응뿐 아니라 A와 B의 속감정을 같이 넣어 고리의 깊이를 봅니다.",
    prompts: ["화 아래의 감정", "물러남 아래의 감정", "가장 말하기 어려운 마음"],
    missionPersonal: "오늘의 겉감정 아래 속감정 하나 찾기",
    missionCouple: "배우자의 겉반응 아래에 있을 수 있는 마음을 추측이 아닌 질문으로 물어보기"
  },
  {
    id: "stage5",
    step: 5,
    phase: "2기 · 재참여",
    short: "다시 참여",
    title: "멀어지는 사람도 다시 참여하기",
    focus: "물러나는 사람이 관계에서 빠지는 대신, 부담과 두려움을 조금씩 말할 수 있도록 돕습니다.",
    checkin: "침묵하거나 피한 순간이 있다면, 그때 말하지 못했던 부담과 두려움을 적어보세요.",
    cycle: "물러남이 무관심이 아니라 압도감이나 실패감에서 온 것일 수 있음을 지도에 표현합니다.",
    prompts: ["물러난 이유", "압도된 감각", "다시 다가가기 위해 필요한 안전감"],
    missionPersonal: "피하고 싶었던 순간에 사실 말하고 싶었던 한 문장 적기",
    missionCouple: "한 사람이 3분간 말하면 다른 사람은 반박 없이 요약만 하기"
  },
  {
    id: "stage6",
    step: 6,
    phase: "2기 · 부드러운 요청",
    short: "부드럽게 말하기",
    title: "서운함을 부드럽게 말하기",
    focus: "비난처럼 나오던 말 아래의 두려움과 필요를 더 직접적이고 부드럽게 표현합니다.",
    checkin: "배우자에게 바랐던 반응을 ‘당신은 왜’가 아니라 ‘나는 필요해’ 문장으로 바꿔보세요.",
    cycle: "추궁이나 비난이 연결 욕구에서 나온 것임을 지도에 분명히 적습니다.",
    prompts: ["내가 정말 원한 반응", "비난 대신 할 수 있는 요청", "가까워지고 싶은 마음"],
    missionPersonal: "비난 문장 하나를 요청 문장으로 바꾸기",
    missionCouple: "하루 5분, 한 가지 서운함을 부드러운 요청으로 말해보기"
  },
  {
    id: "stage7",
    step: 7,
    phase: "2기 · 새 대화",
    short: "새 대화",
    title: "새로운 대화를 실제로 해보기",
    focus: "속감정과 욕구를 서로에게 직접 말하고, 상대는 방어보다 반응을 연습합니다.",
    checkin: "기록의 마지막에 실제로 배우자에게 해볼 새 문장을 적고 공유 여부를 선택하세요.",
    cycle: "고리 지도는 이제 ‘멈춤’에서 ‘새 반응’으로 넘어가는 연습장이 됩니다.",
    prompts: ["직접 말할 속감정", "상대에게 필요한 반응", "갈등 후 회복 문장"],
    missionPersonal: "속감정과 욕구가 담긴 새 문장 하나 연습하기",
    missionCouple: "갈등 후 회복 대화를 10분 안에 다시 시도하기"
  },
  {
    id: "stage8",
    step: 8,
    phase: "3기 · 통합",
    short: "공동 해결",
    title: "문제를 함께 해결하는 방식 만들기",
    focus: "정서적 안전감을 바탕으로 생활 문제를 적이 아닌 팀의 문제로 다룹니다.",
    checkin: "감정 기록 뒤에 ‘우리가 함께 해결할 실제 문제’를 하나만 적어보세요.",
    cycle: "고리 지도에서 회복 문장이 실제 문제 해결로 이어지는지 확인합니다.",
    prompts: ["함께 풀 문제", "각자 양보 가능한 부분", "안전한 대화 순서"],
    missionPersonal: "문제 해결 전에 내 감정과 욕구를 먼저 구분하기",
    missionCouple: "한 가지 생활 문제를 팀 과제로 이름 붙이고 작은 행동 정하기"
  },
  {
    id: "stage9",
    step: 9,
    phase: "3기 · 유지",
    short: "유지하기",
    title: "새로운 연결을 유지하기",
    focus: "다시 고리에 빠질 수 있음을 전제로, 회복 루틴과 재발 신호를 관리합니다.",
    checkin: "기록은 문제 분석보다 ‘새 반응이 작동한 순간’과 ‘다시 조심할 신호’를 모으는 데 씁니다.",
    cycle: "고리 지도는 위기 지도가 아니라 유지 계획으로 사용합니다.",
    prompts: ["다시 조심할 신호", "잘 작동한 새 반응", "유지할 작은 의식"],
    missionPersonal: "이번 주 내가 다르게 반응한 순간 하나 기록하기",
    missionCouple: "한 주에 한 번 고마웠던 반응과 다음 주 유지할 행동 말하기"
  }
];

const missionBank = stages.flatMap((stage) => [
  { id: `${stage.id}-personal`, type: "personal", stageId: stage.id, title: stage.missionPersonal },
  { id: `${stage.id}-couple`, type: "couple", stageId: stage.id, title: stage.missionCouple }
]);

let state = loadState();
let currentStep = 0;
let recordFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  hydrateIcons();
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
    profile: { myName: "나", partnerName: "" },
    checkins: [],
    cycles: [],
    customMissions: [],
    missionDone: {},
    sessions: []
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return normalizeState({ ...fallback, ...saved });
  } catch {
    return fallback;
  }
}

function normalizeState(nextState) {
  return {
    ...nextState,
    profile: { myName: "나", partnerName: "", ...(nextState.profile || {}) },
    checkins: nextState.checkins || [],
    cycles: nextState.cycles || [],
    customMissions: nextState.customMissions || [],
    missionDone: nextState.missionDone || {},
    sessions: nextState.sessions || []
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-lucide]").forEach((target) => {
    target.innerHTML = iconSvg(target.dataset.lucide, target.dataset.size || 21);
  });
}

function iconSvg(name, size = 21) {
  const attrs = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const icons = {
    house: `<path d="M3 10.8 12 3l9 7.8"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>`,
    "heart-pulse": `<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z"></path><path d="M3 12h3l2-3 3 6 2-3h3"></path>`,
    "book-open": `<path d="M12 7v14"></path><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v17H7.5A3.5 3.5 0 0 0 4 22Z"></path><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v17h4.5A3.5 3.5 0 0 1 20 22Z"></path>`,
    "refresh-cw": `<path d="M21 12a9 9 0 0 1-15.1 6.6"></path><path d="M3 12A9 9 0 0 1 18.1 5.4"></path><path d="M21 5v6h-6"></path><path d="M3 19v-6h6"></path>`,
    plus: `<path d="M12 5v14"></path><path d="M5 12h14"></path>`,
    zap: `<path d="M13 2 4 14h7l-1 8 10-13h-7z"></path>`,
    shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path>`,
    droplet: `<path d="M12 22a7 7 0 0 0 7-7c0-4-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7Z"></path>`,
    "heart-handshake": `<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6Z"></path><path d="m8 14 2 2 4-4"></path>`,
    sprout: `<path d="M7 20h10"></path><path d="M12 20V10"></path><path d="M12 10C9 10 7 8 7 5c3 0 5 2 5 5Z"></path><path d="M12 13c3 0 5-2 5-5-3 0-5 2-5 5Z"></path>`,
    messages: `<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"></path><path d="M8 9h8"></path><path d="M8 13h5"></path>`
  };
  return `<svg ${attrs}>${icons[name] || icons.plus}</svg>`;
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
      if (field.tagName === "TEXTAREA") {
        field.value = field.value ? `${field.value}\n${button.textContent}` : button.textContent;
      } else {
        field.value = field.value ? `${field.value}, ${button.textContent}` : button.textContent;
      }
    });
  });
  document.querySelectorAll("[data-choice-field]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const field = document.querySelector(`[name="${group.dataset.choiceField}"]`);
      field.value = button.dataset.value;
      group.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    });
  });
  document.querySelector("#checkinForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    state.checkins.unshift({
      id: uid(),
      date: new Date().toISOString(),
      author: displayName("self"),
      ...data,
      intensity: Number(data.intensity)
    });
    saveState();
    form.reset();
    document.querySelector("#weatherInput").value = "조심스럽지만 대화 가능";
    document.querySelectorAll("[data-choice-field='weather'] button").forEach((button, index) => button.classList.toggle("active", index === 0));
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
  renderCheckinGuide();
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
    renderHome();
  });
}

function bindMissions() {
  document.querySelector("#missionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (!data.title.trim()) return;
    state.customMissions.unshift({
      id: uid(),
      type: data.type,
      stageId: state.currentStageId,
      title: data.title.trim()
    });
    saveState();
    event.currentTarget.reset();
    renderMissions();
  });
  document.querySelector("#missionList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mission]");
    if (!button) return;
    state.missionDone[button.dataset.mission] = !state.missionDone[button.dataset.mission];
    saveState();
    renderMissions();
    renderStageCard();
  });
}

function bindSessions() {
  document.querySelector("#sessionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    state.sessions.unshift({ id: uid(), date: new Date().toISOString(), ...data, stageId: state.currentStageId });
    saveState();
    event.currentTarget.reset();
    renderSessions();
  });
}

function bindSettings() {
  document.querySelector("#myNameInput").addEventListener("input", (event) => {
    state.profile.myName = event.target.value.trim() || "나";
    saveState();
    renderProfileLabels();
    renderRecords();
    renderCycle();
  });
  document.querySelector("#partnerNameInput").addEventListener("input", (event) => {
    state.profile.partnerName = event.target.value.trim();
    saveState();
    renderProfileLabels();
    renderCycle();
  });
  document.querySelector("#currentStageSelect").addEventListener("change", (event) => {
    state.currentStageId = event.target.value;
    saveState();
    hydrateStageSelects();
    renderAll();
  });
  document.querySelector("#exportData").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eftweb-v6-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
  document.querySelector("#importData").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    state = normalizeState({ ...loadState(), ...JSON.parse(await file.text()) });
    saveState();
    hydrateStageSelects();
    renderAll();
  });
  document.querySelector("#resetData").addEventListener("click", () => {
    if (!confirm("저장된 모든 기록을 삭제할까요?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    renderAll();
    showView("home");
  });
}

function hydrateStageSelects() {
  const options = stages.map((stage) => `<option value="${stage.id}">${stage.step}단계 · ${stage.short}</option>`).join("");
  document.querySelector("#stageSelect").innerHTML = options;
  document.querySelector("#currentStageSelect").innerHTML = options;
  document.querySelector("#stageSelect").value = state.currentStageId;
  document.querySelector("#currentStageSelect").value = state.currentStageId;
}

function renderAll() {
  document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date());
  hydrateStageSelects();
  renderProfileLabels();
  renderHome();
  renderCheckinGuide();
  renderRecords();
  renderShared();
  renderCycle();
  renderMissions();
  renderSessions();
}

function renderProfileLabels() {
  const self = displayName("self");
  const partner = displayName("partner");
  document.querySelector(".avatar-button").textContent = self.slice(0, 2);
  document.querySelector("#myNameInput").value = state.profile.myName === "나" ? "" : state.profile.myName;
  document.querySelector("#partnerNameInput").value = state.profile.partnerName || "";
  document.querySelector("#selfProtectLabel").textContent = `${self}의 겉반응`;
  document.querySelector("#partnerProtectLabel").textContent = `${partner}의 겉반응`;
  document.querySelector("#selfUnderLabel").textContent = `${self}의 속감정·욕구`;
  document.querySelector("#partnerUnderLabel").textContent = `${partner}의 속감정·욕구`;
}

function displayName(which) {
  if (which === "partner") return state.profile.partnerName || "배우자";
  return state.profile.myName || "나";
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
  renderInterventions();
}

function buildChart(records) {
  const width = 384;
  const height = 150;
  if (!records.length) {
    return `
      <div class="empty-chart">
        <strong>아직 기록이 없습니다</strong>
        <p>감정 체크인을 저장하면 이곳에 실제 감정 강도 흐름이 그려집니다.</p>
      </div>
    `;
  }
  const padTop = 14;
  const padBottom = 26;
  const plotHeight = height - padTop - padBottom;
  const xAt = (i) => records.length === 1 ? width / 2 : 8 + i * ((width - 16) / (records.length - 1));
  const yAt = (value) => padTop + (1 - value / 10) * plotHeight;
  const points = records.map((item, index) => ({ x: xAt(index), y: yAt(Number(item.intensity || 5)), label: dayLabel(item.date) }));
  const line = points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L ${points.at(-1).x.toFixed(1)} ${height - padBottom} L ${points[0].x.toFixed(1)} ${height - padBottom} Z`;
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <path d="${area}" fill="rgba(201,122,82,0.12)"></path>
      <path d="${line}" fill="none" stroke="#b3653e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
      ${points.map((point, index) => `<circle cx="${point.x}" cy="${point.y}" r="${index === points.length - 1 ? 5 : 3.5}" fill="${index === points.length - 1 ? "#b3653e" : "#fffdf8"}" stroke="#b3653e" stroke-width="2"></circle>`).join("")}
      ${points.map((point, index) => index % Math.max(1, Math.ceil(points.length / 5)) === 0 ? `<text x="${point.x}" y="144" text-anchor="middle" fill="#897b72" font-size="10">${point.label}</text>` : "").join("")}
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
    { label: "보호반응", icon: "shield", color: "var(--emo-protect)", bg: "var(--emo-protect-bg)", count: records.filter((item) => item.protective).length },
    { label: "속감정", icon: "droplet", color: "var(--emo-primary)", bg: "var(--emo-primary-bg)", count: records.filter((item) => item.primary).length },
    { label: "애착욕구", icon: "heart-handshake", color: "var(--emo-need)", bg: "var(--emo-need-bg)", count: records.filter((item) => item.need).length },
    { label: "새 반응", icon: "sprout", color: "var(--emo-new)", bg: "var(--emo-new-bg)", count: records.filter((item) => item.newResponse).length }
  ];
  document.querySelector("#layerStats").innerHTML = stats.map((item) => `
    <div class="layer-tile" style="background:${item.bg}; color:${item.color}">
      <span>${iconSvg(item.icon, 18)}</span>
      <strong>${item.count}</strong><small>${item.label}</small>
    </div>
  `).join("");
}

function renderStageCard() {
  const stage = currentStage();
  const stageMissions = visibleMissions();
  const done = stageMissions.filter((mission) => state.missionDone[mission.id]).length;
  const percent = stageMissions.length ? Math.round((done / stageMissions.length) * 100) : 0;
  document.querySelector("#stageCard").innerHTML = `
    <span class="badge">${stage.phase}</span>
    <h2>${stage.step}단계 · ${stage.title}</h2>
    <p>${stage.focus}</p>
    <div class="progress" aria-label="현재 단계 미션 진행률"><div style="width:${percent}%"></div></div>
    <p class="hint">현재 단계 미션 ${done}/${stageMissions.length}개 완료</p>
  `;
}

function renderInterventions() {
  const stage = currentStage();
  document.querySelector("#homeIntervention").innerHTML = interventionMarkup("지금 단계의 개입 초점", stage.focus, stage.prompts);
  document.querySelector("#cycleIntervention").innerHTML = interventionMarkup("고리 지도에서 볼 것", stage.cycle, stage.prompts);
  document.querySelector("#missionIntervention").innerHTML = interventionMarkup("미션이 달라지는 이유", `${stage.phase}에서는 ${stage.focus}`, [stage.missionPersonal, stage.missionCouple]);
}

function renderCheckinGuide() {
  const stage = currentStage();
  const stepFocus = [
    "먼저 장면과 감정 강도를 구체적으로 남깁니다.",
    "겉반응 아래의 속감정과 애착욕구를 찾습니다.",
    "현재 단계에 맞게 다음 반응을 작게 정합니다."
  ];
  document.querySelector("#checkinStageGuide").innerHTML = `
    <header>
      <h3>${stage.step}단계 체크인</h3>
      <span class="intervention-chip">${stage.short}</span>
    </header>
    <p>${stage.checkin}</p>
    <ul><li>${stepFocus[currentStep]}</li><li>${stage.prompts[currentStep] || stage.prompts[0]}</li></ul>
  `;
}

function interventionMarkup(title, body, bullets) {
  return `
    <header>
      <h2>${title}</h2>
      <span class="intervention-chip">${currentStage().short}</span>
    </header>
    <p>${body}</p>
    <ul>${bullets.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function renderRecords() {
  document.querySelectorAll("#recordFilter button").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === recordFilter);
    button.onclick = () => {
      recordFilter = button.dataset.filter;
      renderRecords();
    };
  });
  renderList("#recordList", filteredRecords(), "아직 기록이 없어요", "감정 체크인에서 첫 기록을 남기면 홈, 공유, 미션 흐름에 연결됩니다.", renderRecordCard);
}

function renderShared() {
  const records = state.checkins.filter((item) => item.share && item.share !== "private");
  renderList("#sharedList", records, "공유한 기록이 없어요", "기록 카드에서 공유하기를 누르거나 체크인 저장 시 공유 범위를 선택하세요.", renderRecordCard);
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
      <header><span>${formatDate(record.date)} · ${escapeHtml(record.author)}</span><strong>${currentStage(record.stageId).short}</strong></header>
      <h3>${escapeHtml(record.emotion || "이름 붙이지 않은 감정")}</h3>
      <div class="bar"><div style="width:${Number(record.intensity || 0) * 10}%"></div></div>
      <p>${escapeHtml(record.scene || "장면 기록 없음")}</p>
      ${record.primary ? `<p><strong>속감정</strong> · ${escapeHtml(record.primary)}</p>` : ""}
      ${record.need ? `<p><strong>바랐던 반응</strong> · ${escapeHtml(record.need)}</p>` : ""}
      ${record.newResponse ? `<p><strong>새 반응</strong> · ${escapeHtml(record.newResponse)}</p>` : ""}
      <div class="card-actions">
        <button type="button" data-share="${record.id}">${record.share && record.share !== "private" ? "공유 해제" : "공유하기"}</button>
        <button type="button" data-cycle-from="${record.id}">고리에 반영</button>
        <button type="button" data-delete="${record.id}">삭제</button>
      </div>
    </article>
  `;
}

document.addEventListener("click", (event) => {
  const shareButton = event.target.closest("[data-share]");
  const deleteButton = event.target.closest("[data-delete]");
  const cycleButton = event.target.closest("[data-cycle-from]");
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
  if (cycleButton) {
    const record = state.checkins.find((item) => item.id === cycleButton.dataset.cycleFrom);
    if (record) draftCycleFromRecord(record);
  }
});

function draftCycleFromRecord(record) {
  const form = document.querySelector("#cycleForm");
  form.elements.signal.value = record.scene || "";
  form.elements.aProtect.value = record.protective || "";
  form.elements.aUnder.value = [record.primary, record.need].filter(Boolean).join(" · ");
  form.elements.repair.value = record.newResponse || "지금 우리 고리에 들어간 것 같아. 잠깐 멈추고 다시 말해보자.";
  showView("cycle");
}

function renderCycle() {
  const latest = state.cycles[0];
  const self = displayName("self");
  const partner = displayName("partner");
  document.querySelector("#cycleSignalText").textContent = latest?.signal || "아직 저장된 고리 신호가 없습니다";
  if (!latest) {
    renderList("#cycleMap", [], "고리 지도가 비어 있어요", "기록 카드의 ‘고리에 반영’을 누르거나 아래 양식으로 첫 고리 지도를 저장하세요.", () => "");
    return;
  }
  document.querySelector("#cycleMap").innerHTML = `
    <div class="cycle-overview">
      <div class="cycle-trigger">
        <small>시작 신호</small>
        <strong>${escapeHtml(latest.signal)}</strong>
      </div>
      <div class="cycle-flow">
        <div><span>${escapeHtml(self)}</span><p>${escapeHtml(latest.aProtect || "겉반응 미입력")}</p></div>
        <b>→</b>
        <div><span>${escapeHtml(partner)}</span><p>${escapeHtml(latest.bProtect || "겉반응 미입력")}</p></div>
        <b>→</b>
        <div><span>반복 고리</span><p>서로의 속감정과 욕구가 더 숨겨짐</p></div>
      </div>
    </div>
    <div class="cycle-pair">
      <div class="cycle-column">
        ${cycleNode(`${self}의 겉반응`, latest.aProtect, "var(--emo-protect)")}
        ${cycleNode(`${self}의 속감정·욕구`, latest.aUnder, "var(--emo-primary)")}
      </div>
      <div class="cycle-arrow">↔</div>
      <div class="cycle-column">
        ${cycleNode(`${partner}의 겉반응`, latest.bProtect, "var(--emo-protect)")}
        ${cycleNode(`${partner}의 속감정·욕구`, latest.bUnder, "var(--emo-need)")}
      </div>
    </div>
    <div class="repair-card">
      <small>고리를 멈추는 공동 문장</small>
      <p>“${escapeHtml(latest.repair)}”</p>
    </div>
  `;
}

function cycleNode(label, text, color) {
  return `<div class="cycle-node" style="--node-color:${color}"><small>${label}</small><p>${escapeHtml(text || "아직 입력되지 않았습니다")}</p></div>`;
}

function renderMissions() {
  renderList("#missionList", visibleMissions(), "현재 단계의 미션이 없어요", "설정에서 단계를 선택하면 단계별 기본 미션이 표시됩니다.", (mission) => `
    <article class="mission-card ${state.missionDone[mission.id] ? "done" : ""}">
      <header><span>${mission.type === "couple" ? "공동 미션" : "개인 미션"}</span><strong>${currentStage(mission.stageId).short}</strong></header>
      <p>${escapeHtml(mission.title)}</p>
      <div class="card-actions"><button type="button" data-mission="${mission.id}">${state.missionDone[mission.id] ? "완료 취소" : "완료 표시"}</button></div>
    </article>
  `);
}

function visibleMissions() {
  return [...missionBank, ...state.customMissions].filter((mission) => mission.stageId === state.currentStageId);
}

function renderSessions() {
  renderList("#sessionList", state.sessions, "저장된 회기 정리가 없어요", "회기 전후 메모를 남기면 현재 EFT 단계와 함께 저장됩니다.", (session) => `
    <article class="session-card">
      <header><span>${formatDate(session.date)} · ${currentStage(session.stageId).short}</span><strong>${session.type === "after" ? "회기 후" : "회기 전"}</strong></header>
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

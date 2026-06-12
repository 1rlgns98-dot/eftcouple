const STORAGE_KEY = "eftweb-v5";

const emotionOptions = ["분노", "짜증", "답답함", "불안", "서운함", "외로움", "두려움", "수치심", "무력감", "슬픔", "혼란", "미안함", "고마움", "그리움", "안도감", "안정감"];
const fearOptions = ["버려질까 봐 두렵다", "거절당할까 봐 두렵다", "내가 중요하지 않은 사람처럼 느껴진다", "내가 부족한 사람처럼 느껴진다", "아무리 말해도 닿지 않을 것 같다", "또 상처받을까 봐 무섭다", "상대가 나에게서 멀어지는 것 같다", "내가 뭘 해도 실패할 것 같다", "상대에게 짐이 될까 봐 두렵다", "내 마음을 보여주면 더 다칠 것 같다"];
const needOptions = ["나를 봐주었으면 한다", "내 말에 반응해주었으면 한다", "나를 중요하게 여겨주었으면 한다", "나를 안심시켜주었으면 한다", "내 곁에 있어주었으면 한다", "내 마음을 이해해주었으면 한다", "나를 선택해주었으면 한다", "나를 밀어내지 않았으면 한다", "나와 함께 문제를 바라봐주었으면 한다", "나를 비난하지 않고 들어주었으면 한다"];

const eftStages = [
  {
    id: "stage1_alliance",
    phase: "1기: 부정적 고리의 단계적 약화",
    step: 1,
    title: "평가와 치료동맹 형성",
    shortTitle: "관계 목표 세우기",
    goal: "EFT의 관점을 이해하고, 관계에서 회복하고 싶은 방향과 반복 갈등 주제를 정리합니다.",
    coreMessage: "이 앱은 누가 옳고 그른지를 가리기 위한 도구가 아니라, 우리 사이에서 반복되는 고리를 이해하기 위한 도구입니다.",
    keyQuestions: ["이 관계에서 가장 회복하고 싶은 부분은 무엇인가요?", "배우자와 어떤 관계가 되기를 바라나요?", "갈등이 반복될 때 가장 힘든 순간은 언제인가요?", "내가 관계 안에서 자주 느끼는 감정은 무엇인가요?", "치료를 통해 내가 달라지고 싶은 반응은 무엇인가요?"],
    recommendedMissions: ["관계에서 회복하고 싶은 것 3가지 적기", "내가 자주 보이는 반응 알아차리기", "반복되는 갈등 장면 하나 기록하기", "치료자와 나누고 싶은 질문 작성하기"],
    linkedFeatures: ["홈", "감정 체크인", "회기 전 정리", "치료자 요약"],
    therapistFocus: ["각 배우자의 치료 목표", "반복 갈등 주제", "주요 정서", "자주 나타나는 보호반응", "초기 회기 초점"],
    userPrompt: "오늘은 문제 해결보다, 내가 이 관계에서 무엇을 회복하고 싶은지부터 적어봅니다.",
    examples: ["나는 더 안전하게 말하고 싶다.", "우리가 싸우기 전에 멈출 수 있으면 좋겠다."]
  },
  {
    id: "stage2_cycle_tracking",
    phase: "1기: 부정적 고리의 단계적 약화",
    step: 2,
    title: "부정적 상호작용 고리 추적",
    shortTitle: "고리 추적",
    goal: "싸움의 내용보다 싸움이 반복되는 순서를 보고, 문제를 한 사람의 잘못이 아닌 두 사람 사이의 고리로 바라봅니다.",
    coreMessage: "문제는 한 사람이 아니라 두 사람 사이에서 반복되는 고리입니다.",
    keyQuestions: ["갈등은 보통 어떤 장면에서 시작되나요?", "나는 그때 겉으로 어떤 반응을 하나요?", "배우자는 그 반응을 어떻게 받아들이는 것 같나요?", "배우자는 그다음 어떤 반응을 하나요?", "이 고리가 반복되면 우리는 어떻게 멀어지나요?", "이 고리에 이름을 붙인다면 무엇인가요?"],
    recommendedMissions: ["이번 주 우리가 반복한 고리 하나 찾기", "내가 보인 보호반응 기록하기", "배우자의 반응을 고리의 일부로 보기", "우리 고리에 이름 붙이기", "싸움의 내용보다 싸움의 순서 기록하기"],
    linkedFeatures: ["부정적 고리 지도", "감정 체크인", "개인 기록", "회기 정리"],
    therapistFocus: ["주요 부정적 고리", "A/B의 보호반응", "A/B가 경험하는 영향", "반복되는 거리감 패턴", "고리 이름"],
    userPrompt: "오늘은 누가 잘못했는지보다, 갈등이 어떤 순서로 커졌는지 적어봅니다.",
    examples: ["추궁-회피 고리", "비난-방어 고리", "침묵-불안 고리", "요구-철수 고리"]
  },
  {
    id: "stage3_primary_emotion",
    phase: "1기: 부정적 고리의 단계적 약화",
    step: 3,
    title: "드러나지 않은 정서와 애착두려움 접근",
    shortTitle: "속감정 찾기",
    goal: "분노, 방어, 침묵 아래의 더 여린 감정과 애착두려움, 애착욕구를 찾습니다.",
    coreMessage: "겉반응 아래에는 나를 지키려는 마음과 연결되고 싶은 욕구가 숨어 있을 수 있습니다.",
    keyQuestions: ["나는 겉으로 어떤 감정을 표현했나요?", "내가 보인 반응은 나를 무엇으로부터 보호하려 했나요?", "그 아래에는 어떤 더 여린 감정이 있었나요?", "그 순간 가장 두려웠던 것은 무엇인가요?", "나는 배우자에게 어떤 반응을 바랐나요?"],
    recommendedMissions: ["분노 아래의 두려움 찾기", "침묵 아래의 무력감 찾기", "방어 아래의 수치심 찾기", "내가 정말 바랐던 반응 적기"],
    linkedFeatures: ["감정 체크인", "감정 번역 도우미", "애착두려움 카드", "개인 기록"],
    therapistFocus: ["이차정서와 일차정서", "핵심 애착두려움", "핵심 애착욕구", "정서 심화 가능성"],
    userPrompt: "겉으로 보인 반응 아래에서 더 여리고 중요한 감정을 찾아봅니다.",
    examples: ["화 아래의 외로움", "침묵 아래의 실패 두려움", "방어 아래의 수치심"]
  },
  {
    id: "stage4_reframe_cycle",
    phase: "1기: 부정적 고리의 단계적 약화",
    step: 4,
    title: "고리와 애착욕구 관점으로 재구성",
    shortTitle: "고리 재구성",
    goal: "상대가 문제라는 관점에서 벗어나, 우리가 빠지는 고리를 공동의 문제로 바라봅니다.",
    coreMessage: "우리는 서로를 공격하는 대신, 이 고리를 함께 바라보는 연습을 합니다.",
    keyQuestions: ["우리 고리는 보통 어디에서 시작되나요?", "각자의 보호반응은 무엇을 지키려 했나요?", "이 고리가 반복될 때 서로가 잃는 것은 무엇인가요?", "고리가 문제라는 문장으로 다시 말하면 어떻게 되나요?"],
    recommendedMissions: ["우리 고리를 한 문장으로 요약하기", "상대가 문제 문장을 고리가 문제 문장으로 바꾸기", "각자의 보호반응이 지키려 한 것 적기"],
    linkedFeatures: ["고리 재구성 카드", "고리 요약문 생성", "치료자 요약"],
    therapistFocus: ["고리 재구성 요약", "A/B의 보호반응과 속감정", "A/B의 애착욕구", "다음 회기 핵심 고리"],
    userPrompt: "당신 때문에가 아니라, 우리가 이 고리에 들어갈 때라는 말로 바꿔봅니다.",
    examples: ["우리는 답이 늦을 때 불안-회피 고리에 들어간다."]
  },
  {
    id: "stage5_deepen_needs",
    phase: "2기: 애착결합 재구성",
    step: 5,
    title: "숨겨진 욕구와 자기 경험 분명히 인식하기",
    shortTitle: "숨은 욕구 보기",
    goal: "위축자는 물러나는 이유를, 비난자는 강하게 요구하는 이유 아래의 두려움과 욕구를 더 분명히 인식합니다.",
    coreMessage: "보호반응은 연결을 포기해서가 아니라, 연결이 너무 중요해서 나온 방식일 수 있습니다.",
    keyQuestions: ["나는 갈등 중 언제 물러나거나 강하게 요구하나요?", "그 아래에는 어떤 두려움이 있나요?", "내가 정말 확인받고 싶었던 것은 무엇인가요?", "더 부드럽게 말한다면 어떻게 표현할 수 있을까요?"],
    recommendedMissions: ["위축자는 관계 안에 머무르는 짧은 문장 만들기", "비난자는 분노 아래의 외로움과 두려움 적기", "보호반응을 애착욕구 문장으로 바꾸기"],
    linkedFeatures: ["위축자 재개입 준비", "비난자 순화 준비", "속마음 문장 만들기"],
    therapistFocus: ["위축자 재개입 준비도", "비난자 순화 준비도", "숨겨진 욕구", "enactment 후보 문장"],
    userPrompt: "내가 강해지거나 사라지는 순간, 사실은 무엇을 지키려 했는지 찾아봅니다.",
    examples: ["지금 멈추고 있지만, 당신을 피하고 싶은 것은 아니야.", "나는 당신에게 중요한 사람이고 싶어."]
  },
  {
    id: "stage6_accept_partner",
    phase: "2기: 애착결합 재구성",
    step: 6,
    title: "배우자의 새로운 정서 표현 받아들이기",
    shortTitle: "듣고 반응하기",
    goal: "상대가 취약한 감정과 욕구를 표현할 때 방어하지 않고 요약하고 정서적으로 반응합니다.",
    coreMessage: "지금은 해결책보다, 상대의 마음이 어떤지 먼저 들어보는 시간입니다.",
    keyQuestions: ["내가 들은 상대의 감정은 무엇인가요?", "상대가 정말 바란 것은 무엇인가요?", "듣는 동안 내 몸과 마음에는 어떤 반응이 있었나요?", "대화 후 조금 달라진 점은 무엇인가요?"],
    recommendedMissions: ["배우자의 말을 반박하지 않고 한 문장으로 요약하기", "내가 들은 것은 문장으로 반응하기", "상대의 감정과 욕구를 구분해서 적기"],
    linkedFeatures: ["듣기 연습", "상대 감정 확인", "대화 후 연결감 체크"],
    therapistFocus: ["정서 표현 수용 정도", "듣는 사람의 방어반응", "요약문 기록", "연결감 변화"],
    userPrompt: "반박하고 싶은 마음이 올라오면 잠시 멈추고, 먼저 들은 마음을 요약해봅니다.",
    examples: ["내가 들은 것은, 당신이 화보다 외로움을 느꼈다는 거야."]
  },
  {
    id: "stage7_bonding_event",
    phase: "2기: 애착결합 재구성",
    step: 7,
    title: "애착욕구를 직접 표현하고 새 접촉 만들기",
    shortTitle: "직접 말하기",
    goal: "보호반응 대신 취약한 감정과 애착욕구를 직접 표현하고, 새로운 정서적 접촉을 경험합니다.",
    coreMessage: "겉으로는 방어했지만, 그 아래의 마음과 바람을 직접 말해보는 단계입니다.",
    keyQuestions: ["내가 겉으로 한 보호반응은 무엇인가요?", "그 아래에는 어떤 취약한 감정이 있었나요?", "사실 배우자에게 어떤 애착욕구를 바랐나요?", "듣는 사람은 어떻게 요약하고 반응했나요?"],
    recommendedMissions: ["애착욕구를 직접 말해보기", "보호반응을 취약한 정서 표현으로 바꾸기", "대화 후 새롭게 느낀 연결감 기록하기"],
    linkedFeatures: ["애착욕구 표현 연습", "공동 대화 타이머", "대화 후 연결감 체크"],
    therapistFocus: ["애착욕구 표현 문장", "위축자 재개입 시도", "비난자 순화 시도", "새 접촉 경험"],
    userPrompt: "내가 겉으로는 [보호반응]을 했지만, 그 아래에는 [감정]이 있었고, 사실 [욕구]를 바랐다고 말해봅니다.",
    examples: ["내가 따졌지만, 사실은 당신이 나를 안심시켜주기를 바랐어."]
  },
  {
    id: "stage8_new_solutions",
    phase: "3기: 통합과 강화",
    step: 8,
    title: "오래된 문제를 새로운 방식으로 다루기",
    shortTitle: "새 해결 찾기",
    goal: "정서적 연결이 생긴 상태에서 오래된 문제를 새 반응과 공동 해결 계획으로 다룹니다.",
    coreMessage: "문제 해결은 서로의 편으로 돌아온 뒤에 더 잘 됩니다.",
    keyQuestions: ["지금 우리는 서로를 공격하나요, 함께 문제를 바라보나요?", "예전에는 이 문제가 어떤 고리를 만들었나요?", "이제 새롭게 시도할 반응은 무엇인가요?", "작은 해결 행동 하나는 무엇인가요?"],
    recommendedMissions: ["오래된 문제 하나를 새로운 방식으로 다시 보기", "예전 고리와 새로운 반응 비교하기", "작은 해결 행동 하나 정하기"],
    linkedFeatures: ["오래된 문제 다시 보기", "공동 해결 계획", "회복 대화 작성"],
    therapistFocus: ["오래된 문제 주제", "예전 고리", "새 반응", "공동 해결 계획"],
    userPrompt: "문제를 해결하기 전에, 지금 우리가 연결된 상태인지 먼저 확인합니다.",
    examples: ["예전에는 침묵-불안 고리였지만, 이제는 멈춤 문장으로 시작한다."]
  },
  {
    id: "stage9_consolidation",
    phase: "3기: 통합과 강화",
    step: 9,
    title: "새로운 관계 패턴 정리와 유지",
    shortTitle: "유지 계획",
    goal: "새로운 상호작용 방식을 정리하고, 재갈등 상황에서도 회복할 수 있는 계획을 만듭니다.",
    coreMessage: "완벽히 싸우지 않는 것이 목표가 아니라, 다시 연결되는 길을 아는 것이 목표입니다.",
    keyQuestions: ["우리가 가장 자주 빠지던 예전 고리는 무엇이었나요?", "이제 그 고리를 알아차릴 신호는 무엇인가요?", "내가 먼저 시도할 새 반응은 무엇인가요?", "갈등 후 회복 문장은 무엇인가요?", "매주 유지할 연결 루틴은 무엇인가요?"],
    recommendedMissions: ["예전 고리와 새로운 고리 비교하기", "갈등 후 회복 대화 작성하기", "고마웠던 반응 하나 기록하기", "매주 연결 루틴 만들기"],
    linkedFeatures: ["새로운 고리 만들기", "회복 문장 저장", "유지 계획 작성"],
    therapistFocus: ["예전 고리", "새로운 고리", "회복 문장", "유지 루틴", "종결 전 요약"],
    userPrompt: "다시 어려워져도 돌아올 수 있는 회복 문장과 루틴을 정리합니다.",
    examples: ["우리 지금 예전 고리에 들어가는 것 같아. 잠깐 멈추고 다시 이야기해볼까?"]
  }
];

const interventionBank = [
  { id: "empathic_reflection", name: "공감적 반영", description: "감정을 단정하지 않고 가능성 언어로 비춰줍니다.", appImplementation: "기록 저장 후 판단 없는 반영 문구를 보여줍니다.", samplePrompts: ["그 순간 많이 외롭고 불안했을 수 있겠네요.", "지금 느낀 감정을 살펴보는 것만으로도 중요한 작업입니다."], linkedStages: ["stage1_alliance", "stage3_primary_emotion"] },
  { id: "validation", name: "타당화", description: "보호반응을 나쁜 반응으로만 보지 않고 자신을 지키려는 시도로 이해합니다.", appImplementation: "보호반응별 안내 문구를 보여줍니다.", samplePrompts: ["침묵은 무관심이 아니라 더 상처 주지 않으려는 보호반응이었을 수 있습니다.", "강한 요구 아래에는 연결을 잃을까 봐 두려운 마음이 있을 수 있습니다."], linkedStages: ["stage2_cycle_tracking", "stage5_deepen_needs"] },
  { id: "cycle_tracking", name: "부정적 고리 추적", description: "A 반응 → B 해석 → B 반응 → A 해석의 순환을 봅니다.", appImplementation: "고리 지도와 요약문을 생성합니다.", samplePrompts: ["싸움의 내용보다 싸움이 커지는 순서를 적어보세요."], linkedStages: ["stage2_cycle_tracking", "stage4_reframe_cycle"] },
  { id: "emotional_deepening", name: "정서 심화", description: "몸 반응, 이차정서, 일차정서, 애착두려움, 애착욕구를 순서대로 탐색합니다.", appImplementation: "체크인 질문과 선택 카드를 단계별로 바꿉니다.", samplePrompts: ["그 아래의 더 여린 감정은 무엇이었나요?"], linkedStages: ["stage3_primary_emotion", "stage5_deepen_needs"] },
  { id: "reframe", name: "재구성", description: "당신이 문제에서 우리가 빠지는 고리가 문제로 초점을 바꿉니다.", appImplementation: "고리 중심 요약문을 제공합니다.", samplePrompts: ["우리가 이 고리에 들어갈 때 어떤 일이 벌어지나요?"], linkedStages: ["stage4_reframe_cycle"] },
  { id: "enactment", name: "직접 말하기 연습", description: "말하는 사람과 듣는 사람을 나누어 취약한 감정과 욕구를 표현하고 요약합니다.", appImplementation: "기록 유형과 미션으로 직접 말하기 연습을 안내합니다.", samplePrompts: ["내가 들은 것은…으로 시작해보세요."], linkedStages: ["stage6_accept_partner", "stage7_bonding_event"] },
  { id: "withdrawer_reengagement", name: "위축자 재개입", description: "사라지지 않고 관계 안에 머무르는 짧은 문장을 만듭니다.", appImplementation: "기록 유형과 치료자 요약의 핵심 변화 사건에 반영합니다.", samplePrompts: ["지금 멈추고 있지만, 당신을 피하고 싶은 것은 아니야."], linkedStages: ["stage5_deepen_needs", "stage7_bonding_event"] },
  { id: "pursuer_softening", name: "비난자 순화", description: "요구와 분노 아래의 외로움과 애착욕구를 부드러운 요청으로 바꿉니다.", appImplementation: "비난 문장을 취약한 정서 표현으로 바꾸는 기록을 저장합니다.", samplePrompts: ["나는 당신이 멀어진 것 같아 불안했어."], linkedStages: ["stage5_deepen_needs", "stage7_bonding_event"] },
  { id: "consolidation", name: "통합과 유지", description: "새로운 고리와 회복 문장, 유지 루틴을 정리합니다.", appImplementation: "3기 미션과 회기 정리에 유지 계획 질문을 보여줍니다.", samplePrompts: ["우리 서로의 편으로 다시 돌아오자."], linkedStages: ["stage8_new_solutions", "stage9_consolidation"] }
];

const missionBank = eftStages.flatMap((stage) =>
  stage.recommendedMissions.map((title, index) => ({
    id: `${stage.id}_mission_${index + 1}`,
    stageId: stage.id,
    type: title.includes("함께") || title.includes("우리") || title.includes("배우자") || title.includes("대화") ? "공동" : "개인",
    title,
    description: stage.userPrompt,
    reflectionQuestions: stage.keyQuestions.slice(0, 3),
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: ""
  }))
);

const questionBank = eftStages.flatMap((stage) => [
  ...stage.keyQuestions.slice(0, 4).map((question, index) => ({ id: `${stage.id}_checkin_${index}`, stageId: stage.id, screen: "checkin", question, inputType: "textarea", options: [] })),
  { id: `${stage.id}_before`, stageId: stage.id, screen: "session_before", question: `이번 회기에서 ${stage.shortTitle}와 관련해 다루고 싶은 장면은 무엇인가요?`, inputType: "textarea", options: [] },
  { id: `${stage.id}_after`, stageId: stage.id, screen: "session_after", question: `이번 회기 후 ${stage.shortTitle}와 관련해 새롭게 이해한 감정이나 반응은 무엇인가요?`, inputType: "textarea", options: [] }
]);

const appNavigation = [
  { view: "home", label: "홈", icon: "⌂", mobile: true },
  { view: "checkin", label: "체크인", icon: "＋", mobile: true },
  { view: "records", label: "기록", icon: "☰", mobile: true },
  { view: "share", label: "공유", icon: "◉", mobile: true },
  { view: "cycle", label: "고리", icon: "↔", mobile: false },
  { view: "missions", label: "미션", icon: "✓", mobile: true },
  { view: "sessions", label: "회기", icon: "□", mobile: false },
  { view: "settings", label: "설정", icon: "⚙", mobile: false }
];

let state = loadState();
let currentStep = 1;
let missionStageFilter = "current";
let editingCheckinId = null;
let editingSessionId = null;

const emptyTemplate = document.querySelector("#emptyTemplate");

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindForms();
  bindModals();
  hydrateStaticSelects();
  setDefaultDates();
  moveStep(0);
  renderNavigation();
  showView("home");
});

function loadState() {
  const previous = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("eftweb-v4") || localStorage.getItem("eftweb-v3");
  const fallback = {
    currentStageId: "stage2_cycle_tracking",
    checkins: [],
    cycles: [],
    missions: missionBank,
    sessions: [],
    therapistNotes: { sessionFocus: "", nextScene: "", therapistMemo: "" }
  };
  if (!previous) return fallback;
  try {
    const parsed = JSON.parse(previous);
    const cycles = Array.isArray(parsed.cycles) ? parsed.cycles : parsed.cycle ? [{ ...parsed.cycle, id: crypto.randomUUID() }] : [];
    return {
      currentStageId: parsed.currentStageId || mapLegacyStage(parsed.stageId || parsed.eftStep || "2"),
      checkins: Array.isArray(parsed.checkins) ? parsed.checkins.map(normalizeRecord) : [],
      cycles,
      missions: normalizeMissions(parsed.missions),
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions.map(normalizeSession) : [],
      therapistNotes: parsed.therapistNotes || { sessionFocus: "", nextScene: "", therapistMemo: "" }
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function mapLegacyStage(value) {
  if (String(value).startsWith("stage")) return value;
  const map = { "1": "stage2_cycle_tracking", "2": "stage3_primary_emotion", "3": "stage7_bonding_event" };
  return map[String(value)] || "stage2_cycle_tracking";
}

function getCurrentStage() {
  return eftStages.find((stage) => stage.id === state.currentStageId) || eftStages[1];
}

function normalizeRecord(record) {
  return {
    id: record.id || crypto.randomUUID(),
    createdAt: record.createdAt || new Date().toISOString(),
    updatedAt: record.updatedAt || record.createdAt || new Date().toISOString(),
    author: record.author || "나",
    stageId: record.stageId || mapLegacyStage(record.eftStep || "2"),
    recordType: record.recordType || "emotion_checkin",
    scene: record.scene || "",
    emotion: record.emotion || "",
    bodyResponse: record.bodyResponse || record.body || "",
    protectiveResponse: record.protectiveResponse || record.protective || "",
    secondaryEmotion: record.secondaryEmotion || record.emotion || "",
    primaryEmotion: record.primaryEmotion || record.primary || "",
    attachmentFear: record.attachmentFear || "",
    attachmentNeed: record.attachmentNeed || record.need || "",
    newResponse: record.newResponse || "",
    linkedMissionId: record.linkedMissionId || "",
    therapistReviewed: !!record.therapistReviewed,
    weather: record.weather || "",
    thought: record.thought || "",
    sharePartner: !!record.sharePartner
  };
}

function normalizeMissions(missions) {
  if (!Array.isArray(missions) || !missions.length) return missionBank;
  const migrated = missions.map((mission, index) => ({
    id: mission.id || crypto.randomUUID(),
    stageId: mission.stageId || mapLegacyStage(mission.stage || String(Math.min(3, Math.floor(index / 2) + 1))),
    type: mission.type || "개인",
    title: mission.title || "미션",
    description: mission.description || "",
    reflectionQuestions: mission.reflectionQuestions || [],
    completed: mission.completed ?? !!mission.done,
    createdAt: mission.createdAt || new Date().toISOString(),
    completedAt: mission.completedAt || ""
  }));
  const ids = new Set(migrated.map((mission) => mission.id));
  missionBank.forEach((mission) => {
    if (!ids.has(mission.id)) migrated.push({ ...mission });
  });
  return migrated;
}

function normalizeSession(session) {
  return {
    id: session.id || crypto.randomUUID(),
    createdAt: session.createdAt || new Date().toISOString(),
    updatedAt: session.updatedAt || session.createdAt || new Date().toISOString(),
    stageId: session.stageId || state?.currentStageId || "stage2_cycle_tracking",
    kind: session.kind || "회기 전",
    date: session.date || new Date().toISOString().slice(0, 10),
    scene: session.scene || "",
    insight: session.insight || "",
    practice: session.practice || ""
  };
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const jumpButton = event.target.closest("[data-jump]");
    if (jumpButton) {
      showView(jumpButton.dataset.jump);
      return;
    }
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) showView(viewButton.dataset.view);
  });
}

function renderNavigation() {
  const sideNav = document.querySelector("#sideNav");
  const bottomNav = document.querySelector("#bottomNav");
  sideNav.innerHTML = appNavigation.map((item) => `<button class="nav-item" type="button" data-view="${item.view}"><span aria-hidden="true">${item.icon}</span><strong>${item.label}</strong></button>`).join("");
  bottomNav.innerHTML = appNavigation.filter((item) => item.mobile).map((item) => `<button class="bottom-item" type="button" data-view="${item.view}"><span aria-hidden="true">${item.icon}</span><strong>${item.label}</strong></button>`).join("");
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
  document.querySelector("#therapistFocusForm")?.addEventListener("submit", saveTherapistNotes);
  ["recordFilter", "recordSearch", "authorFilter", "emotionFilter", "stageRecordFilter", "recordTypeFilter", "sortFilter"].forEach((id) => {
    document.querySelector(`#${id}`)?.addEventListener("input", renderRecords);
    document.querySelector(`#${id}`)?.addEventListener("change", renderRecords);
  });
  document.querySelector("#exportBtn").addEventListener("click", exportData);
  document.querySelector("#importFile").addEventListener("change", importData);
  document.querySelector("#currentStageSelect").addEventListener("change", (event) => {
    state.currentStageId = event.target.value;
    saveState();
    renderAll();
  });
  document.querySelector("[data-toggle-therapist]")?.addEventListener("click", () => {
    const details = document.querySelector("#therapistDetails");
    details.open = !details.open;
    if (details.open) details.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelectorAll(".chip-row button").forEach((button) => {
    button.addEventListener("click", () => applyHelperChip(button));
  });
}

function bindModals() {
  const editCheckinModal = document.querySelector("#editCheckinModal");
  document.querySelector("#closeEditCheckin").addEventListener("click", () => editCheckinModal.close());
  document.querySelector("#cancelEditCheckin").addEventListener("click", () => editCheckinModal.close());
  editCheckinModal.addEventListener("click", (event) => { if (event.target === editCheckinModal) editCheckinModal.close(); });
  document.querySelector("#editCheckinForm").addEventListener("submit", saveEditCheckin);
  document.querySelector("#editIntensityInput").addEventListener("input", () => {
    document.querySelector("#editIntensityLabel").textContent = document.querySelector("#editIntensityInput").value;
  });
  const editSessionModal = document.querySelector("#editSessionModal");
  document.querySelector("#closeEditSession").addEventListener("click", () => editSessionModal.close());
  document.querySelector("#cancelEditSession").addEventListener("click", () => editSessionModal.close());
  editSessionModal.addEventListener("click", (event) => { if (event.target === editSessionModal) editSessionModal.close(); });
  document.querySelector("#editSessionForm").addEventListener("submit", saveEditSession);
  document.querySelector("#confirmCancel").addEventListener("click", () => document.querySelector("#confirmDialog").close("cancel"));
  document.querySelector("#confirmOk").addEventListener("click", () => document.querySelector("#confirmDialog").close("ok"));
}

function hydrateStaticSelects() {
  const stageOptions = eftStages.map((stage) => `<option value="${stage.id}">${stage.phase.split(":")[0]} ${stage.step}단계 - ${stage.shortTitle}</option>`).join("");
  document.querySelectorAll("[data-stage-select], #currentStageSelect").forEach((select) => {
    select.innerHTML = stageOptions;
    select.value = state.currentStageId;
  });
  document.querySelectorAll("[data-emotion-select]").forEach((select) => {
    select.innerHTML = `<option value="">선택</option>${emotionOptions.map((item) => `<option>${item}</option>`).join("")}`;
  });
  document.querySelectorAll("[data-fear-select]").forEach((select) => {
    select.innerHTML = `<option value="">선택</option>${fearOptions.map((item) => `<option>${item}</option>`).join("")}`;
  });
  const missionSelect = document.querySelector("#linkedMissionSelect");
  if (missionSelect) {
    missionSelect.innerHTML = `<option value="">연결하지 않음</option>${state.missions.map((mission) => `<option value="${mission.id}">${mission.title}</option>`).join("")}`;
  }
  const missionStageSelect = document.querySelector("#missionForm [name='stage']");
  if (missionStageSelect) {
    missionStageSelect.innerHTML = `<option value="">현재 단계에 추가</option>${stageOptions}`;
  }
  hydrateRecordFilters();
}

function hydrateRecordFilters() {
  const previous = {
    author: document.querySelector("#authorFilter").value || "all",
    emotion: document.querySelector("#emotionFilter").value || "all",
    stage: document.querySelector("#stageRecordFilter").value || "all",
    type: document.querySelector("#recordTypeFilter").value || "all"
  };
  const authors = ["all", ...new Set(state.checkins.map((record) => record.author).filter(Boolean))];
  document.querySelector("#authorFilter").innerHTML = authors.map((author) => `<option value="${author}">${author === "all" ? "작성자 전체" : author}</option>`).join("");
  document.querySelector("#emotionFilter").innerHTML = `<option value="all">감정 전체</option>${emotionOptions.map((item) => `<option>${item}</option>`).join("")}`;
  document.querySelector("#stageRecordFilter").innerHTML = `<option value="all">EFT 단계 전체</option>${eftStages.map((stage) => `<option value="${stage.id}">${stage.step}단계 ${stage.shortTitle}</option>`).join("")}`;
  document.querySelector("#recordTypeFilter").innerHTML = `<option value="all">기록 유형 전체</option>${recordTypes().map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}`;
  restoreSelectValue("#authorFilter", previous.author);
  restoreSelectValue("#emotionFilter", previous.emotion);
  restoreSelectValue("#stageRecordFilter", previous.stage);
  restoreSelectValue("#recordTypeFilter", previous.type);
}

function restoreSelectValue(selector, value) {
  const select = document.querySelector(selector);
  if ([...select.options].some((option) => option.value === value || option.textContent === value)) {
    select.value = value;
  }
}

function recordTypes() {
  return [["emotion_checkin", "감정 체크인"], ["cycle_tracking", "고리 추적"], ["primary_emotion", "속감정 탐색"], ["withdrawer_reengagement", "위축자 재개입"], ["pursuer_softening", "비난자 순화"], ["enactment", "직접 말하기"], ["maintenance", "유지 계획"]];
}

function setDefaultDates() {
  document.querySelector("#sessionForm [name='date']").valueAsDate = new Date();
}

function showView(id) {
  const allowedViews = [...document.querySelectorAll(".view")].map((view) => view.id);
  const viewId = allowedViews.includes(id) ? id : "home";
  document.querySelectorAll(".nav-item, .bottom-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  renderAll();
}

function moveStep(direction) {
  currentStep = Math.min(3, Math.max(1, currentStep + direction));
  document.querySelectorAll(".step").forEach((step) => step.classList.toggle("active", Number(step.dataset.step) === currentStep));
  document.querySelector("#prevStep").disabled = currentStep === 1;
  document.querySelector("#nextStep").classList.toggle("hidden", currentStep === 3);
  document.querySelector("#saveCheckin").classList.toggle("hidden", currentStep !== 3);
  document.querySelector("#stepIndicator").textContent = `${currentStep} / 3`;
  document.querySelectorAll(".step-dot").forEach((dot, index) => dot.classList.toggle("active", index < currentStep));
}

function confirmAction(message) {
  return new Promise((resolve) => {
    const dialog = document.querySelector("#confirmDialog");
    document.querySelector("#confirmMessage").textContent = message;
    dialog.showModal();
    function onClose() {
      resolve(dialog.returnValue === "ok");
      dialog.removeEventListener("close", onClose);
    }
    dialog.addEventListener("close", onClose);
  });
}

function saveCheckin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const record = normalizeRecord({
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bodyResponse: data.body,
    protectiveResponse: data.protective,
    primaryEmotion: data.primary,
    attachmentNeed: data.need,
    stageId: data.stageId || state.currentStageId,
    sharePartner: form.sharePartner.checked
  });
  state.checkins.unshift(record);
  saveState();
  form.reset();
  hydrateStaticSelects();
  document.querySelector("#intensityInput").value = 5;
  document.querySelector("#intensityLabel").textContent = "5";
  currentStep = 1;
  moveStep(0);
  renderAll();
  showView("records");
}

function openEditCheckin(id) {
  const record = state.checkins.find((item) => item.id === id);
  if (!record) return;
  editingCheckinId = id;
  const form = document.querySelector("#editCheckinForm");
  const fields = {
    author: record.author,
    weather: record.weather,
    scene: record.scene,
    emotion: record.emotion,
    intensity: record.intensity || "5",
    body: record.bodyResponse || "",
    protective: record.protectiveResponse || "",
    thought: record.thought || "",
    eftStep: legacyStageNumber(record.stageId),
    primary: record.primaryEmotion || "",
    need: record.attachmentNeed || "",
    newResponse: record.newResponse || ""
  };
  Object.entries(fields).forEach(([name, value]) => {
    if (form.elements[name]) form.elements[name].value = value;
  });
  form.querySelector("[name='sharePartner']").checked = !!record.sharePartner;
  document.querySelector("#editIntensityLabel").textContent = record.intensity || "5";
  document.querySelector("#editCheckinModal").showModal();
}

function legacyStageNumber(stageId) {
  const step = eftStages.find((stage) => stage.id === stageId)?.step || 2;
  if (step <= 4) return "1";
  if (step <= 7) return "2";
  return "3";
}

function saveEditCheckin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const record = state.checkins.find((item) => item.id === editingCheckinId);
  if (!record) return;
  Object.assign(record, normalizeRecord({
    ...record,
    ...data,
    stageId: record.stageId || mapLegacyStage(data.eftStep),
    bodyResponse: data.body,
    protectiveResponse: data.protective,
    primaryEmotion: data.primary,
    attachmentNeed: data.need,
    sharePartner: form.querySelector("[name='sharePartner']").checked,
    updatedAt: new Date().toISOString()
  }));
  saveState();
  document.querySelector("#editCheckinModal").close();
  editingCheckinId = null;
  renderAll();
}

function openEditSession(id) {
  const session = state.sessions.find((item) => item.id === id);
  if (!session) return;
  editingSessionId = id;
  const form = document.querySelector("#editSessionForm");
  ["kind", "date", "scene", "insight", "practice"].forEach((name) => {
    if (form.elements[name]) form.elements[name].value = session[name] || "";
  });
  document.querySelector("#editSessionModal").showModal();
}

function saveEditSession(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const session = state.sessions.find((item) => item.id === editingSessionId);
  if (!session) return;
  Object.assign(session, { ...data, updatedAt: new Date().toISOString() });
  saveState();
  document.querySelector("#editSessionModal").close();
  editingSessionId = null;
  renderAll();
}

function saveCycle(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.cycles.unshift({ ...Object.fromEntries(new FormData(form).entries()), id: crypto.randomUUID(), stageId: state.currentStageId, createdAt: new Date().toISOString() });
  saveState();
  form.reset();
  renderAll();
}

function saveMission(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  state.missions.unshift({
    id: crypto.randomUUID(),
    stageId: data.stage || state.currentStageId,
    type: data.type,
    title: data.title,
    description: getCurrentStage().userPrompt,
    reflectionQuestions: getCurrentStage().keyQuestions.slice(0, 3),
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: "",
    due: data.due || ""
  });
  saveState();
  form.reset();
  hydrateStaticSelects();
  renderAll();
}

function saveSession(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  state.sessions.unshift(normalizeSession({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...data, stageId: data.stageId || state.currentStageId }));
  saveState();
  form.reset();
  setDefaultDates();
  hydrateStaticSelects();
  renderAll();
}

function saveTherapistNotes(event) {
  event.preventDefault();
  state.therapistNotes = Object.fromEntries(new FormData(event.currentTarget).entries());
  saveState();
  renderAll();
}

function renderAll() {
  hydrateRecordFilters();
  hydrateStaticSelects();
  renderHome();
  renderStages();
  renderStageQuestionPanels();
  renderRecords();
  renderShared();
  renderCycle();
  renderMissions();
  renderSessions();
  renderTherapistDashboard();
}

function thisWeekCount(items) {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return items.filter((item) => new Date(item.createdAt) >= cutoff).length;
}

function renderHome() {
  const currentStage = getCurrentStage();
  const total = state.missions.length || 1;
  const done = state.missions.filter((mission) => mission.completed).length;
  const progress = Math.round((done / total) * 100);
  document.querySelector("#homeProgress").textContent = `${progress}%`;
  document.querySelector("#homeProgressBar").style.width = `${progress}%`;
  document.querySelector("#currentStageSelect").value = state.currentStageId;
  const simpleStage = getSimpleStage(currentStage);
  const currentMission = state.missions.find((mission) => mission.stageId === state.currentStageId && !mission.completed);
  document.querySelector("#homeStagePanel").innerHTML = `
    <div>
      <p class="eyebrow">현재 연습</p>
      <h3>${simpleStage.title}</h3>
      <p>${escapeHtml(currentStage.goal)}</p>
      <strong>${escapeHtml(currentStage.coreMessage)}</strong>
    </div>
    <div>
      <h4>오늘의 질문</h4>
      <p>${escapeHtml(currentStage.keyQuestions[0])}</p>
    </div>
    <div>
      <h4>추천 미션</h4>
      <p>${escapeHtml(currentMission?.title || currentStage.recommendedMissions[0])}</p>
    </div>
  `;
}

function getSimpleStage(stage) {
  if (stage.step <= 4) return { id: "notice", title: "1. 고리 알아차리기" };
  if (stage.step <= 7) return { id: "share", title: "2. 속마음 나누기" };
  return { id: "practice", title: "3. 새 대화 연습하기" };
}

function renderStages() {
  const board = document.querySelector("#stageBoard");
  board.innerHTML = eftStages.map((stage) => `
    <article class="stage-card ${stage.id === state.currentStageId ? "current" : ""}">
      <header>
        <div>
          <p class="eyebrow">${stage.phase}</p>
          <h3>${stage.step}단계 · ${stage.title}</h3>
          <p>${escapeHtml(stage.goal)}</p>
        </div>
        <button class="small-button" type="button" data-set-stage="${stage.id}">${stage.id === state.currentStageId ? "현재 단계" : "이 단계 선택"}</button>
      </header>
      <p><strong>핵심 메시지</strong><br>${escapeHtml(stage.coreMessage)}</p>
      <p><strong>핵심 질문</strong></p>
      <ul>${stage.keyQuestions.slice(0, 4).map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ul>
      <p><strong>추천 미션</strong></p>
      <ul>${stage.recommendedMissions.slice(0, 4).map((mission) => `<li>${escapeHtml(mission)}</li>`).join("")}</ul>
      <p><strong>치료자 메모 초점</strong><br>${stage.therapistFocus.join(", ")}</p>
    </article>
  `).join("");
  board.querySelectorAll("[data-set-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentStageId = button.dataset.setStage;
      saveState();
      renderAll();
    });
  });
}

function renderStageQuestionPanels() {
  const stage = getCurrentStage();
  const checkinQuestions = questionBank.filter((question) => question.stageId === stage.id && question.screen === "checkin").slice(0, 4);
  document.querySelector("#checkinQuestionPanel").innerHTML = `<p class="eyebrow">현재 단계 질문</p><h3>${stage.shortTitle}</h3><ul>${checkinQuestions.map((item) => `<li>${escapeHtml(item.question)}</li>`).join("")}</ul><p>${escapeHtml(stage.userPrompt)}</p>`;
  const sessionQuestions = questionBank.filter((question) => question.stageId === stage.id && question.screen.startsWith("session"));
  document.querySelector("#sessionQuestionPanel").innerHTML = `<p class="eyebrow">회기 질문</p><ul>${sessionQuestions.map((item) => `<li>${escapeHtml(item.question)}</li>`).join("")}</ul>`;
}

function getStageTitle(stageId) {
  const stage = eftStages.find((item) => item.id === stageId);
  return stage ? `${stage.step}단계 ${stage.shortTitle}` : "단계 미정";
}

function getStagePhase(stageId) {
  return eftStages.find((item) => item.id === stageId)?.phase || "";
}

function applyHelperChip(button) {
  const row = button.closest("[data-helper-target]");
  const form = document.querySelector("#checkinForm");
  const targetName = row?.dataset.helperTarget;
  const field = targetName ? form.elements[targetName] : null;
  if (!field) return;
  field.value = field.value.trim() ? `${field.value.trim()}\n${button.textContent}` : button.textContent;
  field.focus();
}

function renderRecords() {
  let records = [...state.checkins];
  const visibility = document.querySelector("#recordFilter")?.value || "all";
  const author = document.querySelector("#authorFilter")?.value || "all";
  const emotion = document.querySelector("#emotionFilter")?.value || "all";
  const stage = document.querySelector("#stageRecordFilter")?.value || "all";
  const type = document.querySelector("#recordTypeFilter")?.value || "all";
  const search = (document.querySelector("#recordSearch")?.value || "").trim().toLowerCase();
  const sort = document.querySelector("#sortFilter")?.value || "newest";
  if (visibility === "private") records = records.filter((record) => !record.sharePartner);
  if (visibility === "partner") records = records.filter((record) => record.sharePartner);
  if (author !== "all") records = records.filter((record) => record.author === author);
  if (emotion !== "all") records = records.filter((record) => record.emotion === emotion || record.secondaryEmotion === emotion);
  if (stage !== "all") records = records.filter((record) => record.stageId === stage);
  if (type !== "all") records = records.filter((record) => record.recordType === type);
  if (search) {
    records = records.filter((record) => Object.values(record).some((value) => String(value || "").toLowerCase().includes(search)));
  }
  records.sort((a, b) => sort === "oldest" ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));
  renderRecordCards(document.querySelector("#recordList"), records, true);
}

function renderShared() {
  renderRecordCards(document.querySelector("#sharedList"), state.checkins.filter((record) => record.sharePartner), false);
}

function renderRecordCards(container, records, editable) {
  container.innerHTML = "";
  if (!records.length) {
    container.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }
  records.forEach((record) => {
    const typeLabel = recordTypes().find(([value]) => value === record.recordType)?.[1] || "기록";
    const reflection = getReflection(record);
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>${escapeHtml(record.emotion || record.secondaryEmotion || "감정 기록")} <span class="muted">${record.intensity || 5}/10</span></h3>
          <p class="muted">${formatDate(record.createdAt)} · ${escapeHtml(record.author)} · ${escapeHtml(typeLabel)}</p>
        </div>
        <span class="badge coral">${escapeHtml(record.protectiveResponse || "보호반응")}</span>
      </header>
      <p><strong>장면</strong><br>${escapeHtml(record.scene || "기록 없음")}</p>
      <p><strong>몸의 반응</strong><br>${escapeHtml(record.bodyResponse || "기록 없음")}</p>
      <p><strong>겉감정 / 일차정서</strong><br>${escapeHtml(record.secondaryEmotion || "기록 없음")} → ${escapeHtml(record.primaryEmotion || "아직 찾는 중")}</p>
      <p><strong>애착두려움</strong><br>${escapeHtml(record.attachmentFear || "기록 없음")}</p>
      <p><strong>애착욕구</strong><br>${escapeHtml(record.attachmentNeed || "기록 없음")}</p>
      <p><strong>새 반응</strong><br>${escapeHtml(record.newResponse || "기록 없음")}</p>
      <div class="reflection-box">${escapeHtml(reflection)}</div>
      <div class="badge-row">
        <span class="badge">${escapeHtml(getStageTitle(record.stageId))}</span>
        ${record.sharePartner ? '<span class="badge green">배우자 공유</span>' : '<span class="badge">나만 보기</span>'}
        ${record.therapistReviewed ? '<span class="badge green">치료자 확인</span>' : ""}
      </div>
    `;
    if (editable) {
      const actions = document.createElement("div");
      actions.className = "card-actions";
      actions.innerHTML = `<button class="small-button" type="button" data-action="edit">수정</button><button class="small-button" type="button" data-action="partner">${record.sharePartner ? "배우자 공유 해제" : "배우자 공유"}</button><button class="small-button" type="button" data-action="review">${record.therapistReviewed ? "확인 취소" : "치료자 확인"}</button><button class="small-button danger" type="button" data-action="delete">삭제</button>`;
      actions.addEventListener("click", (event) => handleRecordAction(event, record.id));
      card.appendChild(actions);
    }
    container.appendChild(card);
  });
}

function getReflection(record) {
  if ((record.protectiveResponse || "").includes("침묵") || (record.protectiveResponse || "").includes("물러")) return "침묵이나 물러남은 무관심이 아니라 더 상처 주지 않으려는 보호반응이었을 수 있습니다.";
  if ((record.protectiveResponse || "").includes("비난") || (record.protectiveResponse || "").includes("따지")) return "강한 요구 아래에는 연결을 잃을까 봐 두려운 마음이 있을 수 있습니다.";
  if ((record.protectiveResponse || "").includes("방어")) return "방어는 공격이 아니라 자신을 지키려는 익숙한 방식일 수 있습니다.";
  return "이 기록은 상대를 비난하기보다 내 마음을 이해하기 위한 출발점입니다.";
}

async function handleRecordAction(event, id) {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.action === "edit") return openEditCheckin(id);
  const record = state.checkins.find((item) => item.id === id);
  if (!record) return;
  if (button.dataset.action === "partner") record.sharePartner = !record.sharePartner;
  if (button.dataset.action === "review") record.therapistReviewed = !record.therapistReviewed;
  if (button.dataset.action === "delete") {
    const ok = await confirmAction("이 기록을 삭제하면 되돌릴 수 없습니다. 삭제하시겠습니까?");
    if (!ok) return;
    state.checkins = state.checkins.filter((item) => item.id !== id);
  }
  record.updatedAt = new Date().toISOString();
  saveState();
  renderAll();
}

function renderCycle() {
  const container = document.querySelector("#cycleMap");
  if (!state.cycles.length) {
    container.innerHTML = '<div class="empty-state">아직 저장된 고리 지도가 없습니다.</div>';
    return;
  }
  container.innerHTML = state.cycles.map((cycle, index) => `
    <div class="cycle-entry">
      <div class="cycle-entry-header">
        <div>
          ${index === 0 ? '<span class="cycle-latest-badge">최신</span>' : ""}
          <h3>${escapeHtml(cycle.cycleName || "우리의 반복 고리")}</h3>
          <p class="muted">${formatDate(cycle.createdAt)}</p>
          <p><strong>시작 신호:</strong> ${escapeHtml(cycle.trigger || "아직 찾는 중")}</p>
          <p><strong>고리 요약:</strong> ${escapeHtml(makeCycleSummary(cycle))}</p>
          <p><strong>멈추는 문장:</strong> ${escapeHtml(cycle.cycleExit || "지금 우리 고리에 들어간 것 같아. 잠깐 멈추고 다시 말해보자.")}</p>
        </div>
        <button class="small-button danger" type="button" data-cycle-delete="${escapeHtml(cycle.id)}">삭제</button>
      </div>
      <div class="cycle-columns">
        <div class="cycle-column"><h3>배우자 A</h3>${cyclePiece("겉반응", cycle.aAction)}${cyclePiece("속으로 해석한 뜻", cycle.aMeaning)}${cyclePiece("속감정", cycle.aPrimary)}${cyclePiece("애착욕구", cycle.aNeed)}${cyclePiece("새 반응", cycle.aNew)}</div>
        <div class="cycle-center">고리가<br>문제입니다</div>
        <div class="cycle-column"><h3>배우자 B</h3>${cyclePiece("겉반응", cycle.bAction)}${cyclePiece("속으로 해석한 뜻", cycle.bMeaning)}${cyclePiece("속감정", cycle.bPrimary)}${cyclePiece("애착욕구", cycle.bNeed)}${cyclePiece("새 반응", cycle.bNew)}</div>
      </div>
    </div>`).join("");
  container.querySelectorAll("[data-cycle-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      const ok = await confirmAction("이 고리 지도를 삭제하시겠습니까?");
      if (!ok) return;
      state.cycles = state.cycles.filter((cycle) => cycle.id !== button.dataset.cycleDelete);
      saveState();
      renderAll();
    });
  });
}

function makeCycleSummary(cycle) {
  return `우리의 고리는 보통 ${cycle.trigger || "[시작 장면]"}에서 시작된다. 이때 A는 ${cycle.aAction || "[A의 보호반응]"}을 보이고, B는 그것을 ${cycle.bMeaning || "[B의 해석]"}으로 받아들인다. 그러면 B는 ${cycle.bAction || "[B의 보호반응]"}을 보이고, A는 그것을 ${cycle.aMeaning || "[A의 해석]"}으로 받아들인다. 사실 A는 ${cycle.aNeed || "[A의 애착욕구]"}를 원하고, B는 ${cycle.bNeed || "[B의 애착욕구]"}를 원한다.`;
}

function cyclePiece(label, value) {
  return `<div class="cycle-piece"><strong>${label}</strong><br>${escapeHtml(value || "함께 찾아가는 중")}</div>`;
}

function renderMissions() {
  const container = document.querySelector("#missionList");
  container.innerHTML = "";
  renderMissionStageFilter();
  let missions = [...state.missions];
  if (missionStageFilter === "current") missions = missions.filter((mission) => mission.stageId === state.currentStageId);
  else if (["phase1", "phase2", "phase3"].includes(missionStageFilter)) missions = missions.filter((mission) => phaseKey(mission.stageId) === missionStageFilter);
  else if (missionStageFilter === "completed") missions = missions.filter((mission) => mission.completed);
  else if (missionStageFilter !== "all") missions = missions.filter((mission) => mission.stageId === missionStageFilter);
  if (!missions.length) {
    container.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }
  missions.forEach((mission) => {
    const card = document.createElement("article");
    card.className = `mission-card ${mission.completed ? "done" : ""}`;
    card.innerHTML = `<header><span class="badge ${mission.type === "공동" ? "coral" : "green"}">${mission.type} 미션</span><span class="muted">${mission.completed ? "완료" : "진행 중"}</span></header><h3>${escapeHtml(mission.title)}</h3><p class="muted">${escapeHtml(getStageTitle(mission.stageId))}</p><p>${escapeHtml(mission.description || "")}</p><div class="card-actions"><button class="small-button" type="button" data-action="toggle">${mission.completed ? "완료 취소" : "완료 표시"}</button><button class="small-button danger" type="button" data-action="delete">삭제</button></div>`;
    card.addEventListener("click", (event) => handleMissionAction(event, mission.id));
    container.appendChild(card);
  });
}

function phaseKey(stageId) {
  const step = eftStages.find((stage) => stage.id === stageId)?.step || 1;
  if (step <= 4) return "phase1";
  if (step <= 7) return "phase2";
  return "phase3";
}

function renderMissionStageFilter() {
  const filter = document.querySelector("#missionStageFilter");
  const buttons = [
    { id: "current", title: "현재 단계" },
    { id: "phase1", title: "1기 미션" },
    { id: "phase2", title: "2기 미션" },
    { id: "phase3", title: "3기 미션" },
    { id: "all", title: "전체 미션" },
    { id: "completed", title: "완료 미션" }
  ];
  filter.innerHTML = buttons.map((item) => `<button type="button" class="${missionStageFilter === item.id ? "active" : ""}" data-mission-stage="${item.id}">${item.title}</button>`).join("");
  filter.querySelectorAll("[data-mission-stage]").forEach((button) => button.addEventListener("click", () => {
    missionStageFilter = button.dataset.missionStage;
    renderMissions();
  }));
}

async function handleMissionAction(event, id) {
  const button = event.target.closest("button");
  if (!button) return;
  const mission = state.missions.find((item) => item.id === id);
  if (!mission) return;
  if (button.dataset.action === "toggle") {
    mission.completed = !mission.completed;
    mission.completedAt = mission.completed ? new Date().toISOString() : "";
  }
  if (button.dataset.action === "delete") {
    const ok = await confirmAction("이 미션을 삭제하시겠습니까?");
    if (!ok) return;
    state.missions = state.missions.filter((item) => item.id !== id);
  }
  saveState();
  renderAll();
}

function renderSessions() {
  const container = document.querySelector("#sessionList");
  container.innerHTML = "";
  if (!state.sessions.length) {
    container.appendChild(emptyTemplate.content.cloneNode(true));
    return;
  }
  state.sessions.forEach((session) => {
    const card = document.createElement("article");
    card.className = "record-card";
    card.innerHTML = `<header><div><h3>${escapeHtml(session.kind)}</h3><p class="muted">${escapeHtml(session.date)} · ${formatDate(session.createdAt)} · ${escapeHtml(getStageTitle(session.stageId))}</p></div><span class="badge">${escapeHtml(session.kind)}</span></header><p><strong>장면 / 새 감정</strong><br>${escapeHtml(session.scene)}</p><p><strong>주제 / 이해한 점</strong><br>${escapeHtml(session.insight || "기록 없음")}</p><p><strong>연습 반응 / 과제</strong><br>${escapeHtml(session.practice || "기록 없음")}</p><div class="card-actions"><button class="small-button" type="button" data-action="edit">수정</button><button class="small-button danger" type="button" data-action="delete">삭제</button></div>`;
    card.querySelector("[data-action='edit']").addEventListener("click", () => openEditSession(session.id));
    card.querySelector("[data-action='delete']").addEventListener("click", async () => {
      const ok = await confirmAction("이 회기 메모를 삭제하시겠습니까?");
      if (!ok) return;
      state.sessions = state.sessions.filter((item) => item.id !== session.id);
      saveState();
      renderAll();
    });
    container.appendChild(card);
  });
}

function renderTherapistDashboard() {
  const dashboard = document.querySelector("#therapistDashboard");
  if (!dashboard) return;
  const stage = getCurrentStage();
  const latestCycle = state.cycles[0] || {};
  const latestA = latestCycle.aAction || "미기록";
  const latestB = latestCycle.bAction || "미기록";
  const aRecords = state.checkins.filter((record) => record.author.includes("A") || record.author === "나");
  const bRecords = state.checkins.filter((record) => record.author.includes("B"));
  const changeEvents = state.checkins.filter((record) => ["withdrawer_reengagement", "pursuer_softening", "enactment"].includes(record.recordType));
  const items = [
    ["현재 EFT 단계", `${stage.phase} · ${stage.step}단계 ${stage.title}`],
    ["핵심 변화 사건", changeEvents.slice(0, 3).map((record) => `${record.author}: ${record.newResponse || record.primaryEmotion || record.scene}`).join("<br>") || "아직 기록 없음"],
    ["주요 부정적 고리", latestCycle.cycleName || "미기록"],
    ["A의 보호반응", latestA],
    ["B의 보호반응", latestB],
    ["A의 일차정서 / 욕구", `${latestCycle.aPrimary || summarizeField(aRecords, "primaryEmotion")} / ${latestCycle.aNeed || summarizeField(aRecords, "attachmentNeed")}`],
    ["B의 일차정서 / 욕구", `${latestCycle.bPrimary || summarizeField(bRecords, "primaryEmotion")} / ${latestCycle.bNeed || summarizeField(bRecords, "attachmentNeed")}`],
    ["위축자 재개입 준비도", readiness("withdrawer_reengagement")],
    ["비난자 순화 준비도", readiness("pursuer_softening")],
    ["이번 회기 초점", state.therapistNotes.sessionFocus || stage.therapistFocus.join(", ")],
    ["회기 사이 과제", state.missions.filter((mission) => mission.stageId === state.currentStageId && !mission.completed).slice(0, 3).map((mission) => mission.title).join("<br>") || "현재 단계 미션 완료 또는 없음"],
    ["다음 회기 장면", state.therapistNotes.nextScene || "미기록"],
    ["치료자 메모", state.therapistNotes.therapistMemo || "미기록"]
  ];
  dashboard.innerHTML = items.map(([label, value]) => `<article class="therapist-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
  const form = document.querySelector("#therapistFocusForm");
  if (form) {
    form.elements.sessionFocus.value = state.therapistNotes.sessionFocus || "";
    form.elements.nextScene.value = state.therapistNotes.nextScene || "";
    form.elements.therapistMemo.value = state.therapistNotes.therapistMemo || "";
  }
}

function summarizeField(records, field) {
  return records.find((record) => record[field])?.[field] || "미기록";
}

function readiness(type) {
  const count = state.checkins.filter((record) => record.recordType === type).length;
  if (count >= 3) return "높음";
  if (count >= 1) return "준비 중";
  return "기록 필요";
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `EFTWEB_v5_backup_${new Date().toISOString().slice(0, 10)}.json`;
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
        currentStageId: imported.currentStageId || "stage2_cycle_tracking",
        checkins: Array.isArray(imported.checkins) ? imported.checkins.map(normalizeRecord) : [],
        cycles: Array.isArray(imported.cycles) ? imported.cycles : [],
        missions: normalizeMissions(imported.missions),
        sessions: Array.isArray(imported.sessions) ? imported.sessions.map(normalizeSession) : [],
        therapistNotes: imported.therapistNotes || { sessionFocus: "", nextScene: "", therapistMemo: "" }
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
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export const DAY_META = [
  { key: "mon", label: "월", full: "월요일" },
  { key: "tue", label: "화", full: "화요일" },
  { key: "wed", label: "수", full: "수요일" },
  { key: "thu", label: "목", full: "목요일" },
  { key: "fri", label: "금", full: "금요일" },
  { key: "sat", label: "토", full: "토요일" },
  { key: "sun", label: "일", full: "일요일" },
] as const

export const BODY_PARTS = ["가슴", "등", "하체", "어깨", "팔", "유산소", "전신", "휴식"] as const
export const REST_DAY_BODY_PART = "휴식" as const

export const GOAL_OPTIONS = [
  {
    key: "muscle_gain",
    label: "골격근 증가",
    helper: "강한 증량 루틴에 맞춰 단백질을 높게 잡습니다",
    proteinMultiplier: 2.1,
  },
  {
    key: "lean_mass",
    label: "린매스업",
    helper: "체지방을 크게 늘리지 않는 범위에서 증량합니다",
    proteinMultiplier: 1.9,
  },
  {
    key: "diet",
    label: "다이어트",
    helper: "감량 중 근손실 방지를 위해 단백질 비중을 유지합니다",
    proteinMultiplier: 2.0,
  },
  {
    key: "performance",
    label: "퍼포먼스 증가",
    helper: "중량과 수행 능력 향상에 맞춰 회복 중심으로 단백질을 잡습니다",
    proteinMultiplier: 1.8,
  },
  {
    key: "maintenance",
    label: "유지",
    helper: "현재 체형과 운동량을 유지하는 기준입니다",
    proteinMultiplier: 1.6,
  },
] as const

export const MACHINE_CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "chest", label: "가슴" },
  { key: "back", label: "등" },
  { key: "legs", label: "하체" },
  { key: "shoulder", label: "어깨" },
  { key: "arms", label: "팔" },
  { key: "cardio", label: "유산소" },
] as const

export const MACHINES = [
  { id: "fly", name: "플라잉 체스트 머신", category: "chest", muscle: "대흉근" },
  { id: "chest-press", name: "체스트 프레스 머신", category: "chest", muscle: "대흉근" },
  { id: "incline-press", name: "인클라인 프레스 머신", category: "chest", muscle: "상부 가슴" },
  { id: "dumbbell-bench", name: "덤벨 벤치프레스", category: "chest", muscle: "가슴/삼두" },
  { id: "lat-pulldown", name: "랫풀다운", category: "back", muscle: "광배근" },
  { id: "seated-row", name: "시티드 로우", category: "back", muscle: "등 중앙" },
  { id: "assisted-pullup", name: "어시스트 풀업", category: "back", muscle: "광배근" },
  { id: "dumbbell-row", name: "원암 덤벨 로우", category: "back", muscle: "광배근" },
  { id: "leg-press", name: "레그 프레스", category: "legs", muscle: "대퇴사두" },
  { id: "leg-extension", name: "레그 익스텐션", category: "legs", muscle: "대퇴사두" },
  { id: "leg-curl", name: "레그 컬", category: "legs", muscle: "햄스트링" },
  { id: "smith-squat", name: "스미스 스쿼트", category: "legs", muscle: "하체" },
  { id: "shoulder-press", name: "숄더 프레스 머신", category: "shoulder", muscle: "전면 삼각근" },
  { id: "lateral-raise", name: "레터럴 레이즈 머신", category: "shoulder", muscle: "측면 삼각근" },
  { id: "dumbbell-press", name: "덤벨 숄더 프레스", category: "shoulder", muscle: "삼각근" },
  { id: "rear-delt", name: "리어 델트 머신", category: "shoulder", muscle: "후면 삼각근" },
  { id: "cable-pushdown", name: "케이블 푸시다운", category: "arms", muscle: "삼두" },
  { id: "dumbbell-curl", name: "덤벨 컬", category: "arms", muscle: "이두" },
  { id: "hammer-curl", name: "해머 컬", category: "arms", muscle: "이두/전완" },
  { id: "dip-machine", name: "어시스트 딥스", category: "arms", muscle: "삼두/가슴" },
  { id: "treadmill", name: "런닝머신", category: "cardio", muscle: "전신" },
  { id: "cycle", name: "사이클", category: "cardio", muscle: "하체/심폐" },
  { id: "elliptical", name: "일립티컬", category: "cardio", muscle: "전신" },
  { id: "rowing", name: "로잉 머신", category: "cardio", muscle: "전신" },
] as const

export const SET_PRESETS = [
  { label: "3세트 × 10회", sets: "3", reps: "10" },
  { label: "4세트 × 12회", sets: "4", reps: "12" },
  { label: "5세트 × 8회", sets: "5", reps: "8" },
] as const

export type DayKey = (typeof DAY_META)[number]["key"]
export type BodyPart = (typeof BODY_PARTS)[number]
export type GoalKey = (typeof GOAL_OPTIONS)[number]["key"]
export type MachineCategoryKey = (typeof MACHINE_CATEGORIES)[number]["key"]
export type Gender = "male" | "female"

export type ExerciseDraft = {
  id: string
  machineId: string
  machineName: string
  weight: string
  reps: string
  sets: string
}

export type DayRoutineDraft = {
  bodyParts: BodyPart[]
  exercises: ExerciseDraft[]
}

export type RoutineMap = Record<DayKey, DayRoutineDraft>

export type UserProfile = {
  gender: Gender
  height: number
  weight: number
  goal: GoalKey
  proteinTarget: number
}

export type ServingOption = "안 먹음" | "적게" | "보통" | "많이"

export type CafeteriaItem = {
  id: string
  name: string
  serving: ServingOption
}

export type ProteinLogEntry = {
  id: string
  label: string
  protein: number
  time: string
}

export type ProteinState = {
  cafeteria: CafeteriaItem[]
  quickCounts: Record<string, number>
  log: ProteinLogEntry[]
}

export type OnboardingData = {
  profile: UserProfile
  routines: RoutineMap
}

export const SERVING_PROTEIN: Record<ServingOption, number> = {
  "안 먹음": 0,
  "적게": 6,
  "보통": 12,
  "많이": 18,
}

export const DEFAULT_CAFETERIA_ITEMS: CafeteriaItem[] = [
  { id: "c1", name: "닭갈비 볶음", serving: "안 먹음" },
  { id: "c2", name: "계란국", serving: "안 먹음" },
  { id: "c3", name: "두부조림", serving: "안 먹음" },
  { id: "c4", name: "잡곡밥", serving: "안 먹음" },
]

export const QUICK_PROTEIN_ITEMS = [
  { id: "q1", name: "닭가슴살", protein: 23 },
  { id: "q2", name: "프로틴", protein: 24 },
  { id: "q3", name: "우유", protein: 8 },
  { id: "q4", name: "달걀", protein: 6 },
] as const

export function createEmptyRoutineMap(): RoutineMap {
  return {
    mon: { bodyParts: [], exercises: [] },
    tue: { bodyParts: [], exercises: [] },
    wed: { bodyParts: [], exercises: [] },
    thu: { bodyParts: [], exercises: [] },
    fri: { bodyParts: [], exercises: [] },
    sat: { bodyParts: [], exercises: [] },
    sun: { bodyParts: [], exercises: [] },
  }
}

export function isRestDay(bodyParts: BodyPart[]) {
  return bodyParts.includes(REST_DAY_BODY_PART)
}

export function hasWorkoutBodyParts(bodyParts: BodyPart[]) {
  return bodyParts.length > 0 && !isRestDay(bodyParts)
}

export function formatBodyParts(bodyParts: BodyPart[], emptyLabel = "미설정") {
  if (bodyParts.length === 0) {
    return emptyLabel
  }

  if (isRestDay(bodyParts)) {
    return REST_DAY_BODY_PART
  }

  return bodyParts.join(" · ")
}

export function toggleBodyPartSelection(currentBodyParts: BodyPart[], nextBodyPart: BodyPart): BodyPart[] {
  if (nextBodyPart === REST_DAY_BODY_PART) {
    return isRestDay(currentBodyParts) ? [] : [REST_DAY_BODY_PART]
  }

  const nextSet = new Set(currentBodyParts.filter((bodyPart) => bodyPart !== REST_DAY_BODY_PART))
  if (nextSet.has(nextBodyPart)) {
    nextSet.delete(nextBodyPart)
  } else {
    nextSet.add(nextBodyPart)
  }

  return BODY_PARTS.filter(
    (bodyPart): bodyPart is Exclude<BodyPart, typeof REST_DAY_BODY_PART> =>
      bodyPart !== REST_DAY_BODY_PART && nextSet.has(bodyPart),
  )
}

export function getPreferredMachineCategories(bodyParts: BodyPart[]): MachineCategoryKey[] {
  const bodyPartToCategory: Partial<Record<BodyPart, MachineCategoryKey>> = {
    "가슴": "chest",
    "등": "back",
    "하체": "legs",
    "어깨": "shoulder",
    "팔": "arms",
    "유산소": "cardio",
  }

  return bodyParts.reduce<MachineCategoryKey[]>((accumulator, bodyPart) => {
    const category = bodyPartToCategory[bodyPart]
    if (category && !accumulator.includes(category)) {
      accumulator.push(category)
    }
    return accumulator
  }, [])
}

function normalizeBodyParts(value: unknown): BodyPart[] {
  if (typeof value === "string") {
    return BODY_PARTS.includes(value as BodyPart) ? toggleBodyPartSelection([], value as BodyPart) : []
  }

  if (!Array.isArray(value)) {
    return []
  }

  const filtered = value.filter((item): item is BodyPart => typeof item === "string" && BODY_PARTS.includes(item as BodyPart))
  if (filtered.includes(REST_DAY_BODY_PART)) {
    return [REST_DAY_BODY_PART]
  }

  return BODY_PARTS.filter(
    (bodyPart): bodyPart is Exclude<BodyPart, typeof REST_DAY_BODY_PART> =>
      bodyPart !== REST_DAY_BODY_PART && filtered.includes(bodyPart),
  )
}

export function normalizeRoutineMap(value: unknown): RoutineMap {
  const initial = createEmptyRoutineMap()

  if (!value || typeof value !== "object") {
    return initial
  }

  const candidate = value as Record<string, unknown>

  DAY_META.forEach((day) => {
    const rawRoutine = candidate[day.key]
    if (!rawRoutine || typeof rawRoutine !== "object") {
      return
    }

    const parsedRoutine = rawRoutine as {
      bodyParts?: unknown
      bodyPart?: unknown
      exercises?: unknown
    }

    initial[day.key] = {
      bodyParts: normalizeBodyParts(parsedRoutine.bodyParts ?? parsedRoutine.bodyPart),
      exercises: Array.isArray(parsedRoutine.exercises)
        ? parsedRoutine.exercises.flatMap((exercise) => {
            if (!exercise || typeof exercise !== "object") {
              return []
            }

            const candidateExercise = exercise as Partial<ExerciseDraft>
            if (typeof candidateExercise.id !== "string") {
              return []
            }

            return [
              {
                id: candidateExercise.id,
                machineId: typeof candidateExercise.machineId === "string" ? candidateExercise.machineId : "",
                machineName: typeof candidateExercise.machineName === "string" ? candidateExercise.machineName : "",
                weight: typeof candidateExercise.weight === "string" ? candidateExercise.weight : "",
                reps: typeof candidateExercise.reps === "string" ? candidateExercise.reps : "",
                sets: typeof candidateExercise.sets === "string" ? candidateExercise.sets : "",
              },
            ]
          })
        : [],
    }
  })

  return initial
}

export function createInitialProteinState(): ProteinState {
  return {
    cafeteria: DEFAULT_CAFETERIA_ITEMS.map((item) => ({ ...item })),
    quickCounts: QUICK_PROTEIN_ITEMS.reduce((accumulator, item) => {
      accumulator[item.id] = 0
      return accumulator
    }, {} as Record<string, number>),
    log: [],
  }
}

export function calculateProteinTarget(weight: number, goal: GoalKey): number {
  const option = GOAL_OPTIONS.find((item) => item.key === goal)
  if (!option || !Number.isFinite(weight) || weight <= 0) {
    return 0
  }

  return Math.round(weight * option.proteinMultiplier)
}

export function getGoalOption(goal: GoalKey) {
  return GOAL_OPTIONS.find((item) => item.key === goal) ?? GOAL_OPTIONS[0]
}

export function getTodayDayKey(date = new Date()): DayKey {
  return DAY_META[date.getDay() === 0 ? 6 : date.getDay() - 1].key
}

export function getDayMeta(dayKey: DayKey) {
  return DAY_META.find((day) => day.key === dayKey) ?? DAY_META[0]
}

export function createExerciseId(dayKey: DayKey, machineId: string) {
  return `${dayKey}-${machineId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

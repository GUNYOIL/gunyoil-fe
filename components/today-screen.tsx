"use client"

import { useEffect, useMemo, useState } from "react"
import { DAY_META, getTodayDayKey, type RoutineMap } from "@/lib/app-config"
import { CheckCircle2Icon, CircleIcon } from "./icons"

type SetState = "idle" | "done"

type ExerciseRecord = {
  id: string
  name: string
  targetWeight: number
  targetReps: number
  targetSets: number
  sets: SetState[]
  actualReps: Record<number, string>
}

function createExerciseRecords(routines: RoutineMap) {
  const todayKey = getTodayDayKey()
  const routine = routines[todayKey]

  if (!routine || routine.bodyPart === "휴식" || routine.exercises.length === 0) {
    return []
  }

  return routine.exercises.map((exercise) => {
    const targetSets = Math.max(1, Number(exercise.sets) || 1)

    return {
      id: exercise.id,
      name: exercise.machineName,
      targetWeight: Number(exercise.weight) || 0,
      targetReps: Number(exercise.reps) || 0,
      targetSets,
      sets: Array.from({ length: targetSets }, () => "idle" as const),
      actualReps: {},
    }
  })
}

function getCompletion(exercises: ExerciseRecord[]) {
  const totalSets = exercises.reduce((accumulator, exercise) => accumulator + exercise.targetSets, 0)
  const doneSets = exercises.reduce(
    (accumulator, exercise) => accumulator + exercise.sets.filter((state) => state === "done").length,
    0,
  )

  return {
    totalSets,
    doneSets,
    pct: totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0,
  }
}

export default function TodayScreen({ routines }: { routines: RoutineMap }) {
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [exercises, setExercises] = useState<ExerciseRecord[]>(() => createExerciseRecords(routines))

  const today = new Date()
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
  const todayKey = getTodayDayKey(today)
  const todayRoutine = routines[todayKey]
  const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일`
  const dayStr = dayNames[today.getDay()]
  const todayLabel = DAY_META.find((day) => day.key === todayKey)?.full ?? dayStr

  useEffect(() => {
    setExercises(createExerciseRecords(routines))
    setExpandedId(null)
  }, [routines])

  const hasRoutine = Boolean(todayRoutine?.bodyPart) && todayRoutine.bodyPart !== "휴식" && exercises.length > 0

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setExercises((previous) =>
      previous.map((exercise) => {
        if (exercise.id !== exerciseId) {
          return exercise
        }

        const currentDoneCount = exercise.sets.filter((state) => state === "done").length
        const nextDoneCount = currentDoneCount === setIndex + 1 ? setIndex : setIndex + 1
        const nextSets = exercise.sets.map((_, index) => (index < nextDoneCount ? "done" : "idle")) as SetState[]
        return { ...exercise, sets: nextSets }
      }),
    )
  }

  const setActualReps = (exerciseId: string, setIndex: number, value: string) => {
    setExercises((previous) =>
      previous.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, actualReps: { ...exercise.actualReps, [setIndex]: value } }
          : exercise,
      ),
    )
  }

  const { totalSets, doneSets, pct } = useMemo(() => getCompletion(exercises), [exercises])
  const remaining = totalSets - doneSets

  const handleSave = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  if (!hasRoutine) {
    return (
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[22px] font-bold tracking-tight text-[#191F28]">{dateStr}</span>
            <span className="text-[15px] text-[#8B95A1]">{dayStr}</span>
          </div>
          <p className="mt-0.5 text-[13px] text-[#8B95A1]">{todayLabel}</p>
        </div>

        <div className="px-4 pb-6">
          <div className="rounded-[24px] border border-[#E5E8EB] bg-[#FFFFFF] px-4 py-8 text-center">
            <p className="text-[18px] font-bold text-[#191F28]">
              {todayRoutine?.bodyPart === "휴식" ? "오늘은 휴식일입니다" : "오늘 루틴이 비어 있습니다"}
            </p>
            <p className="mt-2 text-[13px] leading-6 text-[#8B95A1]">
              루틴 탭에서 오늘 운동을 추가하면 이 화면에서 바로 기록할 수 있습니다
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[22px] font-bold tracking-tight text-[#191F28]">{dateStr}</span>
            <span className="text-[15px] text-[#8B95A1]">{dayStr}</span>
          </div>
          <p className="mt-0.5 text-[13px] text-[#8B95A1]">
            {todayLabel} · {todayRoutine.bodyPart}
          </p>
        </div>

        <div className="px-4 mb-4">
          <div className="rounded-2xl border border-[#E5E8EB] bg-[#F8FAFC] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="mb-0.5 text-[12px] font-medium text-[#8B95A1]">오늘 달성률</p>
                <p className="text-[28px] font-bold leading-none text-[#191F28]">{pct}%</p>
              </div>
              <div className="text-right">
                <p className="mb-0.5 text-[12px] text-[#8B95A1]">남은 세트</p>
                <p className="text-[22px] font-bold leading-none text-[#191F28]">
                  {remaining}
                  <span className="ml-1 text-[14px] font-medium text-[#8B95A1]">개</span>
                </p>
              </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E5E8EB]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  backgroundColor: pct >= 100 ? "#2CB52C" : "#3182F6",
                  width: `${pct}%`,
                }}
              />
            </div>
            <div className="mt-1.5 flex justify-between">
              <span className="text-[11px] text-[#8B95A1]">{doneSets}세트 완료</span>
              <span className="text-[11px] text-[#8B95A1]">목표 {totalSets}세트</span>
            </div>
          </div>
        </div>

        <div className="px-4 mb-2">
          <span className="text-[13px] font-semibold text-[#4E5968]">오늘 운동</span>
          <p className="mt-1 text-[12px] text-[#8B95A1]">세트 번호를 누르면 해당 번호까지 한 번에 완료됩니다</p>
        </div>

        <div className="flex flex-col gap-3 px-4 pb-4">
          {exercises.map((exercise) => {
            const doneCount = exercise.sets.filter((state) => state === "done").length
            const isExpanded = expandedId === exercise.id
            const isDone = doneCount === exercise.targetSets

            return (
              <div
                key={exercise.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isDone ? "border-[#2CB52C] bg-[#F6FFF6]" : "border-[#E5E8EB] bg-[#FFFFFF]"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between px-4 py-3"
                  onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                  type="button"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    {isDone ? (
                      <CheckCircle2Icon className="shrink-0 text-[#2CB52C]" size={18} />
                    ) : (
                      <CircleIcon className="shrink-0 text-[#E5E8EB]" size={18} />
                    )}
                    <div className="min-w-0 text-left">
                      <p className="truncate text-[14px] font-semibold text-[#191F28]">{exercise.name}</p>
                      <p className="text-[12px] text-[#8B95A1]">
                        목표 {exercise.targetWeight}kg · {exercise.targetReps}회 · {exercise.targetSets}세트
                      </p>
                    </div>
                  </div>
                  <span className={`ml-2 shrink-0 text-[12px] font-semibold ${isDone ? "text-[#2CB52C]" : "text-[#3182F6]"}`}>
                    {doneCount}/{exercise.targetSets}
                  </span>
                </button>

                <div className="flex flex-wrap gap-2 px-4 pb-3">
                  {exercise.sets.map((state, index) => (
                    <button
                      key={index}
                      className={`h-10 w-10 rounded-xl text-[13px] font-bold transition-all active:scale-95 ${
                        state === "done"
                          ? "bg-[#3182F6] text-white"
                          : "border border-[#E5E8EB] bg-[#F8FAFC] text-[#8B95A1]"
                      }`}
                      onClick={() => toggleSet(exercise.id, index)}
                      type="button"
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {isExpanded ? (
                  <div className="border-t border-[#E5E8EB] px-4 pb-4 pt-1">
                    <p className="mb-2 text-[12px] font-medium text-[#8B95A1]">실제 횟수 기록</p>
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: exercise.targetSets }, (_, index) => (
                        <div key={index} className="flex flex-col items-center gap-1">
                          <span className="text-[11px] text-[#8B95A1]">{index + 1}세트</span>
                          <input
                            className="w-full rounded-lg border border-[#E5E8EB] bg-[#F8FAFC] py-2 text-center text-[13px] font-semibold text-[#191F28] outline-none"
                            onChange={(event) => setActualReps(exercise.id, index, event.target.value)}
                            placeholder={String(exercise.targetReps)}
                            type="number"
                            value={exercise.actualReps[index] ?? ""}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-[#E5E8EB] bg-[#FFFFFF] px-4 py-3">
        <button
          className={`w-full rounded-2xl py-4 text-[15px] font-semibold text-white transition-all active:opacity-90 ${
            saved ? "bg-[#2CB52C]" : "bg-[#3182F6]"
          }`}
          onClick={handleSave}
          type="button"
        >
          {saved ? "저장 완료!" : "오늘 기록 저장"}
        </button>
      </div>
    </div>
  )
}

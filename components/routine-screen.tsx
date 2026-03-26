"use client"

import { DAY_META, getTodayDayKey, type RoutineMap } from "@/lib/app-config"

export default function RoutineScreen({
  onEdit,
  routines,
}: {
  onEdit: () => void
  routines: RoutineMap
}) {
  const todayKey = getTodayDayKey()
  const configuredDays = DAY_META.filter((day) => {
    const routine = routines[day.key]
    return routine.bodyPart && routine.bodyPart !== "휴식"
  })
  const totalSets = configuredDays.reduce((sum, day) => {
    return sum + routines[day.key].exercises.reduce((exerciseSum, exercise) => exerciseSum + (Number(exercise.sets) || 0), 0)
  }, 0)

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-[#191F28]">주간 루틴</h2>
            <p className="mt-0.5 text-[13px] text-[#8B95A1]">요일별 부위와 머신 설정</p>
          </div>
          <button
            className="rounded-full bg-[#EBF3FE] px-3.5 py-2 text-[12px] font-semibold text-[#3182F6]"
            onClick={onEdit}
            type="button"
          >
            수정
          </button>
        </div>
      </div>

      <div className="px-4 mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-[#E5E8EB] bg-[#FFFFFF] p-4">
          <p className="text-[12px] font-medium text-[#8B95A1]">운동일</p>
          <p className="mt-1 text-[24px] font-bold leading-none text-[#191F28]">{configuredDays.length}일</p>
        </div>
        <div className="rounded-2xl border border-[#E5E8EB] bg-[#FFFFFF] p-4">
          <p className="text-[12px] font-medium text-[#8B95A1]">총 세트</p>
          <p className="mt-1 text-[24px] font-bold leading-none text-[#191F28]">{totalSets}세트</p>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {DAY_META.map((day) => {
            const routine = routines[day.key]
            const isToday = day.key === todayKey
            const hasRoutine = Boolean(routine.bodyPart) && routine.bodyPart !== "휴식"

            return (
              <div
                key={day.key}
                className={`flex w-[62px] flex-shrink-0 flex-col items-center gap-1 rounded-2xl border py-2.5 ${
                  isToday ? "border-[#3182F6] bg-[#EBF3FE]" : "border-[#E5E8EB] bg-[#F8FAFC]"
                }`}
              >
                <span className={`text-[13px] font-semibold ${isToday ? "text-[#3182F6]" : "text-[#4E5968]"}`}>
                  {day.label}
                </span>
                <span className={`text-[11px] ${isToday ? "text-[#3182F6]" : "text-[#8B95A1]"}`}>
                  {routine.bodyPart || "미설정"}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${hasRoutine ? "bg-[#2CB52C]" : "bg-[#E5E8EB]"}`} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-6">
        {DAY_META.map((day) => {
          const routine = routines[day.key]
          const isToday = day.key === todayKey
          const isRest = routine.bodyPart === "휴식"
          const isEmpty = !routine.bodyPart

          return (
            <div
              key={day.key}
              className={`overflow-hidden rounded-2xl border ${
                isToday ? "border-[#3182F6]" : "border-[#E5E8EB]"
              }`}
            >
              <div className={`flex items-center justify-between px-4 py-3 ${isToday ? "bg-[#EBF3FE]" : "bg-[#F8FAFC]"}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-[14px] font-semibold ${isToday ? "text-[#3182F6]" : "text-[#191F28]"}`}>
                    {day.full}
                  </span>
                  {isToday ? (
                    <span className="rounded-full border border-[#3182F6] bg-[#FFFFFF] px-2 py-0.5 text-[11px] font-semibold text-[#3182F6]">
                      오늘
                    </span>
                  ) : null}
                  {routine.bodyPart ? <span className="text-[12px] text-[#4E5968]">{routine.bodyPart}</span> : null}
                </div>
                {isEmpty || isRest ? (
                  <span className="rounded-full border border-[#E5E8EB] bg-[#FFFFFF] px-2.5 py-1 text-[12px] text-[#8B95A1]">
                    {isRest ? "휴식일" : "미설정"}
                  </span>
                ) : null}
              </div>

              {isEmpty || isRest ? (
                <div className="flex items-center justify-center bg-[#FFFFFF] px-4 py-4">
                  <span className="text-[13px] text-[#8B95A1]">
                    {isRest ? "오늘은 쉬어요" : "아직 설정된 운동이 없습니다"}
                  </span>
                </div>
              ) : (
                <div className="divide-y divide-[#E5E8EB] bg-[#FFFFFF]">
                  {routine.exercises.map((exercise) => (
                    <div key={exercise.id} className="flex items-center justify-between px-4 py-3">
                      <span className="text-[13px] font-medium text-[#191F28]">{exercise.machineName}</span>
                      <span className="text-[12px] text-[#8B95A1]">
                        {exercise.weight}kg · {exercise.reps}회 · {exercise.sets}세트
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between bg-[#F8FAFC] px-4 py-2.5">
                    <span className="text-[12px] text-[#8B95A1]">총 세트</span>
                    <span className="text-[12px] font-semibold text-[#4E5968]">
                      {routine.exercises.reduce((sum, exercise) => sum + (Number(exercise.sets) || 0), 0)}세트
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

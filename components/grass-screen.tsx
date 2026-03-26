"use client"

import { useState } from "react"

type DayData = {
  date: number
  pct: number // 0 = no record, 1-33 low, 34-66 medium, 67-99 high, 100 complete
  bodyPart?: string
  exerciseCount?: number
}

function getGrassColor(pct: number): string {
  if (pct === 0) return "#EAECEF"
  if (pct < 34) return "#B8EFB8"
  if (pct < 67) return "#5FD35F"
  if (pct < 100) return "#2CB52C"
  return "#1A8C1A"
}

// Generate mock data for March 2026
function generateMonthData(): DayData[] {
  const workoutDays: Record<number, { pct: number; bodyPart: string; exerciseCount: number }> = {
    3: { pct: 100, bodyPart: "가슴", exerciseCount: 3 },
    4: { pct: 85, bodyPart: "등", exerciseCount: 4 },
    5: { pct: 0, bodyPart: "", exerciseCount: 0 }, // rest
    6: { pct: 72, bodyPart: "하체", exerciseCount: 3 },
    7: { pct: 0, bodyPart: "", exerciseCount: 0 }, // rest
    8: { pct: 0, bodyPart: "", exerciseCount: 0 }, // rest
    9: { pct: 0, bodyPart: "", exerciseCount: 0 },
    10: { pct: 82, bodyPart: "가슴", exerciseCount: 3 }, // today
    11: { pct: 0, bodyPart: "", exerciseCount: 0 },
    12: { pct: 0, bodyPart: "", exerciseCount: 0 },
    13: { pct: 0, bodyPart: "", exerciseCount: 0 },
    14: { pct: 0, bodyPart: "", exerciseCount: 0 },
    17: { pct: 100, bodyPart: "가슴", exerciseCount: 3 },
    18: { pct: 60, bodyPart: "등", exerciseCount: 3 },
    19: { pct: 0, bodyPart: "", exerciseCount: 0 },
    20: { pct: 90, bodyPart: "하체", exerciseCount: 4 },
    21: { pct: 0, bodyPart: "", exerciseCount: 0 },
    24: { pct: 100, bodyPart: "가슴", exerciseCount: 3 },
    25: { pct: 45, bodyPart: "어깨", exerciseCount: 3 },
    26: { pct: 0, bodyPart: "", exerciseCount: 0 },
    27: { pct: 100, bodyPart: "하체", exerciseCount: 4 },
    28: { pct: 0, bodyPart: "", exerciseCount: 0 },
  }

  const days: DayData[] = []
  for (let d = 1; d <= 31; d++) {
    if (workoutDays[d]) {
      days.push({ date: d, ...workoutDays[d] })
    } else {
      days.push({ date: d, pct: 0 })
    }
  }
  return days
}

const MONTH_DATA = generateMonthData()

// March 2026 starts on Sunday (offset=0 in 0=Sun grid... but we want Mon-first)
// March 1 is Sunday, so in Mon-first layout it goes to position 6
const START_OFFSET = 6 // Sun after Mon = index 6

export default function GrassScreen() {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(
    MONTH_DATA.find((d) => d.date === 10) ?? null
  )

  const workoutCount = MONTH_DATA.filter((d) => d.pct > 0).length
  const avgPct = Math.round(
    MONTH_DATA.filter((d) => d.date <= 10 && d.pct > 0).reduce((a, b) => a + b.pct, 0) /
      MONTH_DATA.filter((d) => d.date <= 10 && d.pct > 0).length
  )

  // For weekly streak: count backward from day 10
  const streak = 2

  const weekDayLabels = ["월", "화", "수", "목", "금", "토", "일"]

  // Build grid cells: fill with null for offset
  const cells: (DayData | null)[] = []
  for (let i = 0; i < START_OFFSET; i++) cells.push(null)
  MONTH_DATA.forEach((d) => cells.push(d))

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <h2 className="text-[20px] font-bold text-[#191F28] tracking-tight">운동 잔디</h2>
        <p className="text-[13px] text-[#8B95A1] mt-0.5">2026년 3월</p>
      </div>

      {/* Stat Cards */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "이번 주 평균", value: `${avgPct}%` },
            { label: "연속", value: `${streak}일` },
            { label: "이번 달", value: `${workoutCount}회` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#F8FAFC] border border-[#E5E8EB] rounded-2xl px-3 py-3 flex flex-col gap-1"
            >
              <span className="text-[11px] text-[#8B95A1] font-medium">{label}</span>
              <span className="text-[20px] font-bold text-[#191F28] leading-none">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="px-4 mb-4">
        <div className="bg-[#FFFFFF] border border-[#E5E8EB] rounded-2xl p-4">
          {/* Week day labels */}
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {weekDayLabels.map((d) => (
              <div key={d} className="text-center text-[10px] text-[#8B95A1] font-medium">
                {d}
              </div>
            ))}
          </div>
          {/* Day cells grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, idx) => {
              if (!cell) {
                return <div key={`empty-${idx}`} className="aspect-square" />
              }
              const isToday = cell.date === 10
              const isSelected = selectedDay?.date === cell.date
              const color = getGrassColor(cell.pct)
              return (
                <button
                  key={cell.date}
                  onClick={() => setSelectedDay(cell)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-medium transition-all relative ${
                    isSelected ? "ring-2 ring-[#3182F6] ring-offset-1" : ""
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {isToday && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#3182F6] border border-white"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className="text-[11px] text-[#8B95A1] font-medium">미기록</span>
            {[
              { color: "#EAECEF", label: "" },
              { color: "#B8EFB8", label: "" },
              { color: "#5FD35F", label: "" },
              { color: "#2CB52C", label: "" },
              { color: "#1A8C1A", label: "" },
            ].map(({ color }, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="text-[11px] text-[#8B95A1] font-medium">완료</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-[#8B95A1]">낮음</span>
            <span className="text-[10px] text-[#8B95A1]">보통</span>
            <span className="text-[10px] text-[#8B95A1]">높음</span>
          </div>
        </div>
      </div>

      {/* Selected Day Detail */}
      {selectedDay && (
        <div className="px-4 mb-4">
          <div className="bg-[#F8FAFC] border border-[#E5E8EB] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-[#191F28]">
                3월 {selectedDay.date}일
              </span>
              {selectedDay.pct > 0 ? (
                <span
                  className="text-[12px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor:
                      selectedDay.pct === 100 ? "#F6FFF6" : "#F8FAFC",
                    color: selectedDay.pct === 100 ? "#2CB52C" : "#3182F6",
                    border: `1px solid ${selectedDay.pct === 100 ? "#B8EFB8" : "#E5E8EB"}`,
                  }}
                >
                  {selectedDay.pct}%
                </span>
              ) : (
                <span className="text-[12px] text-[#8B95A1] px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E8EB]">
                  미기록
                </span>
              )}
            </div>

            {selectedDay.pct > 0 && selectedDay.bodyPart ? (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "운동 부위", value: selectedDay.bodyPart },
                  { label: "달성률", value: `${selectedDay.pct}%` },
                  { label: "운동 개수", value: `${selectedDay.exerciseCount}개` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-[#8B95A1]">{label}</span>
                    <span className="text-[14px] font-semibold text-[#191F28]">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-[#8B95A1]">이 날은 운동 기록이 없어요</p>
            )}
          </div>
        </div>
      )}

      {/* Recent Activity List */}
      <div className="px-4 mb-6">
        <p className="text-[13px] font-semibold text-[#4E5968] mb-2">최근 운동 기록</p>
        <div className="flex flex-col gap-2">
          {MONTH_DATA.filter((d) => d.pct > 0 && d.date <= 10)
            .reverse()
            .slice(0, 5)
            .map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                  selectedDay?.date === d.date
                    ? "border-[#3182F6] bg-[#EBF3FE]"
                    : "border-[#E5E8EB] bg-[#FFFFFF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: getGrassColor(d.pct) }}
                  />
                  <div className="text-left">
                    <p className="text-[13px] font-semibold text-[#191F28]">
                      3월 {d.date}일
                    </p>
                    <p className="text-[12px] text-[#8B95A1]">{d.bodyPart}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-[13px] font-bold ${
                      d.pct === 100 ? "text-[#2CB52C]" : "text-[#3182F6]"
                    }`}
                  >
                    {d.pct}%
                  </p>
                  <p className="text-[11px] text-[#8B95A1]">{d.exerciseCount}개 운동</p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

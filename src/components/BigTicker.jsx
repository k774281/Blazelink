const BIG_TICKER = [
  { text: '內容行銷' },
  { type: 'sep' },
  { text: 'SEO優化' },
  { type: 'block', text: '自動化獲客' },
  { text: '社群經營' },
  { type: 'sep' },
  { text: '數據驅動' },
  { text: 'API串接' },
  { type: 'sep' },
  { text: 'AI導入' },
]

function renderItem(item, key) {
  if (item.type === 'sep') {
    return <span key={key} className="w-24 h-px bg-hairline shrink-0" />
  }
  if (item.type === 'block') {
    return (
      <span key={key} className="flex items-center gap-3 shrink-0">
        <span className="font-heading font-bold uppercase text-[40px] lg:text-[64px] leading-[0.96] tracking-[-2.56px] text-ink">
          {item.text}
        </span>
      </span>
    )
  }
  return (
    <span
      key={key}
      className="font-heading font-bold uppercase text-[40px] lg:text-[64px] leading-[0.96] tracking-[-2.56px] shrink-0 text-ink"
    >
      {item.text}
    </span>
  )
}

export default function BigTicker() {
  const items = [...BIG_TICKER, ...BIG_TICKER]

  return (
    <div className="overflow-hidden py-6 border-y border-hairline">
      <div className="big-ticker__track flex items-center gap-12 whitespace-nowrap w-max">
        {items.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  )
}

import { asset } from "../_lib/base";
// 跨國SEO行銷 page copy, kept in one place so it can be swapped for headless WP data later.

export const hero = {
  title: ["為高專業品牌打造", "「跨國 SEO 獲客系統」。"],
  lead: "堅持白帽內容行銷，專注頁面轉換率。不只衝刺排名，我們將您的專業知識轉化為數位資產，精準攔截海內外的高價值客戶名單。",
  banner: asset("/img-12.webp"),
};

export const problem = {
  title: "為什麼多數的 SEO 流量，無法變成真實名單或訂單？",
  listTitle: "如果你也曾遇到這些問題",
  image: asset("/img-13.webp"),
  items: [
    "廣告砸預算衝流量，名單來源不分級，成本難以掌握，多依賴內容農場衝字數。",
    "名單進來後業務逐一陌生開發，轉換全憑話術與運氣，成本難以控制。",
    "只對關鍵字排名負責，內容農場衝字數，流量進站後便撒手不管。",
  ],
};

// Runs, so the emphasis travels with the copy rather than living in the markup.
export const answer = {
  title: "鏈客這麼做",
  lead: "不是「把人騙進來」，而是「把對的人留下來」。",
  image: asset("/img-14.webp"),
  items: [
    [
      { text: "透過講座與精準內容漏斗攔截高意圖客戶，" },
      { text: "降低50%廣告成本即可取得一筆名單", strong: true },
      { text: "。" },
    ],
    [
      { text: "名單依意圖分級、動線精準導流，" },
      { text: "每筆訂單取得成本從 NT$800 降至 NT$300，降幅 62.5%", strong: true },
      { text: "。" },
    ],
    [
      { text: "鎖定少量核心關鍵字，搭配站內應用開發精準佈局", strong: true },
      { text: "，把免費流量留住、做深做久。" },
    ],
  ],
};

export const value = {
  title: ["我們不僅引導流量，", "更負責「流量進站後」的行為。"],
  items: [
    {
      no: "01",
      title: "跨國 SEO 佈局",
      body: "突破地域限制，讓海外客戶主動找上門。具備多語系網站架構、國際化標籤（Hreflang）與在地化搜尋意圖解析的技術能力。",
      image: asset("/img-15.webp"),
    },
    {
      no: "02",
      title: "名單轉換優先",
      body: "流量再多，沒有留下名單都是枉然。我們設計「內容轉換漏斗」，讓潛在客戶在閱讀後自然留下聯絡資訊。",
      image: asset("/img-16.webp"),
    },
    {
      no: "03",
      title: "堅持白帽思維",
      body: "拒絕取巧的黑帽手法，協助您萃取專業知識，建立具備長期複利效應的 SEO 數位資產。",
      image: asset("/img-17.webp"),
    },
  ],
};

export const foundation = {
  title: "跨國 SEO 決戰在「底層架構」，而不只是多國語言翻譯。",
  lead: "許多企業出海，誤以為安裝了多國語言翻譯外掛，就能帶來海外訂單。但真正的國際化 SEO，是一項涉及伺服器架構、語系標籤與文化洞察的嚴謹工程。",
  items: [
    {
      no: "01",
      title: "跨國技術基建",
      en: "TECHNICAL SEO",
      body: "從伺服器節點的跨國連線速度優化，到國際化語系標籤（Hreflang）的精準佈署，確保 Google 能正確判讀目標國家，避免語系衝突與權重分散。",
    },
    {
      no: "02",
      title: "跨文化搜尋意圖解析",
      en: "",
      body: "海外高價值客戶的搜尋習慣與台灣截然不同。我們不依賴直翻，而是深入當地市場，重新建構符合當地商業邏輯與痛點的「主題叢集」。",
    },
    {
      no: "03",
      title: "國際級權威信任架構",
      en: "EEAT",
      body: "在高門檻產業（B2B、合規、金融），信任是第一要務。我們協助品牌建立符合 Google EEAT（經驗、專業、權威、信任）標準的內容架構。",
    },
  ],
};

export const funnel = {
  title: "從「無效曝光」到「精準攔截」的架構重組",
  lead: "高信任度產業（如金融、顧問、B2B 設備）的客戶，絕不會看完一篇文章就貿然買單。因此，我們展示嚴謹的「獲客系統藍圖」：",
  closing:
    "您買的不是一堆空泛的流量數字，而是一套從底層代碼到上層商業邏輯皆精密咬合的「獲客引擎」。",
  // Four stages, each one a card that sticks and is covered by the next.
  items: [
    {
      no: "01",
      icon: asset("/figma/icon-funnel-ad.svg"),
      title: "搜尋意圖著陸與防跳出檢驗",
      body: "當訪客點擊搜尋結果進站的 0.5 秒內，我們必須接住他們。系統透過極速載入與符合搜尋意圖的首屏視覺，瞬間建立專業第一印象，將跳出率降至最低。",
      tags: ["AWS 獨立主機極速載入", "痛點精準對接"],
    },
    {
      no: "02",
      icon: asset("/material-symbols_assured-workload.svg"),
      title: "價值傳遞與 E-E-A-T 權威建立",
      body: "訪客開始閱讀。我們透過預先設計的「主題叢集」內部連結網，引導訪客深入閱讀關聯專業文章，展示作者背景與數據引用，建立 Google 與客戶雙重認可的信任護城河。",
      tags: ["內部連結引導網", "專業背書結構化資料"],
    },
    {
      no: "03",
      icon: asset("/icon-park-solid_rectangular-circular-separation.svg"),
      title: "意圖探測與行為分流轉換",
      body: "這是傳統 SEO 公司不具備的技術。在閱讀體驗最高峰處，系統根據訪客意圖強弱，自動分流至三種不同的轉換節點：",
      minis: [
        {
          label: "高意圖：直接決策者",
          body: "引導至客製化表單預約諮詢，獲取最精準的潛在客戶名單。",
        },
        {
          label: "中意圖：評估比較中",
          body: "嵌入 ROI 互動計算機或產業白皮書下載，以工具換取 Email。",
        },
        {
          label: "低意圖：初期爬文者",
          body: "埋設追蹤像素，觸發 GA4 事件，未來以低預算廣告持續觸及。",
        },
      ],
    },
    {
      no: "04",
      icon: asset("/hugeicons_artificial-intelligence-07.svg"),
      title: "數據回傳與自動化對接",
      body: "名單一旦產生，系統會透過 API／Webhook 自動將客戶資料與來源關鍵字，拋轉至您的信箱或企業 CRM 系統中。業務團隊接手時，已掌握客戶痛點，大幅提升最終成交率。",
      tags: ["GA4 轉換事件追蹤", "Webhook 資料拋轉", "全自動化"],
    },
  ],
};

export const fit = {
  title: "專為「高知識門檻」與「高信任度」的企業打造",
  lead: "高價值服務的決策週期長，您的客戶需要的不只是漂亮的網頁，而是能展現權威的數位知識庫。",
  items: [
    "準備拓展海外市場，需要建立國際搜尋能見度的企業。",
    "提供專業顧問服務、B2B 解決方案、顧問或金融等高門檻產業。",
    "厭倦了無效的廣告投放，希望建立長期、穩定「被動搜尋流量」的品牌。",
    "擁有豐富行業經驗，準備將大腦中的無形專業，轉化為有形數位資產的企業主。",
  ],
};

// The page-specific half of the reveal footer.
export const next = {
  title: ["跨足國際市場的第一步，", "從這裡開始。"],
  body: "想讓品牌走入國際，但不知從何開始佈局嗎？您不需要具備任何艱澀的行銷知識，請先與我們分享您的品牌故事與專業優勢。",
  note: "我們不採用強迫推銷。一切將以您的品牌步調與實際需求為最優先考量。",
  cta: "免費預約諮詢",
};

export const onThisPage = [
  { label: "常見困境", href: "#problem" },
  { label: "鏈客這麼做", href: "#answer" },
  { label: "價值主張", href: "#value" },
  { label: "底層架構", href: "#foundation" },
  { label: "獲客漏斗", href: "#funnel" },
  { label: "誰適合", href: "#fit" },
];

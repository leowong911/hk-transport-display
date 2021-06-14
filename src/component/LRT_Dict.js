const lrtCommon = {
  en: {
    stn: "Light Rail Station",
    plat: "Platform",
    select: "Please Select",
    etaAlert:
      "ETA information will be refresh every 10 seconds, reference data only.",
    autoBtnOn: "Turn on swap",
    autoBtnOff: "Turn off swap",
    title: "Light Rail (LRT) ETA",
    lastUpdate: "Last Update",
    stopped: "Not In Service",
    end_service: "End of today's service",
    zone: "Fare Zone",
    route: "Route",
    saveStation: "Saved Light Rail Station",
  },
  tc: {
    stn: "輕鐵站",
    plat: "月台",
    select: "請選擇",
    etaAlert: "到站時間資訊每10秒自動更新，資料只供參考。",
    autoBtnOn: "開啟轉語言",
    autoBtnOff: "關閉轉語言",
    title: "輕鐵 (LRT) 到站時間",
    lastUpdate: "最後更新",
    stopped: "不載客",
    end_service: "本日服務完結",
    zone: "收費區",
    route: "路線",
    saveStation: "已儲存輕鐵站",
  },
};

const lrtStation = {
  en: {
    1: "Tuen Mun Ferry Pier",
    10: "Melody Garden",
    15: "Butterfly",
    20: "Light Rail Depot",
    30: "Lung Mun",
    40: "Tsing Shan Tsuen",
    50: "Tsing Wun",
    60: "Kin On",
    70: "Ho Tin",
    75: "Choy Yee Bridge",
    80: "Affluence",
    90: "Tuen Mun Hospital",
    100: "Siu Hong",
    110: "Kei Lun",
    120: "Ching Chung",
    130: "Kin Sang",
    140: "Tin King",
    150: "Leung King",
    160: "San Wai",
    170: "Shek Pai",
    180: "Shan King (North)",
    190: "Shan King (South)",
    200: "Ming Kum",
    212: "Tai Hing (North)",
    220: "Tai Hing (South)",
    230: "Ngan Wai",
    240: "Siu Hei",
    250: "Tuen Mun Swimming Pool",
    260: "Goodview Garden",
    265: "Siu Lun",
    270: "On Ting",
    275: "Yau Oi",
    280: "Town Centre",
    295: "Tuen Mun",
    300: "Pui To",
    310: "Hoh Fuk Tong",
    320: "San Hui",
    330: "Prime View",
    340: "Fung Tei",
    350: "Lam Tei",
    360: "Nai Wai",
    370: "Chung Uk Tsuen",
    380: "Hung Shui Kiu",
    390: "Tong Fong Tsuen",
    400: "Ping Shan",
    425: "Hang Mei Tsuen",
    430: "Tin Shui Wai",
    435: "Tin Tsz",
    445: "Tin Yiu",
    448: "Locwood",
    450: "Tin Wu",
    455: "Ginza",
    460: "Tin Shui",
    468: "Chung Fu",
    480: "Tin Fu",
    490: "Chestwood",
    500: "Tin Wing",
    510: "Tin Yuet",
    520: "Tin Sau",
    530: "Wetland Park",
    540: "Tin Heng",
    550: "Tin Yat",
    560: "Shui Pin Wai",
    570: "Fung Nin Road",
    580: "Hong Lok Road",
    590: "Tai Tong Road",
    600: "Yuen Long",
    920: "Sam Shing",
  },
  tc: {
    1: "屯門碼頭",
    10: "美樂",
    15: "蝴蝶",
    20: "輕鐵車廠",
    30: "龍門",
    40: "青山村",
    50: "青雲",
    60: "建安",
    70: "河田",
    75: "蔡意橋",
    80: "澤豐",
    90: "屯門醫院",
    100: "兆康",
    110: "麒麟",
    120: "青松",
    130: "建生",
    140: "田景",
    150: "良景",
    160: "新圍",
    170: "石排",
    180: "山景 (北)",
    190: "山景 (南)",
    200: "鳴琴",
    212: "大興 (北)",
    220: "大興 (南)",
    230: "銀圍",
    240: "兆禧",
    250: "屯門泳池",
    260: "豐景園",
    265: "兆麟",
    270: "安定",
    275: "友愛",
    280: "市中心",
    295: "屯門",
    300: "杯渡",
    310: "何福堂",
    320: "新墟",
    330: "景峰",
    340: "鳳地",
    350: "藍地",
    360: "泥圍",
    370: "鍾屋村",
    380: "洪水橋",
    390: "塘坊村",
    400: "屏山",
    425: "坑尾村",
    430: "天水圍",
    435: "天慈",
    445: "天耀",
    448: "樂湖",
    450: "天湖",
    455: "銀座",
    460: "天瑞",
    468: "頌富",
    480: "天富",
    490: "翠湖",
    500: "天榮",
    510: "天悅",
    520: "天秀",
    530: "濕地公園",
    540: "天恒",
    550: "天逸",
    560: "水邊圍",
    570: "豐年路",
    580: "康樂路",
    590: "大棠路",
    600: "元朗",
    920: "三聖",
  },
};

const lrtZoneName = {
  en: {
    z1: "Zone 1",
    z2: "Zone 2",
    z3: "Zone 3",
    z4: "Zone 4",
    z5: "Zone 5",
    z5a: "Zone 5A",
  },
  tc: {
    z1: "第1區",
    z2: "第2區",
    z3: "第3區",
    z4: "第4區",
    z5: "第5區",
    z5a: "第5A區",
  },
};

const lrtZoneStation = {
  z1: [1, 10, 15, 20, 30, 240, 250, 260, 265, 920],
  z2: [
    40, 50, 60, 70, 75, 80, 170, 180, 190, 200, 212, 220, 230, 270, 275, 280,
    295, 300, 310, 320, 330,
  ],
  z3: [90, 100, 110, 120, 130, 140, 150, 160, 340, 350, 360, 370],
  z4: [380, 390, 400, 425, 430, 435, 445, 448, 450, 455, 460, 490, 500],
  z5: [560, 570, 580, 590, 600],
  z5a: [468, 480, 510, 520, 530, 540, 550],
};

const lrtRoutes = {
  505: [100, 120, 130, 140, 150, 160, 170, 200, 60, 295, 280, 270, 265, 920],
  507: [140, 150, 160, 212, 220, 230, 75, 70, 295, 270, 265, 260, 250, 1],
  610: [
    1, 10, 15, 20, 30, 40, 50, 200, 170, 212, 220, 230, 80, 90, 100, 350, 260,
    270, 380, 390, 400, 560, 570, 580, 590, 600,
  ],
  614: [
    1, 240, 250, 260, 265, 270, 280, 300, 310, 320, 330, 340, 100, 350, 360,
    370, 380, 390, 400, 560, 570, 580, 590, 600,
  ],
  "614P": [1, 240, 250, 260, 265, 270, 280, 300, 310, 320, 330, 340, 100],
  615: [
    1, 10, 15, 20, 30, 40, 50, 200, 170, 160, 150, 140, 130, 120, 110, 100, 350,
    360, 370, 380, 390, 400, 560, 570, 580, 590, 600,
  ],
  "615P": [
    1, 10, 15, 20, 30, 40, 50, 200, 170, 160, 150, 140, 130, 120, 110, 100,
  ],
  705: [
    430, 435, 450, 455, 500, 510, 520, 530, 540, 550, 480, 468, 460, 448, 445,
  ],
  706: [
    430, 445, 448, 460, 468, 480, 550, 540, 530, 520, 510, 500, 455, 450, 435,
  ],
  751: [
    550, 480, 468, 490, 500, 455, 450, 435, 430, 425, 380, 370, 360, 350, 100,
    90, 75, 295, 270, 275,
  ],
  "751P": [400, 435, 450, 455, 500, 490, 468, 480, 550],
  "761P": [
    550, 480, 468, 460, 448, 445, 425, 390, 400, 560, 570, 580, 590, 600,
  ],
};

export default {
  lrtStation,
  lrtCommon,
  lrtZoneName,
  lrtZoneStation,
  lrtRoutes,
};

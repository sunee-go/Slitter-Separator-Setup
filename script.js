// ================================================================
// ส่วนที่ 1: ข้อมูลตั้งต้น (ตัวแปรและค่าคงที่)
// ================================================================

let independentSummaryData = null;
let currentDirection = null;

const availableSpecs = ["OT", "GI", "EG", "CR", "HR"];

const machineData = {
    "LS-05": { recoiler: 1440, bb: 1610 },
    "LS-06": { recoiler: 1444, bb: 1560 },
    "LS-08": { recoiler: 845, bb: 820 }
};

const thicknessList = [
    0.4, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8, 0.9,
    1.0, 1.2, 1.4, 1.45, 1.5, 1.6, 1.7, 1.8,
    1.9, 1.95, 2.0, 2.3, 2.4, 2.5, 2.6, 2.8,
    2.9, 3.0, 3.2
];

// ================================================================
// ส่วนที่ 2: SLITTER_RULES
// ================================================================
const SLITTER_RULES = {
    "LS-05": {
        "DEFAULT": [
            { minThick: 0.4, maxThick: 0.6, gap: 20, color: '#ff4d4d', isolateLimit: 247, diffLimit: 149, adjLimit: 299 },
            { minThick: 0.7, maxThick: 1.3, gap: 20, color: '#e67e22', isolateLimit: 299, diffLimit: 149, adjLimit: 299 },
            { minThick: 1.4, maxThick: 2.0, gap: 10, color: '#e67e22', isolateLimit: 299, diffLimit: 149, adjLimit: 299 },
            { minThick: 2.1, maxThick: 3.2, gap: 5, color: '#2ecc36', isolateLimit: 320, diffLimit: 200, adjLimit: 299 },
        ],
        "GI": [
            { minThick: 0.4, maxThick: 0.6, gap: 20, color: '#80e90fec', isolateLimit: 247, diffLimit: 150, adjLimit: 300 },
            { minThick: 0.7, maxThick: 1.3, gap: 20, color: '#e67e22', isolateLimit: 299, diffLimit: 149, adjLimit: 299 },
            { minThick: 1.4, maxThick: 2.0, gap: 10, color: '#e67e22', isolateLimit: 299, diffLimit: 149, adjLimit: 299 },
            { minThick: 2.1, maxThick: 3.2, gap: 5, color: '#f1c40f', isolateLimit: 350, diffLimit: 300, adjLimit: 299 },
        ]
    },
    "LS-06": {
        "OT": [
            { minThick: 0.4, maxThick: 1.0, gap: 20, color: '#f44c2b', isolateLimit: 320, diffLimit: 150 },
            { minThick: 1.1, maxThick: 3.2, gap: 20, color: '#f44c2b', isolateLimit: 350, diffLimit: 200 }
        ],
        "EG": [
            { minThick: 0.4, maxThick: 0.5, gap: 20, color: '#f44c2b', isolateLimit: 190, diffLimit: 120 },
            { minThick: 0.6, maxThick: 1.3, gap: 20, color: '#f44c2b', isolateLimit: 300, diffLimit: 150 },
            { minThick: 1.4, maxThick: 3.2, gap: 20, color: '#f44c2b', isolateLimit: 320, diffLimit: 150 }
        ],
        "GI": [
            { minThick: 0.4, maxThick: 0.4, gap: 20, color: '#ff4d4d', isolateLimit: 150, diffLimit: 150 },
            { minThick: 0.5, maxThick: 0.6, gap: 20, color: '#ff4d4d', isolateLimit: 250, diffLimit: 150, adjLimit: 299 },
            { minThick: 0.7, maxThick: 1.0, gap: 20, color: '#ff4d4d', isolateLimit: 300, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.1, maxThick: 1.35, gap: 20, color: '#ff4d4d', isolateLimit: 320, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.4, maxThick: 3.2, gap: 20, color: '#ff4d4d', isolateLimit: 320, diffLimit: 200, adjLimit: 250 }
        ],
        "CR": [
            { minThick: 0.4, maxThick: 0.4, gap: 20, color: '#ff4d4d', isolateLimit: 190, diffLimit: 150, equalLimit: 189 },
            { minThick: 0.5, maxThick: 0.6, gap: 20, color: '#ff4d4d', isolateLimit: 250, diffLimit: 150, adjLimit: 299 },
            { minThick: 0.7, maxThick: 1.6, gap: 20, color: '#ff4d4d', isolateLimit: 250, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.7, maxThick: 3.2, gap: 20, color: '#ff4d4d', isolateLimit: 9999, diffLimit: 150, adjLimit: 9999 }
        ],
        "HR": [
            { minThick: 0.4, maxThick: 0.4, gap: 20, color: '#ff4d4d', isolateLimit: 190, diffLimit: 150, equalLimit: 189 },
            { minThick: 0.5, maxThick: 0.6, gap: 20, color: '#ff4d4d', isolateLimit: 250, diffLimit: 150, adjLimit: 299 },
            { minThick: 0.7, maxThick: 1.0, gap: 20, color: '#ff4d4d', isolateLimit: 300, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.1, maxThick: 1.5, gap: 20, color: '#ff4d4d', isolateLimit: 320, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.6, maxThick: 3.2, gap: 20, color: '#ff4d4d', isolateLimit: 9999, diffLimit: 9999, adjLimit: 9999 }
        ],
        "DEFAULT": [
            { minThick: 0.4, maxThick: 0.4, gap: 20, color: '#ff4d4d', isolateLimit: 190, diffLimit: 150, equalLimit: 189 },
            { minThick: 0.5, maxThick: 0.6, gap: 20, color: '#ff4d4d', isolateLimit: 250, diffLimit: 150, adjLimit: 299 },
            { minThick: 0.7, maxThick: 1.0, gap: 20, color: '#ff4d4d', isolateLimit: 300, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.1, maxThick: 1.45, gap: 20, color: '#ff4d4d', isolateLimit: 320, diffLimit: 150, adjLimit: 299 },
            { minThick: 1.5, maxThick: 3.2, gap: 20, color: '#ff4d4d', isolateLimit: 320, diffLimit: 150, adjLimit: 299 }
        ]
    },
    "LS-08": {
        "DEFAULT": [
            { minThick: 0.4, maxThick: 0.6, gap: 20, color: '#ff4d4d', isolateLimit: 190, diffLimit: 150 },
            { minThick: 0.7, maxThick: 1.2, gap: 20, color: '#e67e22', isolateLimit: 350, diffLimit: 150 },
            { minThick: 1.3, maxThick: 1.9, gap: 10, color: '#ff4d4d', isolateLimit: 350, diffLimit: 150 },
            { minThick: 2.0, maxThick: 3.2, gap: 5, color: '#ff4d4d', isolateLimit: 350, diffLimit: 150 }
        ]
    }
};

// ================================================================
// ส่วนที่ 3: Helper
// ================================================================
function getActiveRule(machineName, specName, thickness) {
    const machineRules = SLITTER_RULES[machineName];
    if (!machineRules) return SLITTER_RULES["LS-06"]["DEFAULT"][0];

    let activeSpecRules;
    if (machineName === "LS-06") {
        if (["OT", "EG", "GI", "CR", "HR"].includes(specName)) {
            activeSpecRules = machineRules[specName];
        } else {
            activeSpecRules = machineRules["DEFAULT"];
        }
    } else {
        activeSpecRules = machineRules[specName];
        if (!activeSpecRules) activeSpecRules = machineRules["DEFAULT"];
    }
    return activeSpecRules.find(r => thickness >= r.minThick && thickness <= r.maxThick) || activeSpecRules[0];
}

function updateMachineValues(m) {
    const recoilerValue = machineData[m].recoiler;
    const bbValue = machineData[m].bb;
    
    document.getElementById('shoulderRecoiler').value = recoilerValue;
    document.getElementById('shoulderBB').value = bbValue;
    document.getElementById('mainTitle').innerText = "Slitter Separator Setup (" + m + ")";

    const dropdown = document.getElementById('machineLine');
    if (m === "LS-05") dropdown.style.backgroundColor = "#49de89";
    else if (m === "LS-06") dropdown.style.backgroundColor = "rgb(183, 240, 236)";
    else if (m === "LS-08") dropdown.style.backgroundColor = "#e6eab1";
    else dropdown.style.backgroundColor = "#ffffff";
}

function getParsedData() {
    let parsed = [];
    const text = document.getElementById('pasteArea').value.trim();
    if (!text) return parsed;

    const parts = text.split(/[,\s]+/).filter(p => p !== "");
    let numbers = [];
    parts.forEach(p => {
        let n = parseFloat(p);
        if (!isNaN(n)) numbers.push(n);
    });

    for (let i = 2; i < numbers.length; i++) {
        if (numbers[i] > 0) {
            parsed.push({ actual: numbers[i], calc: numbers[i] + 1, qty: 1 });
        }
    }
    return parsed;
}

// ================================================================
// ส่วนที่ 4: Spacer
// ================================================================
const spacerCache = new Map();
const SPACER_SIZES = [75, 50, 30, 20, 15, 10, 9, 8, 7, 6, 5];
const MAX_SPACER_AMOUNT = 500;

function getSpacerCombination(amount) {
    if (amount <= 0) return [];
    if (spacerCache.has(amount)) return spacerCache.get(amount);

    const limit = Math.min(amount, MAX_SPACER_AMOUNT);
    const dp = new Array(limit + 1).fill(Infinity);
    const prev = new Array(limit + 1).fill(0);
    dp[0] = 0;
    
    for (let i = 1; i <= limit; i++) {
        for (let size of SPACER_SIZES) {
            if (i >= size && dp[i - size] + 1 < dp[i]) {
                dp[i] = dp[i - size] + 1;
                prev[i] = size;
            }
        }
    }
    
    if (dp[amount] === Infinity) {
        spacerCache.set(amount, null);
        return null;
    }
    
    let result = [];
    let current = amount;
    while (current > 0) {
        let size = prev[current];
        result.push(size);
        current -= size;
    }
    result.sort((a, b) => b - a);
    
    spacerCache.set(amount, result);
    return result;
}

function getFormattedSpacer(shoulder, isDS) {
    if (!isDS) return null;
    const showSpacer = document.getElementById('chkShowSpacer').checked;
    if (!showSpacer || shoulder <= 0) return null;

    const result = getSpacerCombination(Math.round(shoulder));
    if (!result) return ["ไม่พอดี"];

    let grouped = {};
    result.forEach(s => { grouped[s] = (grouped[s] || 0) + 1; });
    return Object.keys(grouped).sort((a, b) => b - a).map(k => `${k} x ${grouped[k]}`);
}

function getFormattedSpacerForStrip(actualValue) {
    const showSpacer = document.getElementById('chkShowSpacer').checked;
    if (!showSpacer) return null;

    const result = getSpacerCombination(Math.round(actualValue));
    if (!result) return [actualValue.toFixed(0) + " (ไม่มี)"];

    let grouped = {};
    result.forEach(s => { grouped[s] = (grouped[s] || 0) + 1; });
    return Object.keys(grouped).sort((a, b) => b - a).map(k => `${k} x ${grouped[k]}`);
}

// ================================================================
// ส่วนที่ 5: Gap Rules
// ================================================================
function getGapForOT(allstrips, i, steelT) {
    const totalStrips = allstrips.length;
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const diff = Math.abs(s1.actual - s2.actual);
    let needsGap = false;
    let gapSize = 20;
    let gapColor = '#ff4d4d';

    const NO_GAP_LIST = [
        { thick: 2.0, sizes: [400, 400, 400] },
        { thick: 2.0, sizes: [239, 239, 239, 239, 239] },
        { thick: 1.2, sizes: [218.20, 218.20, 218.20, 218.20, 218.20] },
        { thick: 1.45, sizes: [217, 217, 217, 217, 217] },
        { thick: 1.45, sizes: [283.70, 283.70, 283.70, 283.70] },
        { thick: 1.5, sizes: [350, 350] }
    ];

    let isSpecialNoGap = NO_GAP_LIST.some(rule => {
        if (steelT !== rule.thick) return false;
        if (totalStrips !== rule.sizes.length) return false;
        return allstrips.every((s, index) => s.actual === rule.sizes[index]);
    });

    if (!isSpecialNoGap) {
        if (steelT >= 0.4 && steelT <= 0.5) {
            if (totalStrips === 2) needsGap = (s1.actual >= 250 && s2.actual >= 250) || (diff >= 150);
            else if (totalStrips === 3) needsGap = (s1.actual > 250 || s2.actual > 250) || (diff >= 130);
            else if (totalStrips === 4) needsGap = (s1.actual >= 219 || s2.actual >= 219) || (diff >= 130);
            else if (totalStrips === 5) needsGap = (s1.actual >= 219 || s2.actual >= 219) || (diff >= 150);
            else if (totalStrips >= 6) needsGap = (diff >= 150);
        } else if (steelT >= 0.6 && steelT <= 1.3) {
            if (totalStrips === 2) needsGap = (s1.actual >= 300 && s2.actual >= 300) || (diff >= 150);
            else if (totalStrips === 3) needsGap = (s1.actual > 250 || s2.actual > 250) || (diff >= 150);
            else if (totalStrips === 4) needsGap = (s1.actual >= 219 || s2.actual >= 219) || (diff >= 150);
            else if (totalStrips === 5) needsGap = (s1.actual >= 219 || s2.actual >= 219) || (diff >= 150);
            else if (totalStrips >= 6) needsGap = (diff >= 150);
        } else if (steelT >= 1.4 && steelT <= 2.5) {
            if (totalStrips === 2) needsGap = (s1.actual > 300 && s2.actual > 300) || (diff >= 150);
            else if (totalStrips === 3) needsGap = (s1.actual > 250 || s2.actual > 250) || (diff >= 150);
            else if (totalStrips === 4) needsGap = (s1.actual >= 219 || s2.actual >= 219) || (diff >= 150);
            else if (totalStrips >= 5) needsGap = (s1.actual >= 220 && s2.actual >= 220) || (diff >= 150);
        }
    }
    return { needsGap, gapSize, gapColor };
}

function getGapForEG(allstrips, i, steelT) {
    const totalStrips = allstrips.length;
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const diff = Math.abs(s1.actual - s2.actual);
    let needsGap = false;
    let gapSize = 20;
    let gapColor = '#ff4d4d';

    if (steelT >= 0.4 && steelT <= 0.5) {
        const allEqual = allstrips.every(s => s.actual === allstrips[0].actual);
        if (allEqual) needsGap = true;
        else if (s1.actual > 100 || s2.actual > 100 || diff > 100) needsGap = true;
    } else if (steelT >= 0.6 && steelT <= 1.3) {
        if (totalStrips === 2) {
            if (s1.actual > 300 || s2.actual > 300 || diff > 130) needsGap = true;
        } else if (totalStrips === 3) {
            if (i === 0 && (allstrips[0].actual > 300 || diff > 130)) needsGap = true;
            else if (i === totalStrips - 2 && (allstrips[totalStrips - 1].actual > 300 || diff > 130)) needsGap = true;
        } else if (totalStrips === 4) {
            if (s1.actual > 300 || s2.actual > 300 || diff > 150) needsGap = true;
        } else if (totalStrips >= 5) {
            if (diff > 250) needsGap = true;
        }
    } else if (steelT >= 1.4 && steelT <= 3.2) {
        if (totalStrips === 2) {
            if (s1.actual > 300 || s2.actual > 300 || diff > 130) needsGap = true;
        } else if (totalStrips === 3) {
            if (i === 0 && (allstrips[0].actual > 300 || diff > 130)) needsGap = true;
            else if (i === totalStrips - 2 && (allstrips[totalStrips - 1].actual > 300 || diff > 130)) needsGap = true;
        } else if (totalStrips === 4) {
            if (s1.actual > 300 || s2.actual > 300 || diff > 150) needsGap = true;
        } else if (totalStrips >= 5) {
            if (diff > 250) needsGap = true;
        }
    }
    return { needsGap, gapSize, gapColor };
}

function getGapForCR(allstrips, i, steelT, rule) {
    const totalStrips = allstrips.length;
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const w1 = s1.calc;
    const w2 = s2.calc;
    const diff = Math.abs(w1 - w2);
    let needsGap = false;
    let gapSize = rule.gap || 20;
    let gapColor = rule.color || '#ff4d4d';

    const NO_GAP_LIST = [
        { thick: 1.8, sizes: [297, 297, 85] },
        { thick: 1.8, sizes: [85, 297, 297] }
    ];

    let isSpecialNoGap = NO_GAP_LIST.some(rule => {
        if (steelT !== rule.thick) return false;
        if (totalStrips !== rule.sizes.length) return false;
        return allstrips.every((s, index) => s.actual === rule.sizes[index]);
    });

    if (isSpecialNoGap) return { needsGap: false, gapSize, gapColor };

    const isAllOverIsolate = allstrips.every(item => item.calc >= rule.isolateLimit);
    const equalLimit = rule.equalLimit || 9999;
    const isAllEqual = allstrips.every(item => item.calc === allstrips[0].calc);
    const isMatchEqualRule = isAllEqual && (allstrips[0].calc >= equalLimit);

    if (isAllOverIsolate || isMatchEqualRule) {
        needsGap = true;
    } else {
        const adjLimit = rule.adjLimit || 9999;
        if (diff > rule.diffLimit) needsGap = true;
        else if (w1 >= adjLimit && w2 >= adjLimit) needsGap = true;
    }
    return { needsGap, gapSize, gapColor };
}
function getGapForHR(allstrips, i, steelT, rule) {
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const w1 = s1.calc;
    const w2 = s2.calc;
    const diff = Math.abs(w1 - w2);

    let needsGap = false;
    let gapSize = rule.gap || 20;
    let gapColor = rule.color || '#ff4d4d';

    // เช็คกรณีที่ทุกแถบมีขนาดเกิน isolateLimit
    const isAllOverIsolate = allstrips.every(item => item.calc >= rule.isolateLimit);
    
    // เช็คกรณีหน้ากว้างเท่ากันทั้งหมด และเกิน equalLimit
    const equalLimit = rule.equalLimit || 9999;
    const isAllEqual = allstrips.every(item => item.calc === allstrips[0].calc);
    const isMatchEqualRule = isAllEqual && (allstrips[0].calc >= equalLimit);

    if (isAllOverIsolate || isMatchEqualRule) {
        needsGap = true;
    } else {
        const adjLimit = rule.adjLimit || 9999;
        // เช็คความต่างของขนาด (diff)
        if (diff > rule.diffLimit) {
            needsGap = true;
        } 
        // เช็คกรณีที่แถบติดกันมีขนาดเกิน adjLimit ทั้งคู่
        else if (w1 >= adjLimit && w2 >= adjLimit) {
            needsGap = true;
        }
    }

    return { needsGap, gapSize, gapColor };
}

function getGapForGI(allstrips, i, steelT, rule) {
    const totalStrips = allstrips.length;
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const diff = Math.abs(s1.actual - s2.actual);
    let needsGap = false;
    let gapSize = rule.gap || 20;
    let gapColor = rule.color || '#ff4d4d';

    // ---------- เพิ่มรายการยกเว้น ไม่ให้ใส่ Gap สำหรับงานเฉพาะนี้ ----------
    const NO_GAP_LIST = [
        { thick: 1.0, sizes: [331, 331, 331, 331] }
    ];

    let isSpecialNoGap = NO_GAP_LIST.some(item => {
        if (steelT !== item.thick) return false;
        if (totalStrips !== item.sizes.length) return false;
        return allstrips.every((s, index) => s.actual === item.sizes[index]);
    });

    if (isSpecialNoGap) {
        return { needsGap: false, gapSize, gapColor };
    }
    // ------------------------------------------------------------------

    if (steelT >= 0.4 && steelT <= 0.6) {
        if (totalStrips >= 5) {
            if (s1.actual > 300 || s2.actual > 300 || diff > 150) needsGap = true;
        } else if (totalStrips === 3) {
            if (i === 0 && allstrips[0].actual > 299) needsGap = true;
            else if (i === totalStrips - 2 && allstrips[totalStrips - 1].actual > 299) needsGap = true;
            else if (diff > 150) needsGap = true;
        } else if (totalStrips === 2 || totalStrips === 4) {
            if ((s1.actual > 299 && s2.actual > 299) || diff > 150) needsGap = true;
        }
        return { needsGap, gapSize, gapColor };
    }

    if (steelT >= 0.7 && steelT <= 3.2) {
        if (totalStrips >= 5) {
            if (s1.actual > 300 || s2.actual > 300 || diff > 150) needsGap = true;
        } else if (totalStrips === 3) {
            if (i === 0 && allstrips[0].actual > 310) needsGap = true;
            else if (i === totalStrips - 2 && allstrips[totalStrips - 1].actual > 310) needsGap = true;
            else if (diff > 150) needsGap = true;
        } else if (totalStrips === 2) {
            if ((s1.actual > 299 && s2.actual > 299) || diff > 150) needsGap = true;
        } else if (totalStrips === 4) {
            if ((s1.actual > 310 && s2.actual > 310) || diff > 150) needsGap = true;
        }
        return { needsGap, gapSize, gapColor };
    }

    const adjLimit = rule.adjLimit || 9999;
    if (diff > rule.diffLimit) needsGap = true;
    else if (s1.actual >= adjLimit && s2.actual >= adjLimit) needsGap = true;
    return { needsGap, gapSize, gapColor };
}

function getGapForLS05(allstrips, i, steelT, rule) {
    const totalStrips = allstrips.length;
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const w1 = s1.calc;
    const w2 = s2.calc;
    const diff = Math.abs(w1 - w2);
    let needsGap = false;
    let gapColor = rule.color || '#ff4d4d';
    let gapSize = rule.gap || 20;

    const isDoubleDiscCondition = (steelT >= 1.4 && totalStrips >= 3 && allstrips.every(s => s.actual >= 310));
    if (isDoubleDiscCondition) return { needsGap: false, gapSize: 0, gapColor };

    if (totalStrips >= 5) gapSize = 5;

    const adjLimit = rule.adjLimit || 299;
    const diffLimit = rule.diffLimit || 149;
    const isolateLimit = rule.isolateLimit || 299;

    const isAllOverIsolate = allstrips.every(item => item.calc >= isolateLimit);

    if (isAllOverIsolate) needsGap = true;
    else if (diff > diffLimit) needsGap = true;
    else if (w1 >= adjLimit && w2 >= adjLimit) needsGap = true;

    return { needsGap, gapSize, gapColor };
}

function getGapFromMainRule(allstrips, i, rule, isAllOverIsolate, isMatchEqualRule) {
    const s1 = allstrips[i];
    const s2 = allstrips[i + 1];
    const w1 = s1.calc;
    const w2 = s2.calc;
    const diff = Math.abs(w1 - w2);
    let needsGap = false;
    let gapSize = rule.gap;
    let gapColor = rule.color;

    if (isAllOverIsolate || isMatchEqualRule) {
        needsGap = true;
    } else {
        const adjLimit = rule.adjLimit || 9999;
        if (diff > rule.diffLimit) needsGap = true;
        else if (w1 >= adjLimit && w2 >= adjLimit) needsGap = true;
    }
    return { needsGap, gapSize, gapColor };
}

// ================================================================
// ส่วนที่ 7: performCalculation (อัปเดตใหม่ ป้องกัน Error และล็อค LS-06)
// ================================================================
function performCalculation() {
    try {
        if (!currentDirection) {
            alert("กรุณาเลือกทิศทางลูกศรก่อน");
            return;
        }

        const data = getParsedData();
        if (data.length === 0) {
            alert("กรุณาใส่ข้อมูลในช่องวางข้อมูลให้ถูกต้อง");
            return;
        }

        const selectedMachine = document.getElementById('machineLine').value;
        const selectedSpec = document.getElementById('specList').value;
        const steelT = parseFloat(document.getElementById('steelT').value) || 0;
        
        // เช็คเผื่อ HTML พิมพ์ ID ผิด (diseT vs discT)
        const diseElem = document.getElementById('diseT') || document.getElementById('discT');
        const discT = diseElem ? parseFloat(diseElem.value) : 0;
        
        const maxBB = parseFloat(document.getElementById('shoulderBB').value) || 0;
        const maxRec = parseFloat(document.getElementById('shoulderRecoiler').value) || 0;
        
        const chkRecoil = document.getElementById('chkRecoil');
        const isRecoil = chkRecoil ? chkRecoil.checked : false;
        
        const selOD = document.getElementById('selOD');
        const odCutQty = selOD ? selOD.value : "0";
        
        const chkKnife = document.getElementById('chkKnife');
        const isKnife = chkKnife ? chkKnife.checked : false;
        
        const selKnife = document.getElementById('selKnife');
        const knifeVal = selKnife ? selKnife.value : "2";

        const rule = getActiveRule(selectedMachine, selectedSpec, steelT);
        if (!rule) {
            alert("ไม่พบกฎ (Rule) การคำนวณของเครื่องนี้");
            return;
        }

        let allstrips = [];
        data.forEach(item => {
            for (let i = 0; i < item.qty; i++) {
                allstrips.push({ actual: item.actual, calc: item.calc });
            }
        });
        
        independentSummaryData = [];
        if (allstrips.length > 0) {
            let currentSize = allstrips[0].actual.toFixed(0);
            let currentCount = 1;

            for (let i = 1; i < allstrips.length; i++) {
                let size = allstrips[i].actual.toFixed(0);
                if (size === currentSize) {
                    currentCount++;
                } else {
                    independentSummaryData.push({ size: currentSize, qty: currentCount });
                    currentSize = size;
                    currentCount = 1;
                }
            }
            independentSummaryData.push({ size: currentSize, qty: currentCount });
        }

        if (currentDirection === 'rtl') allstrips.reverse();

        let totalSteelW = allstrips.reduce((a, b) => a + b.calc, 0);
        let totalGapW = 0;
        let gapIndices = [];

        let isAllOverIsolate = allstrips.every(item => item.calc >= (rule.isolateLimit || 9999));
        let equalLimit = rule.equalLimit || 9999;
        let isAllEqual = allstrips.length > 0 && allstrips.every(item => item.calc === allstrips[0].calc);
        let isMatchEqualRule = isAllEqual && (allstrips[0].calc >= equalLimit);

        for (let i = 0; i < allstrips.length - 1; i++) {
            let result = { needsGap: false, gapSize: 0, gapColor: '#000' };
            
            if (selectedMachine === "LS-06") {
                switch (selectedSpec) {
                    case "OT": result = getGapForOT(allstrips, i, steelT); break;
                    case "EG": result = getGapForEG(allstrips, i, steelT); break;
                    case "CR": result = getGapForCR(allstrips, i, steelT, rule); break;
                    case "GI": result = getGapForGI(allstrips, i, steelT, rule); break;
                    case "HR": 
                        // ป้องกัน Error หากยังไม่ได้สร้างฟังก์ชัน getGapForHR
                        if (typeof getGapForHR === "function") {
                            result = getGapForHR(allstrips, i, steelT, rule); 
                        } else {
                            result = getGapFromMainRule(allstrips, i, rule, isAllOverIsolate, isMatchEqualRule);
                        }
                        break;
                    default: result = getGapFromMainRule(allstrips, i, rule, isAllOverIsolate, isMatchEqualRule);
                }
            } else if (selectedMachine === "LS-05") {
                result = getGapForLS05(allstrips, i, steelT, rule);
            } else {
                result = getGapFromMainRule(allstrips, i, rule, isAllOverIsolate, isMatchEqualRule);
            }

            if (result && result.needsGap) {
                totalGapW += (result.gapSize || 0);
                gapIndices.push({ index: i, size: (result.gapSize || 0), color: (result.gapColor || '#000') });
            }
        }

        let isDoubleDisc = false;
        if (selectedMachine === "LS-05" && steelT >= 1.4 && allstrips.length >= 3) {
            if (allstrips.every(s => s.actual >= 310)) isDoubleDisc = true;
        }

        let effectiveDiscT = isDoubleDisc ? (discT * 2) : discT;
        let outerDiscsW = discT * 2;
        let innerDiscsCount = (allstrips.length - 1) + gapIndices.length;
        let totalDiscW = outerDiscsW + (innerDiscsCount * effectiveDiscT);

        const totalSetupWidth = totalSteelW + totalDiscW + totalGapW;
        
        let finalSBB = (maxBB - totalSetupWidth) / 2;
        let finalSRec = (maxRec - totalSetupWidth) / 2;

        // ----- [ระบบดักจับ Over Capacity เฉพาะเครื่อง LS-06] -----
        if (selectedMachine === "LS-06" && finalSBB < 85) {
            finalSBB = 85;
            finalSRec = 27;
        }
        // --------------------------------------------------------

        drawCanvas(
            allstrips,
            finalSBB > 0 ? finalSBB : 0,
            discT, rule, gapIndices, maxBB,
            finalSBB, finalSRec,
            isRecoil, odCutQty, isKnife, knifeVal, isDoubleDisc
        );

    } catch (error) {
        // ถ้าพัง มันจะเด้งหน้าต่างแจ้งเตือนบรรทัดที่พังออกมาให้คุณอ่านได้ทันที!
        alert("❌ เกิดข้อผิดพลาดในโค้ด:\n" + error.message);
        console.error(error);
    }
}
// ================================================================
// ส่วนที่ 8: drawCanvas
// ================================================================
function drawCanvas(strips, shoulder, discT, rule, gaps, maxBB, sepBB, sepRec, isRecoil, odCutQty, isKnife, knifeVal, isDoubleDisc) {
    const canvas = document.getElementById('slitterCanvas');
    const ctx = canvas.getContext('2d');

    // ✅ sync ขนาด buffer กับ layout จริง (ใช้ได้กับ flex + fixed)
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.max(1, Math.round(rect.width));
    const targetH = Math.max(1, Math.round(rect.height));

    if (canvas.width !== targetW) canvas.width = targetW;
    if (canvas.height !== targetH) canvas.height = targetH;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = (canvas.width * 0.9) / maxBB;
    const h = canvas.height * 0.4;
    const sy = (canvas.height / 2) - (h / 2);
    let cx = (canvas.width - (maxBB * scale)) / 2;

    // 1. Shoulder ซ้าย
    let leftIsDS = (currentDirection === 'ltr');
    let leftDisplay = getFormattedSpacer(shoulder, leftIsDS);
    if (!leftDisplay || leftDisplay.length === 0) {
        leftDisplay = leftIsDS ? " " + shoulder.toFixed(0) : "";
    }
    draw3D(ctx, cx, sy, shoulder * scale, h, '#dcdde1', leftDisplay);
    cx += (shoulder * scale);

    // 2. จานซ้ายสุด
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(cx, sy - (h * 0.1), discT * scale, h * 1.2);
    cx += (discT * scale);

    // 3. วนลูปแถบ + จาน + Gap
    for (let i = 0; i < strips.length; i++) {
        const strip = strips[i];

        let stripDisplay = getFormattedSpacerForStrip(strip.actual);
        if (!stripDisplay) stripDisplay = strip.actual.toFixed(0);

        draw3D(ctx, cx, sy, strip.calc * scale, h, '#3498db', stripDisplay);
        cx += (strip.calc * scale);

        if (i < strips.length - 1) {
            let currentDiscWidth = isDoubleDisc ? (discT * 2) : discT;
            ctx.fillStyle = "#2c3e50";
            ctx.fillRect(cx, sy - (h * 0.1), currentDiscWidth * scale, h * 1.2);
            
            if (isDoubleDisc) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; 
                ctx.fillRect(cx + (currentDiscWidth * scale) / 2 - 1, sy - (h * 0.1), 2, h * 1.2);

                ctx.fillStyle = "#c0392b";
                ctx.font = "bold 35px Arial";
                ctx.textAlign = "center";
                ctx.fillText("x2", cx + (currentDiscWidth * scale) / 2, sy - (h * 0.25));
            }
            cx += (currentDiscWidth * scale);

            let gapData = gaps.find(g => g.index === i);
            if (gapData) {
                const gw = gapData.size * scale;
                ctx.fillStyle = gapData.color;
                ctx.fillRect(cx, sy - (h * 0.15), gw, h * 1.3);
                ctx.fillStyle = "#c0392b";
                ctx.font = "bold 40px Arial";
                ctx.textAlign = "center";
                ctx.fillText(gapData.size, cx + gw / 2, sy - (h * 0.25));
                cx += gw;
                
                ctx.fillStyle = "#2c3e50";
                ctx.fillRect(cx, sy - (h * 0.1), currentDiscWidth * scale, h * 1.2);
                
                if (isDoubleDisc) {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; 
                    ctx.fillRect(cx + (currentDiscWidth * scale) / 2 - 1, sy - (h * 0.1), 2, h * 1.2);

                    ctx.fillStyle = "#c0392b";
                    ctx.font = "bold 35px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText("x2", cx + (currentDiscWidth * scale) / 2, sy - (h * 0.25));
                }
                cx += (currentDiscWidth * scale);
            }
        }
    }

    // 4. จานขวาสุด
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(cx, sy - (h * 0.1), discT * scale, h * 1.2);
    cx += (discT * scale);

    // 5. Shoulder ขวา
    let rightIsDS = (currentDirection === 'rtl');
    let rightDisplay = getFormattedSpacer(shoulder, rightIsDS);
    if (!rightDisplay || rightDisplay.length === 0) {
        rightDisplay = rightIsDS ? " " + shoulder.toFixed(0) : ""; 
    }
    draw3D(ctx, cx, sy, shoulder * scale, h, '#dcdde1', rightDisplay);

    // 6. Sep BB / Sep Recoiler
    ctx.textAlign = "right";
    const selectedMachineForDisplay = document.getElementById('machineLine').value;
    let displayBB, displayRec;
    if (selectedMachineForDisplay === "LS-06") {
        displayBB = Math.round(sepBB);
        displayRec = Math.round(sepRec);
    } else {
        displayBB = Math.round(sepBB / 5) * 5;
        displayRec = Math.round(sepRec / 5) * 5;
    }

    ctx.fillStyle = "#27ae60";
    ctx.font = "bold 60px Arial";
    ctx.fillText(`Sep BB = ${displayBB}`, canvas.width - 20, 45);
    ctx.fillStyle = "#1d1df0";
    ctx.fillText(`Sep Recoiler = ${displayRec}`, canvas.width - 20, canvas.height - 90);

    // 7. สรุปขนาดแถบ
    if (independentSummaryData) {
        ctx.fillStyle = "#d81f1f";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "right"; 
        let summaryY = 85; 
        independentSummaryData.forEach(item => {
            ctx.fillText(`${item.size} = ${item.qty}`, canvas.width - 20, summaryY);
            summaryY += 50;
        });
    }

    // 8. สถานะต่างๆ
    ctx.textAlign = "left";
    let textX = 20;
    ctx.font = "bold 45px Arial";
    if (isRecoil) {
        ctx.fillStyle = "#c0392b";
        ctx.fillText("Re-coil: ON", textX, 45);
        textX += 280;
    }
    if (odCutQty !== "0") {
        ctx.fillStyle = "#2980b9";
        ctx.fillText(`OD Cut Qty: ${odCutQty}`, textX, 45);
        textX += 350;
    }
    if (isKnife) {
        ctx.fillStyle = "#c0392b";
        ctx.fillText(`SET UP KNIFE = ${knifeVal}`, textX, 45);
    }
}

// ================================================================
// ส่วนที่ 9: draw3D
// ================================================================
function draw3D(ctx, x, y, w, h, color, text) {
    if (w <= 0) return;

    let g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, '#888888');
    g.addColorStop(0.15, color);
    g.addColorStop(0.45, '#ffffff');
    g.addColorStop(0.75, color);
    g.addColorStop(1, '#555555');

    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    if (w <= 25) return;

    let lines = Array.isArray(text) ? text : [text];
    lines = lines.filter(line => line && line.trim() !== "");
    if (lines.length === 0) return;

    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    let maxFontSize = 40;
    let minFontSize = 8;
    let lineHeightRatio = 1.2;

    let fontSize = (h / lines.length) * 0.7;
    fontSize = Math.min(maxFontSize, Math.max(minFontSize, fontSize));

    ctx.font = `bold ${fontSize}px Arial`;
    let maxLineWidth = 0;
    for (let line of lines) {
        let w2 = ctx.measureText(line).width;
        if (w2 > maxLineWidth) maxLineWidth = w2;
    }

    if (maxLineWidth > w * 0.9) {
        fontSize = fontSize * (w * 0.9) / maxLineWidth;
        fontSize = Math.max(minFontSize, fontSize);
    }

    ctx.font = `bold ${fontSize}px Arial`;
    let lineHeight = fontSize * lineHeightRatio;
    let totalTextHeight = lines.length * lineHeight;
    let startY = y + (h / 2) - (totalTextHeight / 2) + (lineHeight / 2);

    for (let idx = 0; idx < lines.length; idx++) {
        ctx.fillText(lines[idx], x + w / 2, startY + idx * lineHeight);
    }
}

// ================================================================
// ส่วนที่ 10: Fullscreen แบบล็อคตายตัว + ปุ่มลอยออก
// ================================================================
function toggleFullscreen() {
    const el = document.getElementById('displayArea');
    const btn = document.getElementById('btnFullscreen');
    const exitBtn = document.getElementById('exitLockBtn');

    const isLocked = el.classList.toggle('locked-fullscreen');

    if (isLocked) {
        // แสดงปุ่มลอย
        exitBtn.style.display = 'block';
        // เปลี่ยนข้อความปุ่มหลักให้สื่อ
        btn.textContent = 'Locked';
        btn.style.background = '#64748b';
        btn.style.cursor = 'not-allowed';
    } else {
        // ซ่อนปุ่มลอย
        exitBtn.style.display = 'none';
        // คืนข้อความปุ่มหลัก
        btn.textContent = 'Fullscreen';
        btn.style.background = '#921cc5';
        btn.style.cursor = 'pointer';
    }

    // ResizeObserver ที่ตั้งไว้จะ trigger performCalculation() เองอัตโนมัติ
}

// ================================================================
// ส่วนที่ 11: Event Listeners และการเริ่มต้น
// ================================================================
window.onload = function() {
    console.log("✅ JavaScript เริ่มทำงานแล้ว");

    // ---------- 1. สร้างปุ่มลอยออกจาก Lock (ถ้ายังไม่มี) ----------
    if (!document.getElementById('exitLockBtn')) {
        const exitBtn = document.createElement('button');
        exitBtn.id = 'exitLockBtn';
        exitBtn.type = 'button';
        exitBtn.textContent = '✕ ออกจากโหมด Lock';
        exitBtn.style.display = 'none'; // ซ่อนไว้ก่อน จะแสดงก็ต่อเมื่อเข้า Fullscreen
        exitBtn.onclick = toggleFullscreen;
        document.body.appendChild(exitBtn);
    }

    // ---------- 2. กำหนดค่าเริ่มต้นให้ Dropdown ต่างๆ ----------
    const specSelect = document.getElementById('specList');
    if (specSelect) {
        specSelect.innerHTML = ""; // ล้างค่าก่อน
        availableSpecs.forEach(spec => specSelect.add(new Option(spec, spec)));
    }

    const steelSelect = document.getElementById('steelT');
    if (steelSelect) {
        steelSelect.innerHTML = "";
        thicknessList.forEach(t => steelSelect.add(new Option(t.toFixed(2), t)));
    }

    const diseSelect = document.getElementById('diseT');
    if (diseSelect) {
        diseSelect.innerHTML = "";
        [4.0, 3.0].forEach(val => diseSelect.add(new Option(val.toFixed(1), val)));
    }

    // ---------- 3. จัดการ Event เครื่องจักร (Machine) ----------
    const machineSelect = document.getElementById('machineLine');
    if (machineSelect) {
        updateMachineValues(machineSelect.value); // อัปเดตค่าครั้งแรก
        machineSelect.onchange = function(e) {
            updateMachineValues(e.target.value);
            const pArea = document.getElementById('pasteArea');
            if (pArea) pArea.focus();
        };
    }

    // ---------- 4. จัดการช่องวางข้อมูล (Paste Area) ----------
    const pasteArea = document.getElementById('pasteArea');
    if (pasteArea) {
        pasteArea.onclick = function() { this.select(); };
        pasteArea.onkeydown = function(e) {
            if (e.key === "Enter") {
                e.preventDefault(); // ป้องกันการขึ้นบรรทัดใหม่
                const parts = this.value.trim().split(/[,\s]+/).filter(p => p !== "");
                let detectedSpec = "DEFAULT";
                let nums = [];
                
                parts.forEach(p => {
                    if (isNaN(parseFloat(p))) {
                        let upper = p.toUpperCase();
                        if (availableSpecs.includes(upper)) detectedSpec = upper;
                    } else {
                        nums.push(parseFloat(p));
                    }
                });

                if (detectedSpec !== "DEFAULT" && specSelect) {
                    specSelect.value = detectedSpec;
                }
                
                if (nums.length >= 2 && steelSelect) {
                    let closest = thicknessList.reduce((a, b) => {
                        return Math.abs(b - nums[1]) < Math.abs(a - nums[1]) ? b : a;
                    });
                    steelSelect.value = closest;
                }
            }
        };
        pasteArea.focus();
    }

    // ---------- 5. จัดการปุ่มทิศทางลูกศร ----------
    const arrowBtns = document.querySelectorAll('.arrow-btn');
    if (arrowBtns.length > 0) {
        arrowBtns.forEach(btn => {
            btn.onclick = function() {
                currentDirection = this.getAttribute('data-direction');
                arrowBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (pasteArea) pasteArea.focus();
            };
        });
    }

    // ---------- 6. จัดการ Checkbox มีด (Knife) ----------
    const chkKnife = document.getElementById('chkKnife');
    const selKnife = document.getElementById('selKnife');
    if (chkKnife && selKnife) {
        chkKnife.onchange = function() {
            selKnife.disabled = !this.checked;
        };
    }

    // ---------- 7. จัดการปุ่ม Clear ----------
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
        btnClear.onclick = function() {
            if (pasteArea) pasteArea.value = "";
            
            const canvas = document.getElementById('slitterCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            currentDirection = null;
            if (arrowBtns.length > 0) {
                arrowBtns.forEach(b => b.classList.remove('active'));
            }
            
            const chkRecoil = document.getElementById('chkRecoil');
            if (chkRecoil) chkRecoil.checked = false;
            
            const selOD = document.getElementById('selOD');
            if (selOD) selOD.value = "0";
            
            if (chkKnife) chkKnife.checked = false;
            if (selKnife) {
                selKnife.value = "2";
                selKnife.disabled = true;
            }
            
            const chkShowSpacer = document.getElementById('chkShowSpacer');
            if (chkShowSpacer) chkShowSpacer.checked = false;
            
            if (specSelect) specSelect.value = "DEFAULT";
            if (pasteArea) pasteArea.focus();
        };
    }

    // ---------- 8. จัดการปุ่ม Calculate ----------
    const btnCalculate = document.getElementById('btnCalculate');
    if (btnCalculate) {
        btnCalculate.onclick = function() {
            performCalculation();
            if (pasteArea) pasteArea.focus();
        };
    }

    // ---------- 9. จัดการปุ่ม Fullscreen ----------
    const btnFullscreen = document.getElementById('btnFullscreen');
    if (btnFullscreen) {
        btnFullscreen.onclick = toggleFullscreen;
    }

    // ---------- 10. ปุ่ม ESC เพื่อออกจาก Lock ----------
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const el = document.getElementById('displayArea');
            if (el && el.classList.contains('locked-fullscreen')) {
                e.preventDefault();
                toggleFullscreen();
            }
        }
    });

    // ---------- 11. ResizeObserver สำหรับอัปเดต Canvas อัตโนมัติ ----------
    let redrawTimer = null;
    const redrawOnChange = function () {
        clearTimeout(redrawTimer);
        redrawTimer = setTimeout(function () {
            if (currentDirection) {
                try {
                    performCalculation();
                } catch (error) {
                    console.log("รอข้อมูลครบถ้วนก่อนคำนวณใหม่", error);
                }
            }
        }, 80);
    };

    const displayAreaEl = document.getElementById('displayArea');
    if (displayAreaEl) {
        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(redrawOnChange);
            ro.observe(displayAreaEl);
        } else {
            window.addEventListener('resize', redrawOnChange);
        }
    } else {
        window.addEventListener('resize', redrawOnChange);
    }
};

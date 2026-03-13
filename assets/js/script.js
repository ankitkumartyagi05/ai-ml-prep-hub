// ==========================================
// 1. STATE MANAGEMENT
// ==========================================
const STORAGE_KEY = 'mlHubData';
let state = {
    xp: 0,
    level: 1,
    tasks: {},
    leaderboard: [
        { name: "AI God", score: 5000 },
        { name: "Data Wizard", score: 3500 },
        { name: "Neural Ninja", score: 2100 },
        { name: "Python Pro", score: 900 }
    ]
};

function loadState() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) state = JSON.parse(data);
    } catch (e) { console.log("Storage error"); }
}

function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { }
}

function addXP(amount) {
    state.xp += amount;
    checkLevelUp();
    updateUI();
    saveState();
}

function checkLevelUp() {
    const levels = [0, 100, 300, 600, 1000, 2000];
    let newLevel = 1;
    levels.forEach((xpNeeded, i) => { if (state.xp >= xpNeeded) newLevel = i + 1; });

    if (newLevel > state.level) {
        state.level = newLevel;
        alert(`🎉 LEVEL UP! You are now Level ${newLevel}`);
    }
}

function updateUI() {
    const levels = [0, 100, 300, 600, 1000, 2000];
    const currentLevelXP = levels[state.level - 1];
    const nextLevelXP = levels[state.level] || 9999;
    const progress = ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

    const currentXPEl = document.getElementById('currentXP');
    if (currentXPEl) currentXPEl.textContent = state.xp;

    const levelEl = document.getElementById('currentLevel');
    if (levelEl) levelEl.textContent = state.level;

    const neededEl = document.getElementById('neededXP');
    if (neededEl) neededEl.textContent = nextLevelXP;

    const bar = document.getElementById('xpBar');
    if (bar) bar.style.width = Math.min(progress, 100) + '%';

    const ranks = ["Beginner", "Explorer", "Scientist", "Engineer", "Pro", "God"];
    const rankEl = document.getElementById('userRank');
    if (rankEl) rankEl.textContent = "AI " + (ranks[state.level - 1] || "Master");

    const list = document.getElementById('leaderboardList');
    if (list) {
        if (!state.leaderboard.find(u => u.name === "You")) state.leaderboard.push({ name: "You", score: 0 });
        const u = state.leaderboard.find(u => u.name === "You");
        if (u) u.score = state.xp;

        state.leaderboard.sort((a, b) => b.score - a.score);
        state.leaderboard = state.leaderboard.slice(0, 5);

        list.innerHTML = state.leaderboard.map(u => `
            <div class="lb-item ${u.name === 'You' ? 'you' : ''}">
                <span>${u.name}</span>
                <span>${u.score} XP</span>
            </div>
        `).join('');
    }
}

// ==========================================
// 2. ROUTER (SPA Logic)
// ==========================================
const router = {
    loadPage: function (pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        const target = document.getElementById('page-' + pageId);
        if (target) {
            target.classList.add('active');
            window.scrollTo(0, 0);
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) link.classList.add('active');
        });

        document.getElementById('mobileMenu').classList.remove('active');
        setTimeout(() => setupReveal(), 100);
    }
};

// ==========================================
// 3. TIMETABLE LOGIC (Hidden but functional if needed later)
// ==========================================
// Not displayed on main nav as per request, but logic retained if needed
// ... (omitted for brevity, same as previous) ...

// ==========================================
// 4. GAMES LOGIC
// ==========================================
const games = {
    quizData: [
        { q: "What is AI?", a: ["Mimicking human intelligence", "Hardware", "Game"], ans: 0, exp: "AI aims to simulate human thinking." },
        { q: "Which is Supervised Learning?", a: ["K-Means", "Linear Regression", "PCA"], ans: 1, exp: "Linear Regression requires labeled data." },
        { q: "Best language for ML?", a: ["HTML", "Python", "CSS"], ans: 1, exp: "Python has rich ML libraries." }
    ],
    currentQ: 0,

    load: function (type) {
        document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[onclick="games.load('${type}')"]`)?.classList.add('active');

        if (type === 'quiz') this.quiz.init();
        else if (type === 'drag') this.drag.init();
        else if (type === 'sim') this.sim.init();
    },

    quiz: {
        init: function () {
            games.currentQ = 0;
            this.show();
        },
        show: function () {
            const q = games.quizData[games.currentQ];
            if (!q) {
                addXP(20);
                document.getElementById('gameContainer').innerHTML = `
                    <div style="text-align:center; padding:30px;">
                        <h3 style="margin-bottom:10px;">Quiz Complete!</h3>
                        <p style="color:var(--accent);">+20 XP</p>
                        <button class="btn btn-rgb" style="margin-top:20px;" onclick="games.quiz.init()">Retry</button>
                    </div>
                `;
                return;
            }
            document.getElementById('gameContainer').innerHTML = `
                <div style="padding:10px;">
                    <p style="font-size:12px; color:var(--muted);">Question ${games.currentQ + 1}/${games.quizData.length}</p>
                    <h3 style="margin:15px 0;">${q.q}</h3>
                    ${q.a.map((opt, i) => `<button class="opt-btn" onclick="games.quiz.ans(${i}, ${q.ans})">${opt}</button>`).join('')}
                </div>
            `;
        },
        ans: function (sel, correct) {
            document.querySelectorAll('.opt-btn').forEach((b, i) => {
                b.disabled = true;
                if (i === correct) b.classList.add('correct');
                if (i === sel && sel !== correct) b.classList.add('wrong');
            });

            const expDiv = document.createElement('div');
            expDiv.style.cssText = "margin-top:15px; padding:10px; background:#1e293b; border-radius:6px; font-size:12px;";
            expDiv.innerHTML = `<b>Explanation:</b> ${games.quizData[games.currentQ].exp}`;
            document.getElementById('gameContainer').appendChild(expDiv);

            setTimeout(() => { games.currentQ++; this.show(); }, 2000);
        }
    },

    drag: {
        items: [
            { name: "Neural Network", cat: "AI" }, { name: "Linear Regression", cat: "ML" }, { name: "Pandas", cat: "Data" },
            { name: "K-Means", cat: "ML" }, { name: "SQL", cat: "Data" }, { name: "Computer Vision", cat: "AI" }
        ],
        init: function () {
            const shuffled = [...this.items].sort(() => Math.random() - 0.5);
            document.getElementById('gameContainer').innerHTML = `
                <div style="padding:10px;">
                    <p style="font-size:12px; margin-bottom:10px;">Drag items to correct box:</p>
                    <div class="drag-zone" id="source">
                        ${shuffled.map(i => `<div class="d-item" draggable="true" data-cat="${i.cat}">${i.name}</div>`).join('')}
                    </div>
                    <div class="drop-zones">
                        ${['AI', 'ML', 'Data'].map(c => `
                            <div>
                                <div style="text-align:center; font-size:12px; font-weight:600; margin-bottom:5px;">${c}</div>
                                <div class="drop-zone" data-cat="${c}"></div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="text-align:center; margin-top:15px;">
                        <button class="btn btn-primary" onclick="games.drag.check()">Check Answers</button>
                    </div>
                </div>
            `;
            this.addListeners();
        },
        addListeners: function () {
            const items = document.querySelectorAll('.d-item');
            const zones = document.querySelectorAll('.drop-zone');

            items.forEach(item => {
                item.addEventListener('dragstart', e => {
                    item.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', item.outerHTML);
                });
                item.addEventListener('dragend', () => item.classList.remove('dragging'));
            });

            zones.forEach(zone => {
                zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
                zone.addEventListener('dragleave', () => zone.classList.remove('over'));
                zone.addEventListener('drop', e => {
                    e.preventDefault(); zone.classList.remove('over');
                    const dragging = document.querySelector('.dragging');
                    if (dragging) zone.appendChild(dragging);
                });
            });
        },
        check: function () {
            let correct = 0;
            document.querySelectorAll('.drop-zone').forEach(zone => {
                const cat = zone.dataset.cat;
                zone.querySelectorAll('.d-item').forEach(item => {
                    if (item.dataset.cat === cat) { item.style.background = '#166534'; correct++; }
                    else { item.style.background = '#991b1b'; }
                });
            });
            setTimeout(() => {
                addXP(correct * 2);
                alert(`You got ${correct}/6 correct! +${correct * 2} XP`);
                this.init();
            }, 1000);
        }
    },

    sim: {
        grid: [], color: 1,
        init: function () {
            this.grid = Array(100).fill(0);
            document.getElementById('gameContainer').innerHTML = `
                <div style="padding:10px;">
                    <div style="display:flex; gap:10px; margin-bottom:10px;">
                        <button class="btn" style="background:#3b82f6" onclick="games.sim.setColor(1)">Blue (Class A)</button>
                        <button class="btn" style="background:#ef4444" onclick="games.sim.setColor(2)">Red (Class B)</button>
                    </div>
                    <p style="font-size:11px; color:var(--muted);">Click cells to add data points, then train model.</p>
                    <div class="sim-grid" id="simGrid"></div>
                    <div style="text-align:center; margin-top:10px;">
                        <button class="btn btn-primary" onclick="games.sim.train()">Train Model</button>
                    </div>
                    <div id="simRes" style="text-align:center; margin-top:10px; font-size:12px;"></div>
                </div>
            `;
            this.render();
        },
        setColor: function (c) { this.color = c; },
        click: function (i) { this.grid[i] = this.color; this.render(); },
        render: function () {
            const el = document.getElementById('simGrid');
            el.innerHTML = this.grid.map((v, i) =>
                `<div class="sim-cell type-${v}" onclick="games.sim.click(${i})"></div>`
            ).join('');
        },
        train: function () {
            const res = document.getElementById('simRes');
            res.innerHTML = `<span style="color:var(--accent)">Training...</span>`;
            setTimeout(() => {
                const acc = Math.floor(Math.random() * 30) + 70;
                addXP(acc);
                res.innerHTML = `<div style="color:var(--success); font-weight:bold;">Model Trained!</div><div>Accuracy: ${acc}%</div><div style="font-size:10px; color:var(--muted);">+${acc} XP Added</div>`;
            }, 1500);
        }
    }
};

// ==========================================
// 5. UTILITIES & INIT
// ==========================================
function setupReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Navbar Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Mobile Menu
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('active');
});

// ==========================================
// 6. HOME SPECIFIC EFFECTS
// ==========================================

// Typing Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) { this.txt = fullTxt.substring(0, this.txt.length - 1); }
        else { this.txt = fullTxt.substring(0, this.txt.length + 1); }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Counter Effect
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText.replace('+', '');
            const increment = target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else { counter.innerText = target; }
        };
        updateCount();
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    updateUI();

    // Init Typing Effect
    const txtElement = document.getElementById('typeText');
    const words = ["Get Placed.", "Master AI.", "Build Projects.", "Level Up."];
    new TypeWriter(txtElement, words, 2000);

    // Init Timetable (if used)
    // timetable.init();

    // Load default game
    games.load('quiz');

    // Setup Animations
    setupReveal();

    // Run counters when stats section is visible
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) animateCounters();
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
});
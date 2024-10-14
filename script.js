// キーワードと番号、ポイントのマッピング
const keywordPoints = {
    "あ": { number: 1, points: 10 },
    "い": { number: 2, points: 10 },
    "う": { number: 3, points: 10 },
    "え": { number: 4, points: 10 },
    "お": { number: 5, points: 10 },
    "か": { number: 6, points: 20 },
    "き": { number: 7, points: 20 },
    "く": { number: 8, points: 20 },
    "け": { number: 9, points: 20 },
    "こ": { number: 10, points: 20 },
    "さ": { number: 11, points: 30 },
    "し": { number: 12, points: 30 },
    "す": { number: 13, points: 30 },
    "せ": { number: 14, points: 30 },
    "そ": { number: 15, points: 30 },
    "た": { number: 16, points: 40 },
    "ち": { number: 17, points: 40 },
    "つ": { number: 18, points: 40 },
    "て": { number: 19, points: 40 },
    "と": { number: 20, points: 40 },
    "な": { number: 21, points: 50 },
    "に": { number: 22, points: 50 },
    "ぬ": { number: 23, points: 50 },
    "ね": { number: 24, points: 50 },
    "の": { number: 25, points: 50 },
    "は": { number: 26, points: 50 },
    "ひ": { number: 27, points: 50 },
    "ふ": { number: 28, points: 50 },
    "へ": { number: 29, points: 50 },
    "ほ": { number: 30, points: 50 },
    "ま": { number: 31, points: 50 },
    "み": { number: 32, points: 50 },
    "む": { number: 33, points: 50 },
    "め": { number: 34, points: 50 },
    "も": { number: 35, points: 50 },
    "や": { number: 36, points: 50 },
    "yi": { number: 37, points: 50 },
    "ゆ": { number: 38, points: 50 },
    "ye": { number: 39, points: 50 },
    "よ": { number: 40, points: 50 },
    "ら": { number: 41, points: 50 },
    "り": { number: 42, points: 50 },
    "る": { number: 43, points: 50 },
    "れ": { number: 44, points: 50 },
    "ろ": { number: 45, points: 50 },
    "わ": { number: 46, points: 50 },
    "ゐ": { number: 47, points: 50 },
    "を": { number: 48, points: 50 },
    "ゑ": { number: 49, points: 50 },
    "ん": { number: 50, points: 50 }
};

// ローカルストレージからデータを取得
let keywords = JSON.parse(localStorage.getItem('keywords')) || [];
let points = parseInt(localStorage.getItem('points')) || 0;
let hintsUnlocked = JSON.parse(localStorage.getItem('hintsUnlocked')) || { hint1: false, hint2: false, hint3: false };

// ページロード時に表示を更新
document.getElementById('total-points').innerText = points;

// グリッドを生成
const gridContainer = document.querySelector('.grid-container');
for (let i = 1; i <= 50; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.textContent = i;
    gridItem.id = `grid-${i}`;  // グリッドにIDを付与
    gridContainer.appendChild(gridItem);
}

// ロード時に既に正解したキーワードのグリッドを緑色に
keywords.forEach(keyword => {
    const keywordData = keywordPoints[keyword];
    if (keywordData) {
        document.getElementById(`grid-${keywordData.number}`).classList.add('correct');
    }
});

// フォーム送信時の処理
document.getElementById('keyword-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('keyword').value.trim();

    if (keywordPoints.hasOwnProperty(keyword) && !keywords.includes(keyword)) {
        const { number, points: gainedPoints } = keywordPoints[keyword];

        // キーワードとポイントを保存
        keywords.push(keyword);
        points += gainedPoints;

        // ローカルストレージにデータを保存
        localStorage.setItem('keywords', JSON.stringify(keywords));
        localStorage.setItem('points', points);

        // グリッドの色を変更
        document.getElementById(`grid-${number}`).classList.add('correct');

        // ポイント表示を更新
        document.getElementById('total-points').innerText = points;

        // ポップアップメッセージの表示
        showPopupMessage(`${gainedPoints}ポイント獲得！`);

        // ヒントの表示を更新
        updateHints(points);

        // フォームをリセット
        document.getElementById('keyword').value = '';
    } else if (keywords.includes(keyword)) {
        alert("入力済みです。");
    } else {
        alert("設定されていないキーワードです。");
    }
});



// ヒントの表示を更新する関数
function updateHints(points) {
    // 30ポイントでヒント1を表示
    if (points >= 30) {
        document.getElementById('hint1').classList.remove('hidden');
        hintsUnlocked.hint1 = true;
    }

    // 60ポイントでヒント2を表示
    if (points >= 60) {
        document.getElementById('hint2').classList.remove('hidden');
        hintsUnlocked.hint2 = true;
    }

    // 90ポイントでヒント3を表示
    if (points >= 90) {
        document.getElementById('hint3').classList.remove('hidden');
        hintsUnlocked.hint3 = true;
    }

    // 120ポイントでヒント3を表示
    if (points >= 120) {
        document.getElementById('hint4').classList.remove('hidden');
        hintsUnlocked.hint3 = true;
    }

    // ローカルストレージにヒントの状態を保存
    localStorage.setItem('hintsUnlocked', JSON.stringify(hintsUnlocked));
}

// ページロード時にヒントを再表示するための処理
function loadHints() {
    if (hintsUnlocked.hint1) {
        document.getElementById('hint1').classList.remove('hidden');
    }
    if (hintsUnlocked.hint2) {
        document.getElementById('hint2').classList.remove('hidden');
    }
    if (hintsUnlocked.hint3) {
        document.getElementById('hint3').classList.remove('hidden');
    }
    if (hintsUnlocked.hint4) {
        document.getElementById('hint4').classList.remove('hidden');
    }
}

// ページがロードされた時に、ローカルストレージからヒント状態をロード
window.onload = function() {
    loadHints();  // ページロード時にヒントをロード
};

// プルダウンをクリックした時の挙動
document.querySelectorAll('.hint-btn').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === 'none' || content.style.display === '' ? 'block' : 'none';
    });
});



// ポップアップメッセージを表示する関数
function showPopupMessage(message) {
    const popup = document.getElementById('popup-message');
    popup.innerText = message;
    popup.style.display = 'block'; // ポップアップを表示

    // 3秒後にフェードアウトして消える
    setTimeout(function() {
        popup.style.opacity = '0'; // フェードアウト
        setTimeout(function() {
            popup.style.display = 'none';
            popup.style.opacity = '1'; // フェードイン用にリセット
        }, 500); // フェードアウトが終わるまで待つ
    }, 1500); // 3秒後に消える
}

// フォーム送信時の処理
document.getElementById('keyword-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const keywordInput = document.getElementById('keyword').value;
    const keyword = normalizeKeyword(keywordInput);

    if (keywordPoints.hasOwnProperty(keyword)) { 
        // キーワードが設定されているか確認
        if (!keywords.includes(keyword)) {
            // まだ入力されていない場合
            keywords.push(keyword);
            const gainedPoints = keywordPoints[keyword];  // 獲得したポイントを変数に格納
            points += gainedPoints;  // キーワードに対応するポイントを加算

            // ポップアップメッセージを表示
            showPopupMessage(`${gainedPoints}ポイント獲得！`);

            // ローカルストレージにデータを保存
            localStorage.setItem('keywords', JSON.stringify(keywords));
            localStorage.setItem('points', points);

            // 画面上の表示を更新
            document.getElementById('total-points').innerText = points;
            document.getElementById('entered-keywords').innerText = keywords.join(', ');

            // ヒントの表示を更新
            updateHints(points);

            document.getElementById('keyword').value = '';  // 入力フォームをリセット
        } else {
            alert("入力済みです。");
        }
    } else {
        alert("設定されていないキーワードです。");
    }
});


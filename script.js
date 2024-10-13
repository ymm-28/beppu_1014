// キーワードとポイントのマッピング
const keywordPoints = {
    "あ": 10,
    "い": 10,
    "う": 10,
    "え": 10,
    "お": 10,
    "か": 20,
    "き": 20,
    "く": 20,
    "け": 20,
    "こ": 20,
    "さ": 30,
    "し": 30,
    "す": 30,
    "せ": 30,
    "そ": 30,
    "た": 40,
    "ち": 40,
    "つ": 40,
    "て": 40,
    "と": 40,
    "な": 50,
    "に": 50,
    "ぬ": 50,
    "ね": 50,
    "の": 50,
};

// ローカルストレージからデータを取得
let keywords = JSON.parse(localStorage.getItem('keywords')) || [];
let points = parseInt(localStorage.getItem('points')) || 0;
let hintsUnlocked = JSON.parse(localStorage.getItem('hintsUnlocked')) || { hint1: false, hint2: false, hint3: false };

// ページロード時に表示を更新
document.getElementById('total-points').innerText = points;
document.getElementById('entered-keywords').innerText = keywords.length > 0 ? keywords.join(', ') : 'なし';

// ヒントの表示更新
updateHints(points);

// フォーム送信時の処理
document.getElementById('keyword-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = document.getElementById('keyword').value.trim();

    // 入力されたキーワードが事前定義のマップに存在するか確認
    if (keywordPoints.hasOwnProperty(keyword) && !keywords.includes(keyword)) {
        keywords.push(keyword);
        points += keywordPoints[keyword];  // キーワードに対応するポイントを加算

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
        alert("無効なキーワード、またはすでに入力済みです。");
    }
});

// ヒントの表示を更新する関数
function updateHints(points) {
    // 50ポイントでヒント1を表示
    if (points >= 30) {
        document.getElementById('hint1').classList.remove('hidden');
        hintsUnlocked.hint1 = true;
    }

    // 100ポイントでヒント2を表示
    if (points >= 60) {
        document.getElementById('hint2').classList.remove('hidden');
        hintsUnlocked.hint2 = true;
    }

    // 150ポイントでヒント3を表示
    if (points >= 90) {
        document.getElementById('hint3').classList.remove('hidden');
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
    const keyword = document.getElementById('keyword').value.trim();

    // 入力されたキーワードが事前定義のマップに存在するか確認
    if (keywordPoints.hasOwnProperty(keyword) && !keywords.includes(keyword)) {
        keywords.push(keyword);
        const gainedPoints = keywordPoints[keyword];  // 獲得したポイントを変数に格納
        points += gainedPoints;  // キーワードに対応するポイントを加算

        // ポイント獲得メッセージを表示
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
    }
});

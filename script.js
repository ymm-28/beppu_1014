// キーワードとポイントのマッピング
const keywordPoints = {
    "りんご": 10,
    "みかん": 10,
    "ばなな": 10,
    "えんぴつ": 20,
    "けしごむ": 20,
    "はさみ": 20,
    "らいおん": 30,
    "ぞう": 30,
    "きりん": 30,
    "うさぎ": 30
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
    if (points >= 50) {
        document.getElementById('hint1').classList.remove('hidden');
        hintsUnlocked.hint1 = true;
    }

    // 100ポイントでヒント2を表示
    if (points >= 100) {
        document.getElementById('hint2').classList.remove('hidden');
        hintsUnlocked.hint2 = true;
    }

    // 150ポイントでヒント3を表示
    if (points >= 150) {
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

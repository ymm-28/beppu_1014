// キーワードとポイントのマッピング
const keywordPoints = {
    "りんご": 10,
    "みかん": 10,
    "バナナ": 10,
    "靴": 20,
    "とびら": 20,
    "ライオン": 30,
    "ぞう": 30
};

// ローカルストレージからデータを取得
let keywords = JSON.parse(localStorage.getItem('keywords')) || [];
let points = parseInt(localStorage.getItem('points')) || 0;

// ページロード時に表示を更新
document.getElementById('total-points').innerText = points;
document.getElementById('entered-keywords').innerText = keywords.length > 0 ? keywords.join(', ') : 'なし';

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
        document.getElementById('keyword').value = '';  // 入力フォームをリセット
    } else {
        alert("無効なキーワード、またはすでに入力済みです。");
    }
});

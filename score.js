async function fetchLiveScore() {
  const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY&offset=0");
  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    document.getElementById('scoreText').textContent = "⚠️ فی الحال کوئی لائیو میچ ڈیٹا دستیاب نہیں۔";
    return;
  }

  const match = data.data[0];
  const team1 = match.teams[0];
  const team2 = match.teams[1];
  const score1 = match.score[0] ? match.score[0].r : 0;
  const score2 = match.score[1] ? match.score[1].r : 0;

  document.getElementById('scoreText').textContent =
    `🏏 ${team1} ${score1} / ${team2} ${score2} — ${match.status}`;
}

setInterval(fetchLiveScore, 10000);
fetchLiveScore();

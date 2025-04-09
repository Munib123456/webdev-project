fetch('data/reviews.json')
  .then(res => res.json())
  .then(data => {
    const fiveStars = data.filter(r => r.rating === 5);
    let index = 0;
    const featured = document.getElementById('featured-review');

    function showReview() {
      featured.innerHTML = `<blockquote>\"${fiveStars[index].review}\"<br>– ${fiveStars[index].user}</blockquote>`;
      index = (index + 1) % fiveStars.length;
    }
    showReview();
    setInterval(showReview, 5000);

    const avg = (data.reduce((acc, r) => acc + r.rating, 0) / data.length).toFixed(1);
    document.getElementById('average-rating').innerText = avg;

    const grouped = {};
    data.forEach(r => {
      if (!grouped[r.rating]) grouped[r.rating] = [];
      grouped[r.rating].push(r);
    });

    const groupsContainer = document.getElementById('review-groups');
    Object.keys(grouped).sort((a, b) => b - a).forEach(rating => {
      const group = document.createElement('div');
      group.innerHTML = `<h3>${rating} Star Reviews</h3><ul>${grouped[rating].map(r => `<li>${r.review} – ${r.user}</li>`).join('')}</ul>`;
      groupsContainer.appendChild(group);
    });
  });

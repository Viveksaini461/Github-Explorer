async function fetchProfile() {
    const username = document.getElementById('username').value.trim();
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = '';

    if (!username) {
      alert('Please enter a GitHub username.');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();

      profileDiv.innerHTML = `
        <div class="card">
          <img src="${data.avatar_url}" alt="${data.login}">
          <h3>${data.name || data.login}</h3>
          <p>${data.bio || ''}</p>
          <div class="info">
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><strong>Repos:</strong> ${data.public_repos}</p>
            <p><a href="${data.html_url}" target="_blank">Visit GitHub Profile</a></p>
          </div>
        </div>
      `;
    } catch (err) {
      profileDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
  }
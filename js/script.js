// selects div with class of "overview" to display profile info in
const overview = document.querySelector(".overview");
const username = "mducote"; // GitHub username
// select the unordered list to display the repos in
const repoList = document.querySelector(".repo-list");

// fetch info from GitHub profile
const gitUserInfo = async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};
gitUserInfo();

// display user info in the overview div
const displayUserInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
         </div> `;
    overview.append(div);
    gitRepos();
};

// fetch GitHub repos for the user
const gitRepos = async function() {
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRepos.json();
    //console.log(repoData);
    displayRepos(repoData);
};

// display the repos in the unordered list
const displayRepos = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};




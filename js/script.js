// selects div with class of "overview" to display profile info in
const overview = document.querySelector(".overview");
const username = "mducote"; // GitHub username
// select the unordered list to display the repos in
const repoList = document.querySelector(".repo-list");
// select the section with class of repos where repo info appears
const repoSection = document.querySelector(".repos");
// selects the section with class of repo-data where individual repo data appears
const repoDataSection = document.querySelector(".repo-data");

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
        li.innerHTML = `<h2>${repo.name}</h2>`;
        repoList.append(li);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h2")) {
        const repoName = e.target.innerText;
        gitRepoInfo(repoName);
    }
});

const gitRepoInfo = async function(repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
    repoDataSection.innerHTML = "";
    const repoDataDiv = document.createElement("div");
    repoDataDiv.innerHTML = `
        <h2>Name: ${repoInfo.name}</h2>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoDataSection.append(repoDataDiv);
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
};



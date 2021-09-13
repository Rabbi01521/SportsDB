const inputField = document.getElementById("input-feild");
const searchBtn = document.getElementById("search-btn");

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

const searchTeam = () => {
  const inputText = inputField.value;
  document.getElementById("error-message").innerHTML = "";

  if (inputText == "") {
    const error = document.getElementById("error-message");
    error.innerHTML = `
        <p class="d-flex justify-content-center my-5">Please enter a correct name</p>
        `;
  } else {
    inputField.value = "";
    document.getElementById("spinner").classList.remove("d-none");
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayTeam(data.teams));
  }
};

const displayTeam = (teams) => {
  console.log(teams);
  const searchResult = document.getElementById("search-result");
  document.getElementById("spinner").classList.add("d-none");
  searchResult.textContent = "";
  if (teams == null) {
    document.getElementById("error-message").innerHTML = `
        <p class="d-flex justify-content-center my-5"> Your search did not match any of our Team. Please enter a
        correct name</p>
        `;
  } else {
    teams.forEach((team) => {
      console.log(team);
      const teamstring = JSON.stringify(team).split('"').join("&quot;");
      // console.log(teamstring);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
            <div class="card">
                <img src="${
                  team.strTeamBadge
                }" class="img-fluid p-5" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${team.strTeam}</h5>
                    <p id="set-description" class="card-text">${team.strDescriptionEN?.slice(
                      0,
                      150
                    )}</p>
                </div>
                <button onclick = "teamDetails(${teamstring})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            `;
      searchResult.appendChild(div);
    });
  }
};

const teamDetails = (details) => {
  console.log(details);
  document.getElementById(
    "exampleModalLabel"
  ).innerText = `${details.strAlternate}`;
  document.getElementById("team-details").innerHTML = `
    <img src="${details.strTeamBadge}" class="img-fluid p-5" alt="">
    <p class="my-3">${details.intFormedYear}</p>
    <p class="my-3">${details.strLeague}</p>
    <p class="my-3">${details.strStadium}</p>
    <p class="my-3">${details.strStadiumDescription?.slice(0, 250)}</p>
    `;
};

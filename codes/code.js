async function searchPapers() {
    time.style.display = "none";
    let query = document.getElementById("searchBox").value.toLowerCase();
    let filter = document.getElementById("filterType").value;
    let resultList = document.getElementById("results");
    resultList.innerHTML = "Loading....";

    let response = await fetch("./data/papers.json");
    let papers = await response.json();

    let filtered = papers.filter(paper => {
        return (
            paper.courseCode.toLowerCase().includes(query) &&
            (filter === "" || paper.type === filter)
        );
    });
    resultList.innerHTML = "";
    if (filtered.length === 0) {
        resultList.innerHTML = "<li>No Papers Found</li>";
    } else {
        filtered.forEach(paper => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="${paper.link}" target="_blank">${paper.title}</a>`;
            resultList.appendChild(li);
        });
    }

}

let now = new Date();
const time = document.getElementById("time");
time.textContent = now.toLocaleTimeString();


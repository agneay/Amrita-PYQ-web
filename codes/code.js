async function searchPapers() {
    const resultList = document.getElementById("results");
    const time = document.getElementById("time");
    time.style.display = "none";

    let query = document.getElementById("searchBox").value.trim().toLowerCase();
    let filter = document.getElementById("filterType").value;

    resultList.innerHTML = `
    <div class="d-flex justify-content-center my-3">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;

    let response = await fetch("./data/papers.json");
    let papers = await response.json();

    let filtered = papers.filter(paper =>
        paper.courseCode.toLowerCase().includes(query) &&
        (filter === "" || paper.type === filter)
    );

    resultList.innerHTML = "";
    if (filtered.length === 0) {
        resultList.innerHTML = `<li class="list-group-item">No Papers Found</li>`;
        if (filtered.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'No Results',
                text: 'No papers match your search. Try again!',
                confirmButtonColor: '#E84545'
            });
        }

    } else {
        filtered.forEach(paper => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `<a href="${paper.link}" target="_blank" class="text-decoration-none">${paper.title}</a>`;
            resultList.appendChild(li);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const time = document.getElementById("time");
    let now = new Date();
    time.textContent = now.toLocaleTimeString();
});

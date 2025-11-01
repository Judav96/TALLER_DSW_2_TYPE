import { series } from "./data.js";
const seriesTableBody = document.getElementById("series-table-body");
const averageElement = document.getElementById("average-seasons");
const detailElement = document.getElementById("series-detail");
function renderSeries(seriesList) {
    seriesTableBody.innerHTML = "";
    for (const serie of seriesList) {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${serie.id}</td>
      <td><a href="#" class="serie-link" data-id="${serie.id}">${serie.name}</a></td>
      <td>${serie.channel}</td>
      <td>${serie.seasons}</td>
    `;
        seriesTableBody.appendChild(row);
    }
    const links = document.querySelectorAll(".serie-link");
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const id = Number(event.target.getAttribute("data-id"));
            const selected = series.find((s) => s.id === id);
            if (selected)
                showDetail(selected);
        });
    });
}
function showDetail(serie) {
    detailElement.innerHTML = `
    <div class="card">
      <img src="${serie.image}" class="card-img-top" alt="${serie.name}">
      <div class="card-body">
        <h5 class="card-title">${serie.name}</h5>
        <p class="card-text">${serie.description}</p>
        <a href="${serie.link}" target="_blank" class="btn btn-primary">Ver más</a>
      </div>
    </div>
  `;
}
function getAverageSeasons(seriesList) {
    const total = seriesList.reduce((acc, serie) => acc + serie.seasons, 0);
    return total / seriesList.length;
}
renderSeries(series);
averageElement.textContent = getAverageSeasons(series).toFixed(2);

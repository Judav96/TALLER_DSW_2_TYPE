import { series } from "./data.js";
import { Serie } from "./models/series.js";

const seriesTable: HTMLElement = document.getElementById("series-table-body")!;
const averageSeasonsElm: HTMLElement = document.getElementById("average-seasons")!;
const cardContainer: HTMLElement = document.getElementById("card-container")!;

function showSeries(seriesList: Serie[]): void {
  let totalSeasons = 0;
  seriesList.forEach((serie) => {
    const trElement = document.createElement("tr");

    trElement.innerHTML = `
      <td>${serie.id}</td>
      <td><a href="#" class="serie-link" data-id="${serie.id}">${serie.name}</a></td>
      <td>${serie.channel}</td>
      <td>${serie.seasons}</td>
    `;
    seriesTable.appendChild(trElement);
    totalSeasons += serie.seasons;
  });

  const average = totalSeasons / seriesList.length;
  averageSeasonsElm.textContent = `Seasons average: ${average.toFixed(1)}`;

  addClickEvents();
}

function addClickEvents(): void {
  const links = document.querySelectorAll(".serie-link");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number((event.target as HTMLElement).getAttribute("data-id"));
      const serie = series.find((s) => s.id === id);
      if (serie) showSerieDetail(serie);
    });
  });
}

function showSerieDetail(serie: Serie): void {
  cardContainer.innerHTML = `
    <div class="card" style="width: 20rem;">
      <img src="${serie.poster}" class="card-img-top" alt="${serie.name}">
      <div class="card-body">
        <h5 class="card-title">${serie.name}</h5>
        <p class="card-text">${serie.description}</p>
        <a href="${serie.link}" target="_blank" class="card-link">${serie.link}</a>
      </div>
    </div>
  `;
}

showSeries(series);

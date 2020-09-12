// const countriesAPI =
//   "https://cors-anywhere.herokuapp.com/http://restcountries.herokuapp.com/api/v1";
const countriesAPI = "http://restcountries.herokuapp.com/api/v1";
const coronaAPI = `https://corona-api.com/countries/`;
const asiaBTN = document.querySelector(".Asia-btn");
const europeBTN = document.querySelector(".Europe-btn");
const africaBTN = document.querySelector(".Africa-btn");
const americasBTN = document.querySelector(".Americas-btn");
const worldBTN = document.querySelector(".World-btn");
const table = document.querySelector("#myChart");
var ctx = document.getElementById("myChart").getContext("2d");
const state = {
  currentMainland: "",
  world: [],
  Asia: [],
  Europe: [],
  Africa: [],
  Americas: [],
  AsiaCountries: [],
  AsiaConfirmed: [],
  AsiaCritical: [],
  AsiaDeaths: [],
  AsiaRecovered: [],
  AmericasCountries: [],
  AmericasConfirmed: [],
  AmericasCritical: [],
  AmericasDeaths: [],
  AmericasRecovered: [],
  EuropeCountries: [],
  EuropeConfirmed: [],
  EuropeCritical: [],
  EuropeDeaths: [],
  EuropeRecovered: [],
  AfricaCountries: [],
  AfricaConfirmed: [],
  AfricaCritical: [],
  AfricaDeaths: [],
  AfricaRecovered: [],
};
(async function getAllCountries() {
  try {
    const data = await fetch(countriesAPI);
    const mycountries = await data.json();
    mycountries.forEach(async (element) => {
      const myObj = {};
      myObj.countryCode = element.cca2;
      myObj.countryName = element.name.common;
      myObj.region = element.region;
      myObj.coronaData = await getCoronaData(myObj.countryCode);
      switch (element.region) {
        case "Asia":
          state.Asia.push(myObj);
          state.AsiaCountries.push(myObj.countryName);
          state.AsiaConfirmed.push(myObj.coronaData.confirmed);
          state.AsiaCritical.push(myObj.coronaData.critical);
          state.AsiaDeaths.push(myObj.coronaData.deaths);
          state.AsiaRecovered.push(myObj.coronaData.recovered);
          break;
        case "Americas":
          state.Americas.push(myObj);
          state.AmericasCountries.push(myObj.countryName);
          state.AmericasConfirmed.push(myObj.coronaData.confirmed);
          state.AmericasCritical.push(myObj.coronaData.critical);
          state.AmericasDeaths.push(myObj.coronaData.deaths);
          state.AmericasRecovered.push(myObj.coronaData.recovered);
          break;
        case "Europe":
          state.Europe.push(myObj);
          state.EuropeCountries.push(myObj.countryName);
          state.EuropeConfirmed.push(myObj.coronaData.confirmed);
          state.EuropeCritical.push(myObj.coronaData.critical);
          state.EuropeDeaths.push(myObj.coronaData.deaths);
          state.EuropeRecovered.push(myObj.coronaData.recovered);
          break;
        case "Africa":
          state.Africa.push(myObj);
          state.AfricaCountries.push(myObj.countryName);
          state.AfricaConfirmed.push(myObj.coronaData.confirmed);
          state.AfricaCritical.push(myObj.coronaData.critical);
          state.AfricaDeaths.push(myObj.coronaData.deaths);
          state.AfricaRecovered.push(myObj.coronaData.recovered);
          break;
      }
      state.world.push(myObj);
    });
  } catch (e) {
    console.log("cannot get the countries list");
  }
  displayChart(state.AsiaCountries, state.AsiaConfirmed);

  console.log(state);
})();
async function getCoronaData(countryCode) {
  try {
    const data = await fetch(coronaAPI + countryCode);
    const coronaDataByCountry = await data.json();
    const countryData = {};
    countryData.confirmed = coronaDataByCountry.data.latest_data.confirmed;
    countryData.critical = coronaDataByCountry.data.latest_data.critical;
    countryData.deaths = coronaDataByCountry.data.latest_data.deaths;
    countryData.recovered = coronaDataByCountry.data.latest_data.recovered;
    return countryData;
  } catch (e) {
    console.log(
      e,
      "Cannot get data from corona API country code: " + countryCode
    );
  }
}

function displayChart(countryList, dataset) {
  table.style.visibility = "visible";
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: countryList,
      datasets: [
        {
          label: "# of Votes",
          data: dataset,

          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
//Event listener
asiaBTN.addEventListener("click", function () {
  state.currentMainland = this.innerHTML;
  displayChart(state.AsiaCountries, state.AsiaConfirmed);
});
europeBTN.addEventListener("click", function () {
  state.currentMainland = this.innerHTML;
  displayChart(state.EuropeCountries, state.EuropeConfirmed);
});
africaBTN.addEventListener("click", function () {
  state.currentMainland = this.innerHTML;
  displayChart(state.AfricaCountries, state.AfricaConfirmed);
});
americasBTN.addEventListener("click", function () {
  state.currentMainland = this.innerHTML;
  displayChart(state.AmericasCountries, state.AmericasConfirmed);
});

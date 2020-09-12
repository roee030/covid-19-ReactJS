// const countriesAPI =
//   "https://cors-anywhere.herokuapp.com/http://restcountries.herokuapp.com/api/v1";
const countriesAPI = "http://restcountries.herokuapp.com/api/v1";
const coronaAPI = `https://corona-api.com/countries/`;
var ctx = document.getElementById("myChart").getContext("2d");
const state = {
  world: [],
  Asia: [],
  Europe: [],
  Africa: [],
  Americas: [],
  AsiaCountries: [],
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
          break;
        case "Americas":
          state.Americas.push(myObj);
          break;
        case "Europe":
          state.Europe.push(myObj);
          break;
        case "Africa":
          state.Africa.push(myObj);
          break;
        case "Asia":
          state.asia.push(myObj);
          break;
      }
      state.world.push(myObj);
    });
  } catch (e) {
    console.log("cannot get the countries list");
  }
  displayChart();

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

function displayChart() {
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: state.AsiaCountries,
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],

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

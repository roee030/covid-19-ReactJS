import React from "react";
const countriesAPI =
  "https://cors-anywhere.herokuapp.com/http://restcountries.herokuapp.com/api/v1";
const coronaAPI = `https://corona-api.com/countries/`;
export default function Countries() {
  const state = {
    world: [],
    Asia: [],
    Europe: [],
    Africa: [],
    Americas: [],
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
      console.log(e, "Cannot get data from corona API");
    }
  }
  return <div></div>;
}

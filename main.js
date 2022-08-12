const startingWord = document.querySelector(`.startWordButton`);
const anyWordButton = document.querySelector(`.anyWordButton`);
const sortButton = document.querySelector(`.sortByAlphabet`);
const data = document.querySelector(`.data`);
const input = document.querySelector(`.input`);
const count = document.querySelector(`.count`);
let inputValue = "";

const countriesAPI = "https://restcountries.com/v2/all";
let allCountries = new Array();

const fetchCountries = async (x) => {
  const response = await fetch(countriesAPI);
  const countries = await response.json();
  return countries.map((country) => country.name);
};

const main = () => {
  fetchCountries().then((res) => {
    allCountries = res;
    count.innerHTML = allCountries.length
  });
};

const choice = (value) => {
  if (startingWord.getAttribute("id") == 2) {
    startsWith(value);
  } else {
    searchByAnyWord(value);
  }
};

const searchByAnyWord = (x) => {
  let sorted = new Array();
  allCountries.forEach((country) => {
    if (country.toUpperCase().includes(x.toUpperCase())) {
      sorted.push(country);
    }
  });

  if (sortButton.getAttribute("id") == 2) {
    if (data.hasChildNodes()) {
      data.innerHTML = "";
      dataLook(sorted);
    } else {
      dataLook(sorted);
    }
  } else {
    if (data.hasChildNodes()) {
      data.innerHTML = "";
      dataLook(sorted.reverse());
    } else {
      dataLook(sorted.reverse());
    }
  }

  return sorted;
};
const startsWith = (x) => {
  let sorted = new Array();
  allCountries.forEach((country) => {
    if (country.toUpperCase().startsWith(x.toUpperCase())) {
      sorted.push(country);
    }
    // if (data.hasChildNodes()) {
    //   data.innerHTML = "";
    //   dataLook(sorted);
    // } else {
    //   dataLook(sorted);
    // }
    if (sortButton.getAttribute("id") == 2) {
      if (data.hasChildNodes()) {
        data.innerHTML = "";
        dataLook(sorted);
      } else {
        dataLook(sorted);
      }
    } else {
      if (data.hasChildNodes()) {
        data.innerHTML = "";
        dataLook(sorted.reverse());
      } else {
        dataLook(sorted.reverse());
      }
    }
    return sorted;
  });
};

const dataLook = (sorted) => {
  for (let i = 0; i < sorted.length; i++) {
    const dataCountry = document.createElement("div");
    dataCountry.style.cssText = `
  width: 20%;
  max-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20%;
  padding: 3rem 0;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 1rem;
  `;
    dataCountry.innerHTML = sorted[i];
    data.appendChild(dataCountry);
  }
};

input.addEventListener("input", () => {
  choice(input.value);
});

startingWord.addEventListener("click", () => {
  if (startingWord.getAttribute("id") == 2) {
    startingWord.setAttribute("id", "1");
    startingWord.style.backgroundColor = `#FFFABA`;
    choice(input.value);
  } else {
    startingWord.style.backgroundColor = "#BAE0B4";
    startingWord.setAttribute("id", "2");
    anyWordButton.setAttribute("id", "1");
    anyWordButton.style.backgroundColor = `#FFFABA`;
    choice(input.value);
  }
});
anyWordButton.addEventListener("click", () => {
  if (anyWordButton.getAttribute("id") == 2) {
    anyWordButton.setAttribute("id", "1");
    anyWordButton.style.backgroundColor = `#FFFABA`;
    choice(input.value);
  } else {
    anyWordButton.style.backgroundColor = "#BAE0B4";
    anyWordButton.setAttribute("id", "2");
    startingWord.setAttribute("id", "1");
    startingWord.style.backgroundColor = `#FFFABA`;
    choice(input.value);
  }
});

sortButton.addEventListener("click", () => {
  if (sortButton.getAttribute("id") == 2) {
    sortButton.setAttribute("id", "1");
    sortButton.style.backgroundColor = `#FFFABA`;
    choice(input.value);
  } else {
    sortButton.style.backgroundColor = "#BAE0B4";
    sortButton.setAttribute("id", "2");
    choice(input.value);
  }
});

main();

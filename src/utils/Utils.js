export const getPaginatedData = function getPaginatedData(results, thisPage) {
  let forecastsPerPage = global.config.noOfForecastsPerPage;
  let toAdd = 0;
  if (results.length - 1 < forecastsPerPage) {
    forecastsPerPage = results.length - 1;
    toAdd = 1;
  }
  const paginatedResults = [];
  for (let i = (forecastsPerPage * (thisPage - 1));
    i < (forecastsPerPage * (thisPage)) + (toAdd); i += 1) {
    if (!results[i]) {
      break;
    }
    paginatedResults.push(results[i]);
  }
  return paginatedResults;
};

export const getPagesToShow = function getPagesToShow(startIndex, totalNoOfPages, setStartIndex) {
  // these are the pages in the paginator
  const maxNoOfPages = global.config.maxNoOfPagesInPaginator;
  const allPages = [];
  for (let i = 1; i <= totalNoOfPages; i += 1) {
    allPages.push(i);
  }
  const shownPages = [];
  let startIndexFinal = startIndex > (totalNoOfPages - 1)
    ? startIndex - (startIndex - (totalNoOfPages - 1)) : startIndex;
  startIndexFinal = startIndex < 0 ? 0 : startIndex;
  const lastPage = (startIndexFinal + (maxNoOfPages - 1)) > (totalNoOfPages - 1)
    ? (totalNoOfPages - 1) : (startIndexFinal + (maxNoOfPages - 1));
  startIndexFinal = (lastPage - startIndexFinal) < (maxNoOfPages - 1)
    ? lastPage - (maxNoOfPages - 1) : startIndexFinal;
  startIndexFinal = startIndexFinal < 0 ? 0 : startIndexFinal;
  if (startIndexFinal !== startIndex) {
    setStartIndex(startIndexFinal);
  }
  for (let i = startIndexFinal; i <= lastPage; i += 1) {
    shownPages.push(allPages[i]);
  }
  return shownPages;
};

export const sortAlphabetically = function sortAlphabetically(forecast) {
  const sortedResult = forecast.sort((a, b) => {
    if (a.location.name.toLowerCase() < b.location.name.toLowerCase()) { return -1; }
    if (a.location.name.toLowerCase() > b.location.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  return sortedResult;
};

export const getStorageItem = function getStorageItem(type) {
  const savedData = localStorage.getItem(type);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return [];
};

export const addNewTempStorageItem = function addNewTempStorageItem(newData) {
  let savedData = getStorageItem('tempAllForecasts');
  savedData = [...savedData, newData];
  savedData = sortAlphabetically(savedData);
  savedData = JSON.stringify(savedData);
  localStorage.setItem('tempAllForecasts', savedData);
};

export const addNewStorageItem = function addNewStorageItem(
  type,
  newData,
  backupExists,
) {
  if (type === 'forecasts' && !backupExists) {
    let savedAllForecasts = getStorageItem('allForecasts');
    savedAllForecasts = [...savedAllForecasts, newData];
    savedAllForecasts = sortAlphabetically(savedAllForecasts);
    savedAllForecasts = JSON.stringify(savedAllForecasts);
    localStorage.setItem('allForecasts', savedAllForecasts);
  }
  let savedData = getStorageItem(type);
  savedData = [...savedData, newData];
  savedData = sortAlphabetically(savedData);
  savedData = JSON.stringify(savedData);
  localStorage.setItem(type, savedData);
};

export const saveNoteInStorage = function saveNoteInStorage(city, newNote, isDeleting) {
  let savedNotes = getStorageItem('notes');
  // eslint-disable-next-line array-callback-return, consistent-return
  let index;
  // eslint-disable-next-line no-unused-vars
  const noteFound = savedNotes.find((note, i) => {
    const citiesMatch = note.city === city;
    if (citiesMatch) {
      index = i;
    }
    return citiesMatch;
  });
  if (index === undefined) {
    savedNotes = [...savedNotes, { city, notes: [newNote] }];
    savedNotes = JSON.stringify(savedNotes);
    localStorage.setItem('notes', savedNotes);
    return;
  }
  if (isDeleting) {
    savedNotes[index].notes = newNote;
  } else {
    savedNotes[index].notes = [...savedNotes[index].notes, newNote];
  }
  savedNotes = JSON.stringify(savedNotes);
  localStorage.setItem('notes', savedNotes);
};

export const getNotesFromStorage = function getNotesFromStorage(city) {
  const savedNotes = getStorageItem('notes');
  let index;
  // eslint-disable-next-line no-unused-vars
  const noteFound = savedNotes.find((note, i) => {
    const citiesMatch = note.city === city;
    if (citiesMatch) {
      index = i;
    }
    return citiesMatch;
  });
  if (index === undefined) {
    return [];
  }
  return savedNotes[index].notes;
};

export const getNewCityForecast = function getNewCityForecast(
  city,
  onSuccess,
  onFail,
  saveOnlyBackup,
) {
  const x = `https://api.weatherstack.com/current?access_key=523f4290beb016066e439b51f68fb24c&query=${city}`;
  // const y = city;
  const url = x;
  fetch(url)
    .then((res) => {
      console.log(res);
      let APIUsage = Number(localStorage.getItem('API-usage'));
      APIUsage -= 1;
      localStorage.setItem('API-usage', APIUsage.toString());
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (!data.request) {
        onFail();
        return;
      }
      const APIUsage = Number(localStorage.getItem('API-usage'));
      if (APIUsage <= 0) {
        localStorage.setItem('API-usage', '5');
      }
      if (saveOnlyBackup) {
        addNewTempStorageItem(data);
      } else {
        addNewStorageItem('forecasts', data, false);
      }
      onSuccess(data.location.name);
    }).catch((e) => {
      console.log('ERROR', e);
      onFail();
    });
};

export const getGeoLocation = function getGeoLocation(stateFunction, onGetGeoLocationFail) {
  const apiKey = 'c1fd1ab3cb006384c8ba08b4672ef90c6a4024a7256d4d492bc4c431';
  const url = `https://api.ipdata.co?api-key=${apiKey}`;
  return fetch(url)
    .then((res) => {
      console.log('RES', res);
      return res.json();
    })
    .then((data) => {
      console.log('Data', data);
      stateFunction(data.city);
    }).catch((e) => {
      console.log('ERROR', e);
      onGetGeoLocationFail();
    });
};

export const getSelectedItemFromList = function getSelectedItemFromList(
  returnType,
  searchName,
  type,
) {
  let selectedForecastIndex;
  const selectedForecast = getStorageItem(type || 'forecasts').find((forecast, i) => {
    const thisIsTheForecast = forecast.location.name === searchName;
    if (thisIsTheForecast) {
      selectedForecastIndex = i;
    }
    return thisIsTheForecast;
  });
  if (returnType === 'index') {
    return selectedForecastIndex;
  }
  return selectedForecast;
};

export const getForecastPage = function getForecastPage(city, forecasts, noOfPages) {
  let isFound;
  for (let i = 1; i <= noOfPages; i += 1) {
    const paginatedForecasts = getPaginatedData(forecasts, i);
    // eslint-disable-next-line
    paginatedForecasts.find((forecast) => {
      const isMatch = forecast.location.name === city;
      if (isMatch) {
        isFound = i;
      }
      return isMatch;
    });
    if (isFound) {
      break;
    }
  }
  return isFound;
};

export const refreshAllForecasts = function refreshAllForecasts(
  setForecasts,
  setLoadingForecasts,
  setFavourites,
) {
  setLoadingForecasts(true);
  const allForecasts = getStorageItem('allForecasts');
  let forecasts = getStorageItem('forecasts');
  const onComplete = function onComplete(index) {
    const tempAllForecasts = getStorageItem('tempAllForecasts');
    if (index === allForecasts.length - 1
      && tempAllForecasts.length === allForecasts.length) {
      // eslint-disable-next-line array-callback-return
      forecasts = tempAllForecasts.filter((allForecast) => (
        forecasts.find(
          (forecast) => forecast.location.name === allForecast.location.name,
        )));
      let favourites = getStorageItem('favourites');
      favourites = forecasts.filter((forecast) => (
        favourites.find(
          (favourite) => favourite.location.name === forecast.location.name,
        )));
      localStorage.setItem('allForecasts', JSON.stringify(tempAllForecasts));
      localStorage.setItem('forecasts', JSON.stringify(forecasts));
      localStorage.setItem('favourites', JSON.stringify(favourites));
      localStorage.removeItem('tempAllForecasts');
      setForecasts(forecasts);
      setFavourites(favourites);
      setLoadingForecasts(false);
    } else if (index === allForecasts.length - 1) {
      // eslint-disable-next-line no-alert
      alert('Could not refresh stored forecasts. Please check your connection');
      setLoadingForecasts(false);
    }
  };
  // eslint-disable-next-line array-callback-return
  allForecasts.map((forecast, i) => {
    getNewCityForecast(forecast.location.name, () => onComplete(i), () => onComplete(i), true);
  });
};

export const initializeStorage = function initializeStorage(
  forecasts,
  setForecasts,
  setFavourites,
  setLoadingForecasts,
) {
  localStorage.setItem('forecasts', JSON.stringify(forecasts));
  localStorage.setItem('allForecasts', JSON.stringify(forecasts));
  localStorage.setItem('favourites', '[]');
  localStorage.setItem('API-usage', '250000');
  refreshAllForecasts(setForecasts, setLoadingForecasts, setFavourites);
};

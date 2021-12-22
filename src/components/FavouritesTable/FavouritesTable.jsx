import React, { useState } from 'react';
import WhiteCard from '../WhiteCard/WhiteCard';
import * as S from '../ForecastTable/ForecastTable.styled';
import {
  getPaginatedData,
  getSelectedItemFromList,
  getStorageItem,
} from '../../utils/Utils';
import Paginator from '../Paginator/Paginator';
import starOn from '../../assets/star.png';

const FavouriteTable = function FavouriteTable({
  favourites,
  setFavourites,
  setSelectedForecast,
  setShowSearch,
  setLoadingForecasts,
  setForecasts,
}) {
  const [thisPage, setThisPage] = useState(1);
  // Below variables are used to paginate favourites
  const paginatedFavourites = getPaginatedData(favourites, thisPage);
  const totalFavourites = favourites.length;
  const favouritesPerPage = global.config.noOfForecastsPerPage;
  const noOfPages1 = (totalFavourites % favouritesPerPage) === 0
    ? (totalFavourites / favouritesPerPage) : (Math.floor(totalFavourites / favouritesPerPage) + 1);
  const noOfPages = (totalFavourites / favouritesPerPage) < 1 ? 1 : noOfPages1;
  if (thisPage > 1 && thisPage > noOfPages) {
    setThisPage(noOfPages);
  }

  function showDetails(index) {
    const selectedFavourite = getSelectedItemFromList(
      'item',
      paginatedFavourites[index].location.name,
      'favourites',
    );
    setSelectedForecast(selectedFavourite);
  }

  function removeFavourite(index) {
    const selectedFavouriteIndex = getSelectedItemFromList(
      'index',
      paginatedFavourites[index].location.name,
      'favourites',
    );
    const savedFavourites = favourites;
    savedFavourites.splice(selectedFavouriteIndex, 1);
    localStorage.setItem('favourites', JSON.stringify(savedFavourites));
    setFavourites([...getStorageItem('favourites')]);
  }

  return (
    <WhiteCard
      width="70%"
      height="440px"
      goBack={() => setShowSearch(true)}
      allCities
      tableDescription="ALL CITIES"
      favourites
    >
      <S.Table data-testid="favouritesTable">
        <thead>
          <tr>
            <S.TH>CITY</S.TH>
            <S.TH removeAt1>WEATHER</S.TH>
          </tr>
        </thead>
        <tbody>
          { paginatedFavourites.map((favourite, i) => (
            <S.TR>
              <S.TD>
                <S.CityLink
                  onClick={() => showDetails(i)}
                  data-testid={`favourite${i}`}
                >
                  {favourite.location.name}
                </S.CityLink>
              </S.TD>
              <S.TD removeAt1 extraPadding>
                <S.Image src={favourite.current.weather_icons[0]} />
                {favourite.current.temperature}
                &deg;C
                {'.  '}
                <small>
                  {favourite.current.weather_descriptions[0].toString()
                    .replace(/\s/g, '-').split(',').join('')}
                </small>
                <S.FavouritesIcon
                  src={starOn}
                  onClick={() => removeFavourite(i)}
                />
              </S.TD>
            </S.TR>
          ))}
        </tbody>
      </S.Table>
      <Paginator
        noOfPages={noOfPages}
        thisPage={thisPage}
        setThisPage={setThisPage}
        setLoadingForecasts={setLoadingForecasts}
        setForecasts={setForecasts}
      />
    </WhiteCard>
  );
};

export default FavouriteTable;

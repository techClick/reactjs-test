import React, { useState } from 'react';
import WhiteCard from '../WhiteCard/WhiteCard';
import * as S from '../ForecastTable/ForecastTable.styled';
import * as S2 from './DetailsTable.styled';
import { getPaginatedData } from '../../utils/Utils';
import Paginator from '../Paginator/Paginator';
import Notes from './components/Notes';

const DetailsTable = function DetailsTable({
  selectedForecast,
  exitFromDetails,
}) {
  const [thisPage, setThisPage] = useState(1);
  const details = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(selectedForecast.current)) {
    details.push({ field: key, value });
  }
  // Below variables are used to paginate favourites
  const paginatedDetails = getPaginatedData(details, thisPage);
  const totalDetails = details.length;
  const detailsPerPage = global.config.noOfForecastsPerPage;
  const noOfPages1 = (totalDetails % detailsPerPage) === 0
    ? (totalDetails / detailsPerPage) : (Math.floor(totalDetails / detailsPerPage) + 1);
  const noOfPages = (totalDetails / detailsPerPage) < 1 ? 1 : noOfPages1;

  return (
    <WhiteCard
      width="70%"
      height="440px"
      exitText="Back to forecasts"
      goBack={() => exitFromDetails()}
      favourites
      tableDescription={`
        ${selectedForecast.location.name.toUpperCase()} - Full details`}
    >
      <Notes selectedForecast={selectedForecast} />
      <S2.Table data-testid="detailsTable">
        <thead>
          <tr>
            <S.TH removeAt1>FIELD</S.TH>
            <S.TH>VALUE</S.TH>
          </tr>
        </thead>
        <tbody>
          { paginatedDetails.map((detail, i) => (
            <S.TR>
              <S.TD removeAt1><i><b data-testid={`detail${i}`}>{detail.field}</b></i></S.TD>
              <S.TD>
                {detail.field === 'weather_icons'
                  ? <S.Image src={detail.value} /> : detail.value}
              </S.TD>
            </S.TR>
          ))}
        </tbody>
      </S2.Table>
      <Paginator
        noOfPages={noOfPages}
        thisPage={thisPage}
        setThisPage={setThisPage}
      />
    </WhiteCard>
  );
};

export default DetailsTable;

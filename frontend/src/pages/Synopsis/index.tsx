import React from "react";
import PropTypes from "prop-types";
import { Button, Stack, Typography } from "@mui/material";
import DataGrid from "../../components/DataGrid/DataGrid";
import {
  GridDataType,
  RecommendationDataType,
  SummariesDataType,
} from "../../@types/SynopsisData/grid.type";
import Grid from "@mui/material/Grid2";
import SummariesGrid from "./SummariesGrid/SummariesGrid";
import PdfDisplay from "./PdfDisplay/PdfDisplay";
import ButtonGrid from "./ButtonGrid/ButtonGrid";

// Rest of code.
SynopsisPage.propTypes = {};

const row: GridDataType = {
  title: "Demo Paper",
  authors: ["Prf. A", "Prf. B"],
  publicationDate: new Date("08/09/1996"),
  relatedtopics: ["CS", "AI", "SWE"],
};
const resultsAi: SummariesDataType = {
  "Researching Methods":
    "1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex?",
  "Key Results":
    "2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex?",
  Limitations:
    "3 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex?",
};

const recommendationAI: RecommendationDataType = {
  "Related Papers": [row, row],
  "Potential Fields": ["CS", "AI", "SWE"],
};

function SynopsisPage() {
  return (
    <div className="synopsis-page-container">
      <Stack spacing={2} mt={8}>
        <DataGrid row={row} />
        <SummariesGrid data={resultsAi} />
        {/* <PdfDisplay /> */}
        <ButtonGrid />
      </Stack>
    </div>
  );
}

export default SynopsisPage;

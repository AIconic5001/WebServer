import React, { useEffect } from "react";
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
import "./styles.scss";
import ReplyIcon from "@mui/icons-material/Reply";
import data2 from "../../../src/assets/mock/mockPaperResult.json";

// Rest of code.
SynopsisPage.propTypes = {};

const row: GridDataType = {
  title: "Demo Paper",
  authors: ["Prf. A", "Prf. B"],
  publicationDate: new Date("08/09/1996"),
  relatedtopics: ["CS", "AI", "SWE"],
};
const resultsAi: SummariesDataType = {
  Methodology:
    "1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, mollitia sequi autem nesciunt explicabo corrupti, debitis expedita incidunt officiis quod labore consequuntur iure fugit libero adipisci voluptates nulla, nemo ex?",
  Results:
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
      <Stack spacing={6} mt={8}>
        <div className="title-container">
          <Grid container spacing={2}>
            <Grid size={2}>
              <a href="/">
                <Button
                  variant="outlined"
                  startIcon={<ReplyIcon sx={{ color: "var(--primary-dark" }} />}
                >
                  Back
                </Button>
              </a>
            </Grid>
            {/* <Grid size={10}>
              <Typography variant="h3" sx={{ color: "var(--primary)" }}>
                Synopsis
              </Typography>
            </Grid> */}
          </Grid>
        </div>
        <div className="dataGrid-container">
          <DataGrid row={row} />
        </div>
        <div className="summaries-container">
          <SummariesGrid data={data2} />
        </div>
        {/* <PdfDisplay /> */}
        <ButtonGrid />
      </Stack>
    </div>
  );
}

export default SynopsisPage;

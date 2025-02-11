export interface GridDataType {
  title: string;
  authors: Array<string>;
  publicationDate: Date;
  relatedtopics: Array<string>;
}

export interface SummariesDataType {
  Methodology: string;
  Results: string;
  Limitations: string;
}

export interface RecommendationDataType {
  "Related Papers": Array<GridDataType>;
  "Potential Fields": Array<string>;
}

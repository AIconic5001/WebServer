import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import synopsisService from "../../services/synopsis.service";
import { API_CONFIG } from "../../constants/api.constant";

export const useGetSummaries = () => {
  const { data } = useQuery({
    queryKey: ["summaries"],
    queryFn: () => synopsisService.getSummaries(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return data;
};

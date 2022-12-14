import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

interface ReturnProductType {
  content: [
    {
      age: number;
      cbName: string | null;
      financialCompanyName: string;
      id: number;
      job: string;
      joinWay: string;
      maxAmount: string;
      maxRate: number;
      minRate: number;
      productName: string;
      productNumber: string;
      productType: string;
    },
  ];
}
interface ActionProductType {
  productType: string;
}

// createApi 작성
export const userCreditApi = createApi({
  reducerPath: 'userCreditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders(headers) {
      return headers
    },
    
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ReturnProductType, number>({
      query: (pageNumber) => `main?page=${pageNumber}`,
    }),
    getProductType: builder.query<ReturnProductType, ActionProductType>({
      query: (type) => ({
        url: 'classification',
        body: type,
      }),
    }),
    // getProducts: builder.query({
    //   query: () => '',
    // }),
    // postFilter: builder.mutation({
    //   query: () => '',
    // })
  }),
});

export const { useGetProductsQuery, useGetProductTypeQuery } = userCreditApi;

const initialState = {
  creditScoreData: {
    quizScore: 0,
    resultCreditScore: 0,
    creditRating: 0,
  },
};

export const creditScoreSlice = createSlice({
  name: 'creditScore',
  initialState,
  reducers: {
    incQuizScore: (state) => {
      state.creditScoreData.quizScore = state.creditScoreData.quizScore + 1;
    },
    creditScoreCalc: (state) => {
      // 퀴즈점수 -> 신용점수
      switch (state.creditScoreData.quizScore) {
        case 8:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 78) + 942;
          state.creditScoreData.creditRating = 1;
          break;
        case 7:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 50) + 891;
          state.creditScoreData.creditRating = 2;
          break;
        case 6:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 58) + 832;
          state.creditScoreData.creditRating = 3;
          break;
        case 5:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 63) + 768;
          state.creditScoreData.creditRating = 4;
          break;
        case 4:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 69) + 698;
          state.creditScoreData.creditRating = 5;
          break;
        case 3:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 67) + 630;
          state.creditScoreData.creditRating = 6;
          break;
        case 2:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 99) + 530;
          state.creditScoreData.creditRating = 7;
          break;
        case 1:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 75) + 454;
          state.creditScoreData.creditRating = 8;
          break;
        case 0:
          state.creditScoreData.resultCreditScore = Math.floor(Math.random() * 118) + 335;
          state.creditScoreData.creditRating = 9;
          break;
        default:
          return;
      }
    },
  },
});

export const { incQuizScore, creditScoreCalc } = creditScoreSlice.actions;
export function useCreditScoreCalc() {
  // const result = useAppSelector((state)  => state.creditScore.creditScoreData.resultCreditScore)
  const dispatch = useDispatch();
  return { dispatch };
}

export const creditScoreReducer = creditScoreSlice.reducer;

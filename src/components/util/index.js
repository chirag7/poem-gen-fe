export const BASE_URL = `${process.env.REACT_APP_BE_URL || 'https://localhost:5000/'}`
export const GET_POEM_URL = `${BASE_URL}/generatePoem`
export const GET_EMOTION_ANALYSIS_URL = `${BASE_URL}/emotionAnalysis`
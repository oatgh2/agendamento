import { createSlice } from '@reduxjs/toolkit'
import SessionState from '../models/sessionModel'
import updateLocation from '../utils/location';


const initialState: SessionState = JSON.parse(sessionStorage.getItem('session') || '{}')




const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateSessionData: (state, action) => {
      const newSessionData = { ...state, ...action.payload };
      sessionStorage.setItem('session', JSON.stringify(newSessionData));
      return newSessionData;
    },
    clearSessionData: () => {
      sessionStorage.removeItem('session');
      return initialState;
    },
  },
})

export const { updateSessionData, clearSessionData } = sessionSlice.actions;
export default sessionSlice.reducer;
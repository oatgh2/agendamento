import { createSlice } from '@reduxjs/toolkit'
import Route from '../models/routerModel';


const initialState: Route = JSON.parse(sessionStorage.getItem('route') || '{}')




const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    updateRouteData: (state, action) => {
      const newRouteData = { ...state, ...action.payload };
      sessionStorage.setItem('route', JSON.stringify(newRouteData));
      return newRouteData;
    },
    clearRouteData: () => {
      sessionStorage.removeItem('route');
      return new Route();
    },
  },
})

export const { updateRouteData, clearRouteData } = routeSlice.actions;
export default routeSlice.reducer;
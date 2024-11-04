import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DeviceLocationState {
    latitude: Number | null,
    longitude: Number | null,
    permission: boolean
}

const initialState : DeviceLocationState = {
    latitude: null,
    longitude: null,
    permission: false
}

const deviceLocationSlice = createSlice({
    name: 'deviceLocation',
    initialState,
    reducers: {
      setLatitude: (state, action: PayloadAction<number>) => {
        state.latitude = action.payload
      },
      setLongitude: (state, action: PayloadAction<number>) => {
        state.longitude = action.payload
      },
      givePermission: (state) => {
        state.permission = true
      }
    },
})

export const {setLatitude, setLongitude, givePermission} = deviceLocationSlice.actions;

export default deviceLocationSlice.reducer;
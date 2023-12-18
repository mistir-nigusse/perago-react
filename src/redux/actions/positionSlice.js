import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchPositions = createAsyncThunk("fetchPositions", async () => {
  try {
    const response = await api.get("/getall");
    return response.data;
  } catch (error) {
    console.error("Error fetching positions:", error);
  }
});

const positionsSlice = createSlice({
  name: "positions",
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPositions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPositions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPositions.rejected, (state, action) => {
      state.error = true;
    });
  },
  // reducers: {
  //   setpositions: (state, action) => {

  //    state.push(action.payload);
  //       return action.payload;
  //   },
  //   addPosition: (state, action) => {
  //     state.push(action.payload);
  //   },
  //   updatePosition: (state, action) => {
  //     const index = state.findIndex(position => position.id === action.payload.id);
  //     if (index !== -1) {
  //       state[index] = action.payload;
  //     }
  //   },
  //   deleteposition: (state, action) => {
  //     return state.filter(position => position.id !== action.payload);
  //   },
  // },
});

export const { setpositions, addposition, updateposition, deleteposition } =
  positionsSlice.actions;

// export const createposition = position => async dispatch => {
//   try {
//     const response = await api.post('/position', position);
//     dispatch(addposition(response.data));
//   } catch (error) {
//     console.error('Error creating position:', error);
//   }
// };

// export const updatePositionAsync = positionId => async dispatch => {
//   try {
//     const response = await api.put(`/positions/${positionId}`, positionId);
//     dispatch(updateposition(positionId));
//   } catch (error) {
//     console.error('Error updating position:', error);
//   }
// };
// export const deletepositionAsync = positionId => async dispatch => {
//   try {
//     await api.delete(`/positions/${positionId}`);
//     dispatch(deleteposition(positionId));
//   } catch (error) {
//     console.error('Error deleting position:', error);
//   }
// };

export default positionsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async Thunks for CRUD operations
export const fetchPositions = createAsyncThunk("fetchPositions", async () => {
  try {
    const response = await api.get("/getall");
    return response.data;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
});

export const addPosition = createAsyncThunk("addPosition", async (positionData) => {
  try {
    const response = await api.post("/insert", positionData);
    return response.data;
  } catch (error) {
    console.error("Error adding position:", error);
    throw error;
  }
});

export const updatePosition = createAsyncThunk("updatePosition", async ({ id, updatedData }) => {
  try {
    const response = await api.put(`/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating position:", error);
    throw error;
  }
});

export const deletePosition = createAsyncThunk("deletePosition", async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting position:", error);
    throw error;
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
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPositions.rejected, (state) => {
        state.error = true;
      })
      .addCase(addPosition.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        const updatedIndex = state.data.findIndex((pos) => pos.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.data[updatedIndex] = action.payload;
        }
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.data = state.data.filter((pos) => pos.id !== action.payload.id);
      });
  },
});

export default positionsSlice.reducer;


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


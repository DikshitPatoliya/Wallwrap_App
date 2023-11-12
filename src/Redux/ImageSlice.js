import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestApi, postRequestApi } from "../Helper/AxiosService";
import { URL } from "../Helper/Url";

const initialState = {
	Category: [],
	isLoading: false,
	topImages: {
		data: [],
		next: 0,
		lastPage: 0
	},
	trendingImages: {
		data: [],
		next: 0,
		lastPage: 0
	},
	recentImages: {
		data: [],
		next: 0,
		lastPage: 0
	},
	imagesByCategory: {
		data: [],
		next: 0,
		lastPage: 0
	}
};

const Image = "Image";

export const getImageRecent = createAsyncThunk(
	Image + "/getImageRecent",
	async (params, { rejectWithValue }) => {
		try {
			const response = await getRequestApi(URL.GetRecentImage + (params?.page ? `&page=${params.page}` : ''));
			return response;
		} catch (e) {
			return rejectWithValue(e?.response);
		}
	}
);

export const getImageTop = createAsyncThunk(
	Image + "/getImageTop",
	async (params, { rejectWithValue }) => {
		try {
			const response = await getRequestApi(URL.GetTopImage + (params?.page ? `&page=${params.page}` : ''));
			return response;
		} catch (e) {
			return rejectWithValue(e?.response);
		}
	}
);

export const getImageTrending = createAsyncThunk(
	Image + "/getImageTrending",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getRequestApi(URL.GetTrendingImage);
			return response;
		} catch (e) {
			return rejectWithValue(e?.response);
		}
	}
);

export const getCategory = createAsyncThunk(
	Image + "/getCategory",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getRequestApi(URL.GetCategory);
			return response;
		} catch (e) {
			return rejectWithValue(e?.response);
		}
	}
);

export const getCategoryImage = createAsyncThunk(
	Image + "/getCategoryImage",
	async (params, { rejectWithValue }) => {
		try {
			const response = await getRequestApi(URL.GetCategoryImage + params?.id + (params?.page ? `&page=${params.page}` : ''));
			return response;
		} catch (e) {
			return rejectWithValue(e?.response);
		}
	}
);

export const updateImageCount = createAsyncThunk(
	Image + "/updateImageCount",
	async (params, { rejectWithValue }) => {
		try {
			const response = await postRequestApi(URL.PostImageCount, params);
			return response;
		} catch (e) {
			return rejectWithValue(e?.response);
		}
	}
);

export const ImageSlice = createSlice({
	name: Image,
	initialState,
	reducers: {
		//Nomal Actions
		resetAuthReducer: (state) => {
			state.isLoading = false;
			state.data = [];
			state.CategoryImage = [];
			state.topImages = {
				data: [],
				next: 0,
				lastPage: 0
			},
			state.trendingImages = {
				data: [],
				next: 0,
				lastPage: 0
			},
			state.recentImages = {
				data: [],
				next: 0,
				lastPage: 0
			},
			state.imagesByCategory = {
				data: [],
				next: 0,
				lastPage: 0
			}
		}
	},
	extraReducers: (builder) => {
		//getImageRecent
		builder.addCase(getImageRecent.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getImageRecent.fulfilled, (state, action) => {
			const page = action.meta.arg?.page
			state.isLoading = false;
			state.recentImages.data = page ? [...state.recentImages.data, ...action.payload?.data?.data?.data] : action.payload?.data?.data?.data;
			state.recentImages.lastPage = action.payload?.data?.data?.lastPage;
			state.recentImages.next = action.payload?.data?.data?.next;
		});
		builder.addCase(getImageRecent.rejected, (state, action) => {
			state.isLoading = false;
		});

		//getImageTop
		builder.addCase(getImageTop.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getImageTop.fulfilled, (state, action) => {
			const page = action.meta.arg?.page
			state.isLoading = false;
			state.topImages.data = page ? [...state.topImages.data, ...action.payload?.data?.data?.data] : action.payload?.data?.data?.data;
			state.topImages.lastPage = action.payload?.data?.data?.lastPage;
			state.topImages.next = action.payload?.data?.data?.next;
		});
		builder.addCase(getImageTop.rejected, (state, action) => {
			state.isLoading = false;
		});

		//Categoryw
		builder.addCase(getCategory.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCategory.fulfilled, (state, action) => {
			state.isLoading = false;
			state.Category = action.payload?.data?.data;
		});
		builder.addCase(getCategory.rejected, (state, action) => {
			state.isLoading = false;
		});

		//getImageTrending
		builder.addCase(getImageTrending.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getImageTrending.fulfilled, (state, action) => {
			state.isLoading = false;
			state.trendingImages.data = action.payload?.data?.data?.data;
			state.trendingImages.lastPage = action.payload?.data?.data?.lastPage;
			state.trendingImages.next = action.payload?.data?.data?.next;
		});
		builder.addCase(getImageTrending.rejected, (state, action) => {
			state.isLoading = false;
		});

		//getCategoryImage
		builder.addCase(getCategoryImage.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCategoryImage.fulfilled, (state, action) => {
			const page = action.meta.arg?.page
			state.isLoading = false;
			state.imagesByCategory.data = page ? [...state.imagesByCategory.data, ...action.payload?.data?.data?.data] : action.payload?.data?.data?.data;
			state.imagesByCategory.lastPage = action.payload?.data?.data?.lastPage;
			state.imagesByCategory.next = action.payload?.data?.data?.next;
		});
		builder.addCase(getCategoryImage.rejected, (state, action) => {
			state.isLoading = false;
		});

	}
});

export const { resetAuthReducer } = ImageSlice.actions;
export default ImageSlice.reducer;
import { reactive, computed, readonly } from 'vue';

interface CityState {
  currentCity: string;
  location: { latitude: number; longitude: number } | null;
}

const state = reactive<CityState>({
  currentCity: uni.getStorageSync('current_city') || '赣州市',
  location: null
});

const getters = {
  currentCity: computed(() => state.currentCity),
  location: computed(() => state.location)
};

const actions = {
  setCity(city: string) {
    state.currentCity = city;
    uni.setStorageSync('current_city', city);
  },
  setLocation(lat: number, lng: number) {
    state.location = { latitude: lat, longitude: lng };
  }
};

export const useCityStore = () => ({
  state: readonly(state),
  ...getters,
  ...actions
});

export default useCityStore;

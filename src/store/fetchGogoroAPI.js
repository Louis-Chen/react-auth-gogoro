import axios from 'axios'

const FETCH_GOGORO_API = 'FETCH_GOGORO_API'
const FETCH_GOGORO_API_SUCCESS = 'FETCH_GOGORO_API_SUCCESS'
const fetchGogoroAPI = payload => {
	return dispatch => {
		return axios
			.get('https://webapi.gogoro.com/api/vm/list')
			.then(response => {
				// handle success
				const preparation = []
				// 資料格式預處理
				response.data.map((d, i) => {
					const LocName = JSON.parse(d.LocName)
					const Address = JSON.parse(d.Address)
					const District = JSON.parse(d.District)
					const City = JSON.parse(d.City)
					return preparation.push({
						Id: d.Id,
						LocName: LocName,
						Latitude: d.Latitude,
						Longitude: d.Longitude,
						ZipCode: d.ZipCode,
						Address: Address,
						District: District,
						State: 1,
						City: City,
						AvailableTime: d.AvailableTime,
						AvailableTimeByte: d.AvailableTimeByte
					})
				})
				return dispatch(fetchGogoroAPISuccess(preparation))
			})
			.catch(function(error) {
				// handle error
				console.log(error)
				return error
			})
	}
}

export const fetchGogoroAPISuccess = data => {
	return {
		type: FETCH_GOGORO_API_SUCCESS,
		payload: data
	}
}
const gogoroReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_GOGORO_API:
			return [...action.payload]

		case FETCH_GOGORO_API_SUCCESS:
			return [...state, ...action.payload]

		default:
			return state
	}
}

export { fetchGogoroAPI, gogoroReducer }

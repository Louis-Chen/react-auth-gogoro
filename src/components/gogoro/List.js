import React, { useState, useEffect } from 'react'
import { map, isEmpty } from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { Item, Input, Select } from 'semantic-ui-react'
import { fetchGogoroAPI } from '../../store/fetchGogoroAPI'
import { isArray } from 'util'

const cities = [
	'台北市',
	'基隆市',
	'新北市',
	'宜蘭縣',
	'桃園市',
	'新竹市',
	'新竹縣',
	'苗栗縣',
	'台中市',
	'彰化縣',
	'南投縣',
	'雲林縣',
	'嘉義縣',
	'嘉義市',
	'台南市',
	'高雄市',
	'屏東縣',
	'台東縣',
	'花蓮縣',
	'連江縣'
]

const cityOptions = map(cities, city => ({
	key: city,
	text: city,
	value: city
}))

const StationList = props => {
	const { gogoro, fetchGogoroAPI } = props
	const [station, setStation] = useState([])
	const [search, setSearch] = useState('')
	const [city, setCity] = useState(null)

	useEffect(() => {
		if (isEmpty(gogoro)) {
			console.log(gogoro)
			return fetchGogoroAPI()
		}

		return setStation(gogoro)
	}, [gogoro])

	const filterList = () => {
		let updatedList = station.filter(item => {
			if (city) {
				return item.District.List[1].Value === city
			} else {
				return item.Address.List[1].Value.indexOf(search) !== -1
			}
		})
		let data = updatedList.map((item, index, array) => {
			return (
				<Item>
					<Item.Image size="tiny" src="https://react.semantic-ui.com/images/wireframe/image.png" />
					<Item.Content verticalAlign="middle">
						<Item.Header as="a" content={item.Address.List[1].Value} />
					</Item.Content>
				</Item>
			)
		})
		return data
	}

	return (
		<React.Fragment>
			<Input value={search} onChange={e => setSearch(e.target.value)} />
			<Select value={city} onChange={e => setCity(e.target.value)} placeholder="選擇縣市" options={cityOptions} />
			<Item.Group>{filterList()}</Item.Group>
			<pre>{JSON.stringify(station, null, 2)}</pre>
		</React.Fragment>
	)
}

const mapStateToProps = state => ({
	gogoro: state.gogoro
})
const mapDispatchToProps = dispatch => ({
	fetchGogoroAPI: () => dispatch(fetchGogoroAPI())
})
const enhancer = compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)
export default enhancer(StationList)

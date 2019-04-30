import React, { useState, useLayoutEffect } from 'react'
import { map } from 'lodash'
import { Item, Input, Select, Form, Segment } from 'semantic-ui-react'
import { cities, towns } from './data'

const cityOptions = map(cities, city => ({
	key: city,
	text: city,
	value: city
}))
const StationList = props => {
	const { station } = props
	const [search, setSearch] = useState('')
	const [city, setCity] = useState('')
	const [townOptions, setTownOption] = useState([])
	const [town, setTown] = useState('')

	useLayoutEffect(() => {
		if (city) {
			let options = []
			map(towns, (town, i) => {
				if (town.city === city) {
					options = map(town.towns, (t, i) => {
						return {
							key: t,
							text: t,
							value: t
						}
					})
				}
			})
			return setTownOption(options)
		}
	}, [city])

	const filterList = () => {
		let updatedList = station.filter(item => {
			if (town) {
				return item.District.List[1].Value === town
			} else if (city) {
				return item.City.List[1].Value === city
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
			<Form>
				<Form.Field>
					<label>搜尋充電站</label>
					<Input value={search} onChange={e => setSearch(e.target.value)} />
				</Form.Field>
				<Form.Field>
					<label>選擇縣市</label>
					<Select
						value={city}
						onChange={(e, { name, value }) => {
							return setCity(value)
						}}
						placeholder="選擇縣市"
						options={cityOptions}
					/>
				</Form.Field>
				<Form.Field>
					<label>選擇鄉鎮</label>
					<Select
						value={town}
						onChange={(e, { name, value }) => {
							return setTown(value)
						}}
						placeholder="選擇鄉鎮"
						options={townOptions}
					/>
				</Form.Field>
			</Form>
			<Segment>
				<Item.Group>{filterList()}</Item.Group>
			</Segment>

			{/* <pre>{JSON.stringify(station, null, )}</pre> */}
		</React.Fragment>
	)


}

export { StationList }

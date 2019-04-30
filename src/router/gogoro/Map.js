import React, { useState, useLayoutEffect }  from 'react'

import { isEmpty } from 'lodash'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchGogoroAPI } from '../../store/fetchGogoroAPI'

import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { Segment } from 'semantic-ui-react'

import { StationList } from 'components/gogoro/List'
import GogoroStationMap from 'components/gogoro/Map'

const PageGogoro = props => {
	const { isAuthEmpty, gogoro, fetchGogoroAPI } = props

	const [station, setStation] = useState([])
	useLayoutEffect(() => {
		if (isEmpty(gogoro)) {
			console.log(gogoro)
			return fetchGogoroAPI()
		}
		return setStation(gogoro)
	}, [gogoro])

	if (isAuthEmpty) {
		return <Redirect to="/" />
	} else {
		return (
			<Grid fluid>
				<Row>
					<Col xs={10} sm={6} md={4} lg={3}>
						<Segment>
							<StationList station={station} />
						</Segment>
					</Col>
					<Col xs={2} sm={6} md={8} lg={9}>
						<Segment>
							<GogoroStationMap station={station} />
						</Segment>
					</Col>
				</Row>
			</Grid>
		)
	}

}

PageGogoro.defaultProps = {
	gogoro: []
}

const mapStateToProps = state => ({
	gogoro: state.gogoro,
	isAuthEmpty: state.firebase.auth.isEmpty
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
export default enhancer(PageGogoro)

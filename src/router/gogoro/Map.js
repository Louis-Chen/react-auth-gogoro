import React, { useState, useEffect } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { fetchGogoroAPI } from '../../store/fetchGogoroAPI'

import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { Segment } from 'semantic-ui-react'

import { StationList } from 'components/gogoro/List'
import GogoroStationMap from 'components/gogoro/Map'

const PageGogoro = props => {
	const { gogoro, fetchGogoroAPI } = props
	return (
		<Grid fluid>
			<Row>
				<Col xs={10} sm={6} md={4} lg={3}>
					<Segment>
						<StationList gogoro={gogoro} fetchGogoroAPI={fetchGogoroAPI} />
					</Segment>
				</Col>
				<Col xs={2} sm={6} md={8} lg={9}>
					<Segment>
						<GogoroStationMap gogoro={gogoro} />
					</Segment>
				</Col>
			</Row>
		</Grid>
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
export default enhancer(PageGogoro)

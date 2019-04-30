import React, { useState, useLayoutEffect } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps'

import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'

import { compose, withProps } from 'recompose'
import { Header, Divider, List } from 'semantic-ui-react'
import { fetchGogoroAPI } from '../../store/fetchGogoroAPI';

const GogoroStationMap = props => {
	const { gogoro, fetchGogoroAPI } = props
	const [station, setStation] = useState([])
	const [isOpen, setOpen] = useState(false)
	const [isInfo, setInfoID] = useState('')

	useLayoutEffect(() => {
		if (isEmpty(gogoro)) {
			console.log(gogoro)
			return fetchGogoroAPI()
		}
		return setStation(gogoro)
	}, [gogoro])

	const toggleInfo = (open, id) => {
		setInfoID(id)
		setOpen(open)
	}
	const StationMark =
		!isEmpty(station) &&
		station.map((s, i) => {
			const StationInfo = isOpen && isInfo === i && (
				<InfoWindow position={{ lat: s.Latitude, lng: s.Longitude }}>
					<React.Fragment>
						<Header content={s.LocName.List[1].Value} />
						<Divider />
						<List>
							<List.Item>{s.Address.List[1].Value}</List.Item>
						</List>
					</React.Fragment>
				</InfoWindow>
			)
			return (
				<Marker key={i} position={{ lat: s.Latitude, lng: s.Longitude }} onClick={() => toggleInfo(true, i)}>
					{StationInfo}
				</Marker>
			)
		})
	if (isEmpty(gogoro)) {
		return <div>沒東西</div>
	} else {
		return (
			<React.Fragment>
				<pre>{JSON.stringify(station, null, 2)}</pre>
				<GoogleMap defaultZoom={7} defaultCenter={{ lat: 23.5, lng: 120 }}>
					<MarkerClusterer>{StationMark}</MarkerClusterer>
				</GoogleMap>
			</React.Fragment>
		)
	}
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
	),
	withProps({
		/**
		 * Note: create and replace your own key in the Google console.
		 * https://console.developers.google.com/apis/dashboard
		 * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
		 */
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyAkdvJpmaNSRVqu35dqpgqcEHVso3OilEc&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `500px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap
)

export default enhancer(GogoroStationMap)

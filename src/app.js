import React from 'react'

// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'semantic-ui-css/semantic.min.css'

import RouterPage from 'routes/page'
import Nav from 'components/layout/Nav'

const App = () => (
	<React.Fragment>
		<Nav />
		<RouterPage />
	</React.Fragment>
)

export default App

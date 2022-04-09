// funcion postData que sirve para autenticar y guardar el jwt en el localstorage
export const postData = async (email, password) => {
	try {
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			body: JSON.stringify({ email: email, password: password }),
		})
		const { token } = await response.json()
		localStorage.setItem('jwt', token)
		return token
	} catch (err) {
		console.error(err)
	}
}

// funcion getPhotos que sirve para obtener los posts
export const getPhotos = async (jwt) => {
	try {
		const response = await fetch('http://localhost:3000/api/photos', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

// funcion getPhotos que sirve para obtener los posts por pagina
export const getPhotoPages = async (jwt, page) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/photos?page=${page}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		)
		const { data: dataPage } = await response.json()
		return dataPage
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}
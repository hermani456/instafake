// importacion de modulos
import { postData, getPhotos, getPhotoPages } from './apicalls.js'
import { printDom, printDom1 } from './dom.js'
import { getElementBySelector, getValueByElement, forEachFunc } from './functions.js'

// seleccion de elementos del DOM
const form = getElementBySelector('#form')
const card = getElementBySelector('#card')
const text = getElementBySelector('#text')
const showMoreBtn = getElementBySelector('#more')

// eventlistener para el form, escuchando el evento submit
form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const email = getValueByElement('#email')
	const password = getValueByElement('#password')
	console.log(email, password)
	const JWT = await postData(email, password)
	const post = await getPhotos(JWT)
	if (JWT) {
		text.innerHTML = printDom1
		// const slicedPost = post.slice(0, 10)
		forEachFunc(post, printDom, card)
		form.classList.toggle('hide')
		showMoreBtn.classList.toggle('hide')
		logout.addEventListener('click', () => {
			localStorage.clear()
			location.reload()
		})
	} else {
		alert('Nombre de usuario y/o contraseña invalidos')
	}
})

// variable para contador de pagina
let page = 1

// eventlistener al boton showmore que se encarga de imprimir los posts por pagina
showMoreBtn.addEventListener('click', async () => {
	page++
	const token = localStorage.getItem('jwt')
	const loadPage = await getPhotoPages(token, page)
	// const slicedPost = loadPage.slice(0, 10)
	forEachFunc(loadPage, printDom, card)
})

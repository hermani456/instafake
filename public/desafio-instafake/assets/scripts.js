const getElementBySelector = (element) => document.querySelector(element)
const getValueByElement = (element) => document.querySelector(element).value

const form = getElementBySelector('#form')
const image = getElementBySelector('#image')
const author = getElementBySelector('#author')
const card = getElementBySelector('#card')
const text = getElementBySelector('#text')
const divForm = getElementBySelector('#div-form')
const nextBtn = getElementBySelector('#next')

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const email = getValueByElement('#email')
	const password = getValueByElement('#password')
	const JWT = await postData(email, password)
	const post = await getPosts(JWT)
	text.innerHTML = printDom1
	// const slicedPost = post.slice(0, 10)
	post.forEach((element) => {
		const { download_url, author } = element
		card.innerHTML += printDom(download_url, author)
	})
	form.classList.toggle('hide')
	nextBtn.classList.toggle('hide')
	logout.addEventListener('click', () => {
		localStorage.clear()
		location.reload()
	})
})
let page = 1
nextBtn.addEventListener('click', async () => {
	const email = getValueByElement('#email')
	const password = getValueByElement('#password')
	const JWT = await postData(email, password)
	page++
	console.log(page)
	const loadPage = await getPostsPage(JWT, page)
	console.log(loadPage)
	// const slicedPost = loadPage.slice(0, 10)
	loadPage.forEach((element) => {
		const { download_url, author } = element
		card.innerHTML += printDom(download_url, author)
	})
})

const postData = async (email, password) => {
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

const getPosts = async (jwt) => {
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

const getPostsPage = async (jwt, page) => {
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

const printDom1 = `<div id="block">
									<h2 class="inline-block">Feed</h2>
									<button id="logout" type="button" class="btn btn-primary">Logout</button>
								</div>`

const printDom = (img, post) => `<div class="row">
                        <div class="col text-center">
                           <div class="card">
                              <img src="${img}" class="card-img-top" alt="" id="image" />
                              <div class="card-body">
                                 <p class="card-text" id="author">Author: ${post}</p>
                              </div>
                           </div>
                        </div>
                     </div>`

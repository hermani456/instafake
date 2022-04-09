// funcion para seleccion de elementos del DOM por su selector
export const getElementBySelector = (element) => document.querySelector(element)
// funcion para objetener el valor de los elementos del DOM por su selector
export const getValueByElement = (element) => getElementBySelector(element).value

// funcion que almacena un metodo forech para iterar sobre un arreglo e imprime en el DOM
export const forEachFunc = (array, print, card) => {
	array.forEach((element) => {
		const { download_url, author } = element
		card.innerHTML += print(download_url, author)
	})
}

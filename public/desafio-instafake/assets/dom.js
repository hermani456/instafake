// constante que almacena codigo html para ser usado en el DOM
export const printDom1 = `<div id="block">
									<h2 class="inline-block">Feed</h2>
									<button id="logout" type="button" class="btn btn-primary">Logout</button>
								</div>`

// funcion que sirve para imprimir el codigo html en el DOM recibiendo dos parametros
export const printDom = (img, post) => `<div class="row">
                        <div class="col text-center">
                           <div class="card">
                              <img src="${img}" class="card-img-top" alt="" id="image" />
                              <div class="card-body">
                                 <p class="card-text" id="author">Author: ${post}</p>
                              </div>
                           </div>
                        </div>
                     </div>`
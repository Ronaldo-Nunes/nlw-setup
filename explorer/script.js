/* 
Documentação da biblioteca javascript disponibilizada no curso:
https://maykbrito.github.io/libs/NLWSetup/documentation/NLWSetup.html
*/

const form = document.querySelector("#form-habits") // pega a referência do objeto form do documento HTML pelo ID (o que indica ser um ID é a # -> tal qual no CSS)
const nlwSetup = new NLWSetup(form) // a função da biblioteca recebe o form como parâmetro
const button = document.querySelector("header button")

button.addEventListener("click", add)
form.addEventListener("change", save)

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
  const dayExists = nlwSetup.dayExists(today)
  if (dayExists) {
    alert("Dia já incluso!")
    return
  }
  nlwSetup.addDay(today)
}

// Salva os dados no armazenamento do navegador sob uma determinada chave
function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
}

/* criação do objeto javascript que será passado para a função que preencherá o html

Objeto que contém os dados compostos por:

chave: O nome do hábito como o data-namedo .habit contêiner
valor: Array de dias a serem verificados como concluídos
Cada dia deve ter o formato MM-DD, onde MM: é o mês e DD: é o dia
*/
// const data = {
//   run: ["01-01", "01-03", "01-07"],
//   water: ["01-02"],
//   food: ["01-05"],
//   read: ["01-02"],
//   takePills: ["01-08"],
// }

// Recupera os dados salvos no armazenamento do navegador. Se for nulo retorna um objeto vazio
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
nlwSetup.setData(data)
nlwSetup.load()

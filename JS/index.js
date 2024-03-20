let recipes = null;

fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=carrot')
    .then(response => response.json())
    .then(data => {
        if (!data) { return }
        recipes = data.data.recipes;
        const list = document.getElementById("listaLateral");
        recipes.forEach(comida => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.addEventListener('click', changeFoodView(comida.id));
            cardElement.innerHTML = `<div class="img-wrapper">
            <img src=${comida.image_url} alt=${comida.title} title=${comida.title} class="card-img">
            </div>
            <div class="card-info ">
                <p class="card-main ">${comida.title}</p>
                <p class="card-complemento ">${comida.publisher}</p>
            </div>`
            list.appendChild(cardElement);
        });
    })
    .catch(error => {
        console.error('Erro ao obter dados da API:', error);
        // Lide com o erro de alguma forma, como exibindo uma mensagem de erro na página
    });

const changeFoodView = (foodId) => {
        console.log(foodId)
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${foodId}`)
            .then(response => response.json())
            .then(data => {
                    if (!data) { return };
                    const recipe = data.data.recipe;
                    const recipeSection = document.getElementById('cardView');
                    recipeSection.innerHTML = `<img class="img-galery" src=${recipe.image_url} alt="Marmitas " title="Marmitas ">
            <div class="mid-info-wrapper">
                <div class="recipe-mid-info">
                    <div class="recipe-item">
                        <i class="fa fa-clock icon-orange"></i>
                        <p>${recipe.cooking_time} Minutos</p>
                    </div>
                    <div class="recipe-item">
                        <i class="fa fa-user icon-orange"></i>
                        <p>${recipe.servings} Porções</p>
                    </div>
                </div>
                <div class="icone">
                </div>
            </div>
            <div id="bottom-Wrapper" class="bottom-info-wrapper"></div>`

                    const bottomWrapper = document.getElementById("bottom-Wrapper");
                    recipe.ingredients.forEach(ingredient => {
                                const recipeItem = document.createElement("div");
                                recipeItem.classList.add("recipe-item");
                                recipeItem.innerHTML = `<i class="fa fa-carrot icon-orange"></i>
                <p>${ingredient.quantity || ``} ${ingredient.unit || ``} ${ingredient.description || ``}</p>`
                bottomWrapper.appendChild(recipeItem);
            })
            console.log(bottomWrapper);
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            // Lide com o erro de alguma forma, como exibindo uma mensagem de erro na página
        });

};

// function showSugestao(value) {
//     const sugestoes = [
//         "cenoura",
//         "brócolis",
//         "costelas",
//     ];

//     const sugestoesList = document.getElementById("sugestoes");
//     sugestoesList.innerHTML = "";

//     if (value.length > 0) {
//         const filteredSugestoes = sugestoes.filter(sugestao =>
//             sugestao.toLowerCase().includes(value.toLowerCase())
//         );

//         filteredSugestoes.forEach(sugestao => {
//             const li = document.createElement("li");
//             li.textContent = sugestao;
//             li.onclick = () => {
//                 document.getElementById("search").value = sugestao;
//                 sugestoesList.style.display = "none";
//             };
//             sugestoesList.appendChild(li);
//         });

//         sugestoesList.style.display = "block";
//     } else {
//         sugestoesList.style.display = "none";
//     }
// }

// document.addEventListener("click", function(event) {
//     if (!event.target.closest(".pesquisa")) {
//         document.getElementById("sugestoes").style.display = "none";
//     }
// });
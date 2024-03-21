let recipes = null;

const handleSearch = () => {
    const input = document.getElementById("input-text");

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${input.value}`)
        .then(response => response.json())
        .then(data => {
            if (!data) { return }
            recipes = data.data.recipes;

            const galerySection = document.getElementById("galery-section");
            if (!!galerySection.previousElementSibling) {
                galerySection.parentElement.removeChild(galerySection.previousElementSibling)
            }
            const list = document.createElement('div');
            list.classList.add('list');
            list.innerHTML = ``;
            recipes.forEach(comida => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.addEventListener('click', () => changeFoodView(comida.id));
                cardElement.innerHTML = `<div class="img-wrapper">
            <img src=${comida.image_url} alt=${comida.title} title=${comida.title} class="card-img">
            </div>
            <div class="card-info ">
                <p class="card-main ">${comida.title}</p>
                <p class="card-complemento ">${comida.publisher}</p>
            </div>`
                list.appendChild(cardElement);
            });
            galerySection.parentElement.insertBefore(list, galerySection)
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            // Lide com o erro de alguma forma, como exibindo uma mensagem de erro na página
        });
}

const changeFoodView = (foodId) => {
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${foodId}`)
            .then(response => response.json())
            .then(data => {
                    if (!data) { return };
                    const recipe = data.data.recipe;
                    const recipeSection = document.getElementById('cardView');
                    console.log(recipeSection)
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
                <p class="text-ingredient">${ingredient.quantity || ``} ${ingredient.unit || ``} ${ingredient.description || ``}</p>`
                bottomWrapper.appendChild(recipeItem);
            })
            console.log(bottomWrapper);
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            // Lide com o erro de alguma forma, como exibindo uma mensagem de erro na página
        });

};
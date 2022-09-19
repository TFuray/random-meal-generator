
document.querySelector('#show-cats').addEventListener('click', showCats)
document.querySelector('#random').addEventListener('click', random)
// display list of categories to choose in dom
function showCats() {
    const cats = fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    cats
        .then(res => res.json())
        .then(data => {
            let catList = data.categories
            console.log(catList[0].strCategory);
            let list = document.getElementById('catList')
            for (let i = 0; i < catList.length; i++) {
                let li = document.createElement('li')
                li.classList.add('cat-list')
                li.setAttribute('id', `${catList[i].strCategory})`)
                li.innerText = catList[i].strCategory
                list.appendChild(li)
                // document.querySelector(`#${catList[i].strCategory}`).addEventListener('click', pickCat)
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function random() {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            let meal = data.meals[0]
            console.log(meal);
            document.querySelector('#display').classList.toggle('hidden')
            document.querySelector('#mealName').innerText = (`${meal.strMeal}`)
            document.querySelector('#mealPic').src = `${meal.strMealThumb}`
            let list = document.querySelector('#ing')
            for (let i = 1; i < 20; i++) {
                if (meal['strIngredient' + i] != '') {
                    let li = document.createElement('li')
                    li.classList.add('ing-list')
                    li.innerText = meal['strIngredient' + i] + ': ' + meal['strMeasure' + i]
                    list.appendChild(li)
                }
            }
            document.querySelector('#instructions').innerText = `${meal.strInstructions}`
        })
}


function pickCat(cat) {
    let url = `www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}
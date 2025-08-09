console.log('video script')
// fetch load and show categories on html

// create load categories
const loadCategories = async() => {
  // fetch the data
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json()
    displayCategories(data.categories)
  }
  catch(error) {
    console.error('Error fetching data;', error);
  }
}

// {
//     "category_id": "1001",
//     "category": "Music"
// }


// create display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories');

  categories.forEach( (item) => {
    console.log(item)
    // create button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;

    // add the button to the category container
    categoryContainer.append(button);
  })
}

loadCategories();
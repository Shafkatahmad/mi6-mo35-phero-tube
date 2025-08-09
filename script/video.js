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


// create display categories
const displayCategories = (data) => {
  console.log(data)
}

loadCategories();
displayCategories();
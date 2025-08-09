console.log('video script')
function getTimeString(time) {
  const totalSec = Number(time);
  if(isNaN(totalSec)) return "";
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} h ${minute} m ${remainingSecond} s ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btn');
  console.log(buttons)
  for(let btn of buttons) {
    btn.classList.remove("active");
  }
}
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

const loadVideos = async() => {
  // fetch the data
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    const data = await res.json()
    displayVideos(data.videos)
  }
  catch(error) {
    console.error('Error fetching data;', error);
  }
}

const loadCategoryVidoes = async(id) => {
  // alert(id);
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()

    // remove active class from all previous button
    removeActiveClass();

    // add active class by the id parameter
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");
    displayVideos(data.category)
  }
  catch(error) {
    console.error('Error fetching data;', error);
  }
}

const cardDemo = {
      "category_id": "1001",
      "video_id": "aaaa",
      "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
      "title": "Shape of You",
      "authors": [
        {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
        }
      ],
      "others": {
        "views": "100K",
        "posted_date": "16278"
      },
      "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    }

const displayVideos = (videoss) => {
  const videoContainer = document.getElementById('videos');
  videoContainer.innerHTML = "";

  if(videoss.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML =
    `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="./assets/Icon.png"/>
        <h2 class="text-center text-xl font-bold">
            No Content Here in this Category
        </h2>
    </div>
    `;
    return;
  }
  else {
      videoContainer.classList.add("grid");
  }

  videoss.forEach( video => {
    console.error(video);
    const card = document.createElement("div");
    card.classList = "card card-compact rounded-lg";
    card.innerHTML = 
    `
    <figure class="relative h-[200px]">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length == 0? "" : `<span class="absolute right-2 bottom-2 text-xs bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>
    <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex gap-2 items-center">
            <p class="text-gray-400">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""}
        </div>
        <p></p>
    </div>
  </div>
    `;
    videoContainer.append(card);
  })
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
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = 
    `
    <button id="btn-${item.category_id}" onclick="loadCategoryVidoes(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `
    

    // add the button to the category container
    categoryContainer.append(buttonContainer);
  })
}

loadCategories();
loadVideos();
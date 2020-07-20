var menu
async function getMenu() {
  let response = await fetch('items.json')
  menu = await response.json()
  console.log("Menu", menu);
  displayMenuItems(menu)
  displayMenuButtons()
}

getMenu()

const sectionCenter = document.querySelector('.section-center')
const btnContainer = document.querySelector('.btn-container')


function displayMenuItems(menuItems) {
  console.log(menu);
  let displayMenu = menuItems.map(function (item) {
    console.log(item);

    return `
      <article class="menu-item">
        <img src=${item.img} alt=${item.title} class="photo" />
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
          </header>
          <p class="item-text">${item.desc}</p>
        </div>
      </article>
    `
  })

  displayMenu = displayMenu.join("")

  sectionCenter.innerHTML = displayMenu
}

function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      console.log("Value",values);
      console.log("Item",item);
      if(!values.includes(item.category)) {
        values.push(item.category)
      }
      return values
    },
    ["all"]
  )

  const categoryBtns = categories
    .map((category) => {
      return `
        <button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>
      `
    }).join("")

    btnContainer.innerHTML = categoryBtns
    const filterBtns = btnContainer.querySelectorAll('.filter-btn')
    console.log(filterBtns);

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.id
        console.log("category", category);
        const menuCategory = menu.filter((menuItem) => {
          console.log(menuItem.category);

          if(menuItem.category === category) {
            return menuItem
          }
        })
        console.log("menuCategory", menuCategory);
        if(category === "all") {
          displayMenuItems(menu)
        } else {
          displayMenuItems(menuCategory)
        }
      })
    })
}

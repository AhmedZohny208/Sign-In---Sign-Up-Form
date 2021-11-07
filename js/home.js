var page = document.getElementById('page')
var user = localStorage.getItem('currentUser')

if (user) {
 currentUser = JSON.parse(localStorage.getItem('currentUser')) 
 console.log(currentUser)
 page.innerHTML = `<div class="nav bg-primary py-3 text-white position-fixed start-0 end-0 top-0">
    <div class="container">
    <div class="row">
      <div class="col-4">
      <h3>User Profile</h3>
      </div>
      <div class="col-8 text-end">
      <div class="">
        <span id="userEmail">${currentUser.email}</span>
        <a class="btn btn-warning ms-3" href="index.html" id="logout-btn" onclick="logout()">Logout</a>
      </div>
      </div>
    </div>
    </div>
  </div>
  
  <div class="home-content text-center">
      <div class="overlay">
        <div class="container">
          <div class="inner">
            <p class="fs-3 fw-500 text-white">Welcome</p>
            <h2 class="fs-1 fw-600 mb-4 text-white" id="username">${currentUser.username}</h2>
            <p class="fs-6 fw-500 text-white pb-4">This is your profile page. You can see the progress you've made with<br/> your work and manage your projects or assigned tasks</p>
            <button type="button" class="btn btn-primary rounded-pill p-btn hire-me px-4 py-2">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>`
} else {
 page.innerHTML = '<h1>Error 404</h1><a class="btn btn-outline-primary ms-3" href="index.html" id="logout-btn">Login Page</a>'
}

function logout() {
 localStorage.setItem('currentUser', '')
}



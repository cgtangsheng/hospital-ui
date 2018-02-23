import nav from './nav-config'
import auth from './auth'
import common from './common/js/common'
import $ from 'zeptojs'

const loginSuccess = (to, from, next) => {
  if (auth.loggedIn()) {
    next({
      path: '/'
    })
  } else {
    next()
  }
}

const authCheck = (to, from, next) => {
  if(!hasAuth) {
    next({
      path: '/notfound'
    })
  } else if(hasAuth && !hasStoreAuth && to.name == "channelManage") {
    next({
      path: '/notfound'
    })
  } else {
    next()
  }
}

const getComponent = name => require(`./views/${name}.vue`)

const routers = [
  { path: '/login', name: 'login', component: require('./views/login'), beforeEnter: loginSuccess },
  { path: '/notfound', name: 'notfound', component: require('./views/notfound')}
]

nav.forEach((mod) => {
  const subMenus = mod.children

  subMenus.forEach((subMenu) => {
    routers.push({
      path: subMenu.path,
      name: subMenu.name,
      component: getComponent(subMenu.name),
      beforeEnter: authCheck
    })
  })
})
routers.push({
  path : "/",
  name : "index",
  component:require('./views/index')
})

export default routers

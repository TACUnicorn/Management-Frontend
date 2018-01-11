import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import WarehouseProductInfo from '@/components/WarehouseProductInfo'
import WarehouseProductTrans from '@/components/WarehouseProductTrans'
import Factory from '@/components/Factory'
import Login from '@/components/Login'
import Finance from '@/components/Finance'
import OEM from '@/components/OEM'
import Delivery from '@/components/Delivery'
import VueResource from 'vue-resource'

Vue.use(Router);

var router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
          {
            path: '/warehouse/productinfo',
            name: 'Warehouseproductinfo',
            component: WarehouseProductInfo
          },
          {
            path: '/warehouse/producttrans',
            name: 'WarehouseProductTrans',
            component: WarehouseProductTrans
          },
          {
            path:'/factory',
            name:'Facotry',
            component :Factory
          },
          {
            path: '/finance',
            name: 'Finance',
            component: Finance
          },
          {
            path: '/oem',
            name: 'OEM',
            component: OEM
          },
          {
            path:'/delivery',
            name: 'Delivery',
            component: Delivery
          }
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

  ],
});




export default router;


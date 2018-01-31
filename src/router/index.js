import Vue from 'vue'
import Router from 'vue-router'
//import index from '@/view/index'
import login from '@/view/login'
//import manageGoods from '@/components/manageGoods'
//import manageBrand from '@/components/manageBrand'
//import manageShop from '@/components/manageShop'
//import manageAdmin from '@/components/manageAdmin'
//import manageRole from '@/components/manageRole'
//import manageShopVisit from '@/components/manageShopVisit'
//import manageShopVisitQuery from '@/components/manageShopVisitQuery'
//import manageEmployee from '@/components/manageEmployee'
//import manageSupplier from '@/components/manageSupplier'

//const login = () => import(/* webpackChunkName: "group-foo2" */ '../view/login.vue')

const index = () => import(/* webpackChunkName: "group-foo" */ '../view/index.vue')
const manageGoods = () => import(/* webpackChunkName: "group-foo" */ '../components/manageGoods.vue')
const manageBrand = () => import(/* webpackChunkName: "group-foo" */ '../components/manageBrand.vue')
const manageShop = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShop.vue')
const manageAdmin = () => import(/* webpackChunkName: "group-foo" */ '../components/manageAdmin.vue')
const manageRole = () => import(/* webpackChunkName: "group-foo" */ '../components/manageRole.vue')
const manageShopVisit = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopVisit.vue')
const manageShopVisitQuery = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopVisitQuery.vue')
const manageEmployee = () => import(/* webpackChunkName: "group-foo" */ '../components/manageEmployee.vue')
const manageSupplier = () => import(/* webpackChunkName: "group-foo" */ '../components/manageSupplier.vue')
const manageShopStockQuery = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopStockQuery.vue')
const manageCentralOrder = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCentralOrder.vue')
const manageCentralReturn = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCentralReturn.vue')
const manageCentralStock = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCentralStock.vue')
const manageVipQuery = () => import(/* webpackChunkName: "group-foo" */ '../components/manageVipQuery.vue')
const manageShopReturnQuery = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopReturnQuery.vue')
const manageTask = () => import(/* webpackChunkName: "group-foo" */ '../components/manageTask.vue')

const manageShopSell = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopSell.vue')
const manageShopSellReturn = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopSellReturn.vue')
const manageBrandSellDetail = () => import(/* webpackChunkName: "group-foo" */ '../components/manageBrandSellDetail.vue')
const managePunchCard = () => import(/* webpackChunkName: "group-foo" */ '../components/managePunchCard.vue')
const manageMonthAttendance = () => import(/* webpackChunkName: "group-foo" */ '../components/manageMonthAttendance.vue')
const manageExamineApprove = () => import(/* webpackChunkName: "group-foo" */ '../components/manageExamineApprove.vue')
const manageIncome = () => import(/* webpackChunkName: "group-foo" */ '../components/manageIncome.vue')
const manageExpense = () => import(/* webpackChunkName: "group-foo" */ '../components/manageExpense.vue')
const manageExpenseSet = () => import(/* webpackChunkName: "group-foo" */ '../components/manageExpenseSet.vue')
const manageCampaign = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCampaign.vue')
const manageCampaignGoods = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCampaignGoods.vue')
const manageCampaignSell = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCampaignSell.vue')
const manageCentralStore = () => import(/* webpackChunkName: "group-foo" */ '../components/manageCentralStore.vue')
const manageShopStore = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopStore.vue')
const manageShopSellDetail = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopSellDetail.vue')
const manageEmployeeSellDetail = () => import(/* webpackChunkName: "group-foo" */ '../components/manageEmployeeSellDetail.vue')
const managerPosition = () => import(/* webpackChunkName: "group-foo" */ '../components/managerPosition.vue')
const manageShopStoreCheck = () => import(/* webpackChunkName: "group-foo" */ '../components/manageShopStoreCheck.vue')
const manageWage = () => import(/* webpackChunkName: "group-foo" */ '../components/manageWage.vue')
const manageWage2 = () => import(/* webpackChunkName: "group-foo" */ '../components/manageWage2.vue')
const manageWageSearch = () => import(/* webpackChunkName: "group-foo" */ '../components/manageWageSearch.vue')
Vue.use(Router)
const routes = [
 	  {
   		 path: '/',
   		 redirect: '/login'
    },
    {
   		 path: '',
   		 redirect: '/login'
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/index',
      component: index,
      children: [{
						path: '/index',
						components: {
					        default: manageSupplier,
					        manageGoods:manageGoods,
					        manageAdmin:manageAdmin,
					        manageRole:manageRole,
					        manageShop: manageShop,
					        manageShopVisit:manageShopVisit,
					        manageShopVisitQuery:manageShopVisitQuery,
					        manageEmployee:manageEmployee,
					        manageSupplier:manageSupplier,
					        manageBrand:manageBrand,
					        manageShopStockQuery:manageShopStockQuery,
					        manageCentralOrder:manageCentralOrder,
					        manageCentralReturn:manageCentralReturn,
					        manageCentralStock:manageCentralStock,
					        manageVipQuery:manageVipQuery,
					        manageShopReturnQuery:manageShopReturnQuery,
					        manageTask:manageTask,
					        manageShopSell:manageShopSell,
					        manageShopSellReturn:manageShopSellReturn,
					        manageBrandSellDetail:manageBrandSellDetail,
					        managePunchCard:managePunchCard,
					        manageMonthAttendance:manageMonthAttendance,
					        manageExamineApprove:manageExamineApprove,
					        manageIncome:manageIncome,
					        manageExpense:manageExpense,
					        manageExpenseSet:manageExpenseSet,
					        manageCampaign:manageCampaign,
					        manageCampaignGoods:manageCampaignGoods,
					        manageCampaignSell:manageCampaignSell,
					        manageCentralStore:manageCentralStore,
					        manageShopStore:manageShopStore,
					        manageShopSellDetail:manageShopSellDetail,
					        manageEmployeeSellDetail:manageEmployeeSellDetail,
					        managerPosition:managerPosition,
					        manageShopStoreCheck:manageShopStoreCheck,
					        manageWage:manageWage,
					        manageWage2:manageWage2,
					        manageWageSearch:manageWageSearch
					    }
				}
			]
    },
  ]
const router = new Router({
	routes
});
router.beforeEach((to, from, next) => {
	next()
})
	
export default router;
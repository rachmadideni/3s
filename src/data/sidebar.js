const sidebar = [{
    key: 1,
    url: '/app/sales/tunai',
    text: 'Cash'

}, {
    key: 2,
    url: '/app/sales/kredit',
    text: 'Kredit'
}];

const dt = {
	"primary":[{
					key: 1,
				    url: '/app',
				    text: 'Home',
				    icon: 'home'
				}, {
				    key: 2,
				    url: '/app/sales',
				    text: 'Sales',
				    icon: 'plus'
				}, {
				    key: 3,
				    url: '/app/services',
				    text: 'Services',
				    icon: 'book'
				}, {
				    key: 4,
				    url: '/app/parts',
				    text: 'Parts',
				    icon: 'book'
				}],
	"secondary":[{
					key: 1,
				    url: '/app/sales/tunai',
				    text: 'Cash'
				}, {
				    key: 2,
				    url: '/app/sales/kredit',
				    text: 'Kredit'
				}, {
				    key: 3,
				    url: '/app/sales/po',
				    text: 'Purchase Order'
				}],
	"nilai":[0,1]
}

export { sidebar,dt };

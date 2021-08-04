export default {
    state: () => {
        return {
            items: [],
            checkoutStatus: 'not-started'
        }
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map(({variant, quantity, product}) => {
                return {
                    name: product.name,
                    price: variant.price,
                    quantity
                }
            })
        },
        cartTotalPrice(state, getters) {
            return getters.cartProducts.reduce((total, { name, price, quantity }) => {
                return total + price * quantity
            }, 0)
        }
    },
    mutations: {
        pushProductToCard(state, { variant, quantity, product }) {
            const cardItem = state.items.find(item => item.variant.id === variant.id)
            if (null != cardItem) {
                cardItem.quantity = quantity
                return
            }

            state.items.push({
                variant: variant,
                quantity: quantity,
                product: product
            })
        },
        setCardItems(state, { items }) {
            state.items = items
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        }
    },
    actions: {
        checkout({ commit, state }) {
            commit('setCheckoutStatus', 'started')
            const savedCardItems = [...state.items]
            commit('setCardItems', { items: [] })
            console.log(savedCardItems)
            const orderItemList = []
            savedCardItems.forEach((element) => {
                orderItemList.push({
                    quantity: element.quantity,
                    productVariantId: element.variant.id
                })
            })
            this.$axios.$post('/api/order', orderItemList).then((response) => {
                console.log('successful order')
                commit('setCheckoutStatus', 'successful')
            })
            .catch((error) => {
                console.log('Order error: ' + error)
                commit('setCardItems', { items: savedCardItems })
                commit('setCheckoutStatus', 'failed')
            })
        }
    }
}
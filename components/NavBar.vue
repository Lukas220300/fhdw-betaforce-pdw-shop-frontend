<template>
  <div>
    <b-navbar class="c-navbar container">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }" class="c-navbar__logo">
          <Icon name="logo-only-icon"/>
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Startseite
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/categories' }">
          Produkte
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/ueber-uns' }">
          Über uns
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="c-navbar__search">
            <div class="search">
              <input type="text" id="searchInput" v-model="searchTerm" @change="change" placeholder="Suche"/>
              <div class="symbol">
                <svg class="lens">
                  <use xlink:href="#lens"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="lens">
              <path d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
	s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
	c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
	c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
	C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z"/>
            </symbol>
          </svg>

        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <nuxt-link to="/ich" v-if="$auth.loggedIn" class="button is-primary c-Icon">
              <Icon name="user-icon" class="c-UserIcon" />
              Ich
            </nuxt-link>
            <nuxt-link v-else to="/auth/login" class="button is-primary">
              <strong>Login</strong>
            </nuxt-link>
          </div>
        </b-navbar-item>
        <b-navbar-item tag="div" class="c-ShoppingCard__container">
          <div class="c-ShoppingCard">
            <nuxt-link to="/warenkorb" class="button is-secondary c-Icon">
              <Icon name="shopping-cart" />
            </nuxt-link>
            <span v-if="numberOfEntries" class="tag is-success">{{numberOfEntries}}</span>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import Icon from "./Icon";
// @todo ich button und warenkorb button bei handy auf folle breite
export default {
  name: "NavBar",
  components: {Icon},
  setup() {
    const searchTerm = ref('')
    const {app} = useContext()

    const change = () => {
      const activeElement = document.activeElement
      if (activeElement.id === 'searchInput') {
        app.router.push({
          path: '/suche',
          query: {
            searchTerm: searchTerm.value
          },
        })
        activeElement.blur()
      }
      searchTerm.value = ''
    }

    return {
      searchTerm,
      change
    }
  },
  computed: {
    numberOfEntries () {
      return this.$store.state.shoppingCart.entries.length
    }
  }
}
</script>

<style lang="scss">
.c-navbar {
  &__logo {
    > svg {
      width: 3.5rem !important;
      height: 3.5rem !important;
    }
  }

  &__search {
    .search {
      --background: #fff;
      --text-color: #414856;
      --primary-color: #cec2f8;
      --border-radius: 10px;
      --width: 190px;
      --height: 40px;

      background: var(--background);
      width: auto;
      height: var(--height);
      position: relative;
      overflow: hidden;
      border-radius: var(--border-radius);
      box-shadow: 0 10px 30px rgba(#414856, .05);
      display: flex;
      justify-content: center;
      align-items: center;

      .symbol {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
          content: "";
          position: absolute;
          right: 0;
          width: 100%;
          height: 100%;
          background: var(--primary-color);
          z-index: -1;
          transition: width .6s ease;
        }

        &::after {
          content: "";
          position: absolute;
          top: 21px;
          left: 21px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          z-index: 1;
          clip-path: inset(0% 0% 0% 0%);
          transition: clip-path .04s linear .225s;
        }

        .lens {
          fill: #552fbc;
          width: 20px;
          height: 20px;
          z-index: 2;
          transition: top .3s ease, left .3s ease, fill .2s ease .2s;
        }

        .cloud,
        .lens {
          position: absolute;
          fill: #552fbc;
          stroke: none;
        }
      }

      input[type="text"] {
        position: relative;
        width: var(--height);
        height: var(--height);
        font: 400 16px 'Varela Round', sans-serif;
        color: var(--text-color);
        border: 0;
        box-sizing: border-box;
        outline: none;
        padding: 0 0 0 40px;
        transition: width .6s ease;
        z-index: 10;
        opacity: 0;
        cursor: pointer;

        &:focus {
          z-index: 0;
          opacity: 1;
          width: var(--width);

          ~ .symbol {
            &::before {
              width: 0%;
            }

            &::after {
              clip-path: inset(0% 0% 0% 100%);
              transition: clip-path .04s linear .105s;
            }

            .lens {
              top: 10px;
              left: 15px;
              transform: translate(0, 0);
              fill: var(--primary-color);
              transition: top .5s ease .1s, left .5s ease .1s, fill .3s ease;
            }
          }
        }
      }

    }

    //--- ## BASIC #############
    body {
      background: #E8EBF3;
      height: 100vh;
      font: 400 16px 'Varela Round', sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .c-ShoppingCard {
    .tag {
      position: absolute;
      right: -0.5rem;
      top: 2.6rem;
    }
  }
  .c-Icon {
    > svg {
      width: 1.2rem;
    }
  }
  .c-UserIcon {
    margin-right: 0.5rem;
  }

}

@media only screen and (max-width: 1023px) {
  .c-navbar {
    &__logo {
      > svg {
        width: 1.5rem !important;
        height: 1.5rem !important;
      }
    }
    .c-ShoppingCard {
      .tag {
        left: 3.2rem;
        top: 2.3rem;
        width: 2rem;
      }
    }
  }
}
</style>

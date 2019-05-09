<template>
<DSLayout :pageName="pageName">
  <h1 class="page-title">DOTA2 Heroes</h1>

  <div class="filter-container">
    <div class="search-container">
      <input class="form-control search-bar" type="text" v-model="searchQuery" placeholder="Search" />
      </div>

      <div class="attribute-filter-container">
        <!-- <p class="attribute-filter-heading">Filter By Primary Attribute</p> -->
        <div class="attribute-filters">
        <button
          v-for="(entry, index) in filterListAttr"
          :item="entry.dotaName"
          :key="index"
          @click="filter = entry.dotaName;"
          :class="[ entry.dotaName, {active: entry.dotaName == filter} ]"
          class="filter-item attr-icon attr-icon-large"
        ></button>
        <button
          @click="filter = 'All';"
          :class="[ 'show-all filter-item', {active: 'All' == filter} ]"
        >
        Show All</button>
      </div>
      </div>
    </div>

    <ul class="grid-main hero-list">
      <li v-for="item in filteredResources" :key="item.id" class="item-container grid-item" v-if="item.node.primaryAttr === filter || filter === 'All'">
        <g-link :to="item.node.path">
          <!-- <div class="hero-number">{{ item.node.id }}</div> -->
          <!-- <img src="../assets/Agility_attribute_symbol.png" width="20" /> -->
          <div class="icon-box attr-icon" :class="item.node.primaryAttr"></div>
          <div class="hero-number-bg">
            <h2 class="hero-name">{{ item.node.name }}</h2>
          </div>
          <div class="attribute-container">
            <span class="attribute-name">STR</span>
            <span class="attribute-name">AGI</span>
            <span class="attribute-name">INT</span>
          </div>
          <div class="attribute-container">
            <span class="attribute">{{ item.node.strGain }}</span>
            <span class="attribute">{{ item.node.agiGain }}</span>
            <span class="attribute">{{ item.node.intGain }}</span>
          </div>
          <p class="total-attribute-gain-text" :class="item.node.primaryAttr">Total Attr Gain:</p>
          <p class="total-attribute-gain" :class="item.node.primaryAttr">{{ item.node.totalAttrGain.toFixed(1) }}</p>
        </g-link>
      </li>
    </ul>
</DSLayout>
</template>

<page-query>
{
  allXDOTA (sortBy: "totalAttrGain", order: DESC, perPage: 120) {
    edges {
      node {
        id
        name
        primaryAttr
        strBase
        strGain
        intBase
        intGain
        agiBase
        agiGain
        totalAttrGain
        armor
        movementSpeed
        path
        slug
        turnRate
        attackRange
        projectileSpeed
      }
    }
  }
}
</page-query> 

<script>
import DSLayout from "~/layouts/DSLayout.vue";
import DSSideBar from "~/components/DSSideBar.vue";

export default {
  components: {
    DSLayout,
    DSSideBar
  },
  data: function () {
    return {
      pageName: "DOTA2 Heroes",
      primaryAttr: 'test',
      item: 'click test',
      filterByAttr: 'test filter attr',
      fkey: 'primaryAttr',
      filterListAttr: [{
          'shortName': 'STR',
          'dotaName': 'DOTA_ATTRIBUTE_STRENGTH'
        },
        {
          'shortName': 'AGI',
          'dotaName': 'DOTA_ATTRIBUTE_AGILITY'
        },
        {
          'shortName': 'INT',
          'dotaName': 'DOTA_ATTRIBUTE_INTELLECT'
        }
      ],
      filter: 'All',
      searchQuery: '',
      data: []
    };
  },
  // methods: {
  //   attrFilter: function (e) {
  //     console.log(`attrFilter click`)
  //     console.log(e)
  //   }
  // },
  mounted() {
    this.$emit(this.pageName);
    let attrs = ''
    let x = this.$page.allXDOTA.edges
    x.forEach(hero => {
      attrs = (parseFloat(hero.node.strGain) + parseFloat(hero.node.agiGain) + parseFloat(hero.node.intGain)).toFixed(1)
      this.data.push(hero)
    })
  },
  computed: {
    filteredResources() {
      console.log(this.searchQuery)
      let searchQueryLower = this.searchQuery.toLowerCase()
      if (this.searchQuery) {
        console.log(this.searchQuery)
        return this.data.filter(item => {
          return item.node.name.toLowerCase().includes(this.searchQuery);
        })
      } else {
        return this.data;
      }
    }
  },
  metaInfo() {
    return {
      title: "DOTA.vue", // this.$route.name,
      titleTemplate: "%s | DOTA2 Heroes",
      breadCrumb: this.$route.name
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";
@import "./../assets/elements.scss";

.site-container {
  background: #252525;
  height: calc(100vh - 70px);
  grid-template-columns: 1fr 1fr 5fr 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    ". . . ."
    "sidenav . main-content .";
}

.page-title {
  line-height: 1.5em;
  border-bottom: 3px solid $primary-blue;
  margin-bottom: 0;
}

.content {
  grid-area: main-content;
  color: white;
}

.grid-main {
  // max-width: 84vw;
  // margin-right: 8vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-template-rows: auto;
  grid-gap: 5px;
  line-height: 1em;

  ul li {
    padding: 0;
  }
}

.main {
  grid-area: main;
  min-height: 100vh;
}

.grid-item {
  text-align: center;
  padding: 0;
  margin: 0 0 1em 0;
}

.filter-container {
  // background: rgba(255, 255, 255, 0.1);
  border-bottom: 3px solid $primary-blue;
  padding: 10px 0;
  margin: 0;
  display: flex;
}

.search-container {
  display: flex;
  padding: 5px 0;
  align-items: center;

  &.search-bar {
    padding: 10px;
    line-height: 20px;
  }
}

.search-bar {
  padding: 10px;
  margin-left: 10px;
  // line-height: 20px;
}
.attribute-filter-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.attribute-filter-heading {
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  padding: 0;
  margin: 0 0 5px 0;
  // border-bottom: 1px solid white;
}
.attribute-filters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin: 0;
  padding: 0 0 0 10px;
}

button {
  border: none;
}

.filter-item {
  cursor: pointer;
  width: 40px;
  height: 40px;

  &.show-all {
    padding: 0;
    border-radius: 4px;
    // width: 40px;
    color: rgba(255, 255, 255, 0);
    background: no-repeat center/85% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/dota2-venn-3.png");
    transition: all .25s;

    &:hover {
      background-size: 90%;
      color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 5px 0px white;
      transition: all .25s;
    }

    &.active {
      background: rgba(255, 255, 255, 0.1) no-repeat center/90% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/dota2-venn-3.png");
      box-shadow: 0 0 2px 1px white;
      // color: white;
    }
  }

  &.DOTA_ATTRIBUTE_STRENGTH {
    // background: no-repeat center/90% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Strength_attribute_symbol.png");
    // padding-top: 5px;
    background-size: 5%;

    &:hover {
      background-size: 95%;
      border-radius: 40px;
      box-shadow: 0 0 5px 0px $dota-str;
    }

    &.active {
      box-shadow: 0 0 2px 1px white;
      background: rgba(255, 255, 255, 0.1) no-repeat center/95% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Strength_attribute_symbol.png");
      border-radius: 4px;
    }
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    background: no-repeat center/90% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Agility_attribute_symbol.png");

    &:hover {
      border-radius: 40px;
      box-shadow: 0 0 5px 0px $dota-agi;
      background-size: 95%;
    }

    &.active {
      box-shadow: 0 0 2px 1px white;
      background: rgba(255, 255, 255, 0.1) no-repeat center/95% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Agility_attribute_symbol.png");
      border-radius: 4px;
    }
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    background: no-repeat center/90% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");

    &:hover {
      border-radius: 40px;
      box-shadow: 0 0 5px 0px $dota-int;
      background-size: 95%;
    }

    &.active {
      box-shadow: 0 0 2px 1px white;
      background: rgba(255, 255, 255, 0.1) no-repeat center/95% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");
      border-radius: 4px;
    }
  }
}

.attr-icon {
  width: 20px;
  height: 20px;

  &.DOTA_ATTRIBUTE_STRENGTH {
    background: no-repeat center/100% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Strength_attribute_symbol.png");

  }

  &.DOTA_ATTRIBUTE_AGILITY {
    background: no-repeat center/100% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Agility_attribute_symbol.png");

  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    background: no-repeat center/100% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");
  }
}

.attr-icon-large {
  width: 40px;
  height: 40px;
}

.icon-box {
  font-size: 0.5em;
  font-weight: 300;
  // margin: 5px 0 0 0;
  padding: 5px 0 5px 0;
  position: relative;
  top: 26px;
  left: 5px;
  height: 18px;
  width: 18px;
  background: $primary-graphite;
  z-index: 2;
  color: rgba($primary-white, 0.5);
}

.attribute-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.attribute-name {
  color: rgba(100, 200, 255, 1);
  font-size: 10px;
  text-align: center;
}

.attribute,
.total-attribute-gain,
.total-attribute-gain-text {
  color: white;
  border: 1px solid black;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  margin: 0;
  font-size: 12px;

  &.DOTA_ATTRIBUTE_STRENGTH {
    color: $primary-red;
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    color: $primary-green;
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    color: $primary-blue;
  }
}

.total-attribute-gain-text {
  font-size: 10px;
  border: 1px solid rgba(155, 255, 205, 1);
  border-bottom: none;
}

.total-attribute-gain {
  font-weight: 500;
  font-size: 14px;
  // background: rgba(255, 255, 255, 0.1);
  // padding: 2px;
  border: 1px solid rgba(155, 255, 205, 1);
  border-top: none;

  &.DOTA_ATTRIBUTE_STRENGTH {
    color: $primary-red;
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    color: $primary-green;
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    color: $primary-blue;
  }
}

.hero-list {
  padding: 0;
  margin: 0;
}

.hero-image {
  width: 50px;
  min-width: 50px;
  max-width: 100px;
  width: 100%;
  padding: 0;
  margin: 0;
  // justify-self: left;
}

.hero-number {
  font-size: 0.5em;
  font-weight: 300;
  margin: 0;
  padding: 0 0 5px 0;
  position: relative;
  top: 21px;
  left: 5px;
  height: 10px;
  width: 18px;
  border: 1px solid rgba($primary-blue, 0.5);
  background: $primary-graphite;
  z-index: 2;
  color: rgba($primary-white, 0.5);
}

.hero-number-bg {
  font-size: 0.5em;
  font-weight: 300;
  margin: 0;
  padding: 0px 3px;
  position: relative;
  background: $primary-graphite;
  min-width: calc(50px-0.4em);
  width: calc(100% -5px);
  height: 30px;
  border: 1px solid black;
  left: 0px;
  z-index: 1;
}

.hero-name {
  font-size: 1.4em;
  padding: 0 0 0.5em 0;
  margin: 3px 0 0 26px;
  line-height: 1em;
  color: $primary-white;
  z-index: 10;
  font-weight: 400;
  font-family: "Source Sans Pro", "Montserrat";
  text-align: left;
}

.hero-image {
  border-bottom: 1px solid $secondary-blue;
}

.single-ability {
  font-size: 0.5em;
  text-align: left;
  line-height: 1em;
  color: $primary-blue;
}

.item-img {
  max-width: 100px;
  height: auto;
  top: 0;
  background-size: contain;
  align-self: flex-end;
  justify-self: center;
}
</style>

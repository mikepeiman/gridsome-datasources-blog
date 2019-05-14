<template>
<DSLayout :pageName="pageName">
  <h1 class="page-title">DOTA2 Heroes</h1>

  <div class="filter-container">
    <div class="search-container">
      <input
          class="form-control search-bar"
          type="text"
          v-model="searchQuery"
          placeholder="Search"
      >

      <div class="attribute-filters">
        <button
          @click="attrFilter = 'All';"
          :class="[ 'filter-item show-all', {active: 'All' == attrFilter} ]"
        ></button>
        <!-- <div class="filter-item-spacer">| -->

        <button
          v-for="(entry, index) in filterListAttr"
          :item="entry.dotaName"
          :key="index"
          @click="attrFilter = entry.dotaName;"
          :class="[ entry.dotaName, {active: entry.dotaName == attrFilter} ]"
          class="filter-item"
        ></button>
        <!-- </div> -->

      </div>
    </div>

    <div class="attribute-filter-container">
      <!-- <p class="attribute-filter-heading">Filter By Primary Attribute</p> -->

      <form class="filter-attribute-toggle">
        <label class="flex-column">
          Sort By:
          <div class="radio-container">
          <input type="radio" id="radioSortByAttr" name="selectSort" value="attributeGain" v-model="radioSelectSort"  checked>
          <label for="radioSortByAttr">Attribute Gain</label>
    </div>
    <div class="radio-container">
      <input type="radio" id="radioSortByAttackRange" name="selectSort" value="attackRange" v-model="radioSelectSort">
      <label for="radioSortByAttackRange">Attack Range</label>
    </div>
    </label>
    <select id="sort-by-attributes">
          <option
            class="select-item"
            v-for="entry in sortByAttrList"
            @click="sortSelectedAttr = entry.value"
            style="font-family: 'Montserrat'; font-weight: 300; background: #222222; color: #eee;"
            :value="entry.value"
          >{{ entry.text }}</option>
        </select>
    </form>

    <div class="slidecontainer">
      <label>
            <input type="checkbox" v-model="filterByRangeCheckbox">
            Filter By Range: {{ rangeFilter }}
          </label>

      <input type="range" min="0" max="1000" step="10" class="slider" id="myRange" v-model="rangeFilter">
      <!-- <span style="color: white;">Min Range: {{ total }}</span> -->
    </div>

  </div>
  </div>
  <ul class="grid-main hero-list">
    <li v-for="item in SortedFilteredData" :key="item.id" class="item-container grid-item" v-show="item.node.primaryAttr === attrFilter || attrFilter === 'All'">
      <g-link :to="item.node.path">
        <div class="hero-name-container">
          <div class="icon-box attr-icon" :class="item.node.primaryAttr"></div>
          <h2 class="hero-name">{{ item.node.name }}</h2>
        </div>
        <div class="attribute-gain-container">
          <p class="attribute-gain-heading">Attribute Gain</p>
          <div class="attribute-container">
            <span
                class="attribute-name"
                :class="{'DOTA_ATTRIBUTE_STRENGTH': item.node.primaryAttr == 'DOTA_ATTRIBUTE_STRENGTH'}"
              >STR</span>
            <span
                class="attribute-name"
                :class="{'DOTA_ATTRIBUTE_AGILITY': item.node.primaryAttr == 'DOTA_ATTRIBUTE_AGILITY'}"
              >AGI</span>
            <span
                class="attribute-name"
                :class="{'DOTA_ATTRIBUTE_INTELLECT': item.node.primaryAttr == 'DOTA_ATTRIBUTE_INTELLECT'}"
              >INT</span>
          </div>
          <div class="attribute-container">
            <span
                class="attribute"
                :class="{'DOTA_ATTRIBUTE_STRENGTH': item.node.primaryAttr == 'DOTA_ATTRIBUTE_STRENGTH'}"
              >{{ item.node.strGain }}</span>
            <span
                class="attribute"
                :class="{'DOTA_ATTRIBUTE_AGILITY': item.node.primaryAttr == 'DOTA_ATTRIBUTE_AGILITY'}"
              >{{ item.node.agiGain }}</span>
            <span
                class="attribute"
                :class="{'DOTA_ATTRIBUTE_INTELLECT': item.node.primaryAttr == 'DOTA_ATTRIBUTE_INTELLECT'}"
              >{{ item.node.intGain }}</span>
          </div>
          <p class="total-attribute-gain" :class="item.node.primaryAttr">{{ item.node.totalAttrGain.toFixed(1) }}</p>
          <div class="attack-range-container" :class="item.node.primaryAttr" v-if="item.node.attackType !== 'Melee'">
            <i class="attack-icon" :class="item.node.attackIcon" ></i>
            <svg class="svg-attack-range" height="20" width="80">
                <g class="bar">
                  <rect fill="#252525" :width="1000/12" height="7" y="7" result="Rect2"></rect>
                  <rect class="attack-range-bar" fill="#ccc" :width="(item.node.attackRange-150)/8.5" height="5" y="7" result="Rect1"></rect>
                </g>

              </svg>
            <div class="projectile-speed-container">
              <p class="attack-range" :class="item.node.attackRange">{{ item.node.attackRange }}</p>
            </div>

          </div>
          <div class="projectile-speed-container" :class="item.node.primaryAttr" v-if="item.node.attackType !== 'Melee'">
            <i class="attack-icon" :class="item.node.attackIcon" ></i>
            <svg class="svg-attack-range" height="20" width="80">
                <g>
                 <rect fill="#252525" :width="1000/12" height="7" y="7" result="Rect2"></rect>
                  <rect class="attack-range-bar" fill="#ccc" :width="(item.node.projectileSpeed)/36" height="5" y="7" result="Rect1"></rect>

                </g>
              </svg>
            <div class="projectile-speed-container">
              <p class="projectile-speed" :class="item.node.projectileSpeed">{{ item.node.projectileSpeed }}</p>
            </div>

          </div>
          <div class="projectile-speed-container" :class="item.node.primaryAttr" v-if="item.node.attackType == 'Melee'">
            <i class="attack-icon" :class="item.node.attackIcon" ></i>
            <p>MELEE</p>
          </div>
        </div>
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
        attackType
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
        color
      }
    }
  }
}
</page-query> 

<script>
import DSLayout from "~/layouts/DSLayout.vue";
import DSSideBar from "~/components/DSSideBar.vue";
// import Multiselect from 'vue-multiselect';

export default {
  components: {
    DSLayout,
    DSSideBar,
    // Multiselect,
  },
  data: function () {
    return {
      pageName: "DOTA2 Heroes",
      selected: null,
      options: [
        "Total Attribute Gain",
        "Strength Gain",
        "Agility Gain",
        "Intelligence Gain"
      ],

      strKey: "strGain",
      agiKey: "agiGain",
      intKey: "intGain",
      sortSelectedAttr: "1",

      fkey: "primaryAttr",
      attrFilter: "All",
      filterListAttr: [{
          shortName: "STR",
          dotaName: "DOTA_ATTRIBUTE_STRENGTH"
        },
        {
          shortName: "AGI",
          dotaName: "DOTA_ATTRIBUTE_AGILITY"
        },
        {
          shortName: "INT",
          dotaName: "DOTA_ATTRIBUTE_INTELLECT"
        }
      ],

      searchQuery: "",
      sortByAttrList: [{
          value: "1",
          text: "Total Attribute Gain"
        },
        {
          value: "2",
          text: "Strength Gain"
        },
        {
          value: "3",
          text: "Agility Gain"
        },
        {
          value: "4",
          text: "Intelligence Gain"
        }
      ],
      data: [],
      searchData: [],
      SortedFilteredData: [],
      attrSortData: [],
      rangeFilterData: [],
      rangeSortData: [],

      filterByRangeCheckbox: false,
      radioSelectSort: '',
      rangeFilter: '150',

    };
  },
  methods: {
    generateData() {
      const x = this.$page.allXDOTA.edges;
      this.data = []
      x.forEach(hero => {
        hero.node.attackIcon =
          hero.node.attackType == "Melee" ?
          "fas fa-axe-battle" :
          "fas fa-bow-arrow";
        this.data.push(hero);
        return this.data
      });
    },
    // filterAll() {
    //   if (this.filterByRangeCheckbox) {
    //     this.attrSortData = this.sortByAttrGain() // yes, checked Vue Tools this works
    //     return this.rangeFilterData = this.attrSortData.filter(item => {
    //       return item.node.attackRange >= this.rangeFilter;
    //     });
    //   } else {
    //     return this.attrSortData;
    //   }
    // },
    sortByAttrGain() {
      console.log("sortByAttrGain:", this.sortSelectedAttr);
      if (this.sortSelectedAttr === "2") {
        this.attrSortData = this.data.slice().sort(function (a, b) {
          return a.node.strGain < b.node.strGain;
        });
      } else if (this.sortSelectedAttr === "3") {
        this.attrSortData = this.data.slice().sort(function (a, b) {
          return a.node.agiGain < b.node.agiGain;
        });
      } else if (this.sortSelectedAttr === "4") {
        this.attrSortData = this.data.slice().sort(function (a, b) {
          return a.node.intGain < b.node.intGain;
        });
      } else {
        this.attrSortData = this.data
      };
      return this.SortedFilteredData = this.arrayMatch(this.attrSortData, this.SortedFilteredData)
    },
    sortByRange() {
      console.log('sort by range method')
      // this.tempData = this.SortedFilteredData
      this.rangeSortData = this.data
      this.rangeSortData.sort(function (a, b) {
        return a.node.attackRange < b.node.attackRange;
      });
      this.generateData()
      return this.SortedFilteredData = this.arrayMatch(this.rangeSortData, this.SortedFilteredData)
    },
    filterByRange() {
      this.rangeFilterData = this.attrSortData.filter(item => {
        return item.node.attackRange >= this.rangeFilter;
      });
      return this.SortedFilteredData = this.arrayMatch(this.rangeFilterData, this.data)
    },

    arrayMatch(array1, array2) {
      let newArray = []
      for (var i in array1) {
        if (array2.indexOf(array1[i]) > -1) {
          newArray.push(array1[i])
        }
      }
      return newArray
    },
    searchFilterMethod() {
      if (this.searchQuery) {
        this.SortedFilteredData = this.attrSortData.filter(item => {
          return item.node.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        return this.SortedFilteredData = this.attrSortData;
      }
    },
  },
  mounted() {
    this.generateData()
    // this.searchData = this.data
    this.attrSortData = this.data
    this.rangeFilterData = this.data
    this.SortedFilteredData = this.data
  },
  computed: {
    // searchFilter() {
    //   if (this.searchQuery) {
    //     this.SortedFilteredData = this.attrSortData.filter(item => {
    //       return item.node.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    //     });
    //   } else {
    //     return this.SortedFilteredData = this.attrSortData;
    //   }
    // },
    // SortedFilteredHeroes() {
    //   if (this.filterByRangeCheckbox) {
    //     return this.arrayMatch(this.rangeFilterData, this.SortedFilteredData)
    //   }
    //   return this.SortedFilteredData
    // }
  },
  watch: {
    sortSelectedAttr() {
      this.sortByAttrGain();
    },
    rangeFilter() {
      console.log('rangeFilter watcher fired')
      if (this.filterByRangeCheckbox) {
        this.filterByRange();
      }
    },
    radioSelectSort() {
      console.log('radioSelectSort watcher fired')
      if (this.radioSelectSort == "attributeGain") {
        console.log('radioSelectSort by attributeGain')
        return this.sortByAttrGain();
      } else {
        console.log('radioSelectSort by attackRange')
        return this.sortByRange();
      }
    },
    // radioSortByRange() {
    //   console.log('sortByRange watcher fired')
    //   if (this.sortByRange !== true) {
    //     console.log('sortByRange false/unchecked')
    //     return this.data
    //   } else {
    //     console.log('sortByRange now true/checked')
    //     // this.SortedFilteredData = this.generateData()
    //     this.sortByRange();
    //   }
    // },
    filterByRangeCheckbox() {
      console.log('filterByRangeCheckbox watcher fired')
      if (this.filterByRangeCheckbox === true) {
        this.filterByRange();
      } else {
        return this.attrSortData
      }
    },
    rangeFilterData() {
      console.log('rangeFilterData changed')
    },
    data() {
      console.log('data changed')
    },
    searchData() {
      console.log('searchData changed')
    },
    SortedFilteredData() {
      console.log('SortedFilteredData changed')
    },
    attrSortData() {
      console.log('attrSortData changed')
    },
    rangeSortData() {
      console.log('rangeSortData changed')
    },
    searchQuery() {
      this.searchFilterMethod()
    }
  },
  metaInfo() {
    return {
      title: "DOTA.vue", // this.$route.name,
      titleTemplate: "%s | DOTA2 Heroes",
      breadCrumb: this.$route.name,
      link: [{
        rel: "stylesheet",
        href: "./../assets/fontawesome/all.css"
      }],
      script: [{
        href: "./../assets/fontawesome/all.js"
      }]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";
@import "./../assets/elements.scss";
@import "./../assets/vue-multiselect.css";
@import "./../assets/fontawesome/css/all.css";

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
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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

.flex-column {
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
  padding: 5px 0;
  margin: 0;
  align-items: flex-start;

  &.search-bar {
    padding: 10px;
    line-height: 20px;
  }
}

.search-bar {
  padding: 10px;
  // margin-left: 10px;
  // line-height: 20px;
}

.attribute-filter-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.checkbox {
  cursor: pointer;
}

#toggle-label {
  cursor: pointer;
  margin-left: 2em;
}

.filter-attribute-toggle {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 0.5em;
  // border-left: 3px solid rgba(255,255,255,0.5);
  padding-left: 0.5em;
  color: white;

  & select {
    margin: 0;
    font-family: "Montserrat";
    background: grey;
    border: none;
    padding: 8px;
    -webkit-appearance: button;
    -moz-appearance: button;
    color: white;

    & option {
      font-family: "Montserrat";
      background: grey;
    }
  }
}

option {
  font-family: "Montserrat";
}

.select-heading {
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  // border-bottom: 1px solid white;
}

.select-item {
  font-family: "Montserrat";
}

#sort-by-attributes {
  border: 2px solid $primary-blue;
  background: #333;
  transition: 0.25s all;

  &:hover {
    border: 2px solid $primary-blue;
    cursor: pointer;
    background: $primary-blue;
    color: #222;
    transition: 0.25s all;
  }

  &.select-item {
    background: pink;
  }
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
  // width: 200px;
  margin: 0;
  padding: 1em 0 0 0;
}

button {
  border: none;
}

.filter-item-spacer {
  height: 100%;
  padding: 0;
  margin: 0;
  color: rgba(0, 0, 0, 0);
  background-image: linear-gradient(to right, #EC3D06 15%, #26E030 55%, #00D9EC) // border-right: 5px solid rgba(255,255,255,0.5);
}

.filter-item {
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin: 0 5px 0 0;
  padding: 0 5px;

  &.show-all {
    // padding: 10px;
    color: rgba(0, 0, 0, 0);
    background: no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/dota2-venn-3.png");
    transition: all 0.25s;
    background-size: 80%;

    &:hover {
      transition: all 0.25s;
      box-shadow: 0 0 5px 0px white;
      background-size: 70%;
      background: rgba(0, 0, 0, 0.85) no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/dota2-venn-3.png");
    }

    &.active {
      background: rgba(0, 0, 0, 0.85) no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/dota2-venn-3.png");
      transition: all 0.25s;
      border-radius: 0;
      box-shadow: 0 0 3px 0px white;
      background-size: 70%;
    }
  }

  &.DOTA_ATTRIBUTE_STRENGTH {
    background: no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Strength_attribute_symbol.png");
    background-size: 80%;

    &:hover {
      box-shadow: 0 0 5px 0px $dota-str;
      background-size: 80%;
    }

    &.active {
      background: rgba(0, 0, 0, 0.85) no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Strength_attribute_symbol.png");
      box-shadow: 0 0 5px 0px $dota-str;
      background-size: 80%;
    }
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    background: no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Agility_attribute_symbol.png");
    background-size: 80%;

    &:hover {
      box-shadow: 0 0 5px 0px $dota-agi;
      background-size: 80%;
    }

    &.active {
      background: rgba(0, 0, 0, 0.85) no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Agility_attribute_symbol.png");
      box-shadow: 0 0 5px 0px $dota-agi;
      background-size: 80%;
    }
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    background: no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");
    background-size: 80%;

    &:hover {
      box-shadow: 0 0 5px 0px $dota-int;
      background-size: 80%;
    }

    &.active {
      background: rgba(0, 0, 0, 0.85) no-repeat center url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");
      box-shadow: 0 0 5px 0px $dota-int;
      background-size: 80%;
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

  &.Melee {
    background: no-repeat center/100% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");
  }

  &.Ranged {
    background: no-repeat center/100% url("C:/Users/Mike/Desktop/gridsome-datasources-blog/src/assets/Intelligence_attribute_symbol.png");
  }
}

.attr-icon-large {
  width: 40px;
  height: 40px;
}

.icon-box {
  padding: 5px 0;
  background: $primary-graphite;
  z-index: 2;
  color: rgba($primary-white, 0.5);
}

.attribute-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.attribute-name {
  color: rgba(white, 0.5);
  font-size: 10px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);

  &.DOTA_ATTRIBUTE_STRENGTH {
    color: $dota-str;
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    color: $dota-agi;
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    color: $dota-int;
  }
}

.attribute,
.total-attribute-gain {
  color: white;
  // border: 1px solid black;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  margin: 0;
  font-size: 12px;

  &.DOTA_ATTRIBUTE_STRENGTH {
    color: $dota-str;
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    color: $dota-agi;
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    color: $dota-int;
  }
}

.attribute {
  background: none;
  border: none;

  &:first-child {
    border-right: 1px solid rgba(white, 0.1);
  }

  &:last-child {
    border-left: 1px solid rgba(white, 0.1);
  }
}

.total-attribute-gain-text {
  font-size: 10px;
  border: 1px solid rgba($primary-purple, 1);
  border-bottom: none;
}

.attribute-gain-container {
  border: 1px solid rgba(white, 0.25);
}

.attribute-gain-heading {
  font-size: 10px;
  margin: 0;
  padding: 0;
  color: white;
  border-bottom: 1px solid rgba(white, 0.25);
  background: none;
}

.total-attribute-gain {
  font-weight: 500;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  // border-top: none;

  &.DOTA_ATTRIBUTE_STRENGTH {
    color: $dota-str;
  }

  &.DOTA_ATTRIBUTE_AGILITY {
    color: $dota-agi;
  }

  &.DOTA_ATTRIBUTE_INTELLECT {
    color: $dota-int;
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

.hero-name-container {
  font-size: 0.5em;
  display: grid;
  grid-template-columns: 1fr 7fr;
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

.attack-range-container,
.projectile-speed-container {
  display: flex;
  color: white;
  font-size: 12px;
  // padding: 3px 0;
  justify-content: space-around;

  p {
    margin: 0;
    padding: 2px 0;

    &:first-child {
      padding-left: 3px;
    }

    &:last-child {
      padding-right: 3px;
    }
  }
}

.attack-icon {
  line-height: 1.5em;
  padding: 2px 7px 2px 0;
  border-right: 1px solid rgba(white, 0.25);
}

.DOTA_ATTRIBUTE_STRENGTH {
  color: $dota-str;
}

.DOTA_ATTRIBUTE_AGILITY {
  color: $dota-agi;
}

.DOTA_ATTRIBUTE_INTELLECT {
  color: $dota-int;
}

i.Ranged:before {
  content: "\f6b9";
}

i.Melee:before {
  content: "\f6b3";
}

.bar {
  height: 20px;
  background-image: linear-gradient(to right,
    red,
    #f06d06,
    rgb(255, 255, 0),
    green);
}

.attack-range-bar {
  z-index: 10;
}

.svg-attack-range {
  height: 20px;
}

.slidecontainer {
  display: flex;
  flex-direction: column;
  margin-left: 1em;
}
</style>

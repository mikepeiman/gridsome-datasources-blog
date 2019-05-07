<template>
  <DSLayout :pageName="pageName">
    <h1 class="page-title">DOTA2 Heroes</h1>
    <div class="grid-main">
      <ul class="hero-list" v-for="(item, index) in $page.allXDOTA.edges" :key="item.id">
        <g-link :to="item.node.path">
          <li class="item-container grid-item">
            <div class="hero-number">{{ item.node.id }}</div>
            <div class="hero-number-bg">
              <h2 class="hero-name">{{ item.node.name }}</h2>
            </div>
          </li>
          <div class="attribute-container" :class="primaryAttr">
            <span class="attribute-name">STR</span>
            <span class="attribute-name">AGI</span>
            <span class="attribute-name">INT</span>
          </div>
          <div class="attribute-container">
            <span class="attribute">{{ item.node.strGain }}</span>
            <span class="attribute">{{ item.node.agiGain }}</span>
            <span class="attribute">{{ item.node.intGain }}</span>
          </div>
          <p class="total-attribute-gain">{{ item.node.totalAttrGain.toFixed(1) }}</p>
          <!-- <p>{{ attrSum }}</p> -->
        </g-link>
      </ul>
    </div>
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
  data: function() {
    return {
      pageName: "DOTA2 Heroes",
      primaryAttr: 'test'
    };
  },
  computed: {
    setPrimaryAttribute() {
      if (this.$page.allXDOTA.edges.node.primaryAttr === "DOTA_ATTRIBUTE_INTELLECT") {
        this.primaryAttr = 'primary-attribute-int'
      }
            if (this.$page.allXDOTA.edges.node.primaryAttr === "DOTA_ATTRIBUTE_STRENGTH") {
        this.primaryAttr = 'primary-attribute-str'
      }
            if (this.$page.allXDOTA.edges.node.primaryAttr === "DOTA_ATTRIBUTE_AGILITY") {
        this.primaryAttr = 'primary-attribute-agi'
      }
    },
    attrSum() {
      return (this.str + this.agi + this.int).toFixed(1)
    },
    str() {
      this.str = parseFloat(this.$page.allXDOTA.edges.node.strGain)
      return parseFloat(this.$page.allXDOTA.edges.node.strGain);
    },
    agi() {
      this.agi = parseFloat(this.$page.allXDOTA.edges.node.agiGain)
      return parseFloat(this.$page.allXDOTA.edges.node.agiGain);
    },
    int() {
      this.int = parseFloat(this.$page.allXDOTA.edges.node.intGain)
      return parseFloat(this.$page.allXDOTA.edges.node.intGain);
    }
  },
  mounted() {
    this.$emit(this.pageName);
    let x = this.$page.allXDOTA.edges
    let attrs = ''
    x.forEach(hero => {
      attrs = (parseFloat(hero.node.strGain) + parseFloat(hero.node.agiGain) + parseFloat(hero.node.intGain)).toFixed(1)
      console.log(attrs)
    })
    
  },
  metaInfo() {
    return {
      title: "DOTA.vue", // this.$route.name,
      titleTemplate: "%s | DOTA2 Heroes",
      breadCrumb: this.$route.name
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./../assets/colors.scss";

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
  // margin-bottom: -1em;
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

.attribute-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.attribute-name {
  color: rgba(100, 200, 255, 1);
  font-size: 10px;
  text-align: center;
}
.attribute, .total-attribute-gain {
  color: white;
  border: 1px solid black;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  font-size: 12px;
}

.total-attribute-gain {
  // font-weight: 700;
  font-size: 14px;
  // background: rgba(255, 255, 255, 0.1);
  padding: 2px;
  border: 1px solid rgba(155,255,205,1);
}

.primary-attribute {

}
.primary-attribute-str {
  color: red;
}
.primary-attribute-agi {
  color: green;
  
}
.primary-attribute-int {
  color: blue;
  
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

<template>
  <nav class="nav">
    <ul class="menu-list">
      <li class="home" :class="{ active: currentPath === 'home' }">
        <CustomLink to="/"><i class="icon-home"></i>HOME</CustomLink>
      </li>
      <li class="best" :class="{ active: currentPath === 'best' }">
        <CustomLink to="/best/"><i class="icon-best"></i>BEST<span> GAMES</span></CustomLink>
      </li>
      <li class="top" :class="{ active: currentPath === 'top' }">
        <CustomLink to="/top/"><i class="icon-top"></i>TOP<span> GAMES</span></CustomLink>
      </li>
      <li class="new" :class="{ active: currentPath === 'new' }">
        <CustomLink to="/new/"><i class="icon-new"></i>NEW<span> GAMES</span></CustomLink>
      </li>
      <li class="hot" :class="{ active: currentPath === 'hot' }">
        <CustomLink to="/hot/"><i class="icon-hot"></i>HOT<span> GAMES</span></CustomLink>
      </li>
      <li class="category" :class="{ active: currentPath === 'category' }">
        <CustomLink to="/category/"><i class="icon-category"></i>CATEGORY</CustomLink>
        <i
          class="icon-up"
          :class="{ rotated: !categoriesVisible }"
          @click="categoriesVisible = !categoriesVisible"
        ></i>
      </li>
      <li class="surprise" @click="randomGame"><i class="icon-surprise"></i>RANDOM</li>
    </ul>
    <ul v-show="categoriesVisible" class="category-list">
      <li :class="{ active: currentCategory === 'all' }">
        <CustomLink to="/category/">ALL</CustomLink>
      </li>
      <li
        v-for="(item, i) in navCategories"
        :key="i"
        :class="{ active: currentCategory === item.name }"
      >
        <CustomLink :to="`/category/${item.path}/`">{{ item.name.toUpperCase() }}</CustomLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPath: {
      type: String,
      required: true
    },
    navCategories: {
      type: Array,
      default: () => []
    },
    currentCategory: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      categoriesVisible: true
    };
  },
  methods: {
    randomGame() {
      const links = document.querySelectorAll('a[href*="/game"]');
      const randomIndex = Math.floor(Math.random() * links.length);
      const randomLink = links[randomIndex];
      randomLink.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.surprise {
  display: none;
}
.nav {
  position: fixed;
  top: 72px;
  width: 182px;
  margin-left: 12px;
  z-index: 2;
}
.menu-list {
  color: #898e97;
  font-size: 18px;
  font-family: "Poppins-SemiBold";
  padding-top: 24px;
  a {
    width: 170px;
    height: 48px;
    display: flex;
    align-items: center;
    padding-top: 0.1em;
    padding-left: 12px;
    span {
      margin-left: 6px;
    }
  }
  $categories: home, category, best, top, new, hot;
  @each $category in $categories {
    .#{$category} {
      .icon-#{$category} {
        @include icon(24px, 24px, "icon_#{$category}.png");
        margin-right: 8px;
        margin-top: -2px;
      }
      &.active {
        pointer-events: none;
        color: #171e27;
        background: rgba(245, 246, 247, 0.7);
        border-radius: 16px;
      }
    }
  }
  .category.active {
    pointer-events: auto;
  }
}
.category {
  display: flex;
  align-items: center;
}
.icon-up {
  @include icon(24px, 24px, "icon_up.png");
  margin-right: 10px;
  margin-top: -2px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &.rotated {
    transform: rotate(180deg);
  }
}
.category-list {
  transition: transform 0.3s ease;
  a {
    font-size: 16px;
    width: 170px;
    height: 40px;
    color: #898e97;
    display: flex;
    align-items: center;
    padding-left: 24px;
  }
  .active a {
    pointer-events: none;
    color: #171e27;
    font-weight: bold;
  }
}
@media screen and (max-width: 879px) {
  .nav {
    position: fixed;
    top: unset;
    width: 100%;
    margin-left: 0;
    z-index: 2;
    bottom: 0;
    background: #ffffff;
    height: vw(104);
  }
  .category-list,
  .icon-up,
  .hot,
  .new,
  .top {
    display: none;
  }
  .best {
    span {
      display: none;
    }
  }
  .menu-list {
    font-size: vw(24);
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
    }
    a,
    .surprise {
      width: 100%;
      height: vw(104);
      display: flex;
      padding-top: 0;
      padding-left: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    $categories: home, category, best, surprise;
    @each $category in $categories {
      .#{$category} {
        .icon-#{$category} {
          @include icon(vw(46), vw(46), "icon_#{$category}2.png");
          margin-right: 0;
          margin-top: 0;
          margin-bottom: vw(2);
        }
        &.active {
          .icon-#{$category} {
            @include icon(vw(46), vw(46), "icon_#{$category}.png");
          }
          pointer-events: none;
          color: #171e27;
          background: #fff;
        }
      }
    }
    .category.active {
      pointer-events: auto;
    }
  }
}
</style>

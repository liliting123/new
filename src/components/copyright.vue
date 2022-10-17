<template>
  <div class="copyright">
    <p>
      <span
        :class="{ active: active === 'en' }"
        @click="languageCut('en'), windowReload()"
        >English</span
      >
      |
      <span
        :class="{ active: active === 'cn' }"
        @click="languageCut('cn'), windowReload()"
        >{{ $t('cn') }}</span
      >
    </p>

    <p>Copyrihgt © {{ year }} MyEUShop B.V. All Rights Reserved.</p>

    <p style="margin-top:5px">Powered By NLETECH</p>
  </div>
</template>
<script>
export default {
  name: 'copyright',
  data() {
    return {
      active: '',
      version: process.env.VERSION
    }
  },
  props: ['none'],
  computed: {
    year: function() {
      return new Date().getFullYear()
    }
  },
  created() {
    this.active = localStorage.getItem('myLanguage') || 'cn'
    this.languageCut(this.active)
  },
  methods: {
    languageCut(locale) {
      this.active = locale
      this.$i18n.locale = locale
      localStorage.setItem('myLanguage', locale)
      this.$store.commit('switchLang', { lang: locale })
    },
    windowReload() {
      location.reload()
    }
  }
}
</script>
<style lang="scss">
@import '../style/communalVariate.scss';
.copyright {
  text-align: center;
  background: #f7f7f7;
  p:first-child {
    padding: 1.5em 0 1em;
    span {
      cursor: pointer;
      // cursor: not-allowed;
    }
    .active {
      color: #9e9e9e;
      cursor: default;
    }
  }
  p:last-child {
    padding-bottom: 30px;
    img {
      margin-left: 10px;
      transform: translateY(30%);
    }
  }
}
</style>

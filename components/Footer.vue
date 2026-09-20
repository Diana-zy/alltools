<template>
  <footer class="footer">
    <div class="subscription">
      <div class="introduction">
        Apk-Alltools is a platform dedicated to showcasing and distributing the world's best and
        most popular APK products. We regularly update the best apps and games from around the
        globe, giving our users an unlimited experience.
      </div>
    </div>

    <div class="copyright">
      <div class="copyright-content">
        <div>
          <CustomLink to="/eula.html" target="_blank">Terms of Service</CustomLink>
          <CustomLink to="/privacy.html" target="_blank">Privacy Policy</CustomLink
          ><CustomLink to="/cookies.html" target="_blank">Cookies Policy</CustomLink
          ><CustomLink to="/disclosure.html" target="_blank">Disclosure & Disclaimer</CustomLink>
          <a href="mailto:Service@alltools1.com">Contact</a>
        </div>
        <span>Copyright ©&nbsp; 2024 AllTools1 &nbsp;All rights reserved.</span>
      </div>
    </div>
    <Notification v-if="showNotification" :message="notificationMessage" />
  </footer>
</template>

<script>
export default {
  computed: {
    showNotification() {
      return this.$globalData.notification.show;
    },
    notificationMessage() {
      return this.$globalData.notification.message;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-top: 1px solid rgba(65, 65, 76, 0.1);

  margin-top: 32px;
}
.subscription {
  max-width: 1200px;
  padding-top: 32px;
  padding-bottom: 16px;
}
.introduction {
  color: rgba($font1, 0.6);
  line-height: 16px;
  a {
    font-family: "sesb";
    color: $font1;
  }
}
.copyright {
  max-width: 1200px;
  display: flex;
  align-items: center;
  height: 56px;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    z-index: -1;
  }
  .copyright-content {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $font1;
    a {
      color: $font1;
      flex-shrink: 0;
      &::after {
        content: "|";
        margin-left: 9px;
        margin-right: 9px;
        opacity: 0.4;
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
    }
  }
}
@media screen and (max-width: 879px) {
  .footer {
    border-top: none;
    margin-top: vw(48);
  }
  .subscription {
    display: block;
    padding-top: vw(32);
    padding-bottom: vw(32);
  }
  .introduction {
    font-size: vw(24);
    line-height: vw(28);
    padding: 0 vw(46);
    margin-top: vw(24);
  }
  .copyright {
    height: auto;
    padding-bottom: vw(46);
    .copyright-content {
      height: auto;
      flex-direction: column;
      font-size: vw(24);
      line-height: vw(48);
      a {
        &::after {
          margin-left: vw(8);
          margin-right: vw(8);
        }
      }
    }
  }
}
</style>

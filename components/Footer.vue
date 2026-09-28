<template>
  <footer class="footer">
    <div class="subscription">
      <div class="subscription-content">
        <CustomLink to="/" class="footer-logo"><i class="icon-logo"></i></CustomLink>
        <div class="introduction">
          Apk-Alltools is a platform dedicated to showcasing and distributing the world's best and
          most popular APK products. We regularly update the best apps and games from around the
          globe, giving our users an unlimited experience.
        </div>
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
        <span>Copyright ©&nbsp; 2026 AllTools1 &nbsp;All rights reserved.</span>
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
  background: #14142b;

  margin-top: 32px;
}
.subscription {
  width: 100%;
}
.subscription-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 0;
}
.footer-logo {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  background: #ffffff;
  margin-bottom: 16px;
  i {
    @include icon(140px, 32px, "logo.png");
  }
}
.introduction {
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  a {
    font-family: "sesb";
    color: #ffffff;
  }
}
.copyright {
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
}
.copyright-content {
  width: 100%;
  min-height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  a {
    color: rgba(255, 255, 255, 0.6);
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
@media screen and (max-width: 879px) {
  .footer {
    border-top: none;
    margin-top: vw(48);
  }
  .subscription-content {
    padding: vw(48) vw(46) 0;
  }
  .footer-logo {
    height: vw(72);
    padding: 0 vw(24);
    border-radius: vw(12);
    margin-bottom: vw(24);
    i {
      @include icon(vw(210), vw(48), "logo.png");
    }
  }
  .introduction {
    font-size: vw(24);
    line-height: vw(28);
  }
  .copyright {
    padding: 0 vw(46);
  }
  .copyright-content {
    padding: vw(32) 0;
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
</style>

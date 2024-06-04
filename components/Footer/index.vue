<template>
  <footer class="footer">
    <div class="subscription">
      <div class="subscription-content">
        <p class="text">Subscription</p>
        <input v-model="input" class="email" placeholder="Email address" />
        <div class="submit" @click="submitEmail">Submit</div>
      </div>

      <div class="introduction">
        Alltools1.com is a game aggregation platform. Through this platform, you can play games on
        different devices that support Android and iOS. Our team goal is to enable all players to
        find a game they love.We offer many types of games. Including but not limited to puzzle
        games, action games, sports games, racing games, shooting games, arcade games, makeup games,
        matching games, cooking games, etc.<br />
        Alltools1.com has collected the hottest, most classic and most fun mobile games, each of
        which is handpicked by us. Alltools1.com is a website that supports genuine games. The
        website does not provide game downloads, and our game download links will jump to formal
        platforms such as Google Play and Apple Store. Players can find the most suitable games in
        Alltools1.com for the first time.<br />
        Hope you can find the best game for you on Alltools1.com platform. If you have any feedback
        on us, please feel free to contact us by email:
        <a href="mailto:Service@alltools1.com">Service@alltools1.com</a>
      </div>
    </div>

    <div class="copyright">
      <div class="copyright-content">
        <div>
          <CustomLink to="/eula.html" target="_blank">Terms of Service</CustomLink>
          <CustomLink to="/privacy.html" target="_blank">Privacy Policy</CustomLink
          ><CustomLink to="/cookies.html" target="_blank">Cookies Policy</CustomLink>
          <a href="mailto:Service@Alltools1.com">Contact</a>
        </div>
        <span>Copyright ©&nbsp; 2024 Alltools1 &nbsp;All rights reserved.</span>
      </div>
    </div>
    <Notification v-if="showNotification" :message="notificationMessage" />
  </footer>
</template>

<script>
import { validateEmail } from "~/utils/utils";

export default {
  data() {
    return {
      input: ""
    };
  },
  computed: {
    showNotification() {
      return this.$globalData.notification.show;
    },
    notificationMessage() {
      return this.$globalData.notification.message;
    }
  },
  methods: {
    async submitEmail() {
      if (validateEmail(this.input)) {
        await this.$axios.$post("/api/game/subscribe", {
          site_id: process.env.SITE_ID,
          email: this.input
        });
        this.$globalMethod.showNotification({
          message: "Thank you for subscribing!",
          type: "success"
        });
      } else {
        this.$globalMethod.showNotification({
          message: "Please enter a valid email address",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding-left: 208px;
  padding-top: 64px;
  &::before {
    content: "";
    width: calc(100% - 24px);
    display: block;
    height: 2px;
    background: #898e97;
  }
}
.subscription {
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
  padding-top: 40px;
  padding-bottom: 30px;
}
.introduction {
  font-size: 12px;
  color: #898e97;
  line-height: 32px;
  a {
    font-weight: 600;
    color: #7f37ff;
  }
}
.subscription-content {
  padding-right: 100px;
  margin-left: 40px;
  .text {
    font-weight: bold;
    color: #000000;
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .email {
    width: 400px;
    height: 48px;
    background: #f5f6f7;
    border-radius: 24px;
    border: 2px solid #e6e8eb;
    font-size: 14px;
    padding-left: 16px;
    margin-bottom: 24px;
    &::placeholder {
      color: #bfc2c7;
    }
  }
  .submit {
    @include btn-img(162px, 48px, "btn_submit.png");
    font-size: 18px;
  }
}

.copyright {
  position: absolute;
  width: 100%;
  left: 0;
  background: #eaeaea;
  .copyright-content {
    width: 100%;
    height: 60px;
    padding-left: 208px;
    padding-right: 164px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    font-weight: 600;
    font-size: 14px;
    color: #171e27;
  }
  a {
    color: #171e27;
    &::after {
      content: "|";
      margin-left: 8px;
      margin-right: 8px;
    }
    &:last-child {
      &::after {
        content: "";
      }
    }
  }
}
@media screen and (min-width: 1920px) {
  .copyright {
    box-shadow: 1000px 0 #eaeaea, -1000px 0 0 #eaeaea;
  }
}
@media screen and (min-width: 879px) and (max-width: 1078px) {
  .subscription {
    flex-flow: column;
  }
  .subscription-content {
    padding: 0 10px 10px 0;
    margin-left: 0;
    .email {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
@media screen and (max-width: 879px) {
  .footer {
    padding: vw(46) vw(32);
    &::before {
      width: 100%;
      height: vw(2);
    }
  }
  .subscription {
    flex-flow: column;
    padding-top: vw(46);
    padding-bottom: 0;
  }
  .introduction {
    font-size: vw(24);
    line-height: vw(42);
    margin-top: vw(46);
  }
  .subscription-content {
    padding-right: 0;
    margin-left: 0;
    .text {
      font-size: vw(32);
      line-height: vw(62);
      margin-bottom: vw(32);
    }
    .email {
      width: 100%;
      height: vw(92);
      border-radius: vw(46);
      border: vw(2) solid #e6e8eb;
      font-size: vw(28);
      padding-left: vw(32);
      margin-bottom: vw(32);
    }
    .submit {
      @include btn-img(100%, vw(92), "btn_submit2.png");
      font-size: vw(32);
    }
  }

  .copyright {
    position: relative;
    width: 100%;
    left: 0;
    background: #ffffff;
    .copyright-content {
      width: 100%;
      height: auto;
      padding-left: 0;
      padding-right: 0;
      justify-content: unset;
      align-items: unset;
      margin: 0 auto;
      font-weight: 600;
      font-size: vw(24);
      line-height: vw(32);
      color: #171e27;
      flex-direction: column;
      margin-top: vw(24);
      transform: scale(0.8);
      transform-origin: left center;
      div {
        display: flex;
        flex-wrap: nowrap;
      }
    }
    a {
      color: #171e27;
      flex-shrink: 0;
      &::after {
        content: "|";
        margin-left: vw(12);
        margin-right: vw(12);
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
    }
  }
}
</style>

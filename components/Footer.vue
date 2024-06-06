<template>
  <footer class="footer">
    <div class="subscription">
      <div class="subscription-content">
        <p class="text">SUBSCRIPTION</p>
        <div class="box-submit">
          <input
            v-model="input"
            class="email"
            placeholder="Email address"
            name="email"
            @keyup.enter="submitEmail"
          />
          <div class="submit" @click="submitEmail">SUBMIT</div>
        </div>
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
  border-top: 1px solid rgba(65, 65, 76, 0.1);
  margin-top: 32px;
}
.subscription {
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
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
.subscription-content {
  min-width: 390px;
  margin-left: 40px;
  .text {
    color: $font1;
    font-family: "sesb";
    font-size: 20px;
    line-height: 20px;
    margin-bottom: 16px;
  }
  .box-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  .email {
    width: 240px;
    padding-left: 16px;
    color: $font1;
    &::placeholder {
      color: rgba($font1, 0.4);
    }
  }
  .submit {
    width: 122px;
    height: 40px;
    background: #5bad6d;
    border-radius: 8px;
    @include center;
    font-size: 16px;
    color: #fff;
    font-family: "sesb";
    cursor: pointer;
  }
}

.copyright {
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
    background: #f5f5f5;
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
</style>

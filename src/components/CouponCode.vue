<template>
  <div>
    <input type="input" class="coupon-code" v-model="code" @input="validate">
    <p v-text="feedback"> </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        code: '',
        coupons: [
          {
            code: '50OFF',
            message: '50% Off!',
            discount: 50
          },
          {
            code: 'FREE',
            message: 'Entirely Free!',
            discount: 100
          },
        ],
        valid: false
      }
    },

    computed: {
      selectedCoupon () {
        return this.coupons.find(coupon => coupon.code == this.code);
      },
      message () {
        return this.selectedCoupon.message;
      },
      feedback () {
        return this.valid ? 'Coupon Redeemed: ' + this.message : 'Invalid Coupon Code';
      }
    },

    methods: {
      validate () {
        this.valid = !! this.selectedCoupon;

        if (this.valid) {
          this.$emit('applied', this.selectedCoupon.discount);
        }
      }
    }
  }
</script>

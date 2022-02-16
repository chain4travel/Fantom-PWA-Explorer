<template>
    <span class="nativetokenvalue">
        <f-token-value
            :value="cValue"
            :decimals="decimals"
            :number-currency="withPriceCurrency ? 'USD' : undefined"
            :use-placeholder="false"
            no-currency
            v-bind="$attrs"
        />
        <span v-if="!noCurrency"> {{NATIVE}}</span>
    </span>
</template>

<script>
import FTokenValue from '@/components/core/FTokenValue/FTokenValue.vue';
import { NATIVE_TOKEN, WEIToNative } from '@/utils/transactions.js';

export default {
    name: 'NativeTokenValue',

    components: { FTokenValue },

    props: {
        value: {
            type: [String, Number],
            default: 0,
        },
        decimals: {
            type: Number,
            default: 2,
        },
        /** Convert value to native */
        convert: {
            type: Boolean,
            default: false,
        },
        noCurrency: {
            type: Boolean,
            default: false,
        },
        withPriceCurrency: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        cValue() {
            return this.convert ? WEIToNative(this.value) : this.value;
        },
    },

    data() {
        return {
            NATIVE: NATIVE_TOKEN,
        }
    }
};
</script>

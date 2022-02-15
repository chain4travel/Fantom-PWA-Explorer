<template>
    <div class="f-transaction-detail f-data-layout">
        <f-card>
            <template v-if="!dTransactionByHashError">
                <template v-if="cTransaction.hash && cTransaction.hash === '0x0000000000000000000000000000000000000000000000000000000000000000'">
                    Transaction <b>{{ id }}</b> does not exist.
                </template>
                <template v-else>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.hash') }}</div>
                        <div class="col"><div class="break-word">{{ id }}</div></div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.status') }}</div>
                        <div class="col">
                            <div v-show="cTransaction && ('status' in cTransaction)"><f-transaction-status :status="cStatus"></f-transaction-status></div>
                        </div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.from') }}</div>
                        <div class="col">
                            <div class="break-word" v-show="cTransaction">
                                <router-link :to="{name: 'address-detail', params: {id: cTransaction.from}}">{{ cTransaction.from }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.to') }}</div>
                        <div class="col">
                            <div class="break-word" v-show="cTransaction">
                                <router-link :to="{name: 'address-detail', params: {id: cTransaction.to}}">{{ cTransaction.to }}</router-link>
                            </div>
                        </div>
                    </div>
                    <template v-if="cTransaction.contractAddress">
                        <div class="row no-collapse">
                            <div class="col-4 f-row-label">{{ $t('view_transaction_detail.contract') }}</div>
                            <div class="col">
                                <div class="break-word" v-show="cTransaction">
                                    <router-link :to="{name: 'address-detail', params: {id: cTransaction.contractAddress}}">{{ cTransaction.contractAddress }}</router-link>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.time') }}</div>
                        <div class="col">
                            <div class="break-word" v-show="cTransaction && cTransaction.block.timestamp">
                                <timeago :datetime="timestampToDate(cTransaction.block.timestamp)"></timeago>
                                ({{ formatDate(timestampToDate(cTransaction.block.timestamp)) }})
                            </div>
                        </div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.amount') }}</div>
                        <div class="col"><div class="break-word" v-show="cTransaction">{{  WEIToNative(cTransaction.value) }} {{NATIVE}}</div></div>
                    </div>
                    <!--
                                <div class="row no-collapse">
                                    <div class="col-4 f-row-label">{{ $t('view_transaction_detail.fee') }}</div>
                                    <div class="col"><div class="break-word" v-show="cTransaction">{{  WEIToNative(cTransaction.fee) }} {{NATIVE}}</div></div>
                                </div>
                    -->
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.block') }}</div>
                        <div class="col">
                            <div class="break-word" v-show="cTransaction">
                                <router-link :to="{name: 'block-detail', params: {id: cTransaction.block.number | formatHexToInt}}">
                                    {{cTransaction.block.number | formatHexToInt}}
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.gas_used') }}</div>
                        <div class="col"><div class="break-word" v-show="cTransaction">{{  cTransaction.gasUsed | formatHexToInt }}</div></div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.gas_limit') }}</div>
                        <div class="col"><div class="break-word" v-show="cTransaction">{{  cTransaction.gas | formatHexToInt }}</div></div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.gas_price') }}</div>
                        <div class="col"><div class="break-word" v-show="cTransaction">{{  cTransaction.gasPrice | formatHexToInt }} WEI</div></div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.nonce') }}</div>
                        <div class="col"><div class="break-word" v-show="cTransaction">{{  cTransaction.nonce | formatHexToInt }}</div></div>
                    </div>
                    <div class="row no-collapse">
                        <div class="col-4 f-row-label">{{ $t('view_transaction_detail.transaction_fee') }}</div>
                        <div class="col"><div class="break-word" v-show="cTransaction">{{  cTransactionFee }} {{NATIVE}}</div></div>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="query-error">{{ $t('view_transaction_detail.transaction_not_found') }}</div>
            </template>
        </f-card>


        <f-tabs aria-label="Transaction Tabs">
            <template #logs>
                <h2>
                    {{ $t("view_transaction_detail.logs") }}
                    <span class="f-records-count">({{ 0 }})</span>
                </h2>
            </template>
            <template #byteCode>
                <h2>{{ $t("view_transaction_detail.input_data") }}</h2>
            </template>

            <f-tab title-slot="logs">
            </f-tab>
            <f-tab title-slot="byteCode">
                <f-card>
                    <div class="source-code">
                        <div>
                            <pre class="break">{{ encodeURIComponent(cTransaction.inputData) }}</pre>
                        </div>
                        <f-copy-button
                            :text="cTransaction.inputData"
                            :tooltip="$t('copy_to_clipboard', {what: $t('view_transaction_detail.input_data')})"
                            :popoverText="$t('copied_to_clipboard', {what: $t('view_transaction_detail.input_data')})"
                            class="btn light large same-size round"
                        />
                    </div>
                </f-card>
            </f-tab>
        </f-tabs>
    </div>
</template>

<script>
    import FCard from "../components/core/FCard/FCard.vue";
    import FTabs from "../components/core/FTabs/FTabs.vue";
    import FTab from "../components/core/FTabs/FTab.vue";
    import gql from 'graphql-tag';
    import { NATIVE_TOKEN, WEIToNative } from "../utils/transactions.js";
    import { formatHexToInt, timestampToDate, formatDate } from "../filters.js";
    import FTransactionStatus from "../components/FTransactionStatus.vue";
    import FCopyButton from "../components/core/FCopyButton/FCopyButton.vue";

    export default {
        components: {
            FTransactionStatus,
            FCard,
            FTab,
            FTabs,
            FCopyButton
        },

        props: {
            /** Transaction id */
            id: {
                type: String,
                required: true,
                default: ''
            }
        },

        apollo: {
            transaction: {
                query: gql`
                    query TransactionByHash($hash: Bytes32!) {
                        transaction (hash: $hash) {
                            hash
                            index
                            nonce
                            from
                            to
                            value
                            gas
                            gasUsed
                            gasPrice
                            inputData
                            status
                            contractAddress
                            block {
                                hash
                                number
                                timestamp
                            }
                        }
                    }
                `,
                variables() {
                    return {
                        hash: this.id
                    }
                },
                error(_error) {
                    this.dTransactionByHashError = _error.message;
                }
            }
        },

        data() {
            return {
                dTransactionByHashError: '',
                NATIVE: NATIVE_TOKEN,
            }
        },

        computed: {
            cTransaction() {
                return this.transaction || {block: {}};
            },

            cTransactionFee() {
                const {transaction} = this;

                if (transaction) {
                    return WEIToNative(this.formatHexToInt(transaction.gasPrice) * this.formatHexToInt(transaction.gasUsed));
                }

                return 0;
            },

            cStatus() {
                let status = 2;

                if (this.transaction) {
                    if (this.transaction.status !== null) {
                        status = this.formatHexToInt(this.transaction.status);
                    }
                }

                return status;
            }
/*
            cLoading() {
                return this.$apollo.queries.transaction.loading;
            }
*/
        },

        methods: {
            WEIToNative,
            formatHexToInt,
            timestampToDate,
            formatDate,
        }
    }
</script>

<style lang="scss">
    .f-transaction-detail {
        .source-code {
            position: relative;
            width: 100%;

            > div {
                width: 100%;
                overflow-x: auto;
            }

            pre {
                width: 100%;
                min-width: 800px;
                padding: 40px 16px 16px 16px;
                background-color: #f6f6f6;
                white-space: pre-wrap;

                &.break {
                    word-wrap: break-word;
                    /*white-space: pre-line;*/
                }
            }

            .f-copy-button {
                position: absolute;
                top: 8px;
                right: 8px;
            }
        }
    }
</style>

<template>
    <footer class="f-footer">
        <div class="narrow-container">
            <div class="row align-items-center">
                <div class="col align-center-sm"><f-social-media-links></f-social-media-links></div>
                <div class="col align-center-sm align-end">
                    <div style="line-height: 1;">
                        <a style="display: block;" href="https://chain4travel.com/" target="_blank" rel="nofollow">©2022 Chain4Travel AG</a>
                        <a style="font-size: 10px" href="ttps://github.com/chain4travel/Fantom-PWA-Explorer" target="_blank" rel="nofollow">Powered by Fantom PWA Explorer</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import FSocialMediaLinks from "../components/FSocialMediaLinks.vue";

    export default {
        components: {
            FSocialMediaLinks
        }
    }
</script>

<style lang="scss">
    .f-footer {
        --f-footer-background-color: #{$theme-color};
        --f-footer-link-color: #{$secondary-color-lighter};

        color: #fff;
        background-color: var(--f-footer-background-color);
        min-height: 64px;

        .narrow-container {
            padding-top: 8px;
            padding-bottom: 8px;
            height: 100%;

            > .row {
                height: 100%;
            }
        }

        @include links() {
            color: var(--f-footer-link-color);
            transition: color $transition-length ease;
        }

        a:not(.btn):hover {
            color: #fff;
            text-decoration: none;
        }
    }
</style>

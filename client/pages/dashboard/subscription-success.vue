<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07"
        >
            <h1>Congrats! It’s official. Your Website is Eco-friendly!</h1>
            <p class="mb-06">
                From now on you can proudly display the
                <CvLink to="/dashboard/badge" size="lg">Eco Web Badge</CvLink>
                on {{ getUrl ? getUrl : 'your website' }}.
            </p>
            <!-- <p class="mb-06">
                Visit and share your public Eco-Web profile where everyone can
                see your personal achievements: Public profile
            </p> -->
            <!-- <p class="mb-06">
                If you need some inspiration on how other participants are
                putting their eco-friendliness to work for them, check out Adams
                Blogpost about his Eco-Web membership or Staceys Newsletter
                Campagin about her new green website.
            </p> -->
            <p>
                <NuxtLink to="/dashboard" class="bx--btn bx--btn--primary">
                    View the Dashboard
                </NuxtLink>
            </p>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'minimal',
    middleware: ['auth'],
    computed: {
        ...mapGetters({
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        getUrl() {
            return this.getSelectedDomain && this.getSelectedDomain.url
                ? this.getSelectedDomain.url
                : null
        },
    },
}
</script>

<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4 mb-07"
        >
            <h1>Congrats! It’s official. Your Website is Eco-friendly!</h1>
            <p>
                From now on you can proudly display the Eco-Web Badge on
                www.yourdomain.com.
            </p>

            <p>
                Visit and share your public Eco-Web profile where everyone can
                see your personal achievements: Public profile
            </p>

            <p>
                If you need some inspiration on how other participants are
                putting their eco-friendliness to work for them, check out Adams
                Blogpost about his Eco-Web membership or Staceys Newsletter
                Campagin about her new green website.
            </p>
            <p>
                <NuxtLink to="/dashboard">Visit the Dashboard</NuxtLink>
            </p>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'minimal',
    middleware: ['auth'],
}
</script>

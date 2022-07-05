<template>

  <div class="relative w-full">
    <div class="bg-gray-1000">
      <div class="flex justify-left pt-8 sm:pt-0">
        <NuxtLogo class="my-3 mx-4" />
      </div>
<ul class="bg-gray-1000 text-white font-bold text-xs uppercase menu menu-vertical lg:menu-horizontal bg-base-100 ">
  <li class="bg-gray-1000">
	<span class="itemName bg-gray-1000" style="margin: 10.5px 0;">
		<NuxtLink to="/">Clips</NuxtLink>
	</span>
  </li>
  <li class="bg-gray-1000"><a href="https://rentry.org/irysoundbits" target="_blank">Sounds</a></li>
  <li class="bg-gray-1000"><NuxtLink to="/asmr">ASMR</NuxtLink></li>
</ul>
  </div>
  <div>
      <div class="mt-8 bg-black overflow-hidden shadow sm:rounded-lg p-6">
        <h1 class="text-2xl leading-7 font-semibold" style="color: #fff">
        </h1>
        <div class="aspect-w-16 aspect-h-9">
          <iframe :src="'https://www.youtube.com/embed/' + $route.params.id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto justify-items-start sm:p-10">
	</div>
  </div>
<footer class="footer footer-center p-4 bg-gray-1000 text-base-content">
  <div>
    <p class="text-orange-1000"><a class="hover:underline" href="https://www.youtube.com/channel/UC8rcEBzJSleTkf_-agPM20g">Subscribe to IRyS</a></p>
    <p><small>Not affiliated with IRyS or hololive - <a>Source</a></small></p>
  </div>
</footer>
    </div>
  </div>
</template>

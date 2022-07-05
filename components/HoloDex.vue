<script setup>

import { defineProps } from "vue";

const route = useRoute()

const props = defineProps({
	endpoint: String,
	endpointData: String,
	tagline: String
})

let endpointData = (props.endpointData) ? ref(JSON.parse(props.endpointData)) : ref(null)

const baseEndpoint = "https://holodex.net/api/v2/"

const page = ref(Number.parseInt(route.query.page) || 1)

const offset = ref((page.value > 1) ? (page.value-1)*24 : 0)

let { data, pending, refresh, error } = await useFetch(() => `${baseEndpoint}${props.endpoint}${(endpointData.value) ? '' : `&offset=${offset.value}&paginated=true`}`, {
	headers: {
		Accept: "application/json"
	},
	method: (endpointData.value) ? 'POST' : 'GET',
	body: (endpointData.value) ? JSON.stringify(endpointData.value) : null
})

let limit = (endpointData.value && props.endpoint.startsWith('search/')) ? 30 : 24

async function setPage(_page) {
	if (_page !== page.value) {
		offset.value = (_page-1)*limit
		if (endpointData.value) {
			endpointData.value.offset = offset.value
		}
		await refresh();
		if (data) {
			pages.max = Math.round(data.value.total/limit)
  		pages.pages = pagination(_page, Math.round(data.value.total/limit))
      pages.id.value = _page
			videos.videos = data.value.items
			videos.id = offset.value
			page.value = _page;
			navigateTo({path: route.path, query: page.value > 1 ? {page: page.value} : null})
		}
	}
}

function previous(){
	setPage(page.value - 1)
}

function next() {
	setPage(page.value + 1)
}

// liberated from https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    if (rangeWithDots[rangeWithDots.length-1] === '...') {
      rangeWithDots.pop()
    }

    return rangeWithDots;
}

let videos, pages

// sometimes data.value is null in the client but not on the server
// I don't think data is being passed correctly or the client
// is rendering before the server setup has finished!
// not sure if awaiting here is correct but it works
if (!data.value && pending.value === true) {
  await refresh()
}

if (data) {
  videos = {id: ref(1), videos: data.value.items}

  pages = {id: ref(page.value), pages: pagination(page.value, Math.round(data.value.total/limit)), max: Math.round(data.value.total/limit)}

  setPage(page.value)
}

</script>
<template>

  <div class="relative w-full">
    <div class="bg-gray-1000">
      <div class="flex justify-left pt-8 sm:pt-0">
        <NuxtLogo class="my-3 mx-4" />
      </div>
<ul class="bg-gray-1000 text-white font-bold text-xs uppercase menu menu-vertical lg:menu-horizontal bg-base-100 ">
  <li class="bg-gray-1000">
	<span class="itemName bg-gray-1000" style="margin: 10.5px 0;">
		<NuxtLink to="/">Clips<span v-if="route.name === 'index'" class="bg-orange-1000" style="width: 100%;height:2px;display: block;position:relative;top: 10px;"></span></NuxtLink>
	</span>
  </li>
  <li class="bg-gray-1000"><a href="https://rentry.org/irysoundbits" target="_blank">Sounds</a></li>
  <li class="bg-gray-1000"><NuxtLink to="/asmr">ASMR</NuxtLink></li>
</ul>
  </div>
  <div>
      <div class="mt-8 bg-black overflow-hidden shadow sm:rounded-lg p-6">
        <h1 class="text-2xl leading-7 font-semibold" style="color: #fff">
          {{props?.tagline || ""}}
        </h1>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto justify-items-start sm:p-10">
		<div v-for="item in videos.videos" v-if="videos && videos.videos" :key="videos.id" class="p-2">
			<NuxtLink :to="'/watch/' + item.id">
				<img class="hover:cursor-pointer" v-bind:src="'https://i.ytimg.com/vi/' + item.id + '/mqdefault.jpg'" />
			</NuxtLink>
      <NuxtLink :to="'/watch/' + item.id" class="text-white-1000 hover:text-orange-1000">{{item.title}}</NuxtLink>
			<div class="text-gray-1001">
			{{item.channel.name}}
			</div>
		</div>
	</div>
	<div class="flex justify-center">
		<div class="btn-group">
		  <button class="btn md:w-22 md:h-22 md:m-5 rounded-none bg-orange-1000 hover:bg-orange-1001 font-bold text-black" v-if="page > 1" @click="previous()">Prev</button>
		  <template v-for="_page in pages.pages" :key="page">
        <button class="btn w-1 md:w-22 md:h-22 md:m-5 rounded-none" v-bind:class="{ 'btn-disabled': _page === '...', 'border-orange-1000': _page === page, 'border-4': _page === page}" @click="setPage(_page)">{{_page}}</button>
		  </template>
      <button class="btn md:w-22 md:h-22 md:m-5 rounded-none bg-orange-1000 hover:bg-orange-1001 font-bold text-black" v-if="page < pages.max" v-bind:class="{ 'hidden': page === pages.max || videos.videos.length < 24}" @click="next()">Next</button>
		</div>
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

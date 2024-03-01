<script>
    import "../app.css";
    export let data;
    let item = data.item;
    let items = data.items;
    let clock = timer({interval: 500, date: item.updated})
    
    let TempScale = false;

    import timer from '$lib/utils'
    import { DateTime } from "luxon";
    import StrongWind from 'svelte-weather/StrongWind.svelte';
    import Humidity from 'svelte-weather/Humidity.svelte';
    import Barometer from 'svelte-weather/Barometer.svelte';
    import Refresh from 'svelte-weather/Refresh.svelte';
    import Chart from "./component/chart.svelte";

    import {onDestroy, onMount } from 'svelte';
    import { pb } from '$lib/pocketbase';
    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');

    onMount(async () => {
        await pb.collection('station_data_realtime').subscribe('*', async ({ action }) => {
        if (action) {
          item = await pb.collection('station_data_realtime').getOne('123456789012345', {});
          items = await pb.collection('station_data').getFullList(undefined, {
            filter: 'created ~ "'+currentDate+'"', sort: '-created', fields: "windspeed, temperature"
          });
          console.log("update");
          clock = timer({interval: 500, date: item.updated});
        }
      });
    });

    onDestroy(async () => {3
      await pb.collection('station_data_realtime').unsubscribe('*');
    });

    let maxTemp = Math.round(Math.max(...items.map(entry => entry.temperature)));
    let minTemp = Math.round(Math.min(...items.map(entry => entry.temperature)));
    let maxWind = Math.round(Math.max(...items.map(entry => entry.windspeed)));
</script>

<div class="container-fluid mx-auto  text-teal-500 font-Assistant" >
  <div class="flex justify-center items-center h-screen flex-col">
    <div class="flex justify-end w-full items-center px-5">
      <Refresh  size="50"/><span class="text-lg"> hace  {$clock} secundos</span>
    </div>
    <div class="my-auto">
      <h1 class="text-center text-4xl mb-5 font-semibold">Datos actuales de la estación</h1>
      <div class="flex flex-row items-center justify-center gap-14">
        <img alt="Weather Status Image" src="https://csndb.lucasdev.app/api/files/0oppacza93448t8/xyl2h7ni4qrsjnj/01d_uB2AVa2kEG.svg" class=" h-72 w-72"/>
        <div class="flex flex-col">
          {#if TempScale}
            <span class=" text-10xl text-black">{(Math.round(item.temperature)*9/5) + 32}</span>
          {:else}
          <span class=" text-10xl text-black">{Math.round(item.temperature)}</span>
          {/if}
          <div class="flex justify-center items-center">
            {#if TempScale}
              <p class="text-3xl font-bold">{(minTemp*9/5) + 32}° / {(maxTemp*9/5) + 32}°</p>
              {:else}
              <p class="text-3xl font-bold">{minTemp}° / {maxTemp}°</p>
            {/if}
          </div>
        </div>
        <div class="flex flex-col items-left text-3xl gap-8 justify-center">
          <div class="flex flex-row gap-4 items-end justify-center">
            <StrongWind size="50"/>
            <span class="text-5xl font-bold inline-block">{maxWind}<p class="text-sm  inline-block font-normal">(max)</p> &nbsp;<p class="text-xl  inline-block font-normal">km/h</p></span>
          </div>
          <div class="flex flex-row gap-4 items-end">
            <Humidity  size="50"/>
            <span class="text-5xl font-bold inline-block">{Math.round(item.humidity)} &nbsp;<p class="text-xl  inline-block font-normal">%</p></span>
          </div>
          <div class="flex flex-row gap-4 items-end">
            <Barometer size="50"/>
            <span class="text-5xl font-bold inline-block">{Math.round(item.pressure)} &nbsp;<p class="text-xl  inline-block font-normal">hPa</p></span>
          </div>
        </div>
      </div>
      <!--
      <div class="flex flex-wrap gap-10 justify-center mt-10">
        <a class="flex flex-col justify-center items-center hover:bg-gray-200 p-2 rounded-md" href="#">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">AYER</span>
        </a>
        <a class="flex flex-col justify-center items-center hover:bg-gray-200 p-2 rounded-md" href="#">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">LUNES</span>
        </a>
        <a class="flex flex-col justify-center items-center hover:bg-gray-200 p-2 rounded-md" href="#">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">MARTES</span>
        </a>
        <a class="flex flex-col justify-center items-center hover:bg-gray-200 p-2 rounded-md" href="#">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">MIERCOLES</span>
        </a>
      </div>
      -->
    </div>
    <div class="flex justify-center items-center text-teal-500 divide-x-2 divide-teal-500 p-4 font-semibold">
      <button class="px-4 text-[25px] focus:text-teal-800" on:click={() => (TempScale = true)}>F°</button>
      <button class="px-4 text-[25px] focus:text-teal-800" on:click={() => (TempScale = false)}>C°</button>
    </div>
  </div>
</div>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>

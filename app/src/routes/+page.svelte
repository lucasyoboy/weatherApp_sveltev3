<script>
    import "../app.css";
    import StrongWind from 'svelte-weather/StrongWind.svelte';
    import Humidity from 'svelte-weather/Humidity.svelte';
    import Barometer from 'svelte-weather/Barometer.svelte';
    import Refresh from 'svelte-weather/Refresh.svelte';
    import Chart from "./component/chart.svelte";
</script>

<div class="container-fluid mx-auto  text-teal-500 font-Assistant" >
  <div class="flex justify-center items-center h-screen flex-col">
    <div class="flex justify-end w-full">
      <Refresh  size="50"/>
    </div>
    <div class="my-auto">
      <h1 class="text-center text-4xl mb-5 font-semibold">Datos actuales de la estación</h1>
      <div class="flex flex-row items-center justify-center gap-14">
        <img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-night.svg" class=" h-72 w-72"/>
        <div class="flex flex-col">
          <span class=" text-10xl text-black">24</span>
          <div class="flex justify-center items-center">
            <p class="text-3xl font-bold">19° / 23°</p>
          </div>
        </div>
        <div class="flex flex-col items-left text-3xl gap-8 justify-center">
          <div class="flex flex-row gap-4 items-end justify-center">
            <StrongWind size="50"/>
            <span class="text-5xl font-bold inline-block">300 &nbsp;<p class="text-xl  inline-block font-normal">km/h</p></span>
          </div>
          <div class="flex flex-row gap-4 items-end">
            <Humidity  size="50"/>
            <span class="text-5xl font-bold inline-block">70 &nbsp;<p class="text-xl  inline-block font-normal">%</p></span>
          </div>
          <div class="flex flex-row gap-4 items-end">
            <Barometer size="50"/>
            <span class="text-5xl font-bold inline-block">994 &nbsp;<p class="text-xl  inline-block font-normal">hPa</p></span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-14 justify-center mt-10">
        <div class="flex flex-col justify-center items-center">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">AYER</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">AYER</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">AYER</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" class=" h-20 w-20">
          <p class="text-4xl">12° / 34°</p>
          <span class="text-xl">AYER</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center text-teal-500 divide-x-2 divide-teal-500 p-4 font-semibold">
      <button class="px-4 text-[25px]">F°</button>
      <button class="px-4 text-[25px]">C°</button>
    </div>
  </div>
</div>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>

import { readable } from 'svelte/store'

export const serializeNonPOJOs = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

export default function(options={}) {
  return readable(null, set => {

	function getElapsedSeconds(targetDateTime) {
		const targetDate = new Date(targetDateTime).getTime();
		const elapsedSeconds = Math.max(Date.now() - targetDate, 0) / 1000;
	  
		return Math.floor(elapsedSeconds);
	}

    // the update function sets the latest date
    const update = () => set(getElapsedSeconds(options.date))
    
    // force an update to initialize the store with a non-null value
    update()
		
    // setup an interval timer to update the store's value repeatedly over time
    const interval = setInterval(update, options.interval || 1000)
		
    // return unsubscribe callback:
    // it will stop the timer when the store is destroyed
    return () => clearInterval(interval)
  })
}
